import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
await loadLocalEnv();

const port = Number(process.env.PORT || 5173);
const deepseekApiKey = process.env.DEEPSEEK_API_KEY || "";
const deepseekModel = process.env.DEEPSEEK_MODEL || "deepseek-chat";
const amapApiKey = process.env.AMAP_API_KEY || "";
const curatedPlaceCache = new Map();

const cityAliases = [
  "北京", "上海", "天津", "重庆", "成都", "广州", "深圳", "杭州", "南京", "苏州",
  "西安", "武汉", "长沙", "厦门", "福州", "青岛", "济南", "郑州", "洛阳", "开封",
  "大理", "丽江", "昆明", "贵阳", "桂林", "南宁", "海口", "三亚", "哈尔滨", "长春",
  "沈阳", "大连", "呼和浩特", "银川", "兰州", "西宁", "乌鲁木齐", "拉萨", "香港",
  "澳门", "台北",
];

const cityAdcodes = {
  北京: "110000",
  上海: "310000",
  天津: "120000",
  重庆: "500000",
  成都: "510100",
  广州: "440100",
  深圳: "440300",
  杭州: "330100",
  南京: "320100",
  苏州: "320500",
  西安: "610100",
  武汉: "420100",
  长沙: "430100",
  厦门: "350200",
  福州: "350100",
  青岛: "370200",
  济南: "370100",
  郑州: "410100",
  洛阳: "410300",
  开封: "410200",
  大理: "532900",
  丽江: "530700",
  昆明: "530100",
  贵阳: "520100",
  桂林: "450300",
  南宁: "450100",
  海口: "460100",
  三亚: "460200",
  哈尔滨: "230100",
  长春: "220100",
  沈阳: "210100",
  大连: "210200",
  呼和浩特: "150100",
  银川: "640100",
  兰州: "620100",
  西宁: "630100",
  乌鲁木齐: "650100",
  拉萨: "540100",
  香港: "810000",
  澳门: "820000",
  台北: "710000",
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

async function loadLocalEnv() {
  try {
    const envText = await readFile(join(root, ".env.local"), "utf8");
    for (const line of envText.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
      if (key) process.env[key] = value;
    }
  } catch {
    // Optional local file.
  }
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  res.end(JSON.stringify(payload));
}

const MAX_REQUEST_BODY_BYTES = 256 * 1024;

async function readBody(req) {
  const chunks = [];
  let totalBytes = 0;
  for await (const chunk of req) chunks.push(chunk);
  for (const chunk of chunks) totalBytes += Buffer.byteLength(chunk);
  if (totalBytes > MAX_REQUEST_BODY_BYTES) {
    const error = new Error("Request body too large");
    error.statusCode = 413;
    throw error;
  }
  return Buffer.concat(chunks).toString("utf8");
}

function systemPrompt(places) {
  const placeList = (places || [])
    .slice(0, 30)
    .map((place) => `- ${place.title}｜${place.label}｜${place.address}｜${place.tag}｜${place.guide}`)
    .join("\n");

  return `你是“热游攻略助手”，服务于面向旅行者的“热游地图”产品。你的唯一职责是帮助用户发现中国境内目的地、生成旅行攻略、推荐主要景点与代表性美食、规划地点之间的交通路线，并生成适合收藏或分享的攻略内容。产品范围覆盖全国城市、区县、景区和热门旅行区域，不再限制为成都。

【范围限制】
- 只处理旅行攻略相关需求：目的地推荐、行程安排、天气适配、景点/美食/打卡点/历史热点地点推荐、路线规划、附近推荐、用户发布攻略引导与分享卡片生成。
- 对旅行无关问题，不展开回答，只简短说明服务范围，并引导用户提供目的地、日期或玩法偏好。
- 不替用户购买门票、订房、支付或直接完成交易。
- 任何付费内容都必须明确标记“推广”或“商家合作”，不得伪装为自然热门。
- 支持全国目的地；当用户没有说城市时，先追问“想去哪个城市或区域”，不要默认只生成成都攻略。
- 当用户明确说“成都”或问题与当前地点库匹配时，优先结合下方本地地点库；当用户询问其他城市时，按通用旅行知识生成攻略，并提醒实时天气、票务、营业、路线耗时需要接入对应城市数据后核验。
- 如果用户明确询问北京、上海、西安、杭州、重庆、广州、深圳、厦门、南京、苏州、云南、贵州、新疆、西藏等非成都目的地，必须围绕用户指定目的地回答，禁止改写成成都攻略。

【提问与补全标准】
- 用户信息不足时，不要卡住流程；先基于默认假设给出热门初版攻略，再追问最关键的 2-3 项信息。
- 生成完整攻略前，优先关注：目的地、日期或天数、玩法偏好、出行方式、住宿或出发区域。
- 可选考虑：同行人群、预算、饮食偏好/忌口、是否接受排队或早起、是否需要少步行/亲子/老人/独行安全建议。
- 若使用了默认假设，必须写明“默认假设”。
- 若用户只说“做个攻略”“去哪玩”，不要直接默认成都；优先给出城市选择引导，例如“你想去哪个城市/省份/主题目的地？”并可提供热门方向：北京、上海、西安、杭州、重庆、成都、广州、厦门、云南、贵州、新疆等。

【攻略生成标准】
- 攻略优先，故事辅助：先回答值不值得去、怎么玩、怎么去、吃什么，再补充地点为什么火、历史热点或网络故事。
- 完整攻略必须尽量包含：出行速览、天气/出行准备、必去点位、必吃美食、每日路线、地点间交通、预算提示、预约/排队/避雷提醒、雨天或高峰备用方案、收藏/分享/导航下一步。
- 每日路线要像可执行时间表：例如 09:00-11:00 地点 A，地点 A 到地点 B 用什么交通方式、预计多久、为什么这样排。
- 路线优先减少折返、匹配天气和营业时间，把美食与沿途地点结合，热门景点给出错峰建议。
- 如果用户问单个地点，输出：是否值得去、适合人群、建议停留、最佳到访时间、门票/预约/交通核验提示、用户评价摘要、常见避雷点、附近顺路推荐。
- 如果用户要求分享，输出适合手机端收藏/分享的短卡片内容：标题、城市与天数、必去 3-5 个点、必吃 2-4 个、美食/天气/路线缩略版。

【可信度与实时信息】
- 涉及天气、营业时间、票价、预约、路线耗时等可能变化的信息时，不得凭空保证。
- 当前没有实时天气、票务和路线 API 时，要明确写“出发前请核验”或“需要接入天气/地图服务后确认”，不要编造更新时间。
- 如果用户询问非成都城市，而当前没有该城市的本地 POI 数据，就不要假装已经接入地图数据库；可以给出通用攻略框架和推荐方向，并提示后续接入全国 POI、天气和路线服务后可进一步精确到点位坐标。
- 评论、收藏和发布内容需要登录；普通用户发布攻略应进入审核流程。

【输出风格】
- 使用中文回答。
- 像常见大模型聊天软件一样自然排版，适合手机端阅读：先摘要，再细节；段落短，不堆长篇大段。
- 优先用标题、短段落、编号列表；不要输出 JSON；不要说你是 AI。
- 每次回答后，最多给一个最有价值的下一步动作，例如“按雨天重新排路线”“在地图上查看这些点位”“生成分享卡片”。

当前本地地点库（目前主要为成都点位；仅当用户询问成都或相关地点时优先使用）：
${placeList}`;
}

function inferDestination(messages) {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content || "";
  const normalized = latestUserMessage.replace(/\s+/g, "");
  const directCity = cityAliases.find((city) => normalized.includes(city));
  if (directCity) return directCity;

  const match = normalized.match(/(?:去|到|在|玩|逛)([\u4e00-\u9fa5]{2,8})(?:旅游|旅行|玩|攻略|出差|看|吃|$)/);
  return match?.[1] || "";
}

function summarizeForecast(lives, forecasts) {
  const live = lives?.[0];
  const forecast = forecasts?.[0];
  const casts = forecast?.casts || [];
  const lines = [];

  if (live) {
    lines.push(`实况：${live.city || ""}，${live.weather || "未知天气"}，${live.temperature || "未知"}℃，${live.winddirection || ""}风${live.windpower || ""}级，湿度${live.humidity || "未知"}%，更新时间 ${live.reporttime || "未知"}`);
  }

  if (casts.length) {
    lines.push("未来天气：");
    casts.slice(0, 4).forEach((cast) => {
      lines.push(`- ${cast.date} 周${cast.week}：白天${cast.dayweather} ${cast.daytemp}℃，夜间${cast.nightweather} ${cast.nighttemp}℃，${cast.daywind}风${cast.daypower}级`);
    });
  }

  return lines.join("\n");
}

function dateContext() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  });
  return `当前日期：${formatter.format(now)}。用户说“明天”时，按 ${formatter.format(tomorrow)} 理解；用户说“今天”时，按当前日期理解。`;
}

async function getAmapWeather(city) {
  if (!amapApiKey || !city) return "";
  const baseUrl = "https://restapi.amap.com/v3/weather/weatherInfo";
  const cityCode = cityAdcodes[city] || city;
  const params = new URLSearchParams({
    key: amapApiKey,
    city: cityCode,
    extensions: "all",
    output: "JSON",
  });

  const response = await fetch(`${baseUrl}?${params.toString()}`);
  const data = await response.json();
  if (data.status !== "1") {
    throw new Error(data.info || "高德天气查询失败");
  }

  return summarizeForecast(data.lives, data.forecasts);
}

async function getAmapPlaces(city) {
  if (!amapApiKey || !city) {
    throw new Error("Missing AMAP_API_KEY or city");
  }

  const cityCode = cityAdcodes[city] || city;
  const baseUrl = "https://restapi.amap.com/v3/place/text";
  const pages = [1, 2];
  const results = [];
  const seen = new Set();

  for (const page of pages) {
    const params = new URLSearchParams({
      key: amapApiKey,
      city: cityCode,
      citylimit: "true",
      keywords: "景点",
      types: "110000",
      offset: "20",
      page: String(page),
      extensions: "base",
      output: "JSON",
    });

    const response = await fetch(`${baseUrl}?${params.toString()}`);
    const data = await response.json();
    if (data.status !== "1") {
      throw new Error(data.info || "高德地点查询失败");
    }

    for (const poi of data.pois || []) {
      if (!poi.name || seen.has(poi.id || poi.name)) continue;
      seen.add(poi.id || poi.name);
      results.push({
        id: poi.id || `${city}-${results.length}`,
        title: poi.name,
        tag: (poi.type || "热门景点").split(";").pop() || "热门景点",
        address: poi.address || city,
        location: poi.location || "",
        tel: poi.tel || "",
      });
      if (results.length >= 30) break;
    }
  }

  return results.slice(0, 30);
}

function curatedPlacePrompt(city, amapPlaces) {
  const amapList = amapPlaces
    .slice(0, 40)
    .map((place) => `- ${place.title}｜${place.tag}｜${place.address}`)
    .join("\n");

  return `请为“${city}”整理 30 个适合旅行地图首页展示的精选热门点位，风格参考“成都精选 30 个地点”的产品内容库。

要求：
- 只输出 JSON 数组，不要 Markdown，不要解释。
- 必须正好 30 个。
- 不要只按景区热度机械罗列，要覆盖：经典景点、博物馆/历史人文、城市地标、热门街区、夜游点、自然公园、代表性美食街区或商圈。
- 每项字段必须为：title、tag、address、summary。
- tag 控制在 2-6 个中文，如“城市地标”“历史人文”“夜游打卡”“自然公园”“美食街区”。
- summary 是一句适合旅行卡片展示的话，说明为什么值得去以及简单玩法提醒。
- address 可以写区域/街道/景区位置；不确定时写城市内常见区域，避免编造详细门牌号。
- 如高德候选点位有可用地点，可优先参考，但要做精选，不要照抄全部。

高德候选点位：
${amapList}`;
}

function parseJsonArray(text) {
  const trimmed = String(text || "").trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\[[\s\S]*\]/);
    if (!match) return [];
    try {
      return JSON.parse(match[0]);
    } catch {
      return [];
    }
  }
}

async function getCuratedPlaces(city) {
  if (curatedPlaceCache.has(city)) return curatedPlaceCache.get(city);

  const amapPlaces = await getAmapPlaces(city).catch(() => []);
  if (!deepseekApiKey) return amapPlaces;

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${deepseekApiKey}`,
    },
    body: JSON.stringify({
      model: deepseekModel,
      messages: [
        { role: "system", content: "你是旅行目的地内容编辑，擅长为城市旅行地图整理精选点位库。只输出严格 JSON。" },
        { role: "user", content: curatedPlacePrompt(city, amapPlaces) },
      ],
      temperature: 0.35,
      stream: false,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "精选景点生成失败");

  const places = parseJsonArray(data.choices?.[0]?.message?.content)
    .filter((place) => place && place.title)
    .slice(0, 30)
    .map((place, index) => ({
      id: `${city}-${index + 1}`,
      title: String(place.title || ""),
      tag: String(place.tag || "精选景点"),
      address: String(place.address || city),
      summary: String(place.summary || `${city}精选旅行点位，适合加入城市攻略。`),
    }));

  const finalPlaces = places.length ? places : amapPlaces;
  curatedPlaceCache.set(city, finalPlaces);
  return finalPlaces;
}

async function handleAmapPlaces(req, res) {
  const url = new URL(req.url, `http://localhost:${port}`);
  const city = url.searchParams.get("city") || "";
  try {
    const places = await getCuratedPlaces(city);
    sendJson(res, 200, { city, places });
  } catch (error) {
    console.error("高德地点查询失败", error.message || error);
    sendJson(res, 502, { error: "精选景点暂时无法加载，请稍后重试。" });
  }
}

async function handleDeepSeek(req, res) {
  if (!deepseekApiKey) {
    sendJson(res, 500, { error: "Missing DEEPSEEK_API_KEY. 请先在 .env.local 里设置 DeepSeek API 密钥。" });
    return;
  }

  try {
    const body = JSON.parse(await readBody(req));
    const messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter((message) => message && (message.role === "user" || message.role === "assistant") && typeof message.content === "string")
      .slice(-8)
      .map((message) => ({ role: message.role, content: message.content.slice(0, 12000) }));
    const places = (Array.isArray(body.places) ? body.places : []).slice(0, 30);
    const destination = inferDestination(messages);
    let weatherContext = "";

    try {
      weatherContext = await getAmapWeather(destination);
    } catch (error) {
      weatherContext = destination ? `已尝试查询 ${destination} 天气，但高德天气暂未返回可用结果：${error.message}` : "";
    }

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${deepseekApiKey}`,
      },
      body: JSON.stringify({
        model: deepseekModel,
        messages: [
          { role: "system", content: systemPrompt(places) },
          { role: "system", content: dateContext() },
          ...(weatherContext ? [{ role: "system", content: `【高德天气查询结果】\n目的地：${destination}\n${weatherContext}\n请在攻略中结合天气安排，并注明天气信息来自高德天气，出发前仍建议核验。` }] : []),
          ...messages,
        ],
        temperature: 0.7,
        stream: false,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      sendJson(res, response.status, { error: data.error?.message || "DeepSeek API request failed" });
      return;
    }

    sendJson(res, 200, { content: data.choices?.[0]?.message?.content || "" });
  } catch (error) {
    console.error("DeepSeek 请求失败", error.message || error);
    sendJson(res, error.statusCode || 502, { error: error.statusCode === 413 ? "请求内容过大。" : "攻略服务暂时不可用，请稍后重试。" });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://localhost:${port}`);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, safePath);

  try {
    const content = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'self' https://*.wikimedia.org https://loremflickr.com; img-src 'self' data: https://*.wikimedia.org https://loremflickr.com; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self https://api.deepseek.com https://restapi.amap.com'",
    });
    res.end(content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/deepseek") {
    await handleDeepSeek(req, res);
    return;
  }
  if (req.method === "GET" && req.url.startsWith("/api/amap/places")) {
    await handleAmapPlaces(req, res);
    return;
  }
  if (req.method === "GET" || req.method === "HEAD") {
    await serveStatic(req, res);
    return;
  }
  res.writeHead(405);
  res.end();
});

server.listen(port, "127.0.0.1", () => {
  console.log(`热游地图本地服务已启动: http://127.0.0.1:${port}`);
});

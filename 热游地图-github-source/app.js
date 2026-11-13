const bounds = {
  minLon: 102.85,
  maxLon: 104.75,
  minLat: 30.10,
  maxLat: 31.25,
};

const categoryMeta = {
  food: { label: "美食", short: "食", color: "#f2994a" },
  scene: { label: "景点", short: "景", color: "#43b883" },
  culture: { label: "人文", short: "文", color: "#5a8dee" },
  nature: { label: "自然", short: "野", color: "#2f9e8f" },
  photo: { label: "拍照", short: "拍", color: "#ff6f9f" },
  history: { label: "故事", short: "史", color: "#e25b63" },
};

const alwaysLabelIds = new Set([
  "taikooli",
  "panda-base",
  "dujiangyan",
  "qingcheng",
  "huanglongxi",
  "xiling",
]);

const guideData = [
  ["panda-base", "成都大熊猫繁育研究基地", "scene", 104.145, 30.735, "成华区熊猫大道", 99, 4.9, "亲子友好", "上午早到更容易看到熊猫活动，适合第一次来成都的人。", "成都最强城市名片之一，稳定出现在旅行必去清单。"],
  ["wuhou", "武侯祠", "history", 104.049, 30.645, "武侯区武侯祠大街", 94, 4.6, "三国文化", "适合与锦里一起安排，白天看展陈，傍晚转到锦里。", "三国文化、历史名人和经典游客路线叠加，长期保持高热度。"],
  ["jinli", "锦里古街", "photo", 104.048, 30.643, "武侯祠旁", 92, 4.4, "夜游小吃", "夜景和小吃氛围强，适合短暂停留和拍照。", "依托武侯祠和传统街区商业氛围，是成都夜游常见入口。"],
  ["kuanzhai", "宽窄巷子", "scene", 104.055, 30.671, "青羊区长顺街附近", 95, 4.4, "老街打卡", "适合快速感受老街氛围，建议控制在 1.5 小时内。", "传统街区更新、茶馆体验和游客讨论度让它一直热门。"],
  ["dufu", "杜甫草堂", "culture", 104.028, 30.66, "青羊区青华路", 91, 4.7, "安静园林", "园林感强，适合慢逛 2 小时，可串联浣花溪公园。", "诗歌文化、园林空间和成都城市气质结合，是人文核心点。"],
  ["jinsha", "金沙遗址博物馆", "history", 104.012, 30.683, "青羊区金沙遗址路", 89, 4.7, "古蜀文明", "适合半日游，重点看太阳神鸟、遗址馆和陈列馆。", "古蜀文明代表性遗址，适合承接历史热点故事模块。"],
  ["wenshu", "文殊院", "culture", 104.076, 30.682, "青羊区文殊院街", 88, 4.6, "茶馆小吃", "适合上午去，周边茶馆、小吃和老成都街巷可一起逛。", "寺院、茶文化和老城区烟火气，让这里本地和游客都爱。"],
  ["renmin-park", "人民公园", "culture", 104.057, 30.66, "青羊区祠堂街", 87, 4.5, "盖碗茶", "喝茶、看鹤鸣茶社和相亲角，适合体验成都生活方式。", "代表成都松弛生活方式，是城市气质型攻略必备点。"],
  ["qingyang", "青羊宫", "culture", 104.043, 30.666, "青羊区一环路西二段", 83, 4.4, "道教文化", "适合和杜甫草堂、文化公园一起做半日人文路线。", "道教文化与市区便利位置结合，适合作为小众稳定人文点。"],
  ["chunxi", "春熙路", "photo", 104.08, 30.657, "锦江区春熙路商圈", 96, 4.5, "市中心", "购物、拍照、吃饭都方便，适合做市中心第一站。", "商业核心、街拍内容和高频游客动线让春熙路持续热门。"],
  ["taikooli", "成都远洋太古里", "photo", 104.083, 30.653, "锦江区中纱帽街", 97, 4.7, "出片街区", "适合拍建筑、街区和潮流店铺，上午人更少。", "开放式街区、品牌密度和街拍传播，让太古里成为网红坐标。"],
  ["ifs", "成都 IFS", "photo", 104.081, 30.656, "锦江区红星路", 93, 4.5, "熊猫装置", "重点打卡爬墙熊猫，适合与春熙路和太古里一起逛。", "巨型熊猫装置有强识别度，是成都城市视觉符号之一。"],
  ["tianfu-square", "天府广场", "scene", 104.066, 30.657, "青羊区人民南路", 84, 4.2, "城市坐标", "适合作为城市中心坐标和地铁换乘节点。", "城市中心广场和交通枢纽属性，使它适合做路线锚点。"],
  ["chengdu-museum", "成都博物馆", "culture", 104.062, 30.659, "天府广场西侧", 86, 4.6, "雨天友好", "适合雨天、亲子和城市历史入门，建议提前关注预约。", "城市级博物馆承载成都历史叙事，适合做文化攻略。"],
  ["sichuan-museum", "四川博物院", "culture", 104.03, 30.662, "青羊区浣花南路", 82, 4.5, "省级博物馆", "适合与杜甫草堂串联，看巴蜀文化和张大千相关展陈。", "省级博物馆内容丰富，是成都人文路线的重要补充。"],
  ["wangjianglou", "望江楼公园", "culture", 104.091, 30.627, "武侯区望江路", 80, 4.4, "竹林江边", "适合看竹林和江边公园，节奏比热门商圈更安静。", "竹文化、公园空间和高校周边气质，让它适合慢游攻略。"],
  ["jiuyanqiao", "九眼桥", "photo", 104.083, 30.636, "锦江区九眼桥", 85, 4.3, "夜景酒吧", "夜景、酒吧街和河岸适合晚上去，注意控制停留节奏。", "夜生活、桥景和社交内容传播，让九眼桥成为夜游热点。"],
  ["dongjiao", "东郊记忆", "photo", 104.124, 30.665, "成华区建设南支路", 86, 4.5, "工业风", "工业风拍照、展演和市集适合年轻用户，建议下午到傍晚。", "老工业区更新为文创街区，是成都城市更新类热点。"],
  ["chengdu-zoo", "成都动物园", "scene", 104.103, 30.706, "成华区昭觉寺南路", 78, 4.2, "亲子半日", "适合亲子半日游，可与昭觉寺或熊猫基地做北线组合。", "老牌动物园和亲子属性让它有稳定本地客流。"],
  ["zhaojue", "昭觉寺", "culture", 104.106, 30.713, "成华区昭青路", 76, 4.3, "北部人文", "适合和动物园、熊猫基地一起安排。", "川西名刹之一，适合补足成都北部人文点位。"],
  ["happy-valley", "成都欢乐谷", "scene", 104.038, 30.724, "金牛区西华大道", 81, 4.3, "主题乐园", "适合年轻人和亲子全天游，节假日注意排队时间。", "主题乐园属性明确，适合承接亲子和年轻用户路线。"],
  ["natural-history", "成都自然博物馆", "culture", 104.121, 30.676, "成华区成华大道", 79, 4.5, "科普雨天", "适合亲子和雨天，恐龙、地质和自然科普内容较强。", "新型城市博物馆热度上升，适合做新晋文化点位。"],
  ["tianfu-art-park", "天府艺术公园", "photo", 104.004, 30.706, "金牛区华严路", 80, 4.5, "艺术公园", "适合拍建筑、公园和展馆，建议天气好时安排。", "公园、艺术馆和城市新空间结合，是近年较受关注的打卡点。"],
  ["dujiangyan", "都江堰景区", "history", 103.617, 31.001, "都江堰市公园路", 98, 4.8, "一日王牌", "建议安排一日游，可与青城山组合，节假日人流较大。", "世界级水利工程和成都周边王牌景区，是旅行延展路线核心。"],
  ["qingcheng", "青城山", "nature", 103.573, 30.905, "都江堰市青城山镇", 96, 4.7, "山林慢游", "适合一日或两日慢游，前山偏人文，后山偏自然徒步。", "青城天下幽认知度很高，是成都自然与道教文化代表。"],
  ["huanglongxi", "黄龙溪古镇", "scene", 104.041, 30.315, "双流区黄龙溪镇", 83, 4.2, "亲水古镇", "适合周末半日到一日，夏天更热闹。", "古镇、水街和成都近郊游属性，适合家庭和短途用户。"],
  ["luodai", "洛带古镇", "culture", 104.324, 30.641, "龙泉驿区洛带镇", 82, 4.3, "客家古镇", "适合看客家文化、古镇街区和周边小吃。", "客家文化标签鲜明，是成都东部近郊古镇代表。"],
  ["anren", "安仁古镇", "history", 103.623, 30.508, "大邑县安仁镇", 81, 4.4, "民国公馆", "适合看民国建筑、公馆和博物馆群，建议一日游。", "公馆建筑和博物馆聚落形成独特历史叙事。"],
  ["jiezi", "街子古镇", "scene", 103.629, 30.822, "崇州市街子镇", 79, 4.2, "周末慢逛", "适合周末慢逛，可与青城山后山方向组合。", "川西古镇、山水和避暑属性让它成为成都周边游常见选择。"],
  ["xiling", "西岭雪山", "nature", 103.178, 30.685, "大邑县西岭镇", 84, 4.4, "雪山避暑", "冬季滑雪、夏季避暑，建议整日或两日安排。", "雪山、滑雪和避暑属性稀缺，是成都周边自然类高识别度景区。"],
];

function commonsImage(fileName) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
}

function themedImage(query) {
  return `https://loremflickr.com/900/650/${encodeURIComponent(query)}`;
}

const imageMap = {
  "panda-base": commonsImage("Chengdu panda breeding.jpg"),
  wuhou: commonsImage("Pavilion - Wuhou Shrine - Chengdu, China - DSC05444.jpg"),
  jinli: commonsImage("China - Chengdu 27 - Jinli market street (140903248).jpg"),
  kuanzhai: themedImage("chengdu,kuanzhai,alley"),
  dufu: commonsImage("DuFuHouse.jpg"),
  jinsha: themedImage("chengdu,jinsha,museum"),
  wenshu: commonsImage("Great hall - Wenshu Monastery - Chengdu, China - DSC05105.jpg"),
  "renmin-park": commonsImage("People's Park, Chengdu, Sichuan, China, 610041 - panoramio.jpg"),
  qingyang: themedImage("chengdu,temple,china"),
  chunxi: themedImage("chengdu,chunxi,road"),
  taikooli: commonsImage("XinLu in Chengdu Sino-Ocean Tai Koo Li 14 09 17 799000.jpeg"),
  ifs: commonsImage("The panda at IFS Chengdu.jpg"),
  "tianfu-square": commonsImage("Tianfu-Square-2.JPG"),
  "chengdu-museum": themedImage("chengdu,museum,architecture"),
  "sichuan-museum": themedImage("sichuan,museum,chengdu"),
  wangjianglou: themedImage("chengdu,park,bamboo"),
  jiuyanqiao: themedImage("chengdu,bridge,night"),
  dongjiao: themedImage("chengdu,industrial,park"),
  "chengdu-zoo": themedImage("chengdu,zoo"),
  zhaojue: themedImage("chengdu,temple"),
  "happy-valley": themedImage("chengdu,amusement,park"),
  "natural-history": themedImage("chengdu,natural,museum"),
  "tianfu-art-park": themedImage("chengdu,art,park"),
  dujiangyan: commonsImage("Qingchengshan-Dujiangyan National Park.jpg"),
  qingcheng: commonsImage("Qingchengshan-Dujiangyan National Park.jpg"),
  huanglongxi: themedImage("huanglongxi,ancient,town"),
  luodai: themedImage("chengdu,ancient,town"),
  anren: themedImage("anren,ancient,town"),
  jiezi: themedImage("chengdu,old,town"),
  xiling: themedImage("xiling,snow,mountain"),
};

const guides = guideData.map(([id, title, category, lon, lat, address, heat, score, tag, guide, story]) => {
  const x = 5 + ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 90;
  const y = 92 - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 84;
  const meta = categoryMeta[category];
  return {
    id,
    title,
    category,
    label: meta.label,
    short: meta.short,
    color: meta.color,
    heat,
    score,
    tag,
    x: Math.max(3, Math.min(97, x)),
    y: Math.max(5, Math.min(92, y)),
    lon,
    lat,
    address,
    guide,
    story,
    image: imageMap[id] || themedImage(`chengdu,${title}`),
    ratings: ["推荐 4.7", "交通 4.4", "出片 4.5", "拥挤 3.8"],
  };
});

let activeId = null;
let activeFilter = "all";
let zoomLevel = 0;
let activeCity = "北京";
let compactCityName = activeCity;
const cityPoiCache = new Map();
let cityPoiLoading = false;

const guideList = document.querySelector("#guideList");
const markers = document.querySelector("#markers");
const detailPanel = document.querySelector("#detailPanel");
const detailBackdrop = document.querySelector("#detailBackdrop");
const detailFloatingClose = document.querySelector("#detailFloatingClose");
const commentBackdrop = document.querySelector("#commentBackdrop");
const commentSheet = document.querySelector("#commentSheet");
const commentTitle = document.querySelector("#commentTitle");
const commentListPanel = document.querySelector("#commentListPanel");
const commentInput = document.querySelector("#commentInput");
const commentSend = document.querySelector("#commentSend");
const commentClose = document.querySelector("#commentClose");
const mapEl = document.querySelector(".chengdu-map");
const scenePreview = document.querySelector("#scenePreview");
const feedDrawer = document.querySelector("#feedDrawer");
const openFeed = document.querySelector("#openFeed");
const closeFeed = document.querySelector("#closeFeed");
const miniRow = document.querySelector("#miniRow");
const feedMasonry = document.querySelector("#feedMasonry");
const searchInput = document.querySelector("#searchInput");
const activeCityBadge = document.querySelector("#activeCityBadge");
const noMapGrid = document.querySelector("#noMapGrid");
const citySwitcher = document.querySelector("#citySwitcher");
const cityList = document.querySelector("#cityList");
const categoryDropdown = document.querySelector("#categoryDropdown");
const categoryTrigger = document.querySelector("#categoryTrigger");
const categoryLabel = document.querySelector("#categoryLabel");
const tripQuestion = document.querySelector("#tripQuestion");
const generatePlan = document.querySelector("#generatePlan");
const planResult = document.querySelector("#planResult");
const chatWelcome = document.querySelector("#chatWelcome");
const newChatButton = document.querySelector("#newChatButton");
const tripFrom = document.querySelector("#tripFrom");
const tripTo = document.querySelector("#tripTo");
const tripDate = document.querySelector("#tripDate");
const tripPeople = document.querySelector("#tripPeople");
const tripDays = document.querySelector("#tripDays");
const chatMessages = [];
const favoritePlaceKeys = new Set();
const FAVORITES_STORAGE_KEY = "hotTravel.savedPlaces";
let savedFavoritePlaces = [];
let cityCompactMode = false;

const cityOrder = [
  "北京", "天津", "重庆", "上海", "石家庄", "太原", "呼和浩特", "沈阳", "长春", "哈尔滨",
  "南京", "杭州", "合肥", "福州", "南昌", "济南", "郑州", "武汉", "长沙", "广州",
  "南宁", "海口", "成都", "贵阳", "昆明", "拉萨", "西安", "兰州", "西宁", "银川",
  "乌鲁木齐", "香港", "澳门", "台北",
];

const citySearchTerms = {
  澳门: "aomen am",
  北京: "beijing bj",
  长春: "changchun cc",
  长沙: "changsha cs",
  成都: "chengdu cd",
  重庆: "chongqing cq",
  福州: "fuzhou fz",
  广州: "guangzhou gz",
  贵阳: "guiyang gy",
  哈尔滨: "haerbin heb",
  海口: "haikou hk",
  杭州: "hangzhou hz",
  合肥: "hefei hf",
  呼和浩特: "huhehaote hhht",
  济南: "jinan jn",
  昆明: "kunming km",
  拉萨: "lasa ls",
  兰州: "lanzhou lz",
  南昌: "nanchang nc",
  南京: "nanjing nj",
  南宁: "nanning nn",
  上海: "shanghai sh",
  沈阳: "shenyang sy",
  石家庄: "shijiazhuang sjz",
  台北: "taibei tb",
  太原: "taiyuan ty",
  天津: "tianjin tj",
  武汉: "wuhan wh",
  乌鲁木齐: "wulumuqi wlmq",
  西安: "xian xa",
  香港: "xianggang xg",
  西宁: "xining xn",
  银川: "yinchuan yc",
  郑州: "zhengzhou zz",
};

const cityAliasMap = {
  北京市: "北京",
  天津市: "天津",
  上海市: "上海",
  重庆市: "重庆",
  河北: "石家庄",
  河北省: "石家庄",
  山西: "太原",
  山西省: "太原",
  内蒙古: "呼和浩特",
  内蒙古自治区: "呼和浩特",
  辽宁: "沈阳",
  辽宁省: "沈阳",
  吉林: "长春",
  吉林省: "长春",
  黑龙江: "哈尔滨",
  黑龙江省: "哈尔滨",
  江苏: "南京",
  江苏省: "南京",
  浙江: "杭州",
  浙江省: "杭州",
  安徽: "合肥",
  安徽省: "合肥",
  福建: "福州",
  福建省: "福州",
  江西: "南昌",
  江西省: "南昌",
  山东: "济南",
  山东省: "济南",
  河南: "郑州",
  河南省: "郑州",
  湖北: "武汉",
  湖北省: "武汉",
  湖南: "长沙",
  湖南省: "长沙",
  广东: "广州",
  广东省: "广州",
  广西: "南宁",
  广西壮族自治区: "南宁",
  海南: "海口",
  海南省: "海口",
  四川: "成都",
  四川省: "成都",
  贵州: "贵阳",
  贵州省: "贵阳",
  云南: "昆明",
  云南省: "昆明",
  西藏: "拉萨",
  西藏自治区: "拉萨",
  陕西: "西安",
  陕西省: "西安",
  甘肃: "兰州",
  甘肃省: "兰州",
  青海: "西宁",
  青海省: "西宁",
  宁夏: "银川",
  宁夏回族自治区: "银川",
  新疆: "乌鲁木齐",
  新疆维吾尔自治区: "乌鲁木齐",
  香港特别行政区: "香港",
  澳门特别行政区: "澳门",
  台湾: "台北",
  台湾省: "台北",
};

const cityPresets = {
  成都: {
    intro: "先从成都开始，后续可扩展为全国城市热点旅行地图。",
    places: [],
  },
  北京: {
    intro: "皇城中轴线、胡同漫游和博物馆路线，适合历史文化与城市地标打卡。",
    places: [
      ["故宫博物院", "皇城文化", "提前预约，适合安排 3-4 小时深度游。"],
      ["天安门广场", "城市地标", "升旗、广场与中轴线入口，注意预约和安检时间。"],
      ["颐和园", "皇家园林", "适合半日慢逛，天气好时湖边体验更舒服。"],
      ["南锣鼓巷", "胡同漫游", "适合傍晚逛吃，商业化较强，注意避开高峰。"],
    ],
  },
  上海: {
    intro: "外滩城市天际线、海派街区和新消费路线，适合都市拍照与夜景。",
    places: [
      ["外滩", "夜景地标", "黄浦江两岸灯光强，傍晚到夜间最出片。"],
      ["武康路", "街区拍照", "适合 Citywalk，咖啡、老建筑和街拍密度高。"],
      ["上海迪士尼", "主题乐园", "建议单独安排一天，热门项目提前规划。"],
      ["豫园", "传统街区", "适合和城隍庙、南京东路串联。"],
    ],
  },
  西安: {
    intro: "古都历史、大唐夜景和碳水美食路线，适合文化游和夜游。",
    places: [
      ["秦始皇兵马俑", "历史王牌", "建议请讲解或租讲解器，适合半日到一日。"],
      ["大唐不夜城", "夜游打卡", "夜间氛围强，节假日人流大。"],
      ["西安城墙", "城市地标", "骑行体验好，傍晚光线更适合拍照。"],
      ["回民街", "美食街区", "适合尝小吃，也可扩展到洒金桥找本地口味。"],
    ],
  },
  杭州: {
    intro: "西湖、灵隐和江南慢生活路线，适合自然风光与轻松度假。",
    places: [
      ["西湖", "城市名片", "建议分片区游玩，苏堤、断桥、雷峰塔可按体力选择。"],
      ["灵隐寺", "人文祈福", "上午去更舒服，注意预约与人流。"],
      ["龙井村", "茶山慢游", "适合天气好时安排，拍照和喝茶都顺路。"],
      ["京杭大运河", "夜游散步", "适合傍晚到夜间，路线轻松。"],
    ],
  },
  重庆: {
    intro: "山城夜景、立体交通和火锅江湖路线，适合城市探索与夜游。",
    places: [
      ["洪崖洞", "夜景地标", "适合远观拍照，内部商业化较强。"],
      ["解放碑", "市中心", "适合作为住宿和交通锚点。"],
      ["李子坝", "轻轨穿楼", "打卡效率高，可与鹅岭二厂串联。"],
      ["磁器口古镇", "老街小吃", "节假日拥挤，建议错峰。"],
    ],
  },
};

function genericCityPreset(city) {
  return {
    intro: `${city}旅行入口已开放，正在接入高德热门景点数据，适合先做城市攻略和路线规划。`,
    places: [
      [`${city}城市地标`, "地标打卡", "适合第一次到访，先建立城市印象，再串联周边路线。"],
      [`${city}历史文化`, "人文路线", "适合博物馆、老街、古建和城市故事型玩法。"],
      [`${city}代表美食`, "美食探索", "适合按商圈或老街区安排午餐、晚餐和夜宵。"],
      [`${city}夜游路线`, "夜景休闲", "适合傍晚后安排，结合天气、交通和住宿位置优化。"],
    ],
  };
}

function cityPreset(city) {
  if (window.cityHotspotData?.[city]) {
    return {
      intro: `${city}已接入 30 个精选热门景点，覆盖经典景点、人文地标、自然景观和网红打卡点。`,
      places: window.cityHotspotData[city],
    };
  }
  return cityPresets[city] || genericCityPreset(city);
}

function normalizeCuratedPlace(place, index) {
  const tag = place.tag || "精选景点";
  const summary = place.summary || place.guide || "";
  return [
    place.title || place.name || `${activeCity}景点 ${index + 1}`,
    tag,
    summary || `${activeCity}精选旅行点位，适合加入城市攻略，出发前建议核验开放时间与预约规则。`,
  ];
}

async function loadCityPlaces(city) {
  if (city === "成都" || window.cityHotspotData?.[city] || cityPoiCache.has(city)) return;
  cityPoiLoading = true;
  renderList();
  try {
    const response = await fetch(`/api/amap/places?city=${encodeURIComponent(city)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "地点加载失败");
    cityPoiCache.set(city, (data.places || []).map(normalizeCuratedPlace));
  } catch (error) {
    cityPoiCache.set(city, cityPreset(city).places);
    console.warn(`Failed to load ${city} places`, error);
  } finally {
    cityPoiLoading = false;
    renderList();
  }
}

function cityMatches(city, query) {
  if (!query) return true;
  const raw = query.trim();
  const normalized = normalizeCityQuery(query);
  return city.includes(raw) ||
    city.includes(normalized) ||
    (citySearchTerms[city] || "").includes(normalized.toLowerCase()) ||
    cityAliasMap[raw] === city ||
    cityAliasMap[normalized] === city;
}

function matchedCityFromSearch(query) {
  const raw = query.trim();
  const normalized = normalizeCityQuery(query);
  if (!normalized) return "";
  return cityAliasMap[raw] ||
    cityAliasMap[normalized] ||
    cityOrder.find((city) => city === raw || city === normalized) ||
    cityOrder.find((city) => (citySearchTerms[city] || "").split(/\s+/).includes(normalized.toLowerCase())) ||
    cityOrder.find((city) => cityMatches(city, query)) ||
    "";
}

function normalizeCityQuery(query) {
  return query
    .trim()
    .replace(/(省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区)$/u, "")
    .toLowerCase();
}

function contentSearchQuery() {
  const query = searchInput.value.trim();
  const matchedCity = matchedCityFromSearch(query);
  return matchedCity === activeCity ? "" : query;
}

function renderCityMenu() {
  if (!cityList) return;
  const query = searchInput?.value || "";
  const directCity = cityCompactMode ? activeCity : matchedCityFromSearch(query);
  if (directCity && cityCompactMode) {
    cityList.innerHTML = `
      <button class="city-back-button" type="button" data-city-back>&lt; 返回</button>
      <button class="city-option city-current-option is-active" type="button" data-city="${directCity}">${directCity}</button>
    `;
    citySwitcher?.classList.remove("is-empty");
    citySwitcher?.classList.add("is-searching");
    return;
  }
  const resolvedCity = cityOrder.includes(activeCity)
    ? activeCity
    : matchedCityFromSearch(query) || compactCityName || cityOrder[0];
  if (cityCompactMode) {
    activeCity = resolvedCity;
    compactCityName = resolvedCity;
  }
  if (cityCompactMode) {
    const visibleCity = compactCityName || activeCity || matchedCityFromSearch(query) || cityOrder[0];
    citySwitcher?.removeAttribute("data-current-city");
    cityList.innerHTML = "";
    const back = document.createElement("button");
    back.className = "city-back-button";
    back.type = "button";
    back.dataset.cityBack = "";
    back.textContent = "< 返回";
    const current = document.createElement("button");
    current.className = "city-option city-current-option is-active";
    current.type = "button";
    current.dataset.city = visibleCity;
    current.textContent = visibleCity;
    cityList.append(back, current);
    citySwitcher?.classList.remove("is-empty");
    citySwitcher?.classList.add("is-searching");
    return;
  }
  citySwitcher?.removeAttribute("data-current-city");
  const matchedCities = cityCompactMode ? [compactCityName].filter(Boolean) : cityOrder.filter((city) => cityMatches(city, query));
  const backButton = cityCompactMode || query.trim()
    ? '<button class="city-back-button" type="button" data-city-back>&lt; 返回</button>'
    : "";
  const cityButtons = matchedCities.map((city) => `
    <button class="city-option ${city === activeCity ? "is-active" : ""}" type="button" data-city="${city}">${city}</button>
  `).join("");
  cityList.innerHTML = `${backButton}${cityButtons}`;
  citySwitcher?.classList.toggle("is-empty", !backButton && !cityButtons);
  citySwitcher?.classList.toggle("is-searching", Boolean(backButton));
  syncCityActiveButton();
}

function syncCityActiveButton() {
  if (!cityList) return;
  cityList.querySelectorAll(".city-option").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.city === activeCity);
  });
}

function syncActiveCityBadge() {
  if (!activeCityBadge) return;
  activeCityBadge.textContent = `当前 ${activeCity}`;
  activeCityBadge.title = `当前城市：${activeCity}`;
}

function setCity(city) {
  activeCity = cityOrder.includes(city) ? city : matchedCityFromSearch(city || "") || cityOrder[0];
  compactCityName = activeCity;
  cityCompactMode = true;
  activeId = null;
  if (searchInput && matchedCityFromSearch(searchInput.value) === activeCity) {
    searchInput.value = "";
  }
  closeDetail();
  syncActiveCityBadge();
  renderCityMenu();
  renderList();
  renderMarkers();
  loadCityPlaces(activeCity);
}

function applyZoom() {
  mapEl.dataset.zoom = String(zoomLevel);
  if (zoomLevel < 2 && activeId) {
    closeDetail();
  }
}

function filteredGuides() {
  const query = contentSearchQuery();
  return guides.filter((guide) => {
    const inFilter = activeFilter === "all" || guide.category === activeFilter;
    const inSearch =
      !query ||
      guide.title.includes(query) ||
      guide.label.includes(query) ||
      guide.address.includes(query) ||
      guide.tag.includes(query);
    return inFilter && inSearch;
  });
}

function guideCard(guide) {
  const activeClass = guide.id === activeId ? " is-active" : "";
  return `
    <article class="guide-card${activeClass}" data-id="${guide.id}">
      <div class="guide-cover" style="--cover-color:${guide.color}; --cover-image:url('${guide.image}')">
        <span>${guide.tag}</span>
      </div>
      <div class="guide-card-body">
        <h2>${guide.title}</h2>
        <div class="meta-line">
          <span><i class="tag-dot" style="background:${guide.color}"></i>${guide.label}</span>
          <span>热度 ${guide.heat}</span>
        </div>
      </div>
    </article>
  `;
}

function miniCard(guide) {
  return `
    <button class="mini-card" data-id="${guide.id}" style="--card-color:${guide.color}">
      <span class="mini-tag">${guide.tag}</span>
      <strong>${guide.title}</strong>
      <span>${guide.label} · ${guide.score} 分 · 热度 ${guide.heat}</span>
    </button>
  `;
}

function filteredCityPlaces() {
  const query = contentSearchQuery();
  const places = cityPoiCache.get(activeCity) || cityPreset(activeCity).places;
  return places.filter(([title, tag, detail]) => {
    const summary = cityPlaceSummary(title, tag, detail);
    return !query || title.includes(query) || tag.includes(query) || summary.includes(query);
  });
}

function cityPlaceSummary(title, tag, detail) {
  const displayTag = cityDisplayTag(tag);
  if (typeof detail === "number") {
    return `${displayTag}推荐，适合加入${activeCity}旅行路线。出发前建议核验开放时间、预约和交通。`;
  }
  return detail || `${title}是${activeCity}值得关注的${displayTag}，适合加入旅行攻略。`;
}

function cityPlaceIntro(title, tag, detail) {
  const displayTag = cityDisplayTag(tag);
  const rankText = typeof detail === "number" ? `在${activeCity}精选景点中热度靠前，适合作为行程里的第 ${detail} 个重点备选。` : "";
  const toneMap = {
    景点: "适合第一次到访时建立城市印象，也适合和周边商圈、老街或公园顺路串联。",
    故事: "适合喜欢城市历史、建筑细节和地方故事的用户，游览时建议预留讲解或慢逛时间。",
    拍照: "适合拍照打卡、短暂停留和制作旅行内容，建议选择上午或傍晚光线更柔和的时段。",
    人文: "适合博物馆、老街、寺庙和文化体验类路线，雨天或想放慢节奏时也比较友好。",
    自然: "适合想看山水、公园和户外风景的用户，出发前建议确认天气和交通时间。",
    美食: "适合安排在午餐、晚餐或夜宵节点，建议结合附近景点做半日或夜游路线。",
    玩乐: "适合亲子、朋友出行或轻松娱乐型路线，节假日建议提前确认排队和预约情况。",
    休闲: "适合轻松散步、咖啡小坐和低强度 Citywalk，可以作为行程中的缓冲点。",
  };
  return `${title}是${activeCity}值得关注的${displayTag}类目的精选点位。${rankText}${toneMap[displayTag] || toneMap.景点}`;
}

function cityDisplayTag(tag = "") {
  if (tag.includes("网红")) return "拍照";
  if (tag.includes("文博") || tag.includes("博物")) return "人文";
  if (tag.includes("古迹") || tag.includes("地标")) return "故事";
  if (tag.includes("自然")) return "自然";
  if (tag.includes("美食")) return "美食";
  if (tag.includes("娱乐")) return "玩乐";
  if (tag.includes("都市") || tag.includes("休闲")) return "休闲";
  return "景点";
}

function cityTagColor(label) {
  const colors = {
    景点: categoryMeta.scene.color,
    故事: categoryMeta.history.color,
    拍照: categoryMeta.photo.color,
    人文: categoryMeta.culture.color,
    自然: categoryMeta.nature.color,
    美食: categoryMeta.food.color,
    玩乐: "#8a63d2",
    休闲: "#5a8dee",
  };
  return colors[label] || categoryMeta.scene.color;
}

function stableHeat(city, title, detail) {
  if (typeof detail === "number") {
    const curve = [100, 98, 97, 95, 94, 92, 91, 90, 88, 87, 86, 84, 83, 82, 81, 80, 78, 77, 76, 75, 74, 73, 72, 71, 70, 70, 70, 70, 70, 70];
    return curve[Math.min(detail - 1, curve.length - 1)];
  }
  return 88;
}

function cityPlaceCard([title, tag, detail]) {
  const displayTag = cityDisplayTag(tag);
  const summary = cityPlaceSummary(title, tag, detail);
  const heat = stableHeat(activeCity, title, detail);
  const color = cityTagColor(displayTag);
  const image = themedImage(`${activeCity},${title},travel,china`);
  return `
    <article class="guide-card city-guide-card" data-city-place="true" data-title="${escapeHtml(title)}" data-tag="${escapeHtml(tag)}" data-detail="${escapeHtml(detail)}">
      <div class="guide-cover" style="--cover-color:${color}; --cover-image:url('${image}')">
        <span>${displayTag}</span>
      </div>
      <div class="guide-card-body">
        <h2>${title}</h2>
        <div class="meta-line">
          <span><i class="tag-dot" style="background:${color}"></i>${displayTag}</span>
          <span>热度 ${heat}</span>
        </div>
        <p class="city-card-summary">${summary}</p>
      </div>
    </article>
  `;
}

function openCityPlaceDetail(title, tag, detail) {
  const displayTag = cityDisplayTag(tag);
  const summary = cityPlaceSummary(title, tag, detail);
  const intro = cityPlaceIntro(title, tag, detail);
  const heat = stableHeat(activeCity, title, detail);
  const color = cityTagColor(displayTag);
  const image = themedImage(`${activeCity},${title},travel,china`);
  activeId = null;
  detailPanel.innerHTML = `
    <div class="detail-top-actions">
      <button class="detail-close" type="button" data-detail-close aria-label="关闭详情">×</button>
    </div>
    <div class="detail-cover" style="--cover-color:${color}; --cover-image:url('${image}')">
      <span>${displayTag}</span>
    </div>
    <div class="detail-title">
      <div>
        <h1>${title}</h1>
        <p class="meta-line"><span>${activeCity}</span><span>热度 ${heat}</span></p>
      </div>
      <div class="score">${heat}</div>
    </div>
    <div class="coord-line">当前城市：${activeCity} · 类型：${displayTag}</div>
    <div class="detail-actions">
      <button>收藏</button>
      <button class="navigate">加入攻略</button>
      <button>评论</button>
      <button>分享</button>
    </div>
    <section class="detail-section">
      <h2>景点简介</h2>
      <p>${intro}</p>
    </section>
    <section class="detail-section">
      <h2>怎么玩更顺</h2>
      <p>${summary}</p>
    </section>
    <section class="detail-section">
      <h2>出行提醒</h2>
      <p>出发前建议核验开放时间、门票预约、临时闭馆和交通方式。热门点位优先选择上午或工作日，拍照类点位可避开正午强光。</p>
    </section>
    ${inlineComments(title)}
  `;
  const favoriteButton = detailPanel.querySelector(".detail-actions button:first-child");
  if (favoriteButton) {
    favoriteButton.textContent = "收藏";
    favoriteButton.dataset.favoritePlace = title;
    favoriteButton.dataset.favoriteCity = activeCity;
    favoriteButton.dataset.favoriteTag = displayTag;
    favoriteButton.dataset.favoriteHeat = String(heat);
    syncFavoriteButton(favoriteButton, favoritePlaceKeys.has(favoriteKey(activeCity, title)));
  }
  const commentButton = detailPanel.querySelector(".detail-actions button:nth-child(3)");
  if (commentButton) {
    commentButton.textContent = "评论";
    commentButton.dataset.openComments = title;
  }
  const planButton = detailPanel.querySelector(".navigate");
  if (planButton) {
    planButton.textContent = "加入攻略";
    planButton.dataset.addToPlan = title;
  }
  detailPanel.classList.add("is-open");
  detailBackdrop.classList.add("is-open");
  detailFloatingClose?.classList.add("is-open");
  mapEl.classList.remove("is-focused");
  scenePreview.classList.remove("is-open");
  scenePreview.innerHTML = "";
}

function renderList() {
  syncActiveCityBadge();
  syncCityActiveButton();
  const items = filteredGuides();
  if (activeCity === "成都") {
    guideList.innerHTML = items.map(guideCard).join("");
    if (noMapGrid) noMapGrid.innerHTML = items.map(guideCard).join("");
  } else {
    const cityItems = filteredCityPlaces();
    const cityHtml = cityPoiLoading
      ? `<div class="city-empty">正在加载 ${activeCity} 的 30 个热门景点...</div>`
      : cityItems.length
      ? cityItems.map(cityPlaceCard).join("")
      : `<div class="city-empty">没有找到相关地点，可以换个关键词，或去“攻略”里直接问 ${activeCity} 怎么玩。</div>`;
    guideList.innerHTML = cityHtml;
    if (noMapGrid) noMapGrid.innerHTML = cityHtml;
  }
  feedMasonry.innerHTML = guides.map(guideCard).join("");
  miniRow.innerHTML = guides
    .filter((guide) => ["photo", "food", "culture", "nature"].includes(guide.category))
    .slice(0, 8)
    .map(miniCard)
    .join("");
}

function renderMarkers() {
  markers.innerHTML = filteredGuides()
    .map(
      (guide) => `
        <button class="marker ${guide.id === activeId ? "is-active" : ""} ${alwaysLabelIds.has(guide.id) ? "has-label" : ""}" data-id="${guide.id}" style="left:${guide.x}%; top:${guide.y}%; --marker-color:${guide.color}" title="${guide.title}">
          <span class="marker-pin"><span class="marker-number">${guide.short}</span></span>
          <span class="marker-label">${guide.title}</span>
        </button>
      `
    )
    .join("");
}

function renderDetail() {
  if (!activeId) {
    detailPanel.innerHTML = "";
    detailPanel.classList.remove("is-open");
    detailBackdrop.classList.remove("is-open");
    mapEl.classList.remove("is-focused");
    scenePreview.classList.remove("is-open");
    scenePreview.innerHTML = "";
    return;
  }

  const guide = guides.find((item) => item.id === activeId) || guides[0];
  mapEl.style.setProperty("--focus-x", `${guide.x}%`);
  mapEl.style.setProperty("--focus-y", `${guide.y}%`);
  mapEl.classList.add("is-focused");
  renderScene(guide);
  detailPanel.innerHTML = `
    <div class="detail-top-actions">
      <button class="detail-close" type="button" data-detail-close aria-label="关闭详情">×</button>
    </div>
    <div class="detail-cover" style="--cover-color:${guide.color}; --cover-image:url('${guide.image}')">
      <span>${guide.tag}</span>
    </div>
    <div class="detail-title">
      <div>
        <h1>${guide.title}</h1>
        <p class="meta-line"><span>${guide.address}</span><span>热度 ${guide.heat}</span></p>
      </div>
      <div class="score">${guide.score}</div>
    </div>
    <div class="coord-line">经纬度：${guide.lat.toFixed(3)}, ${guide.lon.toFixed(3)}</div>
    <div class="detail-actions">
      <button>收藏攻略</button>
      <button class="navigate">导航</button>
      <button>评论</button>
      <button>分享卡片</button>
    </div>
    <section class="detail-section">
      <h2>怎么玩更顺</h2>
      <p>${guide.guide}</p>
    </section>
    <section class="detail-section">
      <h2>为什么火了</h2>
      <p>${guide.story}</p>
    </section>
    <section class="detail-section">
      <h2>女生友好评分</h2>
      <div class="rating-grid">
        ${guide.ratings.map((rating) => {
          const parts = rating.split(" ");
          return `<div><strong>${parts[1]}</strong><span>${parts[0]}</span></div>`;
        }).join("")}
      </div>
    </section>
    <section class="detail-section">
      <h2>出行提醒</h2>
      <p>出发前建议核验开放时间、门票预约、临时闭馆和交通方式。热门点位优先选择上午或工作日，拍照类点位可避开正午强光。</p>
    </section>
    ${inlineComments(guide.title)}
  `;
  const favoriteButton = detailPanel.querySelector(".detail-actions button:first-child");
  if (favoriteButton) {
    favoriteButton.textContent = "收藏";
    favoriteButton.dataset.favoritePlace = guide.title;
    favoriteButton.dataset.favoriteCity = "成都";
    favoriteButton.dataset.favoriteTag = guide.label;
    favoriteButton.dataset.favoriteHeat = String(guide.heat);
    syncFavoriteButton(favoriteButton, favoritePlaceKeys.has(favoriteKey("成都", guide.title)));
  }
  const commentButton = detailPanel.querySelector(".detail-actions button:nth-child(3)");
  if (commentButton) {
    commentButton.textContent = "评论";
    commentButton.dataset.openComments = guide.title;
  }
  const planButton = detailPanel.querySelector(".navigate");
  if (planButton) {
    planButton.textContent = "加入攻略";
    planButton.dataset.addToPlan = guide.title;
  }
  detailPanel.classList.add("is-open");
  detailBackdrop.classList.add("is-open");
  detailFloatingClose?.classList.add("is-open");
}

function sceneClass(category) {
  if (category === "nature") return "scene-nature";
  if (category === "photo") return "scene-photo";
  if (category === "history") return "scene-history";
  if (category === "culture") return "scene-culture";
  if (category === "food") return "scene-food";
  return "scene-city";
}

function renderScene(guide) {
  scenePreview.innerHTML = `
    <div class="scene-card ${sceneClass(guide.category)}" style="--scene-color:${guide.color}">
      <button class="scene-close" type="button" aria-label="关闭场景">×</button>
      <div class="scene-world">
        <div class="scene-base"></div>
        <div class="scene-building building-a"></div>
        <div class="scene-building building-b"></div>
        <div class="scene-building building-c"></div>
        <div class="scene-object object-a"></div>
        <div class="scene-object object-b"></div>
      </div>
      <div class="scene-copy">
        <span>${guide.tag}</span>
        <strong>${guide.title}</strong>
        <p>${guide.address}</p>
      </div>
    </div>
  `;
  scenePreview.classList.add("is-open");
}

function syncFilterButtons() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === activeFilter);
  });
  const activeButton = document.querySelector(`.category-option[data-filter="${activeFilter}"]`);
  if (activeButton && categoryLabel) {
    categoryLabel.textContent = activeButton.textContent;
  }
}

function setFilter(filter) {
  activeFilter = filter;
  syncFilterButtons();
  renderList();
  renderMarkers();
}

function setActive(id) {
  zoomLevel = 3;
  applyZoom();
  activeId = id;
  feedDrawer.classList.remove("is-open");
  renderList();
  renderMarkers();
  renderDetail();
}

function switchView(viewName) {
  document.querySelectorAll(".tab").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === viewName);
  });
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("is-visible"));
  document.querySelector(`#view-${viewName}`)?.classList.add("is-visible");
  document.body.dataset.activeView = viewName;
}

function addPlaceToPlanner(placeName) {
  const place = (placeName || "").trim();
  if (!place) return;
  const basePrompt = `我想去${place}，帮我把它加入${activeCity}旅行攻略里。`;
  const currentPrompt = tripQuestion?.value.trim() || "";
  if (tripQuestion) {
    tripQuestion.value = currentPrompt ? `${currentPrompt}，还想去${place}` : basePrompt;
  }
  if (tripTo && !tripTo.value.trim()) {
    tripTo.value = activeCity;
  }
  forceCloseDetail();
  switchView("feed");
  window.setTimeout(() => {
    tripQuestion?.focus();
  }, 0);
}

function favoriteKey(city, title) {
  return `${city}-${title}`;
}

function loadSavedFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    savedFavoritePlaces = raw ? JSON.parse(raw) : [];
  } catch (error) {
    savedFavoritePlaces = [];
  }
  favoritePlaceKeys.clear();
  savedFavoritePlaces.forEach((item) => {
    if (item?.key) favoritePlaceKeys.add(item.key);
  });
}

function saveFavorites() {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(savedFavoritePlaces));
}

function favoriteCard(item) {
  return `
    <article class="profile-note-card profile-favorite-card" data-favorite-key="${escapeHtml(item.key)}">
      <div class="note-cover" style="background-image:url('${themedImage(`${item.city},${item.title},travel,china`)}')"><span>收藏地点</span></div>
      <h2>${escapeHtml(item.title)}</h2>
      <p>地图页收藏 · ${escapeHtml(item.city)}的${escapeHtml(item.tag)}点位，已加入你的收藏列表，后续可用于生成攻略。</p>
      <div><span>${escapeHtml(item.tag)}</span><span>热度 ${escapeHtml(item.heat)}</span></div>
    </article>
  `;
}

function renderSavedFavorites() {
  const favoritesPanel = document.querySelector('[data-profile-panel="favorites"]');
  if (!favoritesPanel) return;
  favoritesPanel.querySelectorAll(".profile-favorite-card").forEach((card) => card.remove());
  if (!savedFavoritePlaces.length) return;
  favoritesPanel.insertAdjacentHTML("afterbegin", savedFavoritePlaces.map(favoriteCard).join(""));
}

function syncFavoriteButton(button, isSaved) {
  if (!button) return;
  button.textContent = isSaved ? "已收藏" : "收藏";
  button.classList.toggle("is-saved", isSaved);
}

function addPlaceToFavorites(button) {
  const title = button.dataset.favoritePlace || "";
  const city = button.dataset.favoriteCity || activeCity;
  const tag = button.dataset.favoriteTag || "景点";
  const heat = button.dataset.favoriteHeat || "90";
  if (!title) return;

  const favoriteId = favoriteKey(city, title);
  if (favoritePlaceKeys.has(favoriteId)) {
    savedFavoritePlaces = savedFavoritePlaces.filter((item) => item.key !== favoriteId);
    favoritePlaceKeys.delete(favoriteId);
    saveFavorites();
    renderSavedFavorites();
    syncFavoriteButton(button, false);
    return;
  }

  savedFavoritePlaces.unshift({ key: favoriteId, title, city, tag, heat });
  favoritePlaceKeys.add(favoriteId);
  saveFavorites();
  renderSavedFavorites();
  syncFavoriteButton(button, true);
  return;

  const key = `${city}-${title}`;
  const favoritesPanel = document.querySelector('[data-profile-panel="favorites"]');
  if (!favoritesPanel) return;

  if (!favoritePlaceKeys.has(key)) {
    favoritePlaceKeys.add(key);
    favoritesPanel.insertAdjacentHTML("afterbegin", `
      <article class="profile-note-card profile-favorite-card">
        <div class="note-cover" style="background-image:url('${themedImage(`${city},${title},travel,china`)}')"><span>收藏地点</span></div>
        <h2>${escapeHtml(title)}</h2>
        <p>地图页收藏 · ${escapeHtml(city)}的${escapeHtml(tag)}点位，已加入你的收藏列表，后续可用于生成攻略。</p>
        <div><span>${escapeHtml(tag)}</span><span>热度 ${escapeHtml(heat)}</span></div>
      </article>
    `);
  }

  button.textContent = "已收藏";
  button.classList.add("is-saved");
}

function commentItem({ avatar, name, text, likes, time }) {
  return `
    <article class="comment-item">
      <div class="comment-avatar">${escapeHtml(avatar)}</div>
      <div class="comment-body">
        <div class="comment-meta"><strong>${escapeHtml(name)}</strong><span>${escapeHtml(time)}</span></div>
        <p>${escapeHtml(text)}</p>
        <button type="button">回复</button>
      </div>
      <button class="comment-like" type="button">♡<span>${escapeHtml(likes)}</span></button>
    </article>
  `;
}

function inlineComments(placeName) {
  const title = placeName || "这个景点";
  return `
    <section class="detail-section detail-comments" id="detailInlineComments" data-comment-place="${escapeHtml(title)}">
      <h2>评论</h2>
      <div class="inline-comment-list">
        ${[
          { avatar: "旅", name: "旅行博主", text: "这个点很适合放在半日路线里，拍照和吃饭都比较顺路。", likes: "328", time: "刚刚" },
          { avatar: "本", name: "本地玩家", text: "建议上午或者工作日去，人少一点，体验会舒服很多。", likes: "96", time: "12分钟前" },
          { avatar: "拍", name: "胶片女孩", text: "傍晚光线会更柔和，出片率比中午高。", likes: "57", time: "2小时前" },
        ].map(commentItem).join("")}
      </div>
      <div class="inline-comment-composer">
        <span>我</span>
        <input type="text" placeholder="写下你的评论" data-inline-comment-input />
        <button type="button" data-inline-comment-send>发送</button>
      </div>
    </section>
  `;
}

function openComments(placeName) {
  const inlinePanel = detailPanel?.querySelector("#detailInlineComments");
  const inlineInput = inlinePanel?.querySelector("[data-inline-comment-input]");
  if (inlinePanel) {
    inlinePanel.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => inlineInput?.focus(), 260);
    return;
  }

  const place = placeName || "这个景点";
  if (commentTitle) commentTitle.textContent = `${place} 的评论`;
  if (commentListPanel) {
    commentListPanel.innerHTML = [
      { avatar: "旅", name: "旅行博主", text: "这个点很适合放在半日路线里，拍照和吃饭都比较顺路。", likes: "328", time: "刚刚" },
      { avatar: "本", name: "本地玩家", text: "建议上午或者工作日去，人少一点，体验会舒服很多。", likes: "96", time: "12分钟前" },
      { avatar: "吃", name: "爱吃火锅", text: "附近吃饭选择挺多，可以把晚饭也一起安排进去。", likes: "42", time: "1小时前" },
      { avatar: "拍", name: "胶片女孩", text: "傍晚光线会更柔和，出片率比中午高。", likes: "57", time: "2小时前" },
    ].map(commentItem).join("");
  }
  commentSheet?.classList.add("is-open");
  commentBackdrop?.classList.add("is-open");
  window.setTimeout(() => commentInput?.focus(), 80);
}

function closeComments() {
  commentSheet?.classList.remove("is-open");
  commentBackdrop?.classList.remove("is-open");
}

function sendComment() {
  const text = commentInput?.value.trim();
  if (!text || !commentListPanel) return;
  commentListPanel.insertAdjacentHTML("afterbegin", commentItem({
    avatar: "我",
    name: "我",
    text,
    likes: "0",
    time: "刚刚",
  }));
  commentInput.value = "";
}

function sendInlineComment(input) {
  const text = input?.value.trim();
  const section = input?.closest(".detail-comments");
  const list = section?.querySelector(".inline-comment-list");
  if (!text || !list) return;
  list.insertAdjacentHTML("afterbegin", commentItem({
    avatar: "我",
    name: "我",
    text,
    likes: "0",
    time: "刚刚",
  }));
  input.value = "";
}

function forceCloseDetail() {
  activeId = null;
  detailFloatingClose?.classList.remove("is-open");
  detailPanel.innerHTML = "";
  detailPanel.classList.remove("is-open");
  detailBackdrop.classList.remove("is-open");
  mapEl.classList.remove("is-focused");
  scenePreview.classList.remove("is-open");
  scenePreview.innerHTML = "";
}

function closeDetail() {
  forceCloseDetail();
  renderList();
  renderMarkers();
}

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-city-back]")) {
    searchInput.value = "";
    cityCompactMode = false;
    renderCityMenu();
    renderList();
    renderMarkers();
    return;
  }

  const cityPlace = event.target.closest("[data-city-place]");
  if (cityPlace) {
    const rawDetail = cityPlace.dataset.detail || "";
    const detail = /^\d+$/.test(rawDetail) ? Number(rawDetail) : rawDetail;
    openCityPlaceDetail(cityPlace.dataset.title, cityPlace.dataset.tag, detail);
    return;
  }

  const addToPlanButton = event.target.closest("[data-add-to-plan]");
  if (addToPlanButton) {
    addPlaceToPlanner(addToPlanButton.dataset.addToPlan);
    return;
  }

  const favoriteButton = event.target.closest("[data-favorite-place]");
  if (favoriteButton) {
    addPlaceToFavorites(favoriteButton);
    return;
  }

  const inlineCommentSend = event.target.closest("[data-inline-comment-send]");
  if (inlineCommentSend) {
    sendInlineComment(inlineCommentSend.closest(".inline-comment-composer")?.querySelector("[data-inline-comment-input]"));
    return;
  }

  const commentButton = event.target.closest("[data-open-comments]");
  if (commentButton) {
    openComments(commentButton.dataset.openComments);
    return;
  }

  const cityButton = event.target.closest(".city-option");
  if (cityButton) {
    setCity(cityButton.dataset.city);
    return;
  }

  const tab = event.target.closest(".tab");
  if (tab) {
    switchView(tab.dataset.view);
  }

  const profileTab = event.target.closest("[data-profile-tab]");
  if (profileTab) {
    const targetPanel = profileTab.dataset.profileTab;
    document.querySelectorAll("[data-profile-tab]").forEach((item) => {
      item.classList.toggle("is-active", item === profileTab);
    });
    document.querySelectorAll("[data-profile-panel]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.profilePanel === targetPanel);
    });
    return;
  }

  const filter = event.target.closest("[data-filter]");
  if (filter) {
    setFilter(filter.dataset.filter);
    if (categoryDropdown && categoryTrigger) {
      categoryDropdown.classList.remove("is-open");
      categoryTrigger.setAttribute("aria-expanded", "false");
    }
  }

  const selectable = event.target.closest("[data-id]");
  if (selectable) {
    setActive(selectable.dataset.id);
  }

  if (event.target.closest(".detail-close") || event.target === detailBackdrop) {
    closeDetail();
  }

  if (event.target.closest(".scene-close")) {
    closeDetail();
  }

});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-detail-close]")) return;
  event.preventDefault();
  event.stopPropagation();
  forceCloseDetail();
}, true);

if (detailPanel) {
  detailPanel.addEventListener("click", (event) => {
    if (event.target.closest("[data-detail-close]")) {
      event.preventDefault();
      event.stopPropagation();
      forceCloseDetail();
    }
  });

  detailPanel.addEventListener("wheel", (event) => {
    event.stopPropagation();
  }, { passive: true });
}

if (detailFloatingClose) {
  detailFloatingClose.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    forceCloseDetail();
  });
}

commentClose?.addEventListener("click", closeComments);
commentBackdrop?.addEventListener("click", closeComments);
commentSend?.addEventListener("click", sendComment);
commentInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  sendComment();
});

detailPanel?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || !event.target.matches("[data-inline-comment-input]")) return;
  event.preventDefault();
  sendInlineComment(event.target);
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderMarkdownish(text) {
  const escaped = escapeHtml(text || "");
  return escaped
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .split(/\n{2,}/)
    .map((block) => {
      if (/^<h[23]>/.test(block)) return block;
      const listLines = block.split("\n").filter((line) => /^[-*]\s+/.test(line.trim()));
      if (listLines.length === block.split("\n").length) {
        return `<ul>${listLines.map((line) => `<li>${line.replace(/^[-*]\s+/, "")}</li>`).join("")}</ul>`;
      }
      return `<p>${block.replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function ensureChatThread() {
  if (!planResult.innerHTML.trim()) {
    planResult.innerHTML = '<div class="chat-thread"></div>';
  }
  return planResult.querySelector(".chat-thread");
}

function appendUserMessage(question) {
  const chatThread = ensureChatThread();
  chatThread.insertAdjacentHTML("beforeend", `
    <div class="chat-message user-message">
      <p>${escapeHtml(question)}</p>
    </div>
  `);
  planResult.scrollTo({ top: planResult.scrollHeight, behavior: "smooth" });
}

function appendAssistantMessage(html, pending = false) {
  const chatThread = ensureChatThread();
  const id = `assistant-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  chatThread.insertAdjacentHTML("beforeend", `
    <div class="chat-message assistant-message" id="${id}">
      <div class="assistant-answer ${pending ? "is-pending" : ""}">
        ${html}
      </div>
    </div>
  `);
  planResult.scrollTo({ top: planResult.scrollHeight, behavior: "smooth" });
  return document.getElementById(id).querySelector(".assistant-answer");
}

function localPlanHtml(question = "") {
  if (!planResult) return;
  if (chatWelcome) chatWelcome.classList.add("is-hidden");
  const photoStops = guides.filter((guide) => guide.category === "photo").slice(0, 3);
  const cultureStops = guides.filter((guide) => guide.category === "culture").slice(0, 3);
  const classicStops = [guides.find((g) => g.id === "panda-base"), guides.find((g) => g.id === "kuanzhai"), guides.find((g) => g.id === "taikooli")].filter(Boolean);
  const isRainy = question.includes("雨") || question.includes("博物馆");
  const stops = isRainy ? cultureStops : question.includes("经典") ? classicStops : photoStops;

  return `
    <h2>${isRainy ? "雨天也好逛的成都路线" : "轻松出片的成都两日路线"}</h2>
    <p>我建议你把路线控制在少换乘、少回头路的节奏里，优先选择拍照友好、周边吃饭方便的地点。</p>
    <ol class="answer-route">
      ${stops.map((stop, index) => `
        <li>
          <button data-id="${stop.id}">
            <strong>DAY ${index + 1} · ${stop.title}</strong>
            <span>${stop.guide}</span>
          </button>
        </li>
      `).join("")}
    </ol>
    <h3>避雷提醒</h3>
    <p>热门商圈尽量避开周末下午；需要预约的博物馆提前确认；拍照点建议上午或傍晚去，光线更柔和。</p>
  `;
}

function shouldUseChengduPlaces(question) {
  const chengduKeywords = ["成都", "春熙路", "太古里", "锦里", "宽窄", "武侯祠", "熊猫基地", "都江堰", "青城山"];
  return chengduKeywords.some((keyword) => question.includes(keyword));
}

function placePayloadForQuestion(question) {
  if (!shouldUseChengduPlaces(question)) return [];
  return guides.map(({ title, label, address, tag, guide }) => ({ title, label, address, tag, guide }));
}

function composeTripQuestion(rawQuestion = "") {
  const details = [];
  if (tripFrom?.value.trim()) details.push(`出发地：${tripFrom.value.trim()}`);
  if (tripTo?.value.trim()) details.push(`目的地：${tripTo.value.trim()}`);
  if (tripDate?.value) details.push(`出发日期：${tripDate.value}`);
  if (tripPeople?.value) details.push(`人数：${tripPeople.value}人`);
  if (tripDays?.value) details.push(`游玩天数：${tripDays.value}天`);

  const question = rawQuestion.trim();
  if (!details.length) return question;
  return `${details.join("；")}。${question || "请根据以上信息帮我生成一份旅行攻略。"}`;
}

async function buildPlan(question = "") {
  if (!planResult) return;
  const cleanQuestion = question || "帮我生成一条适合拍照、美食、少踩雷的成都路线。";
  if (chatWelcome) chatWelcome.classList.add("is-hidden");
  appendUserMessage(cleanQuestion);
  const pendingNode = appendAssistantMessage("<p>生成攻略中...</p>", true);

  if (window.location.protocol === "file:") {
    pendingNode.classList.remove("is-pending");
    pendingNode.innerHTML = `${localPlanHtml(cleanQuestion)}<p class="api-note">当前是 file:// 打开方式。接入 DeepSeek 后，请通过本地服务地址打开页面。</p>`;
    return;
  }

  chatMessages.push({ role: "user", content: cleanQuestion });
  try {
    const response = await fetch("/api/deepseek", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: chatMessages.slice(-8),
        places: placePayloadForQuestion(cleanQuestion),
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "DeepSeek request failed");
    chatMessages.push({ role: "assistant", content: data.content });
    pendingNode.classList.remove("is-pending");
    pendingNode.innerHTML = renderMarkdownish(data.content);
  } catch (error) {
    pendingNode.classList.remove("is-pending");
    pendingNode.innerHTML = `
      <h2>DeepSeek 暂未连接成功</h2>
      <p>后端接口已经接入，但 DeepSeek 返回了错误：${escapeHtml(error.message)}</p>
      <p class="api-note">请确认 .env.local 里的 DeepSeek API Key 是有效的，然后重启本地服务再试。</p>
    `;
  }
}

searchInput.addEventListener("input", () => {
  cityCompactMode = false;
  const matchedCity = matchedCityFromSearch(searchInput.value);
  if (matchedCity) {
    setCity(matchedCity);
    return;
  }
  renderCityMenu();
  renderList();
  renderMarkers();
});

if (openFeed) openFeed.addEventListener("click", () => feedDrawer.classList.toggle("is-open"));
if (closeFeed) closeFeed.addEventListener("click", () => feedDrawer.classList.remove("is-open"));
if (categoryTrigger) {
  categoryTrigger.addEventListener("click", () => {
    const isOpen = categoryDropdown.classList.toggle("is-open");
    categoryTrigger.setAttribute("aria-expanded", String(isOpen));
  });
}

document.addEventListener("click", (event) => {
  if (!categoryDropdown || !categoryTrigger || categoryDropdown.contains(event.target)) return;
  categoryDropdown.classList.remove("is-open");
  categoryTrigger.setAttribute("aria-expanded", "false");
});

if (generatePlan) {
  generatePlan.addEventListener("click", () => {
    buildPlan(composeTripQuestion(tripQuestion.value));
    tripQuestion.value = "";
  });
}

if (tripQuestion) {
  tripQuestion.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    buildPlan(composeTripQuestion(tripQuestion.value));
    tripQuestion.value = "";
  });
}

if (newChatButton) {
  newChatButton.addEventListener("click", () => {
    if (planResult) planResult.innerHTML = "";
    if (tripQuestion) tripQuestion.value = "";
    [tripFrom, tripTo, tripDate, tripPeople, tripDays].forEach((input) => {
      if (input) input.value = "";
    });
    chatMessages.length = 0;
    if (chatWelcome) chatWelcome.classList.remove("is-hidden");
  });
}

document.querySelectorAll(".quick-prompts button").forEach((button) => {
  button.addEventListener("click", () => {
    tripQuestion.value = button.textContent;
    buildPlan(composeTripQuestion(button.textContent));
    tripQuestion.value = "";
  });
});

applyZoom();
document.body.dataset.activeView = document.querySelector(".tab.is-active")?.dataset.view || "map";
loadSavedFavorites();
renderSavedFavorites();
renderCityMenu();
renderList();
renderMarkers();
renderDetail();
loadCityPlaces(activeCity);

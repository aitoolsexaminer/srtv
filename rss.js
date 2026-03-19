/* =========================
   RSS CATEGORIZATION
========================= */

const newsMap = {
  Reuters:"wires",
  Reuters_world:"wires",
  AP:"wires",
  AFP:"wires",

  BBC:"major",
  BBC_world:"major",
  CNN:"major",
  CNN_world:"major",
  Guardian:"major",
  Guardian_intl:"major",

  NYT:"us",
  NYT_world:"us",
  WP:"us",
  WSJ:"us",
  LATimes:"us",

  Bloomberg:"finance",
  Bloomberg_economics:"finance",
  FT:"finance",
  FT_world:"finance",
  CNBC:"finance",
  MarketWatch:"finance",
  Economist:"finance",

  TechCrunch:"tech",
  TheVerge:"tech",
  WIRED:"tech",
  Ars:"tech",

  AlJazeera:"middleeast",
  AlArabiya:"middleeast",
  Haaretz:"middleeast",
  Ynet:"middleeast",

  DW:"europe",
  France24:"europe",
  Euronews:"europe",
  Politico_eu:"europe",

  SCMP:"asia",
  JapanTimes:"asia",
  StraitsTimes:"asia",

  Meduza:"russia",

  ForeignPolicy:"analysis",
  ForeignAffairs:"analysis",
  TheAtlantic:"analysis",

  /* Arabic feeds */

  BBC_ar:"arabi",
  AlJazeera_ar:"arabi",
  AlArabiya_ar:"arabi",
  France24_ar:"arabi",
  DW_ar:"arabi",
  SkyNewsArabia:"arabi",
  AsharqAwsat:"arabi",
  RT_ar:"arabi"
};


/* =========================
   RSS FEEDS
========================= */

window.feeds = {

  Reuters: "https://news.google.com/rss/search?q=site:reuters.com&hl=en-US&gl=US&ceid=US:en",
  Reuters_world: "https://news.google.com/rss/search?q=Reuters+world&hl=en-US&gl=US&ceid=US:en",
  AP: "https://news.google.com/rss/search?q=Associated+Press&hl=en-US&gl=US&ceid=US:en",
  AFP: "https://news.google.com/rss/search?q=AFP&hl=en-US&gl=US&ceid=US:en",

  BBC: "https://feeds.bbci.co.uk/news/rss.xml",
  BBC_world: "https://feeds.bbci.co.uk/news/world/rss.xml",
  CNN: "https://news.google.com/rss/search?q=site:cnn.com&hl=en-US&gl=US&ceid=US:en",
  CNN_world: "https://news.google.com/rss/search?q=site:cnn.com+world&hl=en-US&gl=US&ceid=US:en",
  Guardian: "https://www.theguardian.com/world/rss",
  Guardian_intl: "https://www.theguardian.com/international/rss",

  NYT: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  NYT_world: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
  WP: "https://feeds.washingtonpost.com/rss/world",
  WSJ: "https://feeds.a.dj.com/rss/RSSWorldNews.xml",
  LATimes: "https://www.latimes.com/world-nation/rss2.0.xml",

  Bloomberg: "https://feeds.bloomberg.com/markets/news.rss",
  Bloomberg_economics: "https://feeds.bloomberg.com/economics/news.rss",
  FT: "https://www.ft.com/rss/home",
  FT_world: "https://www.ft.com/rss/world",
  CNBC: "https://www.cnbc.com/id/100003114/device/rss/rss.html",
  MarketWatch: "https://feeds.marketwatch.com/marketwatch/topstories/",
  Economist: "https://www.economist.com/the-world-this-week/rss.xml",

  TechCrunch: "https://techcrunch.com/feed/",
  TheVerge: "https://www.theverge.com/rss/index.xml",
  WIRED: "https://www.wired.com/feed/rss",
  Ars: "https://feeds.arstechnica.com/arstechnica/index",

  AlJazeera: "https://www.aljazeera.com/xml/rss/all.xml",
  AlArabiya: "https://www.alarabiya.net/.mrss/en.xml",
  Haaretz: "https://www.haaretz.com/cmlink/1.628752",
  Ynet: "https://www.ynetnews.com/Integration/StoryRss2.xml",

  DW: "https://rss.dw.com/rdf/rss-en-all",
  France24: "https://www.france24.com/en/rss",
  Euronews: "https://www.euronews.com/rss?format=xml",
  Politico_eu: "https://www.politico.eu/feed/",

  SCMP: "https://www.scmp.com/rss/91/feed",
  JapanTimes: "https://www.japantimes.co.jp/feed/",
  StraitsTimes: "https://www.straitstimes.com/news/world/rss.xml",

  Meduza: "https://meduza.io/rss/en/all",

  ForeignPolicy: "https://foreignpolicy.com/feed/",
  ForeignAffairs: "https://www.foreignaffairs.com/rss.xml",
  TheAtlantic: "https://www.theatlantic.com/feed/all/",

  /* =========================
     ARABIC RSS FEEDS
  ========================= */

  BBC_ar: "https://feeds.bbci.co.uk/arabic/rss.xml",
  AlJazeera_ar: "https://www.aljazeera.net/aljazeerarss/ar/all.xml",
  AlArabiya_ar: "https://www.alarabiya.net/.mrss/ar.xml",
  France24_ar: "https://www.france24.com/ar/rss",
  DW_ar: "https://rss.dw.com/xml/rss-ar-all",
  SkyNewsArabia: "https://www.skynewsarabia.com/web/rss",
  AsharqAwsat: "https://aawsat.com/home/rss.xml",
  RT_ar: "https://arabic.rt.com/rss/"
};


/* =========================
   BREAKING KEYWORDS
========================= */

const breakingWords = [
  "breaking","urgent","alert",
  "attack","strike","missile",
  "explosion","blast",
  "war","invasion",
  "earthquake","tsunami",
  "assassination",

  /* Arabic */

  "عاجل",
  "هجوم",
  "انفجار",
  "صاروخ",
  "حرب",
  "زلزال",
  "اغتيال"
];


/* =========================
   PROXY ROTATION
========================= */

const proxies = [
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
];


/* =========================
   CACHE
========================= */

const rssCache = {};


/* =========================
   UTILITIES
========================= */

function truncate(text,max=120){
  return text.length<=max ? text : text.substring(0,max)+"…";
}


/* =========================
   FETCH RSS WITH FAILOVER
========================= */

async function fetchRSS(url){

  for(const proxy of proxies){

    try{

      const response = await fetch(proxy(url),{
        headers:{
          "User-Agent":"Mozilla/5.0"
        }
      });

      if(!response.ok) continue;

      const text = await response.text();

      if(text && text.length>200){
        return text;
      }

    }catch(e){}

  }

  throw new Error("All RSS proxies failed");

}


/* =========================
   LOAD RSS
========================= */

window.loadRSS = async function(feedKey,container){

  try{

    const url = feeds[feedKey];
    if(!url || !container) return;

    if(rssCache[feedKey] && Date.now()-rssCache[feedKey].time < 240000){
      container.innerHTML = rssCache[feedKey].html;
      return;
    }

    const xmlText = await fetchRSS(url);

    let titles=[];

    if(xmlText.trim().startsWith("{")){

      const data = JSON.parse(xmlText);

      titles=(data.items||[])
        .slice(0,12)
        .map(i=>truncate(i.title));

    }

    else{

      const parser=new DOMParser();
      const xml=parser.parseFromString(xmlText,"application/xml");

      let nodes=[...xml.querySelectorAll("item title")];

      if(!nodes.length){
        nodes=[...xml.querySelectorAll("entry title")];
      }

      titles=nodes.slice(0,12).map(n=>truncate(n.textContent));

    }

    titles=[...new Set(titles)];

    if(!titles.length){

      container.innerHTML=`<span>${feedKey.toUpperCase()} unavailable</span>`;
      return;

    }

    titles.sort(()=>Math.random()-0.5);

    const headlineString = titles.join(" • ");

    const newHTML = `
    <span>${headlineString}</span>
    <span style="margin-left:40px">${headlineString}</span>
    <span style="margin-left:40px">${headlineString}</span>
    `;

    if (container.innerHTML !== newHTML) {
      container.innerHTML = newHTML;
    }

      /* ARABIC DETECTION */
      const text = container.textContent;
      const isArabic = /[\u0600-\u06FF]/.test(text);

      container.setAttribute("dir", isArabic ? "rtl" : "ltr");

    rssCache[feedKey]={
      time:Date.now(),
      html:container.innerHTML
    };

    const breaking=titles.some(title =>
      breakingWords.some(word =>
        title.toLowerCase().includes(word)
      )
    );

    if(breaking){

      const row=container.closest(".ticker-row");
      if(!row) return;

      row.classList.add("breaking-alert");

      setTimeout(()=>{
        row.classList.remove("breaking-alert");
      },20000);

    }

  }catch(err){

    console.error(feedKey,err);
    container.innerHTML=`<span>${feedKey.toUpperCase()} error</span>`;

  }

};


/* =========================
   START RSS TICKERS
========================= */

document.addEventListener("DOMContentLoaded",()=>{

  document.querySelectorAll(".ticker-row").forEach(row=>{

    const feedKey=row.dataset.feed;
    const content=row.querySelector(".ticker-content");

    if(!content) return;

    loadRSS(feedKey,content);

    setInterval(()=>{
      loadRSS(feedKey,content);
    },300000);

  });

});
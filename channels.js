const channels = [
/* -------- ARABIC -------- */
//{id: 1, name: "Al Jazeera English", group: "arabic", type: "hls", src: "https://live‑hls‑apps‑aje‑fa.getaj.net/AJE/index.m3u8" }, // updated HLS

{id: 2, name: "Al Jazeera Arabic", group: "arabic", type: "hls", src: "https://live-hls-apps-aja-fa.getaj.net/AJA/index.m3u8", logo: "./networkslogos/arabic/aljazeera-arabic.svg" },
//{id: 2, name: "Al Jazeera Arabic", group: "arabic", type: "youtube", src: "bNyUyrR0PHo", logo: "./networkslogos/arabic/aljazeera-arabic.svg" },

{id: 3, name: "Al Jazeera Mubasher", group: "arabic", type: "hls", src: "https://live-hls-apps-ajm-fa.getaj.net/AJM/index.m3u8", logo: "./networkslogos/arabic/aljazeera-mubashar.svg" },
//{id: 3, name: "Al Jazeera Mubasher", group: "arabic", type: "youtube", src: "rvJOGTSQNj8", logo: "./networkslogos/arabic/aljazeera-mubashar.svg" },

{id: 4, name: "Al Arabiya", group: "arabic", type: "hls", src: "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8", logo: "./networkslogos/arabic/alarabiya.png" },
{id: 5, name: "Al Hadath", group: "arabic", type: "hls", src: "https://live.alarabiya.net/alarabiapublish/alhadath.smil/playlist.m3u8", logo: "./networkslogos/arabic/alhadath.png" },
{id: 6, name: "Sky News Arabia", group: "arabic", type: "hls", src: "https://live-stream.skynewsarabia.com/c-horizontal-channel/horizontal-stream/index.m3u8", logo: "./networkslogos/arabic/skynewsarabia.svg" },
{id: 7, name: "Al Araby TV", group: "arabic", type: "hls", src: "https://live.kwikmotion.com/alaraby1live/alaraby_abr/playlist.m3u8", logo: "./networkslogos/arabic/alaraby.svg" },
{id: 8, name: "Asharq News", group: "arabic", type: "hls", src: "https://live-news.asharq.com/asharq.m3u8", logo: "./networkslogos/arabic/asharqnews.png" },
//{id: 9, name: "France 24 Arabic", group: "arabic", type: "hls", src: "https://live.france24.com/hls/live/2037222/F24_AR_HI_HLS/master_900.m3u8", logo: "./networkslogos/arabic/france24-arabic.svg" },
{id: 10, name: "RT Arabic", group: "arabic", type: "hls", src: "https://rt-arb.rttv.com/dvr/rtarab/playlist.m3u8", logo: "./networkslogos/arabic/rt-arabic.svg" },
{id: 11, name: "TRT عربي", group: "arabic", type: "hls", src: "https://tv-trtarabi.medya.trt.com.tr/master.m3u8", logo: "./networkslogos/arabic/trt-arabic.svg" },
//{id: 12, name: "CGTN Arabic", group: "arabic", type: "youtube", src: "sJz8rWZKf7g" },
//{id: 13, name: "Al Hurra", group: "arabic", type: "youtube", src: "i2n0qKX0v9k" },
{id: 14, name: "Al Mayadeen", group: "arabic", type: "hls", src: "https://mdnlv.cdn.octivid.com/almdn/smil:mpegts.stream.smil/playlist.m3u8", logo: "./networkslogos/arabic/almayadeen.png" },

{id: 15, name: "BBC Arabic", group: "arabic", type: "youtube", channelId: "UCelk6aHijZq-GJBBB9YpReA", logo: "./networkslogos/arabic/bbc-arabic.png" },
//{id: 15, name: "BBC Arabic", group: "arabic", type: "hls", src: "https://ythls.armelin.one/channel/UCelk6aHijZq-GJBBB9YpReA.m3u8", logo: "./networkslogos/arabic/bbc-arabic.png" },


//{id:133, name:"i24NEWS Arabic", group:"arabic", type:"blob", src:"blob:https://video.i24news.tv/a846e4e4-bb86-4032-a135-35ae7735eef3", logo: "./networkslogos/arabic/i24.png" },
//{id:133, name:"i24NEWS Arabic", group:"arabic", type:"hls", src:"https://bcovlive-a.akamaihd.net/95116e8d79524d87bf3ac20ba04241e3/eu-central-1/5377161796001/playlist.m3u8", logo: "./networkslogos/arabic/i24.png" },
//{id:133, name:"i24NEWS Arabic", group:"arabic", type:"hls", src:"https://fastly.live.brightcove.com/6386792572112/eu-central-1/5377161796001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiZXJmajYzLmVncmVzcy53YzQ3bTEiLCJhY2NvdW50X2lkIjoiNTM3NzE2MTc5NjAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI1Mzc3MTYxNzk2MDAxIl0sImp0aSI6IjYzODY3OTI1NzIxMTIifQ.vsA8IfCHFqoqo2BHxx4w0PqBgTESPMYgFGL771vzKoA/chunklist__1.m3u8", logo: "./networkslogos/arabic/i24.png" },
{id:133, name:"i24NEWS Arabic", group:"arabic", type:"hls", src:"https://fastly.live.brightcove.com/6386792572112/eu-central-1/5377161796001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiZXJmajYzLmVncmVzcy53YzQ3bTEiLCJhY2NvdW50X2lkIjoiNTM3NzE2MTc5NjAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI1Mzc3MTYxNzk2MDAxIl0sImp0aSI6IjYzODY3OTI1NzIxMTIifQ.vsA8IfCHFqoqo2BHxx4w0PqBgTESPMYgFGL771vzKoA/playlist-hls.m3u8?__nn__=5476555825001&hdnea=st=1774004400~exp=1774008000~acl=/6386792572112/eu-central-1/5377161796001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiZXJmajYzLmVncmVzcy53YzQ3bTEiLCJhY2NvdW50X2lkIjoiNTM3NzE2MTc5NjAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI1Mzc3MTYxNzk2MDAxIl0sImp0aSI6IjYzODY3OTI1NzIxMTIifQ.vsA8IfCHFqoqo2BHxx4w0PqBgTESPMYgFGL771vzKoA/*~hmac=ef2c4d60cce057c68aebb2bf45530629017209282ca4b1b7e49bfc332a0194ec, logo: "./networkslogos/arabic/i24.png" },

{id:134, name:"almashhad", group:"arabic", type:"hls", src:"https://fastly.live.brightcove.com/6385343550112/ap-south-1/6313884884001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiaWR2d3RnLmVncmVzcy5qYXYzemwiLCJhY2NvdW50X2lkIjoiNjMxMzg4NDg4NDAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI2MzEzODg0ODg0MDAxIl0sImp0aSI6IjYzODUzNDM1NTAxMTIifQ.OXCUOblTM-ZkjiyDxPav01or3H6GE5cbGOp1qXlLERk/playlist-hls-dvr.m3u8" },



/* -------- LEBANESE -------- */
{id: 16, name: "LBCI Lebanon", group: "lebanese", type: "youtube", channelId: "UCpE6gpKewomi17XDyPfpFjA", logo: "./networkslogos/lebanese/lbci.png" },

{id: 17, name: "MTV Lebanon", group: "lebanese", type: "hls", src: "https://hms.pfs.gdn/v1/broadcast/mtv/playlist.m3u8", logo: "./networkslogos/lebanese/mtvlebanon.png" },

{id: 18, name: "Al Jadeed", group: "lebanese", type: "youtube", channelId: "UC4JCsTLFcHGk10qpiNMh0Ww", logo: "./networkslogos/lebanese/aljadeed.png" },
//{id: 18, name: "Al Jadeed", group: "lebanese", type: "hls", src: "http://185.9.2.18/chid_391/mono.m3u8", logo: "./networkslogos/lebanese/aljadeed.png" },


{id: 19, name: "OTV Lebanon", group: "lebanese", type: "blob", src: "blob:https://otv.com.lb/a7bfdad0-890e-4151-8326-d8ee547740a1", logo: "./networkslogos/lebanese/otv.svg" },
//{id: 19, name: "OTV Lebanon", group: "lebanese", type: "hls", src: "https://otv.hibridcdn.net/otv/tv_abr/playlist.m3u8?=&=&=&=&=698&=731&=&=&=&=2939d66c-aa6f-bb00-8d96-74255c43be39&=idfa", logo: "./networkslogos/lebanese/otv.svg" },
//{id: 19, name: "OTV Lebanon", group: "lebanese", type: "hls", src: "https://svs.itworkscdn.net/otvlebanonlive/otv.smil/playlist.m3u8", logo: "./networkslogos/lebanese/otv.svg" },


//{id: 20, name: "Tele Liban", group: "lebanese", type: "hls", src: "https://cdn.catiacast.video/abr/ed8f807e2548db4507d2a6f4ba0c4a06/playlist.m3u8", logo: "./networkslogos/lebanese/teleliban.png" },
{id: 20, name: "Tele Liban", group: "lebanese", type: "blob", src: "blob:https://www.teleliban.com.lb/b7329943-1453-4805-84f0-f9cb9226bda5", logo: "./networkslogos/lebanese/teleliban.png" },
//{id: 20, name: "Tele Liban", group: "lebanese", type: "hls", src: "https://list.iptvcat.com/my_list/s/4bed574fb45b16ba26ecd382e570dccf.m3u8", logo: "./networkslogos/lebanese/teleliban.png" },

{id: 21, name: "NBN Lebanon", group: "lebanese", type: "blob", src: "blob:https://player.livepush.io/774d3a9a-ace0-4f6f-b142-986953295d70", logo: "./networkslogos/lebanese/nbn.png" },
//{id: 21, name: "NBN Lebanon", group: "lebanese", type: "hls", src: "https://list.iptvcat.com/my_list/s/bdcbdfb825018c3266483f791442398c.m3u8", logo: "./networkslogos/lebanese/nbn.png" },
//{id: 21, name: "NBN Lebanon", group: "lebanese", type: "hls", src: "https://cloud.odysee.live/content/1d8edd84bd42e695555dbf20d83b45e203ed9ed0/master.m3u8", logo: "./networkslogos/lebanese/nbn.png" },
//{id: 21, name: "NBN Lebanon", group: "lebanese", type: "hls", src: "http://5.9.119.146:8883/nbn/index.m3u8", logo: "./networkslogos/lebanese/nbn.png" },
//{id: 21, name: "NBN Lebanon", group: "lebanese", type: "hls", src: "https://dc-global-16scw-livepush.akamaized.net/live/nsmj7FAO4k8CiQu/emLMkjf_fy7-vilU7/index.m3u8", logo: "./networkslogos/lebanese/nbn.png" },


{id: 22, name: "Al Manar", group: "lebanese", type: "hls", src: "https://edge.fastpublish.me/live/index.m3u8", logo: "./networkslogos/lebanese/almanar2.png" },
{id: 132, name: "RED TV", group: "lebanese", type: "hls", src: "https://live.kwikmotion.com/redtvlive/redtv.smil/playlist.m3u8", logo: "./networkslogos/lebanese/redtv.png" },

{id: 135, name: "UNews", group: "lebanese", type: "hls", src: "https://cdn.catiacast.video/abr/9436b5ab3c1171ab04a59af11951292f/playlist.m3u8", logo: "./networkslogos/lebanese/redtv.png" },


//{id: 23, name: "Al Thania TV", group: "lebanese", type: "youtube", src: "@althaniatv/live" },


/* -------- GULF / REGIONAL -------- */
//{id: 24, name: "Saudi News Channel", group: "gulfarabregion", type: "youtube", src: "E9ZV0y3fP0E" },
//{id: 25, name: "Dubai TV", group: "gulfarabregion", type: "youtube", src: "@dubaichannel/live" },
//{id: 26, name: "Abu Dhabi TV", group: "gulfarabregion", type: "youtube", src: "@abudhabitv/live" },
//{id: 27, name: "Sharjah TV", group: "gulfarabregion", type: "youtube", src: "9Q9X8yZ0N0k" },
//{id: 28, name: "Kuwait TV", group: "gulfarabregion", type: "youtube", src: "yQYbR6cJ7zE" },
//{id: 29, name: "Qatar TV", group: "gulfarabregion", type: "youtube", src: "c1yYv7bVf3Q" },
//{id: 30, name: "Oman TV", group: "gulfarabregion", type: "youtube", src: "6X3mJ7Q2z0M" },
//{id: 31, name: "Bahrain TV", group: "gulfarabregion", type: "youtube", src: "9M5kC4b6XoE" },

/* -------- INTERNATIONAL NEWS -------- */
//{id: 32, name: "France 24 English", group: "intnews", type: "hls", src: "https://live.france24.com/hls/live/2037179/F24_EN_HI_HLS/master_2000.m3u8" },
//{id: 33, name: "DW News", group: "intnews", type: "youtube", src: "@dwnews/live" },
//{id: 34, name: "Sky News", group: "intnews", type: "youtube", src: "9Auq9mYxFEE" },
//{id: 35, name: "ABC News Live", group: "intnews", type: "youtube", src: "w_Ma8oQLmSM" },
//{id: 36, name: "Bloomberg Live", group: "intnews", type: "youtube", src: "@bloomberg/live" },
//{id: 37, name: "NBC News Now", group: "intnews", type: "youtube", src: "UCeY0bbntW4" },
//{id: 38, name: "CBS News", group: "intnews", type: "youtube", src: "@cbsnews/live" },
//{id: 39, name: "Euronews", group: "intnews", type: "youtube", src: "@euronews/live" },
//{id: 40, name: "NHK World Japan", group: "intnews", type: "youtube", src: "@nhkworldtv/live" },

/* -------- SCIENCE & SPACE -------- */
//{id: 41, name: "NASA TV Public", group: "scincespace", type: "hls", src: "https://ntv1.nasa.gov/hls/live/2038346/NTV-Public/master.m3u8" },
//{id: 42, name: "NASA TV Media", group: "scincespace", type: "hls", src: "https://ntv2.nasa.gov/hls/live/2038345/NTV-Media/master.m3u8" },

/* -------- DOCUMENTARY & LIFESTYLE -------- */
//{id: 43, name: "WaterBear", group: "doclifestyle", type: "hls", src: "https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg00353-littledotstudios-waterbear-samsunguk/playlist.m3u8" },
//{id: 44, name: "Real Stories", group: "doclifestyle", type: "hls", src: "https://littledot-realstories-samsung.amagi.tv/playlist.m3u8" },
//{id: 45, name: "Documentary+", group: "doclifestyle", type: "hls", src: "https://documentaryplus-samsung.amagi.tv/playlist.m3u8" },
//{id: 46, name: "Love Nature", group: "doclifestyle", type: "hls", src: "https://lovenature-samsung.amagi.tv/playlist.m3u8" },

/* -------- SPORTS / SPECIAL -------- */
//{id: 47, name: "Red Bull TV", group: "sports", type: "hls", src: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8" },
//{id: 48, name: "World Poker Tour", group: "sports", type: "hls", src: "https://worldpokertour-samsung.amagi.tv/playlist.m3u8" },

/* -------- ENTERTAINMENT (PLUTO & OTHERS) -------- */
//{id: 49, name: "Pluto Action", type: "hls", src: "https://service-stitcher.clusters.pluto.tv/stitch/hls/channel/5ca672f515a62078d2ec0ad2/master.m3u8" },
//{id: 50, name: "Pluto Comedy", type: "hls", src: "https://service-stitcher.clusters.pluto.tv/stitch/hls/channel/5ca671f215a62078d2ec0ac2/master.m3u8" },
//{id: 51, name: "Pluto Movies", type: "hls", src: "https://service-stitcher.clusters.pluto.tv/stitch/hls/channel/5ca671c515a62078d2ec0abf/master.m3u8" },
//{id: 67, name: "Pluto Classic TV", type: "hls", src: "https://service-stitcher.clusters.pluto.tv/stitch/hls/channel/5ca6748f515a62078d2ec0b9b/master.m3u8" },

/* -------- EXTRA LIVE & VERTICAL CHANNELS -------- */

//{id: 68, name: "FailArmy", type: "hls", src: "https://jukinmedia-failarmy-2-eu.rakuten.wurl.tv/playlist.m3u8" },
//{id: 69, name: "People Are Awesome", type: "hls", src: "https://jukinmedia-peopleareawesome-1-eu.rakuten.wurl.tv/playlist.m3u8" },
//{id: 70, name: "Insight TV", type: "hls", src: "https://insighttv-samsunguk.amagi.tv/playlist.m3u8" },
//{id: 71, name: "Motorvision TV", type: "hls", src: "https://stream.motorvision.tv/hls/live.m3u8" },
//{id: 72, name: "Tastemade", type: "hls", src: "https://tastemade-samsung.amagi.tv/playlist.m3u8" },

/* -------- CONTINENTAL & GLOBAL ---- */
//{id: 73, name: "Arirang TV", type: "hls", src: "https://amdlive-ch01.ctnd.com.edgesuite.net/arirang_1ch_livepkgr/master.m3u8" },
//{id: 74, name: "ABC Australia", type: "hls", src: "https://abc-news-dmd-streams.akamaized.net/out/v1/abcnews.m3u8" },
//{id: 75, name: "CGTN News", type: "hls", src: "https://live.cgtn.com/1000/prog_index.m3u8" },
//{id: 76, name: "CGTN Documentary", type: "hls", src: "https://live.cgtn.com/500d/prog_index.m3u8" },
//{id: 77, name: "Press TV", type: "hls", src: "https://live.presstv.ir/hls/presstv.m3u8" },
//{id: 78, name: "TeleSUR", type: "hls", src: "https://cdnesmain.telesur.ultrabase.net/mbliveMain/hd/playlist.m3u8" },

/* -------- NEWS & WEATHER HLS ---- */
//{id: 79, name: "WeatherNation", type: "hls", src: "https://weathernationtv-samsung.amagi.tv/playlist.m3u8" },
//{id: 80, name: "USA Today News", type: "hls", src: "https://usatoday-samsung.amagi.tv/playlist.m3u8" },
//{id: 81, name: "Cheddar News", type: "hls", src: "https://cheddar-samsung.amagi.tv/playlist.m3u8" },
//{id: 82, name: "Local Now", type: "hls", src: "https://localnow-samsung.amagi.tv/playlist.m3u8" },

/* -------- SPECIALTY CHANNELS -------- */
//{id: 83, name: "TED Live", type: "hls", src: "https://ted-samsung.amagi.tv/playlist.m3u8" },
//{id: 84, name: "Law & Crime", type: "hls", src: "https://lawandcrime-samsung.amagi.tv/playlist.m3u8" },

/* -------- LIFESTYLE & SPECIAL INTEREST -------- */
//{id: 85, name: "Travel XP", type: "hls", src: "https://travelxp-travelxp-1-eu.rakuten.wurl.tv/playlist.m3u8" },
//{id: 86, name: "Fashion TV Europe", type: "hls", src: "https://fashiontv-fashiontv-1-eu.rakuten.wurl.tv/playlist.m3u8" },
//{id: 87, name: "Bon Appetit", type: "hls", src: "https://bonappetit-samsung.amagi.tv/playlist.m3u8" },
//{id: 88, name: "Revry Pride", type: "hls", src: "https://revry-rakuten.amagi.tv/playlist.m3u8" },

/* -------- CLASSIC & CULTURAL -------- */
//{id: 89, name: "Comedy Dynamics", type: "hls", src: "https://comedydynamics-samsung.amagi.tv/playlist.m3u8" },
//{id: 90, name: "Mystery Science Theater", type: "hls", src: "https://mst3k-samsung.amagi.tv/playlist.m3u8" },
//{id: 91, name: "Shout Factory TV", type: "hls", src: "https://shoutfactory-samsung.amagi.tv/playlist.m3u8" },

/* -------- SPECIALTY INTEREST -------- */
//{id: 92, name: "Outdoor America", type: "hls", src: "https://outside-samsung.amagi.tv/playlist.m3u8" },
//{id: 93, name: "Cars TV", type: "hls", src: "https://carstv-samsung.amagi.tv/playlist.m3u8" },

/* -------- ARABIC & MENA MUSIC -------- */
//{id: 94, name: "Rotana Music", type: "youtube", src: "@rotanamusic/live" },
//{id: 95, name: "Rotana Khalijia", type: "youtube", src: "@rotanakhalijia/live" },
//{id: 96, name: "MBC Variety", type: "youtube", src: "@mbcvariety/live" },

/* -------- MENA NATIONAL CHANNELS -------- */
//{id: 97, name: "Al Iraqiya", type: "youtube", src: "@aliraqiyatv/live" },
//{id: 98, name: "Al Sumaria", type: "youtube", src: "@alsumaria/live" },
//{id: 99, name: "Jordan TV", type: "youtube", src: "@jordantv/live" },
//{id: 100, name: "Palestine TV", type: "youtube", src: "@palestinetv/live" },

//{id: 101, name: "Sudan TV", type: "youtube", src: "@sudantv/live" },
//{id: 102, name: "Yemen Today", type: "youtube", src: "@yementoday/live" },

/* -------- KURDISH & REGIONAL -------- */
//{id: 103, name: "Kurdistan 24", type: "youtube", src: "@kurdistan24/live" },
//{id: 104, name: "Rudaw TV", type: "youtube", src: "@rudawtv/live" },

/* -------- REPEAT / DUPLICATE STREAMS WITH DISTINCT FEEDS -------- */
//{id: 105, name: "Tastemade Travel", type: "hls", src: "https://tastemade-samsung.amagi.tv/playlist.m3u8" }, // duplicate of id:72 region variant
//{id: 106, name: "Insight Sports", type: "hls", src: "https://insighttv-samsunguk.amagi.tv/playlist.m3u8" }, // duplicate of id:70

//{id: 107, name: "Red Bull Adventure", type: "hls", src: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8" },

//{id: 108, name: "FailArmy Live", type: "hls", src: "https://jukinmedia-failarmy-2-eu.rakuten.wurl.tv/playlist.m3u8" },
//{id: 109, name: "People Are Awesome Live", type: "hls", src: "https://jukinmedia-peopleareawesome-1-eu.rakuten.wurl.tv/playlist.m3u8" },

//{id: 110, name: "NatureVision TV", type: "hls", src: "https://lovenature-samsung.amagi.tv/playlist.m3u8" },

/* -------- GLOBAL NEWS YT -------- */
//{id: 112, name: "Global News Canada", type: "youtube", src: "@globalnews/live" },
//{id: 113, name: "India Today Live", type: "youtube", src: "@indiatoday/live" },
//{id: 114, name: "News18 India", type: "youtube", src: "@news18/live" },
//{id: 115, name: "Times Now", type: "youtube", src: "@timesnow/live" },

//{id: 116, name: "WION News", type: "youtube", src: "@wionews/live" },

//{id: 117, name: "Bloomberg Quicktake", type: "hls", src: "https://bloomberg.com/media-manifest/streams/us.m3u8" },

//{id: 118, name: "NHK World", type: "youtube", src: "@nhkworldtv/live" },

//{id: 119, name: "DW Documentary", type: "youtube", src: "@dwdocumentary/live" },

/* -------- DOCUMENTARY HLS FALLBACK -------- */
//{id: 120, name: "Real Stories Docs", type: "hls", src: "https://littledot-realstories-samsung.amagi.tv/playlist.m3u8" },
//{id: 121, name: "WaterBear Nature", type: "hls", src: "https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg00353-littledotstudios-waterbear-samsunguk/playlist.m3u8" },

/* -------- DUPLICATE / ALTERNATE HLS -------- */
//{id: 122, name: "Motorvision TV", type: "hls", src: "https://stream.motorvision.tv/hls/live.m3u8" },
//{id: 123, name: "Stadium Sports", type: "hls", src: "https://stadium-samsung.amagi.tv/playlist.m3u8" },
//{id: 124, name: "World Poker Tour", type: "hls", src: "https://worldpokertour-samsung.amagi.tv/playlist.m3u8" },
//{id: 125, name: "Tastemade Food", type: "hls", src: "https://tastemade-samsung.amagi.tv/playlist.m3u8" },
//{id: 126, name: "Outdoor Channel", type: "hls", src: "https://outside-samsung.amagi.tv/playlist.m3u8" },
//{id: 127, name: "Travel Channel Live", type: "hls", src: "https://travelxp-travelxp-1-eu.rakuten.wurl.tv/playlist.m3u8" },
//{id: 128, name: "Fashion TV Europe", type: "hls", src: "https://fashiontv-fashiontv-1-eu.rakuten.wurl.tv/playlist.m3u8" },
//{id: 129, name: "Revry Pride", type: "hls", src: "https://revry-rakuten.amagi.tv/playlist.m3u8" },
//{id: 130, name: "Comedy Channel Live", type: "hls", src: "https://comedydynamics-samsung.amagi.tv/playlist.m3u8" },
//{id: 131, name: "Classic TV Network", type: "hls", src: "https://shoutfactory-samsung.amagi.tv/playlist.m3u8" },
];
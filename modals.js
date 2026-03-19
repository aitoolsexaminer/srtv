document.addEventListener("DOMContentLoaded", () => {

/* =========================
SETTINGS MODAL
========================= */

const modal = document.getElementById("Modal");
const settingsIcon = document.querySelector(".icon-settings");
const closeBtn = document.querySelector(".modal .close");

if (settingsIcon && modal) {
  settingsIcon.addEventListener("click", () => {
    modal.style.display = "block";
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


/* =========================
CHANNEL PICKER MODAL
========================= */

const channelModal = document.getElementById("channelPickerModal");
const channelClose = document.querySelector(".channel-close");

window.activeChannelInput = null;

/* open modal */

document.querySelectorAll(".channel-plus-btn").forEach(btn => {

  btn.addEventListener("click", () => {

    window.activeChannelInput =
      btn.parentElement.querySelector("input");

    if(channelModal){
      channelModal.style.display="block";
    }

  });

});

/* close modal */

if(channelClose){
  channelClose.onclick = () => {
    channelModal.style.display="none";
  };
}


/* =========================
BUILD CHANNEL LIST
========================= */

function buildChannelPicker(){

  const grids=document.querySelectorAll(".chan-list");
  grids.forEach(g=>g.innerHTML="");

  channels.forEach(channel=>{

    const group=document.querySelector(
      `#topic-${channel.group} .chan-list`
    );

    if(!group) return;

    const div=document.createElement("div");
    div.className="channel-item";
    div.textContent=channel.name;

    div.onclick=()=>{
      assignChannelToSlot(channel);
    };

    group.appendChild(div);

  });

}

buildChannelPicker();


/* =========================
CHANNEL SEARCH
========================= */

document.querySelectorAll(".channel-search").forEach(input => {

  const results = input
    .closest(".settings-option-row")
    .querySelector(".channel-results");

  input.addEventListener("input", () => {

    const value = input.value.toLowerCase();
    results.innerHTML = "";

    if (!value) return;

    channels.forEach(channel => {

      if (!channel.name.toLowerCase().includes(value)) return;

      const div = document.createElement("div");
      div.textContent = channel.name;

      div.onclick = () => {
        input.value = channel.name;
        assignChannelToSlot(channel);
        results.innerHTML = "";
      };

      results.appendChild(div);
    });

  });

  // Add this part to handle Enter key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submission if inside a form
      const firstResult = results.querySelector("div");
      if (firstResult) {
        firstResult.click(); // trigger the same action as clicking
      }
    }
  });

});




/* =========================
CITY PICKER MODAL
========================= */

const cityModal=document.getElementById("cityPickerModal");
const cityClose=document.querySelector(".city-close");

let activeInput=null;

document.querySelectorAll(".city-plus-btn").forEach(btn=>{

  btn.addEventListener("click",()=>{

    activeInput=btn.parentElement.querySelector("input");

    if(cityModal)
      cityModal.style.display="block";

  });

});

if(cityClose){

  cityClose.onclick=()=>{

    if(cityModal)
      cityModal.style.display="none";

  };

}


/* =========================
BUILD CITY PICKER
========================= */

function buildCityPicker(){

  const regions={

    americas:document.querySelector("#region-americas .region-cities"),
    europe:document.querySelector("#region-europe .region-cities"),
    middleeast:document.querySelector("#region-middleeast .region-cities"),
    africa:document.querySelector("#region-africa .region-cities"),
    asia:document.querySelector("#region-asia .region-cities"),
    oceania:document.querySelector("#region-oceania .region-cities")

  };

  cities.forEach(city=>{

    let regionKey=city.region;

    if(
      regionKey==="southasia"||
      regionKey==="centralasia"||
      regionKey==="southeastasia"||
      regionKey==="eastasia"
    ){
      regionKey="asia";
    }

    const container=regions[regionKey];
    if(!container) return;

    const div=document.createElement("div");
    div.textContent=city.name;

    div.onclick=()=>{

      if(activeInput){

        activeInput.value=city.name;

        const slot=parseInt(activeInput.dataset.slot);
        const zoneId=zoneSlots[slot];

        zones[zoneId]=city.tz;

        const label=document.querySelector(
          `.clock-option-clock[data-clock-label="${zoneId}"]`
        );

        if(label) label.textContent=city.label;

        updateWorldClock();
      }

      if(cityModal)
        cityModal.style.display="none";

    };

    container.appendChild(div);

  });

}

buildCityPicker();




/* =========================
CITY SEARCH
========================= */

document.querySelectorAll(".city-search").forEach(input => {

  const results = input
    .closest(".settings-option-row")
    .querySelector(".city-results");

  input.addEventListener("input", () => {

    const value = input.value.toLowerCase();
    results.innerHTML = "";

    if (!value) return;

    cities.forEach(city => {

      if (!city.name.toLowerCase().includes(value)) return;

      const div = document.createElement("div");
      div.textContent = city.name;

      div.onclick = () => {

        input.value = city.name;

        const slot = parseInt(input.dataset.slot);
        const zoneId = zoneSlots[slot];

        zones[zoneId] = city.tz;

        const label = document.querySelector(
          `.clock-option-clock[data-clock-label="${zoneId}"]`
        );

        if (label) label.textContent = city.label;

        updateWorldClock();

        results.innerHTML = "";

      };

      results.appendChild(div);

    });

  });

  /* ENTER KEY */

  input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

      e.preventDefault();

      const firstResult = results.querySelector("div");

      if (firstResult) {
        firstResult.click();
      }

    }

  });

});









/* =========================
REGION ACCORDIONS
========================= */

const regions = document.querySelectorAll('.region');

regions.forEach(region => {

  region.addEventListener('toggle', () => {

    if (region.open) {

      regions.forEach(r => {

        if (r !== region) {
          r.open = false;
        }

      });

    }

  });

});





/* =========================
NEWS PICKER MODAL
========================= */

const newsModal = document.getElementById("newsPickerModal");
const newsClose = newsModal ? newsModal.querySelector(".news-close") : null;

let activeNewsInput = null;
let activeNewsSlot = null;


/* OPEN MODAL */

document.querySelectorAll(".news-plus-btn").forEach(btn => {

  btn.addEventListener("click", () => {

    activeNewsSlot = parseInt(btn.dataset.slot);
    activeNewsInput = btn.parentElement.querySelector(".agency-search");

    if(newsModal)
      newsModal.style.display = "block";

  });

});


/* CLOSE MODAL */

if(newsClose){
  newsClose.addEventListener("click", () => {
    newsModal.style.display = "none";
  });
}


/* CLOSE WHEN CLICK OUTSIDE */

window.addEventListener("click", (e)=>{
  if(e.target === newsModal){
    newsModal.style.display = "none";
  }
});


/* =========================
NEWS SEARCH MODAL
========================= */

document.querySelectorAll(".agency-search").forEach(input => {

  const results = input
    .closest(".settings-option-row")
    .querySelector(".agency-results");

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    results.innerHTML = "";
    if (!value) return;

    Object.keys(feeds).forEach(feedKey => {
      const label = feedKey
        .replace(/_/g," ")
        .replace(/([a-z])([A-Z])/g,"$1 $2");

      if (!label.toLowerCase().includes(value)) return;

      const div = document.createElement("div");
      div.textContent = label;

      div.onclick = () => {
        input.value = label;
        const slot = parseInt(input.dataset.slot);
        const row = document.querySelector(`.ticker-row[data-slot="${slot}"]`);
        if (!row) return;
        row.dataset.feed = feedKey;
        const agency = row.querySelector(".agency");
        if (agency) agency.textContent = label.toUpperCase();
        const content = row.querySelector(".ticker-content");
        if (content) {
          content.innerHTML = "";
          loadRSS(feedKey, content);
        }
        results.innerHTML = "";
      };

      results.appendChild(div);
    });
  });

  // Handle Enter key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const firstResult = results.querySelector("div");
      if (firstResult) firstResult.click();
    }
  });

});


/* =========================
BUILD MODAL AGENCY LIST
========================= */

function buildNewsPicker(){

  const topics = {

    wires: document.querySelector("#topic-wires .list-agencies"),
    major: document.querySelector("#topic-major .list-agencies"),
    us: document.querySelector("#topic-us .list-agencies"),
    finance: document.querySelector("#topic-finance .list-agencies"),
    tech: document.querySelector("#topic-tech .list-agencies"),
    middleeast: document.querySelector("#topic-middleeast .list-agencies"),
    europe: document.querySelector("#topic-europe .list-agencies"),
    asia: document.querySelector("#topic-asia .list-agencies"),
    russia: document.querySelector("#topic-russia .list-agencies"),
    analysis: document.querySelector("#topic-analysis .list-agencies"),
    arabi: document.querySelector("#topic-arabi .list-agencies")

  };

  Object.keys(feeds).forEach(feedKey => {

    const topic = newsMap[feedKey];
    const container = topics[topic];

    if(!container) return;

    const div = document.createElement("div");

    const label = feedKey
      .replace(/_/g," ")
      .replace(/([a-z])([A-Z])/g,"$1 $2");

    div.textContent = label;

    div.onclick = () => {

      if(!activeNewsInput) return;

      activeNewsInput.value = label;

      const slot = activeNewsSlot;
      const row = document.querySelector(`.ticker-row[data-slot="${slot}"]`);

      if(!row){
        console.warn("Ticker row not found:", slot);
        return;
      }

      row.dataset.feed = feedKey;

      const agency = row.querySelector(".agency");
      if(agency)
        agency.textContent = label.toUpperCase();

      const content = row.querySelector(".ticker-content");

      if(content){
        content.innerHTML = "";
        loadRSS(feedKey, content);
      }

      if(newsModal)
        newsModal.style.display = "none";

    };

    container.appendChild(div);

  });

}

buildNewsPicker();





/* =========================
NEWS ACCORDIONS
========================= */

const topics = document.querySelectorAll('.news');

topics.forEach(news => {

  news.addEventListener('toggle', () => {

    if (news.open) {

      topics.forEach(r => {

        if (r !== news) {
          r.open = false;
        }

      });

    }

  });

});

});




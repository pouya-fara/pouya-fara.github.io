currentSide = '';
// set full‐viewport heights
document.querySelector("html").style.height = window.innerHeight + "px";
document.querySelector("body").style.height = window.innerHeight + "px";
document.querySelector("#loading").style.height = window.innerHeight + "px";
document.querySelector("#web-content").style.height = window.innerHeight + "px";
document.querySelector("#menu-list").style.height = window.innerHeight + "px";
let lastWidth = window.innerWidth;
let contents = document.querySelectorAll(".content");
contents.forEach(c =>{
  c.style.height = window.innerHeight + "px";
})

oneCycleCompleted = false;

// preloading
window.onload = function(){
  let preloader = document.getElementById("loading");
  preloader.style.opacity = 1;
  preloader.style.display = "none";

  let webContent = document.getElementById("web-content");
  webContent.style.display = "flex";
  
  // Start checking width
  startWidthCheck();
};

function startWidthCheck() {
  setInterval(() => {
    const currentWidth = window.innerWidth;
    if (currentWidth != lastWidth){
      changeWidth();
      lastWidth = currentWidth
    }
  }, 30);
}
function changeWidth(){
  mobileWidthActivatation = window.innerWidth < 900;
  countedMobileElements = 0;
  document.querySelector("html").style.height = window.innerHeight + "px";
  document.querySelector("body").style.height = window.innerHeight + "px";
  document.querySelector("#loading").style.height = window.innerHeight + "px";
  document.querySelector("#web-content").style.height = window.innerHeight + "px";
  document.querySelector("#menu-list").style.height = window.innerHeight + "px";
  let contents = document.querySelectorAll(".content");
  contents.forEach(c =>{
    c.style.height = window.innerHeight + "px";
  })
  if (!mobileWidthActivatation) {
      let items = document.querySelectorAll('.content')[currentPage]
                       .querySelectorAll('.mobile-content');
      if (items.length) {
        for (let i = 0; i < items.length; i++) {
          items[i].style.display = "block";
          items[i].style.opacity = 1;
        }
        countedMobileElements = 0;
      }
  }
  else{
          let items = document.querySelectorAll('.content')[currentPage]
                       .querySelectorAll('.mobile-content');
      if (items.length) {
          items[0].style.display = "block";
          items[0].style.opacity = 1;
        for (let i = 1; i < items.length; i++) {
          items[i].style.display = "None";
          items[i].style.opacity = 0;
        }
        countedMobileElements = 0;
      }

  }
}
let currentPage = 0; 
let pageLength = document.querySelectorAll('.content').length;

// helper for delaying
function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

// animate menu titles
async function contentAnimation(enter){
  let titles = document.querySelectorAll(".page-title");
  if (enter) {
    await delay(20);
    for (let t of titles) {
      t.style.opacity = "1";
      await delay(20);
    }
  } else {
    titles.forEach(t => t.style.opacity = "0");
  }
}

// slide transition
function slide_change(p1, p2) {
  if (mobileWidthActivatation) resetContent();

  // hide old
  let page1 = document.querySelectorAll('.content')[p1];
  page1.style.opacity = 0;
  page1.style.display = "none";

  // show new
  let page2 = document.querySelectorAll('.content')[p2];
  page2.style.display = "block";
  page2.style.opacity = 1;

  currentPage = p2;
  if (p2 === 1) contentAnimation(true);
  else if (p1 === 1) contentAnimation(false);
  if (p2 == pageLength - 1){
    oneCycleCompleted = true;
  }
}

// dynamic date counters
function updateDates(){
  // starting-time
  let start = new Date('2023-09-06');
  let now = new Date();
  let diffYears = Math.abs(now - start) / (1000 * 60 * 60 * 24 * 365.25);
  document.getElementById("starting-time").innerText = Math.round(diffYears);
  if (Math.round(diffYears) == 1){
      document.getElementById("starting-time-word").innerText = "year";
  }

  // ending-time
  let grad = new Date('2027-06-01');
  let years = grad.getFullYear() - now.getFullYear();
  let months = grad.getMonth() - now.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  document.getElementById("ending-time-year").innerText = Math.round(years);
  if (Math.round(years) ==1){document.getElementById("ending-time-year-word").innerText = "year"}
  document.getElementById("ending-time-month").innerText = Math.round(months);
  if (Math.round(months) ==1){document.getElementById("ending-time-month-word").innerText = "month"}
}

setInterval(updateDates, 1000);




let mobileWidthActivatation = window.innerWidth < 900;
let countedMobileElements = 0;

// mobile‐only per‐slide content cycling
function mobileContentChange(next){
  let content = document.querySelectorAll('.content')[currentPage];
  let items = content.querySelectorAll('.mobile-content');
  if (!items.length) return;

  let curr = items[countedMobileElements];
  curr.style.opacity = 0;
  curr.style.display = "none";

  countedMobileElements += next ? 1 : -1;
  let target = items[countedMobileElements];
  target.style.display = "block";
  target.style.opacity = 1;
}

function showFirstContent(){
  let items = document.querySelectorAll('.content')[currentPage]
                       .querySelectorAll('.mobile-content');
  if (items.length) {
    items[0].style.display = "block";
    items[0].style.opacity = 1;
    countedMobileElements = 0;
  }
}

function showLastContent(){
  let items = document.querySelectorAll('.content')[currentPage]
                       .querySelectorAll('.mobile-content');
  if (items.length) {
    let last = items[items.length - 1];
    last.style.display = "block";
    last.style.opacity = 1;
    countedMobileElements = items.length - 1;
  }
}

function resetContent(){
  let items = document.querySelectorAll('.content')[currentPage]
                       .querySelectorAll('.mobile-content');
  if (!items.length) return;
  let curr = items[countedMobileElements];
  curr.style.opacity = 0;
  curr.style.display = "none";
  countedMobileElements = 0;
}

// next/prev slide
function nextSlide() {
  if (mobileWidthActivatation) {
    let items = document.querySelectorAll('.content')[currentPage]
                         .querySelectorAll('.mobile-content');
    if (countedMobileElements >= items.length - 1) {
      slide_change(currentPage, currentPage < pageLength - 1 ? currentPage + 1 : 0);
      showFirstContent();
    } else {
      mobileContentChange(true);
    }
  } else {
    slide_change(currentPage, currentPage < pageLength - 1 ? currentPage + 1 : 0);
  }
}

function lastSlide() {
  if (mobileWidthActivatation) {
    let items = document.querySelectorAll('.content')[currentPage]
                         .querySelectorAll('.mobile-content');
    if (countedMobileElements <= 0) {
      slide_change(currentPage, currentPage > 0 ? currentPage - 1 : pageLength - 1);
      showLastContent();
    } else {
      mobileContentChange(false);
    }
  } else {
    if (oneCycleCompleted){
      slide_change(currentPage, currentPage > 0 ? currentPage - 1 : pageLength - 1);
    }
    else{
      slide_change(currentPage, currentPage > 0 ? currentPage - 1 : 0);
    }
  }
}

// swipe detection
let startX = 0, currentX = 0, startY = 0, currentY = 0;
document.body.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
document.body.addEventListener("touchmove", e => {
  currentX = e.touches[0].clientX;
  currentY = e.touches[0].clientY;
});
document.body.addEventListener("touchend", () => {
  let threshold = 15, verticalTol = 50;
  if (Math.abs(currentY - startY) < verticalTol && currentX !== 0) {
    if (currentX < startX - threshold) nextSlide();
    else if (currentX > startX + threshold) lastSlide();
  }
  startX = currentX = startY = currentY = 0;
});

// keyboard nav
document.onkeyup = function (e) {
  let key = e.which || e.keyCode;
  if (key === 39 || key === 68) nextSlide();
  else if (key === 37 || key === 65) lastSlide();
  else if (key === 13 && currentPage !== 1) slide_change(currentPage, 1);
};

// left/right hover cursor
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (event) => {
    let mouseX = event.clientX;
    let half = window.innerWidth / 2;
    if (mouseX < half) {
      document.body.classList.add('cursor-left');
      document.body.classList.remove('cursor-right');
      currentSide = 'left';
    } else {
      document.body.classList.add('cursor-right');
      document.body.classList.remove('cursor-left');
      currentSide = 'right';
    }
  });
}

const sectionsDic = {
  Home: 0,
  Contents: 1,
  About: 2,
  Education: 5,
  Awards: 7,
  Skills: 9,
  Projects: 13,
};

// UPDATED click handler:
document.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    return;
  }

  const contentButton = event.target.closest('.content-button');
  if (contentButton) {
    const label = contentButton.querySelector('h2')?.textContent.trim();
    if (label && sectionsDic.hasOwnProperty(label)) {
      slide_change(currentPage, sectionsDic[label]);
    }
    return;
  }

  if (currentSide === 'left') lastSlide();
  else if (currentSide === 'right') nextSlide();
});

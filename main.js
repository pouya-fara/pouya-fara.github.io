
document.querySelector("html").style.height = window.innerHeight + "px";
document.querySelector("body").style.height = window.innerHeight + "px";
document.querySelector("#loading").style.height = window.innerHeight + "px";
document.querySelector("#web-content").style.height = window.innerHeight + "px";
document.querySelector("#menu-list").style.height = window.innerHeight + "px";






// pre loading
window.onload = function(){
  let preloader = document.getElementById("loading");
  preloader.style.opacity = 1;
  preloader.style.display = "none";

  let webContent = document.getElementById("web-content");
  webContent.style.display = "flex";
}


let currentPage = 0; // Tracks the current page

let pageLength = document.querySelectorAll('.content').length

// Table of Contents animation

function delay(ms){
  return new Promise(resolve => setTimeout(function(){resolve()}, ms))
}

async function contentAnimation(enter){
  if (enter == true){
    let pageTitle = document.querySelectorAll(".page-title")
    await delay(20)
    for (let i =0;i<pageTitle.length;i++){
      pageTitle[i].style.opacity = "1";
      await delay(20)
    }
  }
  else{
    let pageTitle = document.querySelectorAll(".page-title")
    for (let i =0;i<pageTitle.length;i++){
      pageTitle[i].style.opacity = "0";
    }
  }
}

// Function to change pages
function slide_change(p1, p2) {
  // Reset to the first content of the slide
  if (mobileWidthActivatation){
    resetContent()
  }

  // Hide the current page
  let page1 = document.querySelectorAll('.content')[p1];
  page1.style.opacity = 0;
  page1.style.display = "none";

  // Show the new page
  let page2 = document.querySelectorAll('.content')[p2];
  page2.style.display = "block";
  page2.style.opacity = 1;

  currentPage = p2;
  if (p2 == 1){contentAnimation(true)}
  else if(p1 ==1){contentAnimation(false)}

}


function updateDates(){
  let date1 = new Date('2023-09-06');
  let date2 = new Date();
  
  let diffTime = Math.abs(date2 - date1);
  let diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  document.getElementById("starting-time").innerText = Math.round(diffYears)
  
  // Graduation

  date1 = new Date();
  date2 = new Date('2027-06-01');
  
  diffTime = Math.abs(date2 - date1);
  let years = date2.getFullYear() - date1.getFullYear();
  let months = date2.getMonth() - date1.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  document.getElementById("ending-time-year").innerText = Math.round(years)
  document.getElementById("ending-time-month").innerText = Math.round(months)



}



setInterval(updateDates, 1000);



let mobileWidthActivatation = window.innerWidth<900;


let countedMobileElements = 0;

function mobileContentChange(next){
  let content = document.querySelectorAll('.content')[currentPage];
  let numberOfElements = content.querySelectorAll('.mobile-content').length
  if (numberOfElements>0){
    let currentElement = content.querySelectorAll('.mobile-content')[countedMobileElements]
    currentElement.style.opacity = 0;
    currentElement.style.display = "none";

    if (next){
      let nextElement = content.querySelectorAll('.mobile-content')[countedMobileElements+1]
        
      nextElement.style.display = "block";
      nextElement.style.opacity = 1;
      countedMobileElements+=1;  
    }
  
    else{
      let lastElement = content.querySelectorAll('.mobile-content')[countedMobileElements-1]
        
      lastElement.style.display = "block";
      lastElement.style.opacity = 1;
      countedMobileElements-=1;  
    }  
  }
}



function showFirstContent(){
  let content = document.querySelectorAll('.content')[currentPage];
  let numberOfElements = content.querySelectorAll('.mobile-content').length
  if (numberOfElements>0){

    let firstElement = content.querySelectorAll('.mobile-content')[0]

    firstElement.style.display = "block";
    firstElement.style.opacity = 1;
    countedMobileElements=0
  
  }
}

function showLastContent(){
  let content = document.querySelectorAll('.content')[currentPage];
  let numberOfElements = content.querySelectorAll('.mobile-content').length
  if (numberOfElements>0){
    let lastElement = content.querySelectorAll('.mobile-content')[numberOfElements-1]
    lastElement.style.display = "block";
    lastElement.style.opacity = 1;
  
  }
  countedMobileElements=numberOfElements-1
}


function resetContent(){
  let content = document.querySelectorAll('.content')[currentPage];
  let numberOfElements = content.querySelectorAll('.mobile-content').length
  if (numberOfElements>0){
    let currentElement = content.querySelectorAll('.mobile-content')[countedMobileElements]
    currentElement.style.display = "none";
    currentElement.style.opacity = 0;
    countedMobileElements = 0
  
  }

}

// Next and previous slide functions
function nextSlide() {

  if (mobileWidthActivatation){
    let content = document.querySelectorAll('.content')[currentPage];
    let availableMobileElements = content.querySelectorAll('.mobile-content').length-1
    if (countedMobileElements>=availableMobileElements){
      if (currentPage < pageLength-1) {
        slide_change(currentPage, currentPage + 1);
        showFirstContent()
      } else {
        slide_change(currentPage, 0);
        showFirstContent()
      }
    }
    else{
      mobileContentChange(true)
    }

  }
  else{
    if (currentPage < pageLength-1) {
      slide_change(currentPage, currentPage + 1);
    } else {
      slide_change(currentPage, 0);
    }

  }






}

function lastSlide() {


  if (mobileWidthActivatation){

    let content = document.querySelectorAll('.content')[currentPage];
    if (countedMobileElements<=0){
      if (currentPage >= 1) {
        slide_change(currentPage, currentPage - 1);
        showLastContent()
      } else {
        slide_change(currentPage, pageLength-1);
        showLastContent()
      }  
    }
    else{
      mobileContentChange(false)
  
    }
  
  }

  else{
    if (currentPage >= 1) {
      slide_change(currentPage, currentPage - 1);
    } else {
      slide_change(currentPage, pageLength-1);
    }  

  }
}


// Touch-based swipe navigation
let startX = 0,
  currentX = 0,
  startY = 0,
  currentY = 0;

document.body.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

document.body.addEventListener("touchmove", (event) => {
  currentX = event.touches[0].clientX;
  currentY = event.touches[0].clientY;
});

document.body.addEventListener("touchend", () => {
  let endTarget = 15;
  let yFlexibility = 50;

  // Detect swipe direction only if there's minimal vertical movement
  if (currentX !== 0 && Math.abs(currentY - startY) < yFlexibility) {
    if (currentX < startX - endTarget) {
      nextSlide(); // Swipe left -> Next slide
    } else if (currentX > startX + endTarget) {
      lastSlide(); // Swipe right -> Previous slide
    }

    // Reset touch positions
    startX = 0;
    currentX = 0;
    currentY = 0;
    startY = 0;
  }
});

// Keyboard controls for navigation
document.onkeyup = function (e) {
  let key = e.which || e.keyCode;
  if (key === 39 || key==68) {
    nextSlide(); // Right arrow -> Next slide
  } else if (key === 37 || key==65) {
    lastSlide(); // Left arrow -> Previous slide
  } else if (key == 13) {
    // Enter -> Go to main menu (if not already there)
    if (currentPage !== 1) {
      slide_change(currentPage, 1);
    }
  }
};

let currentSide = '';

if (window.innerWidth>900){
  

document.addEventListener('mousemove', (event) => {
  const screenWidth = window.innerWidth;
  const mouseX = event.clientX;

  if (mouseX < screenWidth / 2) {
    // Mouse is on the left side
    document.body.classList.add('cursor-left');
    document.body.classList.remove('cursor-right');
  } else {
    // Mouse is on the right side
    document.body.classList.add('cursor-right');
    document.body.classList.remove('cursor-left');
  }
});

document.addEventListener('mousemove', (event) => {
  const screenWidth = window.innerWidth;
  const mouseX = event.clientX;
  currentSide = mouseX < screenWidth / 2 ? 'left' : 'right';
});

}


sectionsDic = {Home:0, Contents:1, About:2, Education:5, Awards:7, Skills:9, Projects:13, Contact:15}


document.addEventListener('click', (event) => {
  const clickedElement = event.target;

  // Check if the clicked element (or its parent) has the class 'content-button'
  const contentButton = clickedElement.closest('.content-button');

  if (contentButton) {
    const text = contentButton.querySelector('h2').textContent.trim();
    slide_change(currentPage, sectionsDic[text]);
  }
  else {
    if (currentSide === 'left') {
      lastSlide();
    } else if (currentSide === 'right') {
      nextSlide();
    }
  }
});

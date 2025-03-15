// pre loading

window.onload = function(){
  let preloader = document.getElementById("loading");
  preloader.style.opacity = 1;
  preloader.style.display = "none";

  let webContent = document.getElementById("web-content");
  webContent.style.display = "block";
}


let currentPage = 0; // Tracks the current page

let pageList = ["home", "content", "about", "education", "awards", "skills", "projects", "contact"];

// Function to change wallpaper and transition between pages
function slide_change(p1, p2) {
  let wallpaper = document.getElementsByClassName("background")[0];

  // Change background image based on the target page
  wallpaper.style.backgroundImage = `url('images/back-${pageList[p2]}.jpg')`;

  // Hide the current page
  let page1 = document.getElementById(pageList[p1]+"-page");
  page1.style.opacity = 0;
  page1.style.display = "none";

  // Show the new page
  let page2 = document.getElementById(pageList[p2]+"-page");
  page2.style.display = "block";
  page2.style.opacity = 1;

  currentPage = p2;

}

// Event listeners for navigation elements
let pic = document.getElementById("picture");
pic.addEventListener("click", function () {
  slide_change(0, 1);
});

let menu = document.getElementById("menu");
menu.addEventListener("click", function () {
  if (currentPage !== 1) {
    slide_change(currentPage, 1);
  }
});

// Table of contents navigation
document.getElementById("home").addEventListener("click", function () {
  slide_change(1, 0);
});

document.getElementById("about").addEventListener("click", function () {
  slide_change(1, 2);
});

document.getElementById("education").addEventListener("click", function () {
  slide_change(1, 3);
});
document.getElementById("awards").addEventListener("click", function () {
  slide_change(1, 4);
});

document.getElementById("skills").addEventListener("click", function () {
  slide_change(1, 5);
});

document.getElementById("projects").addEventListener("click", function () {
  slide_change(1, 6);
});

document.getElementById("contact").addEventListener("click", function () {
  slide_change(1, 7);
});

// Project display busttons
document.querySelectorAll('.project-head').forEach(function (element, index) {
  element.addEventListener('click', function() {
    let descriptions = document.querySelectorAll('.project-description');
    let up = document.querySelectorAll('.up');
    
    if (descriptions[index]) {
      if (descriptions[index].style.opacity == 0){
        descriptions[index].style.display = "block";
        setTimeout(()=>{descriptions[index].style.opacity = 1;}, 0)
        
        up[index].style.transform = "rotate(180deg)"

      }
      else{
        descriptions[index].style.opacity = 0;
        up[index].style.transform = "rotate(0deg)"
        setTimeout(()=>{descriptions[index].style.display = "none";}, 400)
      }
    }
  });
});

// Next and previous slide functions
function nextSlide() {
  if (currentPage < pageList.length-1) {
    slide_change(currentPage, currentPage + 1);
  } else {
    slide_change(currentPage, 0);
  }
}

function lastSlide() {
  if (currentPage >= 1) {
    slide_change(currentPage, currentPage - 1);
  } else {
    slide_change(currentPage, pageList.length-1);
  }
}

// Event listeners for next and back buttons
document.getElementById("next").addEventListener("click", nextSlide);
document.getElementById("back").addEventListener("click", lastSlide);

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
  } else if (key === 38 || key==87 || key==83 || key==40) {
    // Up arrow -> Go to main menu (if not already there)
    if (currentPage !== 1) {
      slide_change(currentPage, 1);
    }
  }
};

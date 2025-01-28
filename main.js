let pageNumber = 1; // Tracks the current page
let availablePages = 6; // Total number of available pages

// Function to change wallpaper and transition between pages
function slide_change(p1, p2) {
  let wallpaper = document.getElementsByClassName("background")[0];

  // Change background image based on the target page
  for (let i = 1; i <= availablePages; i++) {
    if (i === p2) {
      wallpaper.style.backgroundImage = `url('images/back${i}.jpg')`;
    }
  }

  // Hide the current page
  let page1 = document.getElementById("page" + p1);
  page1.style.opacity = 0;
  page1.style.display = "none";

  // Show the new page
  let page2 = document.getElementById("page" + p2);
  page2.style.display = "block";
  page2.style.opacity = 1;
}

// Event listeners for navigation elements
let pic = document.getElementById("picture");
pic.addEventListener("click", function () {
  slide_change(1, 2);
  pageNumber = 2;
});

let menu = document.getElementById("menu");
menu.addEventListener("click", function () {
  if (pageNumber !== 2) {
    slide_change(pageNumber, 2);
    pageNumber = 2;
  }
});

// Table of contents navigation
document.getElementById("home").addEventListener("click", function () {
  slide_change(2, 1);
  pageNumber = 1;
});

document.getElementById("about").addEventListener("click", function () {
  slide_change(2, 3);
  pageNumber = 3;
});

document.getElementById("education").addEventListener("click", function () {
  slide_change(2, 4);
  pageNumber = 4;
});

document.getElementById("skills").addEventListener("click", function () {
  slide_change(2, 5);
  pageNumber = 5;
});

document.getElementById("contact").addEventListener("click", function () {
  slide_change(2, 6);
  pageNumber = 6;
});

// Next and previous slide functions
function nextSlide() {
  if (pageNumber < availablePages) {
    slide_change(pageNumber, pageNumber + 1);
    pageNumber++;
  } else {
    slide_change(pageNumber, 1);
    pageNumber = 1;
  }
}

function lastSlide() {
  if (pageNumber > 1) {
    slide_change(pageNumber, pageNumber - 1);
    pageNumber--;
  } else {
    slide_change(pageNumber, availablePages);
    pageNumber = availablePages;
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
    if (pageNumber !== 2) {
      slide_change(pageNumber, 2);
      pageNumber = 2;
    }
  }
};

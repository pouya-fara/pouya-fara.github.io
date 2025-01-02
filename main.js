

let pageNumber = 1

let availablePages = 6

//Wallpaper change
function slide_change(p1, p2) {

  let wallpaper = document.getElementsByClassName("background")[0]


  for (let i=1;i<=availablePages;i++){
    if (i==p2){
      wallpaper.style.backgroundImage = `url('images/back${i}.jpg')`;
    }
    
  }

  let page1 = document.getElementById("page" + p1)
  page1.style.opacity = 0
  page1.style.display = "none"

  
  let page2 = document.getElementById("page" + p2)
  page2.style.display = "block"
  page2.style.opacity = 1

}




let pic = document.getElementById("picture")
pic.addEventListener("click", function() {slide_change(1, 2);pageNumber = 2})

let menu = document.getElementById("menu")
menu.addEventListener("click", function() {
  if (pageNumber !==2){
    slide_change(pageNumber, 2);
    pageNumber = 2;
  }
})


// Table oc contents

let page1 = document.getElementById("home")
page1.addEventListener("click", function() {slide_change(2, 1);  pageNumber = 1})


let page3 = document.getElementById("about")
page3.addEventListener("click", function() {slide_change(2, 3);pageNumber = 3})


let page4 = document.getElementById("education")
page4.addEventListener("click", function() {slide_change(2, 4);pageNumber = 4})


let page5 = document.getElementById("skills")
page5.addEventListener("click", function() {slide_change(2, 5);pageNumber = 5})


let page6 = document.getElementById("contact")
page6.addEventListener("click", function() {slide_change(2, 6);pageNumber = 6})



let next = document.getElementById("next")


function nextSlide(){
  if (pageNumber<availablePages){
    slide_change(pageNumber, pageNumber+1);
    pageNumber = pageNumber+1;

  } else{
    slide_change(pageNumber--, 1);
    pageNumber = 1
  }
}

function lastSlide(){
  if (pageNumber>1){
    slide_change(pageNumber, pageNumber-1);
    pageNumber--

  } else{
    slide_change(pageNumber, availablePages);
    pageNumber = availablePages
  }
}



next.addEventListener("click", function() {nextSlide()})

let back = document.getElementById("back")
back.addEventListener("click", function() {lastSlide()})



// controlling keys

document.onkeyup = function(e) {
  let key = e.which || e.keyCode;
  if (key == 39) {
    nextSlide()
  } else if (key == 37) {
    lastSlide()
  } else if (key == 38) {
    if (pageNumber !==2){
      slide_change(pageNumber, 2);
      pageNumber = 2;
    }
  }
};
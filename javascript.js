let inputGifs = document.getElementById("input-gifs");
let btnFindGifs = document.getElementById("btn-search");
let btnClearAll = document.getElementById("btn-clear");
let imgs = document.getElementById("imgs");
let princ = document.getElementById("princ");

function cleaning() {
  let imgLength = imgs.children.length;
  confetti.stop();
  for (let j = imgLength; j > 0; j--) {
    imgs.removeChild(imgs.children[j - 1]);
  }
}

async function createElements(gifsName) {
  //Getting json
  let json = await getGifs(gifsName);
  inputGifs.style.background = "transparent";
  inputGifs.style.borderRadius = "0";

  if (json == undefined){
    console.log(err);
  }else{
    if (json.data.length == 0) {
      //No gifs found
      let text = "No gifs found. Please try something else!!!";
      let divP = `
          <p class="p-img"}>${text}</p>
        `;
      imgs.innerHTML = divP;
    } else {
      let gifsImg = [];
      for (let i = 0; i < json.data.length; i++) {
        gifsImg.push(json.data[i].images.original.url);
      }
      let divImg = `
        <div class="img-div" style="background-image: url(${gifsImg[0]})"}></div>
        <div class="img-div" style="background-image: url(${gifsImg[1]})"}></div>
        <div class="img-div" style="background-image: url(${gifsImg[2]})"}></div>
        <div class="img-div" style="background-image: url(${gifsImg[3]})"}></div>
        <div class="img-div" style="background-image: url(${gifsImg[4]})"}></div>
        <div class="img-div" style="background-image: url(${gifsImg[5]})"}></div>
        <div class="img-div" style="background-image: url(${gifsImg[6]})"}></div>
        <div class="img-div" style="background-image: url(${gifsImg[7]})"}></div>
        <div class="img-div" style="background-image: url(${gifsImg[8]})"}></div>
        <div class="img-div" style="background-image: url(${gifsImg[9]})"}></div>
      `;
      imgs.innerHTML = divImg;
    }
  } 
}

async function findGifs(e) {
  //Cleaning elements
  cleaning();

  //Validate input
  if (inputGifs.value == "") {
    inputGifs.setAttribute("placeholder", "you must look for a gif");
  } else {
    //Finding Gifs
    createElements(inputGifs.value);
    confPositive(inputGifs);
  }
  e.preventDefault();
}

function moveGifsFront() {
  //Hidden elements
  for (let i = 0; i < divHidden.length; i++) {
    if (divHidden[i].style.display == "") {
      divHidden[i].style.display = "none";
    } else if (divHidden[i].style.display == "flex") {
      divHidden[i].style.display = "none";
    } else {
      divHidden[i].style.display = "flex";
    }
  }
}

function cleaningAll() {
  //Delete all
  cleaning();
  createElements("gifs");
  inputGifs.value = "";
}

document.addEventListener("DOMContentLoaded", function() {
  createElements("gifs");
});

btnFindGifs.addEventListener("click", findGifs, false);
btnClearAll.addEventListener("click", cleaningAll, false);


document.addEventListener("keypress", function (e) {
  if (e.which == 13) {
    findGifs(e);
  }
}, false);




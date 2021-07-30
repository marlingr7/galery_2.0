let inputGifs = document.getElementById("input-gifs");
let btnFindGifs = document.getElementById("btn-find-gifs");
let btnGifsOnly = document.getElementById("btn-all-gifs");
let btnClearAll = document.getElementById("btn-clear-all");
let imgs = document.getElementById("imgs");
let divHidden = document.getElementsByClassName("show-hidde");
let princ = document.getElementById("princ");

function cleaning() {
  let imgLength = imgs.children.length;
  confetti.stop();
  for (let j = imgLength; j > 0; j--) {
    imgs.removeChild(imgs.children[j - 1]);
  }
}

function showInput() {
  inputGifs.style.background = "var(--line-color)";
  inputGifs.style.borderRadius = "10px";
}

async function createElements() {
  //Getting json
  let json = await getGifs(inputGifs.value);
  inputGifs.style.background = "transparent";
  inputGifs.style.borderRadius = "0";

  if (json == undefined){
    console.log(json);
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
    inputGifs.setAttribute("placeholder", "you must look for some gif");
    showInput();
  } else {
    //Finding Gifs
    createElements();
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

function cleaningInput() {  
  //Clean input
  inputGifs.setAttribute("placeholder", "find your gifs");
  inputGifs.style.background = "transparent";
  inputGifs.style.borderRadius = "0";
}

function cleaningAll() {
  //Delete all
  cleaning();
  cleaningInput();
  inputGifs.value = "";
}

inputGifs.addEventListener("focusin", showInput, false);
inputGifs.addEventListener("focusout", cleaningInput, false);
btnFindGifs.addEventListener("click", findGifs, false);
btnGifsOnly.addEventListener("click", moveGifsFront, false);
btnClearAll.addEventListener("click", cleaningAll, false);

document.addEventListener("keypress", function (e) {
  if (e.which == 13) {
    findGifs(e);
  }
}, false);




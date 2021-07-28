let inputGifs = document.getElementById("input-gifs");
let btnFindGifs = document.getElementById("btn-find-gifs");
let btnGifsOnly = document.getElementById("btn-all-gifs");
let btnClearAll = document.getElementById("btn-clear-all");
let imgs = document.getElementById("imgs");
let divHidden = document.getElementsByClassName("show-hidde");

async function createElements() {
  //Getting json
  let json = await getGifs(inputGifs.value);
  if (json.data.length == 0) {
    //No gifs found
    let pImg = document.createElement("p");
    var text = document.createTextNode(
      "No gifs found. Please try something else!!!"
    );
    pImg.appendChild(text);
    pImg.className = "p-img";
    imgs.appendChild(pImg);
  } else {
    for (let i = 0; i < json.data.length; i++) {
      let divImg = document.createElement("div");
      divImg.style.backgroundImage =
        "url(" + json.data[i].images.original.url + ")";
      divImg.className = "img-div";
      imgs.appendChild(divImg);
    }
  }
}

async function findGifs(e) {
  //Cleaning elements
  cleaning();

  //Validate input
  if (inputGifs.value == "") {
    inputGifs.setAttribute("placeholder", "you must look for some gif");
    inputGifs.style.background = "var(--line-color)";
    inputGifs.style.fontSize = "12px";
    inputGifs.style.borderRadius = "10px";
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

function cleaning() {  
  let imgLength = imgs.children.length;
  confetti.stop();
  for (let j = imgLength; j > 0; j--) {
    imgs.removeChild(imgs.children[j - 1]);
  }
}

function cleaningAll() {  
  cleaning();
  inputGifs.value = "";
}

btnFindGifs.addEventListener("click", findGifs, false);
btnGifsOnly.addEventListener("click", moveGifsFront, false);
btnClearAll.addEventListener("click", cleaningAll, false);

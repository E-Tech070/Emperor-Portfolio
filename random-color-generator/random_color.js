
let colorPreview = document.getElementById("colorPreview");
let hexCode = document.getElementById("hexCode");
let redVal = document.getElementById("redVal");
let greenVal = document.getElementById("greenVal");
let blueVal = document.getElementById("blueVal");
let generateBtn = document.getElementById("generateBtn");
let copyBtn = document.getElementById("copyBtn");
let historyRow = document.getElementById("historyRow");


let colorHistory = [];


function toHex(number) {
  let hex = number.toString(16);
  
  if (hex.length === 1) {
    hex = "0" + hex;
  }
  return hex.toUpperCase();
}


function getTextColor(red, green, blue) {
 
  let brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  if (brightness > 155) {
    return "rgba(0, 0, 0, 0.7)";
  } else {
    return "rgba(255, 255, 255, 0.9)";
  }
}


function generateColor() {

  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  
  let hex = "#" + toHex(red) + toHex(green) + toHex(blue);

  
  colorPreview.style.backgroundColor = "rgb(" + red + ", " + green + ", " + blue + ")";

  
  hexCode.textContent = hex;

 
  redVal.textContent = red;
  greenVal.textContent = green;
  blueVal.textContent = blue;

  
  let textColor = getTextColor(red, green, blue);
  hexCode.style.color = textColor;
  copyBtn.style.color = textColor;
  copyBtn.style.borderColor = textColor.replace("0.7", "0.2").replace("0.9", "0.3");
  copyBtn.style.backgroundColor = textColor.replace("0.7", "0.1").replace("0.9", "0.15");
  document.querySelector(".preview-label").style.color = textColor.replace("0.7", "0.4").replace("0.9", "0.5");

  
  copyBtn.textContent = "Copy HEX Code";
  copyBtn.classList.remove("copied");

  
  addToHistory(hex);
}


function addToHistory(hex) {
 
  colorHistory.unshift(hex);
  if (colorHistory.length > 8) {
    colorHistory.pop();
  }

  
  historyRow.innerHTML = "";

  colorHistory.forEach(function(color) {
    let dot = document.createElement("div");
    dot.className = "history-dot";
    dot.style.backgroundColor = color;
    dot.title = color;

    
    dot.addEventListener("click", function() {
      colorPreview.style.backgroundColor = color;
      hexCode.textContent = color;

      
      let r = parseInt(color.slice(1, 3), 16);
      let g = parseInt(color.slice(3, 5), 16);
      let b = parseInt(color.slice(5, 7), 16);
      redVal.textContent = r;
      greenVal.textContent = g;
      blueVal.textContent = b;

      let textColor = getTextColor(r, g, b);
      hexCode.style.color = textColor;
      copyBtn.style.color = textColor;
    });

    historyRow.appendChild(dot);
  });
}


function copyHexCode() {
  let text = hexCode.textContent;

  
  navigator.clipboard.writeText(text).then(function() {
    
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("copied");

    
    setTimeout(function() {
      copyBtn.textContent = "Copy HEX Code";
      copyBtn.classList.remove("copied");
    }, 2000);
  });
}


generateBtn.addEventListener("click", generateColor);
copyBtn.addEventListener("click", copyHexCode);


document.addEventListener("keydown", function(e) {
  if (e.key === " " || e.key === "Spacebar") {
    e.preventDefault();
    generateColor();
  }
});


generateColor();
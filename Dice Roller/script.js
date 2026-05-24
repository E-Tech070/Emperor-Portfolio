const rollBtn = document.getElementById("rollBtn");
const diceImage = document.getElementById("diceImage");
const resultNumber = document.getElementById("resultNumber");
const rollCount = document.getElementById("rollCount");
const historyRow = document.getElementById("historyRow");

let totalRolls = 0;
let history = [];

function rollDice(){

    // random number 1 - 6
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    // change dice image
    diceImage.src = `./image/dice${randomNumber}.png`;

    // update result text
    resultNumber.textContent = randomNumber;

    // increase total rolls
    totalRolls++;

    // update roll count
    rollCount.textContent = `Total rolls: ${totalRolls}`;

    // add to history array
    history.unshift(randomNumber);

    // keep only last 6 rolls
    if(history.length > 6){
        history.pop();
    }

    // clear history row
    historyRow.innerHTML = "";

    // display history
    history.forEach(function(number){

        const item = document.createElement("div");

        item.classList.add("history-item");

        item.textContent = number;

        historyRow.appendChild(item);

    });

    // animation
    diceImage.classList.add("shake");

    setTimeout(function(){
        diceImage.classList.remove("shake");
    }, 400);

}

rollBtn.addEventListener("click", rollDice);


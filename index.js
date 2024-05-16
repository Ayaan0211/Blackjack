let player = {
    name: "Ayaan", 
    chips: 150
}

let cards = [];
let sum = 0;
let win = 0;
let loss = 0;
let chips = 150;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message");
let sumEl = document.getElementById("sum");
let cardsEl = document.getElementById("cards");
let playerEl = document.getElementById("player");
let winEl = document.getElementById("win");
let lossEl = document.getElementById("loss");

playerEl.textContent = player.name + ": $" + player.chips;
winEl.textContent = "Wins: " + win;
lossEl.textContent = "Losses: " + loss;


function getRandomCard() {
    let random = Math.floor(Math.random() * 13) + 1;
    if (random === 1) return 11;
    if (random > 10) return 10;
    return random; 
}

function startGame() {
    if (cards.length === 0) {
        isAlive = true;
        let card1 = getRandomCard();
        cards = [card1]
        sum = card1;
        renderGame();
    }
}

function renderGame() {

    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }

    sumEl.textContent = "Sum: " + sum;

    if (sum <= 20) {
        message = "Do you want to draw a new card or cash out (50% back?)";
    }
    else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! (Press Reset Game To Play Again)";
        win++;
        winEl.textContent = "Wins: " + win;
        player.chips += (player.chips * 5);
        playerEl.textContent = player.name + ": $" + player.chips;
        hasBlackJack = true;
    }
    else {
        message = "You're out of the game! (Press Reset Game)";
        loss++;
        lossEl.textContent = "Loss: " + loss;
        player.chips -= (player.chips/2);
        playerEl.textContent = player.name + ": $" + player.chips;
        isAlive = false;
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}

function cashOut() {
    if (isAlive === true) {
        player.chips -= (player.chips/2);
        playerEl.textContent = player.name + ": $" + player.chips;
        resetGame();
    }
}

function resetGame() {
    cards = [];
    sum = 0;
    hasBlackJack = false;
    isAlive = false;
    messageEl.textContent = "Press Start Game!";
    cardsEl.textContent = "Cards: ";
    sumEl.textContent = "Sum: "
}
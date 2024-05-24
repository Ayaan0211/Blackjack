let player = {
    name: 'No Name', 
    chips: 0
}

let cards = [];
let sum = 0;
let win = 0;
let loss = 0;
let out = 0;
let hasBlackJack = false;
let isAlive = false;
let start = false;
let message = "";
let messageEl = document.getElementById("message");
let infoEl = document.getElementById("info-btn")
let sumEl = document.getElementById("sum");
let cardsEl = document.getElementById("cards");
let playerEl = document.getElementById("player");
let winEl = document.getElementById("win");
let lossEl = document.getElementById("loss");
let cashEl = document.getElementById("out");

if (!start) {
    messageEl.textContent = ("Press Enter Info!");
}

function info() {
    let username = prompt("Enter Your Name: ");
    let credits = prompt("Enter Amount of Money: ");
    player.name = username;
    player.chips = credits;
    playerEl.textContent = player.name + ": $" + player.chips;
    sum = 0;
    win = 0;
    loss = 0;
    out = 0;
    playerEl.textContent = player.name + ": $" + player.chips;
    messageEl.textContent = "Press Start Game!";
    winEl.textContent = "Wins: " + win;
    lossEl.textContent = "Losses: " + loss;
    cashEl.textContent = "Cash Outs: " + out;
    start = true;
    infoEl.textContent = "New Game";
}

function getRandomCard() {
    let random = Math.floor(Math.random() * 13) + 1;
    console.log(random);
    if (random === 1) return ace();
    if (random > 10) return 10;
    return random;
}

function ace() {
    let value = prompt("Would you like to choose a 1 or 11? (Current Sum: " + sum + ")");
    if (value === "1") return 1;
    if (value === "11") return 11;
}

function startGame() {
    if (cards.length === 0 && start) {
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
        /* player.chips += (Math.round(player.chips * 5 * 100)/100).toFixed(2); */
        player.chips += (player.chips * 5);
        player.chips = Number(Math.round(player.chips + 'e2') + "e-2")
        playerEl.textContent = player.name + ": $" + player.chips;
        isAlive = false;
        hasBlackJack = true;
    }
    else {
        message = "You're out of the game! (Press Reset Game)";
        loss++;
        lossEl.textContent = "Loss: " + loss;
        player.chips -= player.chips/2;
        player.chips = Number(Math.round(player.chips + 'e2') + "e-2")
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
    if (isAlive && !hasBlackJack) {
        player.chips -= player.chips/2;
        player.chips = Number(Math.round(player.chips + 'e2') + "e-2")
        playerEl.textContent = player.name + ": $" + player.chips;
        isAlive = false;
        out++;
        cashEl.textContent = "Cash Outs: " + out;
        resetGame();
    }
}

function resetGame() {
    if (!isAlive) {
        cards = [];
        sum = 0;
        hasBlackJack = false;
        isAlive = false;
        messageEl.textContent = "Press Start Game!";
        cardsEl.textContent = "Cards: ";
        sumEl.textContent = "Sum: ";
    }
}
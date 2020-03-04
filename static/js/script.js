// alert("hello !");
function ageInDays() {
  var birthYear = prompt("お誕生日は？");
  ageInDayss = (2020 - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDayss + "days old."
  );
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src = "./static/images/scatter_structure_gif.gif";
  div.appendChild(image);
}

function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  // console.log(botChoice);
  results = decideWinner(humanChoice, botChoice);
  // console.log(results);
  message = finalMessage(results);
  // console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { scissors: 0, rock: 1, paper: 0.5 },
    scissors: { scissors: 0.5, rock: 0, paper: 1 }
  };
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];
  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "You lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You tied!", color: "yellow" };
  } else {
    return { message: "You won!", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src
  };
  // document.getElementById("clex-box-rps-div").img.remove();
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();
  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");
  humanDiv.innerHTML =
    "<img src='" +
    imageDatabase[humanImageChoice] +
    "' height=150px width=150px style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    "; font-size:60px; padding: 30px;'> " +
    finalMessage["message"] +
    "</h1>";
  botDiv.innerHTML =
    "<img src='" +
    imageDatabase[botImageChoice] +
    "' height=150px width=150px style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

var all_buttons = document.getElementsByTagName("button");
// console.log(all_buttons);
var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}
// console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonsColorReset();
  } else if (buttonThingy.value === "random") {
    randomColors();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}
function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}
function buttonsColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}
function randomColors() {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];
  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0
  },
  cards: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
  cardsMap: {
    A: [1, 11],
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false
};
const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");
document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `./static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  // showResult(computeWinner());
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;

    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");
    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }
    YOU["score"] = 0;
    DEALER["score"] = 0;
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "#ffffff";
    document.querySelector("#dealer-blackjack-result").style.color = "#ffffff";
    document.querySelector("#blackjack-result").textContent = "Let's play!";
    document.querySelector("#blackjack-result").style.color = "black";
    blackjackGame["turnsOver"] = true;
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function dealerLogic() {
  blackjackGame["isStand"] = true;
  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(500);
  }

  blackjackGame["turnsOver"] = true;
  let winner = computeWinner();
  showResult(winner);
}
function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
  }
  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (blackjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      blackjackGame["wins"]++;
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You won!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      blackjackGame["losses"]++;
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You lost!";
      messageColor = "red";
      lossSound.play();
    } else {
      blackjackGame["drews"]++;
      document.querySelector("#drews").textContent = blackjackGame["drews"];
      message = "You drew!";
      messageColor = "black";
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
    console.log(blackjackGame);
  }
}

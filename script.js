let currentPlayer = 1;
let currentScore = 0;
let score1 = 0;
let score2 = 0;
let gamePlaying = true;

const rollDiceButton = document.getElementById("rollDice");
const resetGameButton = document.getElementById("resetGame");
const newGameButton = document.getElementById("newGame");
const holdButton = document.getElementById("hold");
const score1Element = document.getElementById("score1");
const score2Element = document.getElementById("score2");
const currentScore1Element = document.getElementById("currentScore1");
const currentScore2Element = document.getElementById("currentScore2");
const diceDisplay = document.getElementById("diceDisplay");
const diceValueElement = document.getElementById("diceValue");

function rollDice() {
  if (gamePlaying) {
      const diceValue = Math.floor(Math.random() * 6) + 1;
      diceValueElement.textContent = diceValue;

      if (diceValue === 1) {
          currentScore = 0;
          document.getElementById(`currentScore${currentPlayer}`).textContent = currentScore;
          switchPlayer();
      } else {
          currentScore += diceValue;
          document.getElementById(`currentScore${currentPlayer}`).textContent = currentScore;
      }
  }
}

function switchPlayer() {
    currentScore = 0;
    document.getElementById(`currentScore${currentPlayer}`).textContent = currentScore;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById("player1").classList.toggle("active");
    document.getElementById("player2").classList.toggle("active");
}

function resetGame() {
    currentPlayer = 1;
    currentScore = 0;
    score1 = 0;
    score2 = 0;
    score1Element.textContent = "0";
    score2Element.textContent = "0";
    currentScore1Element.textContent = "0";
    currentScore2Element.textContent = "0";
    diceValueElement.textContent = "0";
    document.getElementById("player1").classList.add("active");
    document.getElementById("player2").classList.remove("active");
    rollDiceButton.disabled = false;
    resetGameButton.disabled = false;
    newGameButton.disabled = false;
    holdButton.disabled = false;
    gamePlaying = true;
}

function newGame() {
    resetGame();
}

function hold() {
  if (gamePlaying) {
      if (currentPlayer === 1) {
          score1 += currentScore;
          score1Element.textContent = score1;
          currentScore1Element.textContent = "0"; // Réinitialise les points en cours pour le joueur 1
      } else {
          score2 += currentScore;
          score2Element.textContent = score2;
          currentScore2Element.textContent = "0"; // Réinitialise les points en cours pour le joueur 2
      }

      if (score1 >= 100 || score2 >= 100) {
          gamePlaying = false;
          rollDiceButton.disabled = true;
          resetGameButton.disabled = true;
          newGameButton.disabled = false;
          holdButton.disabled = true;
          document.getElementById(`player${currentPlayer}`).classList.add("winner");
      } else {
          currentScore = 0; // Réinitialise les points en cours après la capitalisation
          currentSumElement.textContent = currentScore;
          switchPlayer();
      }
  }
}

rollDiceButton.addEventListener("click", rollDice);
resetGameButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", newGame);
holdButton.addEventListener("click", hold);

resetGame();
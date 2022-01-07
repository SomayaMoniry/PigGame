"use strict";
// select elements
const score1 = document.getElementById("score--0");
const score2 = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnDice = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");
const current_0 = document.getElementById("current--0");
const current_1 = document.getElementById("current--1");
const player_0 = document.querySelector(".player--0");
const player_1 = document.querySelector(".player--1");

let totalScores, currentNum, activePlayer, playing;

const init = function () {
  totalScores = [0, 0];
  currentNum = 0;
  activePlayer = 0;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  current_0.textContent = 0;
  current_1.textContent = 0;

  diceEl.classList.add("hidden");
  player_0.classList.remove("player--winner");
  player_1.classList.remove("player--winner");
  player_0.classList.add("player--active");
  player_1.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentNum = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player_0.classList.toggle("player--active");
  player_1.classList.toggle("player--active");
};

btnDice.addEventListener("click", function () {
  if (playing) {
    const randomNum = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomNum}.png`;
    // add dice to current Num
    if (randomNum !== 1) {
      currentNum += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentNum;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  // add current score to total score
  if (playing) {
    totalScores[activePlayer] += currentNum;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 100) {
      // finish game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    } else {
      //switch player
      switchPlayer();
    }
  }
});

newBtn.addEventListener("click", init);

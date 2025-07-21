'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.getElementById('dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing, moveCount;
const maxMoves = 20;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  moveCount = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.src = 'dice-1.png';
  diceEl.style.display = 'block';

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function endGameByLimit() {
  playing = false;
  diceEl.style.display = 'none';

  const winner =
    scores[0] > scores[1]
      ? 'PLAYER 1 WINS 🎉'
      : scores[1] > scores[0]
      ? 'PLAYER 2 WINS 🎉'
      : "IT'S A TIE 🤝";

  setTimeout(() => {
    alert(`GAME OVER!\n\n${winner}\n\n(Reached ${maxMoves} moves)`);
  }, 200);
}

btnRoll.addEventListener('click', () => {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  diceEl.style.display = 'block';

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }

  moveCount++;
  if (moveCount >= maxMoves) endGameByLimit();
});

btnHold.addEventListener('click', () => {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.style.display = 'none';
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }

  moveCount++;
  if (moveCount >= maxMoves) endGameByLimit();
});

btnNew.addEventListener('click', init);
init();

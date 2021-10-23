const bird = document.querySelector(".bird");
const gameDisplay = document.querySelector(".game-container");
const sky = document.querySelector(".sky");
const ground = document.querySelector(".ground");

let birdPosition = 100;
let gravity = 2;
const JUMP_HEIGHT = 50;
const MAX_FLYING_HEIGHT = sky.offsetHeight - bird.offsetHeight - JUMP_HEIGHT;
const KEY_CODE_SPACE_BAR = 32;

function applyGravity(position) {
  return (position -= gravity);
}

function updatePosition(newPosition) {
  birdPosition = newPosition;
  bird.style.bottom = newPosition + "px";
}

function controls(e) {
  if (e.keyCode === KEY_CODE_SPACE_BAR) fly();
}

function fly() {
  if (birdPosition < MAX_FLYING_HEIGHT)
    updatePosition((birdPosition += JUMP_HEIGHT));
}
document.addEventListener("keyup", controls);

function startGame() {
  updatePosition(applyGravity(birdPosition));
}
let gameTimerId = setInterval(startGame, 20);

const STARTING_POSITION = 500;

function generateObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  sky.appendChild(obstacle);

  const randomHeight = 50 + Math.floor(Math.random() * 250);
  obstacle.style.height = randomHeight + "px";

  function updateObstaclePosition(xPosition) {
    obstacle.style.left = xPosition + "px";
  }

  let xPosition = STARTING_POSITION;
  updateObstaclePosition(xPosition);

  function moveObstacle() {
    xPosition -= 2;

    updateObstaclePosition(xPosition);

    if (xPosition < -60) {
      clearInterval(timerId);
      sky.removeChild(obstacle);
    }

    if (birdPosition <= 0) gameOver();
  }
  let timerId = setInterval(moveObstacle, 20);

  setTimeout(generateObstacle, 3000);
}
generateObstacle();

function gameOver() {
  clearInterval(gameTimerId);
}

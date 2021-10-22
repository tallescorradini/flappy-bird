const bird = document.querySelector(".bird");
const gameDisplay = document.querySelector(".game-container");
const ground = document.querySelector(".ground");

let position = 100;
let gravity = 2;

function applyGravity(position) {
  return (position -= gravity);
}

function updatePosition(newPosition) {
  position = newPosition;
  bird.style.bottom = newPosition + "px";
}

function fly() {
  updatePosition((position += 50));
}
document.addEventListener("keyup", fly);

function startGame() {
  updatePosition(applyGravity(position));
}
let timerId = setInterval(startGame, 20);

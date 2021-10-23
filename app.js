const gameDisplay = document.querySelector(".game-container");
const sky = document.querySelector(".sky");
const ground = document.querySelector(".ground");

const KEY_CODE_SPACE_BAR = 32;

// GLOBAL

function makeScene() {
  const SCENE_HEIGHT = sky.offsetHeight;
  const GRAVITY = -2;

  function applyGravity(entity) {
    const entityPosition = entity.getPosition();
    const newPosition = entityPosition + GRAVITY;
    entity.updatePosition(newPosition);
  }

  function getMaxFlyingHeight(birdHeight, jumpHeight) {
    return SCENE_HEIGHT - (birdHeight + jumpHeight);
  }
  return { getMaxFlyingHeight, applyGravity };
}
const scene = makeScene();

function makeBird() {
  const element = document.querySelector(".bird");
  const INITIAL_POSITION = 100;
  let position = INITIAL_POSITION;
  const BIRD_HEIGHT = 45;
  const JUMP_HEIGHT = 50;

  function updatePosition(newPosition) {
    position = newPosition;
    element.style.bottom = newPosition + "px";
  }

  function fly() {
    if (position < scene.getMaxFlyingHeight(BIRD_HEIGHT, JUMP_HEIGHT))
      updatePosition(position + JUMP_HEIGHT);
  }

  return {
    getElement: () => element,
    getPosition: () => position,
    fly,
    updatePosition,
  };
}
const bird = makeBird();

function controls(e) {
  if (e.keyCode === KEY_CODE_SPACE_BAR) bird.fly();
}

function updatePositionX(element, position) {
  element.style.left = position + "px";
}

document.addEventListener("keyup", controls);

function startGame() {
  scene.applyGravity(bird);
}
let gameTimerId = setInterval(startGame, 200);

const STARTING_POSITION = 500;

function generateObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  sky.appendChild(obstacle);

  const randomHeight = 50 + Math.floor(Math.random() * 250);
  obstacle.style.height = randomHeight + "px";

  let xPosition = STARTING_POSITION;
  updatePositionX(obstacle, xPosition);

  function moveObstacle() {
    xPosition -= 2;

    updatePositionX(obstacle, xPosition);

    if (xPosition < -60) {
      clearInterval(timerId);
      sky.removeChild(obstacle);
    }
  }
  let timerId = setInterval(moveObstacle, 20);

  setTimeout(generateObstacle, 3000);
}
generateObstacle();

function gameOver() {
  clearInterval(gameTimerId);
}

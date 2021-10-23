const gameDisplay = document.querySelector(".game-container");
const sky = document.querySelector(".sky");
const ground = document.querySelector(".ground");

const KEY_CODE_SPACE_BAR = 32;

// GLOBAL

function makeScene() {
  const SCENE_HEIGHT = sky.offsetHeight;
  const GRAVITY = -2;
  const SCENE_SPEED = -2;
  const obstacles = [];
  let bird;
  let collision = false;

  function applyGravity() {
    if (!bird) return;
    const newPosition = bird.getPosition() + GRAVITY;
    bird.updatePosition(newPosition);

    const birdHasCollided = bird.getPosition() <= 0;
    if (birdHasCollided) collision = true;
  }

  function getMaxFlyingHeight(birdHeight, jumpHeight) {
    return SCENE_HEIGHT - (birdHeight + jumpHeight);
  }

  function insertObstacle(obstacle) {
    sky.appendChild(obstacle.getElement());
    obstacles.push(obstacle);
  }

  function insertBird(entity) {
    sky.appendChild(entity.getElement());
    bird = entity;
  }

  function startMoving() {
    obstacles.forEach((obstacle) => {
      const obstacleIsOutOfBounds = obstacle.getPosition() < -60;
      if (obstacleIsOutOfBounds) {
        sky.removeChild(obstacle.getElement());
        obstacles.shift();
      } else {
        obstacle.updatePosition(obstacle.getPosition() + SCENE_SPEED);
      }

      const obstacleHasCollided =
        obstacle.getPosition() >= 220 &&
        obstacle.getPosition() <= 280 &&
        bird.getPosition() <= obstacle.getHeight();
      if (obstacleHasCollided) collision = true;
    });
  }

  function controls(e) {
    if (e.keyCode === KEY_CODE_SPACE_BAR) bird.fly();
  }

  return {
    getBird: () => bird,
    getMaxFlyingHeight,
    applyGravity,
    insertBird,
    insertObstacle,
    startMoving,
    getControls: () => controls,
    getColision: () => collision,
  };
}

function makeBird() {
  const element = document.createElement("div");
  element.classList.add("bird");
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

function makeObstacle() {
  const INITIAL_POSITION = 500;

  const element = document.createElement("div");
  const uuid = new Date().valueOf().toString();
  element.setAttribute("id", `obstacle_${uuid}`);
  element.classList.add("obstacle");

  const height = 50 + Math.floor(Math.random() * 250);
  element.style.height = height + "px";

  let position = INITIAL_POSITION;

  function updatePosition(newPosition) {
    position = newPosition;
    element.style.left = newPosition + "px";
  }

  return {
    getElement: () => element,
    getPosition: () => position,
    updatePosition,
    getHeight: () => height,
  };
}

const timers = [];
const scene = makeScene();
function setScene() {
  scene.insertBird(makeBird());
  scene.insertObstacle(makeObstacle());
  timers.push(setInterval(() => scene.insertObstacle(makeObstacle()), 3000));
  document.addEventListener("keyup", scene.getControls());
}
setScene();

function updateScene() {
  if (scene.getColision()) {
    gameOver();
    return;
  }
  scene.applyGravity();
  scene.startMoving();
}
timers.push(setInterval(updateScene, 20));

function gameOver() {
  timers.forEach((timer) => clearInterval(timer));
}

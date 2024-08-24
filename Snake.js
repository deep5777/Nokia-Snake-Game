let Row = 30;
let Col = 50;
const PIXEL = 10;

let pixels = new Map();

let Canvas = document.getElementById("canvas");
let Score = document.getElementById("score");
let gameInterval;
let snakePositions;

//  set up all grids 
function InitiateCanvas() {
  for (let i = 0; i < Row; i++) {
    for (let j = 0; j < Col; j++) {
      let pixel = document.createElement('div');
      pixel.style.position = "absolute";
      pixel.style.width = PIXEL + 'px';
      pixel.style.height = PIXEL + 'px';
      pixel.style.left = j * PIXEL + 'px';
      pixel.style.top = i * PIXEL + 'px';
      pixel.style.border = "1px solid #aaa";
      let position = toPos(i, j);
      Canvas.appendChild(pixel);
      pixels.set(position, pixel);

    }
  }

}

InitiateCanvas();


let foodPosition = toPos(15, 16);

function getSnakePositionSet(Snake) {
  let snakePositions = new Set();

  for (let [top, left] of Snake) {
    let position = toPos(top, left);
    pixels.get(position);
    snakePositions.add(position);
  }

  return snakePositions;
}


// for drawing snake in canvas
function drawSnake(Snake) {

  let snakePositions = getSnakePositionSet(Snake);

  // if (snakePositions.has(toPos(head[0], head[1])) || (head[0] > Row || head[1] > Col)) {
  //   clearInterval(gameInterval);
  //   Canvas.style.borderColor = 'Red';
  // };

  for (let i = 0; i < Row; i++) {
    for (let j = 0; j < Col; j++) {
      let currentPosition = toPos(i, j);
      let pixel = pixels.get(currentPosition)
      let background = 'white';
      if (currentPosition === foodPosition) {
        background = 'red';
      }
      else if (snakePositions.has(currentPosition)) {
        background = 'black';
      }
      pixel.style.background = background;

    }
  }
}

//  it detects snake's current coordinates
let currentSnake = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4]
]

drawSnake(currentSnake);

// set up snake's direction 
let moveRight = ([t, l]) => [t, l + 1];
let moveLeft = ([t, l]) => [t, l - 1];
let moveUp = ([t, l]) => [t - 1, l];
let moveDown = ([t, l]) => [t + 1, l];

let currentDirection = moveRight;
let flushedDirection = currentDirection;
let cnt = 0;

window.addEventListener("keydown", (e) => {

  switch (e.key) {
    case "ArrowLeft":
    case "L":
    case "l":
      if (flushedDirection !== moveRight) {
        currentDirection = moveLeft;
      }
      break;
    case "ArrowRight":
    case "D":
    case "d":
      if (flushedDirection !== moveLeft) {
        currentDirection = moveRight;
      }
      break;
    case "ArrowUp":
    case "W":
    case "w":
      if (flushedDirection !== moveDown) {
        currentDirection = moveUp;
      }
      break;
    case "ArrowDown":
    case "s":
    case "S":
      if (flushedDirection !== moveUp) {
        currentDirection = moveDown;
      }
      break;
    case " ":
      if (cnt === 0) {
        clearInterval(gameInterval);
        cnt += 1;
      }
      else {
        cnt = 0;
        start();
      }
  }
})

function toPos(top, left) {
  return top + '_' + left;

}

//  let's find out food's position 

function FindPosition() {
  const [headx, heady] = currentSnake[4];

  let FoodTop = Math.floor(Math.random() * (30 - headx + 1));
  let FoodLeft = Math.floor(Math.random() * (50 - heady + 1));

  return toPos(FoodTop, FoodLeft);

}

let count = 0;

function step() {
  currentSnake.shift();
  let head = currentSnake[currentSnake.length - 1];
  let nexthead = currentDirection(head);
  flushedDirection = currentDirection;

  //  first we check valid head 
  if (!chekvalidHead(currentSnake, nexthead)) {
    stopGame();
    return;
  }
  //  then we add nexthead in snake

  currentSnake.push(nexthead);

  // for eatting food
  if (toPos(head[0], head[1]) === foodPosition) {
    currentSnake.push(nexthead);
    count += 1;
    Score.innerHTML = count + '';
  }
  drawSnake(currentSnake);
}


function chekvalidHead(Snake, [top, left]) {
  let snakePositions = getSnakePositionSet(Snake);
  if (top < 0 || top >= Row) return false;
  if (left < 0 || top >= Col) return false;
  let position = toPos(top, left);
  if (snakePositions.has(position)) return false;
  return true;
}


// for stop the game 

function stopGame() {
  clearInterval(gameInterval);
  Canvas.style.borderColor = 'red';
}

function start() {
  console.log("start")
  gameInterval = setInterval(() => {
    step();
  }, 100);
}

start();

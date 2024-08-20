
let Row = 30;
let Col = 50;
const PIXEL = 10;

let pixels = new Map();

let Canvas = document.getElementById("canvas");

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
      let position = i + '_' + j;
      Canvas.appendChild(pixel);
      pixels.set(position, pixel);

    }
  }

}

InitiateCanvas();


// for snakde 
function drawSnake(Snake) {

  let snakePositions = new Set();

  for (let [x, y] of Snake) {
    let position = x + '_' + y
    pixels.get(position);
    snakePositions.add(position);
  }

  for (let i = 0; i < Row; i++) {
    for (let j = 0; j < Col; j++) {
      let currentPosition = i + '_' + j;
      let pixel = pixels.get(currentPosition)
      pixel.style.background = snakePositions.has(currentPosition) ? 'black' : 'white';

    }
  }
}

let currentSnake = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4]
]

drawSnake(currentSnake);

// set up snake's direction 




function step() {
  currentSnake.shift();

  let head = currentSnake[currentSnake.length - 1];
  currentSnake.push([head[0], head[1] + 1])
  drawSnake(currentSnake);
}

setInterval(() => {
  step();
}, 100);
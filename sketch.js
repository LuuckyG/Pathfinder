// Written by Luuk Geelen
// 03 - 12 - 2020

var cols = 30;
var rows = 30;
var grid = [];

var canvasHeight = 700;
var canvasWidth = 700;
var boxSize = canvasHeight / rows;
var searcher = new Searcher(0, 0, boxSize, rows, cols);


function setup() {
  createCanvas(canvasHeight, canvasWidth)
  background(255);
  frameRate(60);

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      var box = new Box(i * boxSize, j * boxSize, boxSize);
      box.show();
      grid.push(box);
    }
  }
}


function draw() {
  if (keyIsPressed) {
    if (keyCode == UP_ARROW) { searcher.walk(0, -1); }
    else if (keyCode == LEFT_ARROW) { searcher.walk(-1, 0); }
    else if (keyCode == DOWN_ARROW) { searcher.walk(0, 1); }
    else if (keyCode == RIGHT_ARROW) { searcher.walk(1, 0); }
  }

  index = (searcher.y - 1) + searcher.x * cols;

  if (index >= 0 && index <= grid.length) { grid[index].visited = true; }
  searcher.show();
}

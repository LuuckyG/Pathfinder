// Written by Luuk Geelen

const COLS = 20;
const ROWS = 20;
const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 800;
const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = ROWS - 1;
const FINISH_NODE_COL = COLS - 1;
const BLOCK_PERCENTAGE = 0.2;
const DIAGONAL_MOVEMENT = false;

var grid;
var w, h;
var searcher;
var openSet = [];
var closedSet = [];
var blockedSet = [];
var path = [];
var start;
var end;

function setup() {
  createCanvas(CANVAS_HEIGHT, CANVAS_WIDTH);
  background(255);

  w = width / COLS;
  h = height / ROWS;
  searcher = new Searcher(0, 0, w, h, ROWS, COLS);

  grid = new Array(COLS);
  for (var i = 0; i < COLS; i++) {
    grid[i] = new Array(ROWS);
  }

  for (var i = 0; i < COLS; i++) {
    for (var j = 0; j < ROWS; j++) {
      grid[i][j] = new Box(i, j);
    }
  }

  start = grid[START_NODE_COL][START_NODE_ROW];
  end = grid[FINISH_NODE_COL][FINISH_NODE_ROW];

  openSet.push(start);

  for (var i = 0; i < COLS; i++) {
    for (var j = 0; j < ROWS; j++) {
      if (random() > 1 - BLOCK_PERCENTAGE) {
        if (
          !(
            (i == START_NODE_COL && j == START_NODE_ROW) ||
            (i == FINISH_NODE_COL && j == FINISH_NODE_ROW)
          )
        ) {
          grid[i][j].blocked = true;
          blockedSet.push(grid[i][j]);
        }
      }
    }
  }

  for (var i = 0; i < COLS; i++) {
    for (var j = 0; j < ROWS; j++) {
      grid[i][j].getNeighbors();
      grid[i][j].show(color(255));
    }
  }
}

function draw() {
  if (keyIsPressed) {
    if (keyCode == 13) {
      // Enter
      openSet = [];
      closedSet = [];
      blockedSet = [];
      path = [];
      setup();
      setTimeout(500);
    }
  }

  start.show(color(0, 0, 255));
  end.show(color(0, 0, 255));

  if (openSet.length > 0) {
    searcher.walk();
  } else {
    console.log("No Solution");
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  for (var i = 0; i < blockedSet.length; i++) {
    blockedSet[i].show(color(0, 0, 0));
  }

  for (var i = 0; i < path.length; i++) {
    path[i].show(color("yellow"));
  }
}

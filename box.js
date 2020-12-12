class Box {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.width = w;
    this.height = h;
    this.x = i * this.width;
    this.y = j * this.height;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];
    this.previous = undefined;

    this.blocked = false;
    this.visited = false;
    this.walls = [true, true, true, true]; //TLBR
  }

  getNeighbors() {
    if (this.i - 1 >= 0) {
      this.neighbors.push(grid[this.i - 1][this.j]);
    }
    if (this.i + 1 < COLS) {
      this.neighbors.push(grid[this.i + 1][this.j]);
    }
    if (this.j - 1 >= 0) {
      this.neighbors.push(grid[this.i][this.j - 1]);
    }
    if (this.j + 1 < ROWS) {
      this.neighbors.push(grid[this.i][this.j + 1]);
    }

    if (DIAGONAL_MOVEMENT) {
      if (this.i - 1 >= 0 && this.j - 1 >= 0) {
        this.neighbors.push(grid[this.i - 1][this.j - 1]);
      }
      if (this.i - 1 >= 0 && this.j + 1 < ROWS) {
        this.neighbors.push(grid[this.i - 1][this.j + 1]);
      }
      if (this.i + 1 < COLS && this.j - 1 >= 0) {
        this.neighbors.push(grid[this.i + 1][this.j - 1]);
      }
      if (this.i + 1 > COLS && this.j + 1 < ROWS) {
        this.neighbors.push(grid[this.i + 1][this.j + 1]);
      }
    }

    // Remove walls from neighbors
    for (var i = this.neighbors.length - 1; i >= 0; i--) {
      if (this.neighbors[i].blocked) {
        // console.log(this.neighbors[i]);
        this.neighbors.splice(i, 1);
      }
    }
  }

  heuristic() {
    // Euclidean distance
    // this.h = dist(this.i, this.j, end.i, end.j);

    // Manhattan distance
    this.h = abs(this.i, end.i) + abs(this.j, end.j);
  }

  show(col) {
    noStroke();
    rect(this.x, this.y, this.width, this.height);

    if (this.blocked) {
      fill(0);
    } else {
      fill(col);
    }

    strokeWeight(3);
    stroke(51);
    if (this.walls[0]) {
      line(this.x, this.y, this.x + this.width, this.y);
    }
    if (this.walls[1]) {
      line(this.x, this.y, this.x, this.y + this.height);
    }
    if (this.walls[2]) {
      line(
        this.x,
        this.y + this.height,
        this.x + this.width,
        this.y + this.height
      );
    }
    if (this.walls[3]) {
      line(
        this.x + this.width,
        this.y,
        this.x + this.width,
        this.y + this.height
      );
    }
  }
}

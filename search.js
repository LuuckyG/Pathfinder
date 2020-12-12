class Searcher {
  constructor(x, y, width, height, rows, cols) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
    this.winnerIdx = 0;
  }

  walk() {
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[this.winnerIdx].f) {
        this.winnerIdx = i;
      }
    }

    var current = openSet[this.winnerIdx];
    this.reconstructPath();

    if (current === end) {
      this.removeFromArray(openSet, current);
      this.removeFromArray(closedSet, current);
      path.push(current);
      console.log("Finished");
      return;
    }

    this.removeFromArray(openSet, current);
    closedSet.push(current);

    // distance is 1 to neighbors
    var tentativeGScore = current.g + 1;
    for (var i = 0; i < current.neighbors.length; i++) {
      var neighbor = current.neighbors[i];

      if (neighbor.blocked) {
        console.log(neighbor);
      }

      if (closedSet.includes(neighbor)) {
        continue;
      }
      if (!openSet.includes(neighbor)) {
        neighbor.previous = current;
        neighbor.g = tentativeGScore;
        neighbor.h = neighbor.heuristic();
        neighbor.f = neighbor.g + neighbor.h;
        openSet.push(neighbor);
      }
      if (tentativeGScore < neighbor.g) {
        neighbor.previous = current;
        neighbor.g = tentativeGScore;
        neighbor.h = neighbor.heuristic();
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }

  removeFromArray(arr, element) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == element) {
        arr.splice(i, 1);
      }
    }
  }

  reconstructPath() {
    path = [];
    path.push(openSet[this.winnerIdx]);
    var current = openSet[this.winnerIdx];

    while (current.previous) {
      path.push(current.previous);
      current = current.previous;
    }
  }

  show() {
    strokeWeight(3);
    stroke(0);
    fill(color("magenta"));
    rect(this.x * this.width, this.y * this.height, this.width, this.height);
  }
}

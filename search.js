
class Searcher {
    constructor(x, y, size, rows, cols) {
        this.x = x;
        this.y = y;
        this.cols = cols;
        this.rows = rows;
        this.maxIndex = cols * rows - 1;
        this.size = size;
    }

    walk (x, y) {
        if (this.x + x >= this.cols - 1) { this.x = (this.cols - 1); } 
        else if (this.x + x <= 0) { this.x = 0; } 
        else { this.x += x; }

        if (this.y + y >= this.rows - 1) { this.y = (this.rows - 1); } 
        else if (this.y + y <= 0) { this.y = 0; } 
        else { this.y += y; }
    }

    show() {
        strokeWeight(3);
        stroke(0);
        fill(color('magenta'));
        rect(this.x * this.size, this.y * this.size, this.size);
    }
}

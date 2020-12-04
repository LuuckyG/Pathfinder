
class Box {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.neighbors = undefined;
        this.neighborWalls = undefined;
        
        this.visited = false;
        this.walls = [true, true, true, true]; //TLBR
    }

    show () {
        noStroke();
        rect(this.x, this.y, this.size);

        if (this.visited) { 
            fill(color('magenta'));
        } else {
            fill(color('white'));
        }

        strokeWeight(3);
        stroke(51);
        if (this.walls[0]) { line(this.x, this.y, this.x + this.size, this.y); }
        if (this.walls[1]) { line(this.x, this.y, this.x, this.y + this.size); }
        if (this.walls[2]) { line(this.x, this.y + this.size, this.x + this.size, this.y + this.size);}  
        if (this.walls[3]) { line(this.x + this.size, this.y, this.x + this.size, this.y + this.size);}  
    }

}

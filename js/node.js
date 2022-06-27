function Node (val, X, Y) {

    this.value = val;
    this.x = X;
    this.y = Y;
    this.edges = [];
    this.queried = false;
    this.previous;

}

Node.prototype.display = function () {

    fill(ACCENT_2);
    stroke(ACCENT_1);
    strokeWeight(1);
    circle(this.x, this.y - NODE_SIZE / 2.35, NODE_SIZE * 4);

    stroke(ACCENT_1);
    strokeWeight(1);
    fill(BACKGROUND_COLOR);
    textSize(NODE_SIZE * 1.2);
    textFont(defaultFont);
    textAlign(CENTER)
    text(this.value, this.x, this.y);

}

Node.prototype.addNeighbor = function (node) { if (node != this) { this.edges.push(node); } }

Node.prototype.lightUp = function () {

    fill(color(108, 240, 128));
    stroke(color(37, 138, 64));
    strokeWeight(5);
    circle(this.x, this.y - NODE_SIZE / 2.35, NODE_SIZE * 4);

    strokeWeight(0);
    fill(BACKGROUND_COLOR);
    textSize(NODE_SIZE * 1.2);
    textFont(defaultFont);
    textAlign(CENTER)
    text(this.value, this.x, this.y);

}

Node.prototype.lightUpEdges = function (node1, node2) {

    if (node1 !== undefined && node2 !== undefined) {

        stroke(color(37, 138, 64));
        strokeWeight(5);
        line(node1.x, node1.y - 8, node2.x, node2.y - 8);

    }

}
function Graph () {

    this.nodes = [];
    this.graph = {};
    this.start;
    this.end;

}

Graph.prototype.addNode = function (node) {

    this.nodes.push(node);
    this.graph[node.value] = node;

}

Graph.prototype.setStart = function (node) {

    this.start = this.graph[node];
    return this.start;

}

Graph.prototype.setEnd = function (node) {

    this.end = this.graph[node];
    return this.end;

}
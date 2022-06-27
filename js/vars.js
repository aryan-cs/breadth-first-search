// canvas
var canvas;
const SCALE = 1.6;
const VARIABLE_SCALING = false;

function limit (value, min, max) { return Math.min(Math.max(value, min), max); }

window.addEventListener("resize", function (ignored) {

  if (VARIABLE_SCALING) { resizeCanvas(Math.floor(limit(window.innerWidth / SCALE, 1000, 1200)), Math.floor(limit(window.innerWidth / SCALE, 580, 610))); }

}, true);

// colors
const BACKGROUND_COLOR = getComputedStyle(document.querySelector(":root")).getPropertyValue("--background-color");
const ACCENT_1 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--accent-1");
const ACCENT_2 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--accent-2");

// project
NODE_SIZE = 20;
var queue, path;

function createNodes (count) {

  var presetX = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100];
  
  var presetY = [100, 200, 300, 400, 500];

  var leftHalf = floor(count / 2);

  for (var createNodesIndex = 0; createNodesIndex < count; createNodesIndex++) {

    if (presetX.length <= 0) { presetX = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100]; }
    if (presetY.length <= 0) { presetY = [100, 200, 300, 400, 500]; }

    var cords = [presetX.splice(floor(random(0, presetX.length - 1)), 1)[0], presetY.splice(floor(random(0, presetY.length - 1)), 1)[0]]

    for (var checkNodesIndex = 0; checkNodesIndex < web.nodes.length; checkNodesIndex++) { 

      if (!(cords[0] == web.nodes[checkNodesIndex].x && cords[1] == web.nodes[checkNodesIndex].y)) {

        if (createNodesIndex + 4 !== web.nodes[web.nodes.length - 1].value) {

          web.addNode(new Node(createNodesIndex + 4, cords[0], cords[1]));

        }

      }
  
    }

  }
 
}

function displayNodes () { for (var n = 0; n < web.nodes.length; n++) { web.nodes[n].display(); } }

function checkOverlap () {

  for (var n1 = 0; n1 < web.nodes.length; n1++) {

    for (var n2 = 0; n2 < web.nodes.length; n2++) {

      if (isTouching(web.nodes[n1], web.nodes[n2]) && web.nodes[n1].value !== web.nodes[n2].value) { web.nodes[n2].x += 100; }
      
    }
    
  }

}

function isTouching (node1, node2) { return node1.x == node2.x && node1.y == node2.y; }

function displayEdges () {

  for (var n1 = 0; n1 < web.nodes.length; n1++) {

    for (var n2 = 0; n2 < web.nodes.length; n2++) {

      if (hasCommonMultiples(web.nodes[n1].value, web.nodes[n2].value)) {

        stroke(ACCENT_1);
        strokeWeight(1);
        line(web.nodes[n1].x, web.nodes[n1].y - 8, web.nodes[n2].x, web.nodes[n2].y - 8);
        web.nodes[n1].addNeighbor(web.nodes[n2]);

      }
      
  
    }
    
  }

}

function hasCommonMultiples (value1, value2) { return (value1 % value2 == 0 || value2 % value1 == 0); }

function searchNodes (start, end) {

  var startingNode = web.setStart(start);
  var endingNode = web.setEnd(end);

  console.log(startingNode)

  if (startingNode != undefined && endingNode != undefined) {

    queue = [];

    startingNode.queried = true;
    queue.push(startingNode);

    while (queue.length > 0) {

      var current = queue.shift();

      if (current == endingNode) { break; }

      var neighbors = current.edges;

      for (var edge = 0; edge < neighbors.length; edge++) {

        var neighboringNode = neighbors[edge];

        if (!neighboringNode.queried) {

          neighboringNode.queried = true;
          neighboringNode.previous = current;
          queue.push(neighboringNode);

        }

      }

    }

    path = [];
    path.push(endingNode);
    var nextNode = endingNode.previous;
    while (nextNode != null) {

      path.push(nextNode);
      nextNode = nextNode.previous;

    }

  }

}

function visualizeNodes (sequence) {

  console.log(sequence)

  for (var node = 0; node < sequence.length; node++) { sequence[node].lightUpEdges(sequence[node], sequence[node + 1]); }

  displayNodes();

  for (var node = 0; node < sequence.length; node++) { sequence[node].lightUp(); }

}

function createWeb () {

  clear();

  web = new Graph();
  var center = new Node(3, 600, 300);
  web.addNode(center);

  createNodes(14);
  checkOverlap();
  displayEdges();
  displayNodes();

}

function searchFor () {

  clear();
  displayEdges();
  displayNodes();

  console.log(parseInt(document.getElementById("inputField").value.substring(0, document.getElementById("inputField").value.indexOf(","))),
  parseInt(document.getElementById("inputField").value.substring(document.getElementById("inputField").value.indexOf(",") + 2)));
  
  searchNodes(parseInt(document.getElementById("inputField").value.substring(0, document.getElementById("inputField").value.indexOf(","))),
              parseInt(document.getElementById("inputField").value.substring(document.getElementById("inputField").value.indexOf(",") + 2)));
  visualizeNodes(path);

}
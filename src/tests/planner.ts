import { AsyncAstar } from '../lib/asyncastar';

function hash(node: NodeData) {
  return `[${node.x}][${node.y}][${node.z}]`;
}

class NodeData {
  public x: number;
  public y: number;
  public z: number;

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  public valueOf() {
    return this.toString();
  }
  public toString() {
    return hash(this);
  }
}
function manhattan(a,b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function heuristic(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function genSuccessors(a): [NodeData[], number[]] {
  const neighbors = [];
  const transitions: number[] = [];
  // - Y UP
  if (a.y - 1 > 0) {
    neighbors.push(new NodeData(a.x, a.y - 1, a.z));
    transitions.push(1);
  }
  // + X RIGHT
  if (a.x + 1 < width) {
    neighbors.push(new NodeData(a.x + 1, a.y, a.z));
    transitions.push(1);
  }
  // + Y DOWN
  if (a.y + 1 < height) {
    neighbors.push(new NodeData(a.x, a.y + 1, a.z));
    transitions.push(1);
  }
  // - X LEFT
  if (a.x - 1 > 0) {
    neighbors.push(new NodeData(a.x - 1, a.y, a.z));
    transitions.push(1);
  }
  return [neighbors, transitions];
}

const width = 20;
const height = 20;
const startNode = new NodeData(0, 0, 0);
const goalNode = new NodeData(1, 1, 0);

const planner = new AsyncAstar<NodeData>(
  startNode,
  goalNode,
  hash,
  genSuccessors,
  manhattan
);
planner.finished = false;

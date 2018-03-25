import { partial } from 'lodash';
import { AsyncAstar } from '../lib/asyncastar';

export function toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

function hash(node: NodeData) {
  return `[${node.x}][${node.y}][${node.z}]`;
}

export class NodeData {
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
function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function heuristic(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function genSuccessors(map, a: NodeData): [NodeData[], number[]] {
  const { width, height, depth } = map;
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

function stopFn(a, b) {
  return a.x === b.x && a.y === b.y && a.z === b.z
}

export function createPlanner(
  width: number,
  height: number,
  depth: number = 0,
  start: [number, number, number],
  goal: [number, number, number]
) {
  // Spread operator does not work with typescript here (must destructure)... (https://github.com/Microsoft/TypeScript/issues/4130)
  const [sx, sy, sz] = start;
  const [gx, gy, gz] = goal;
  const startNode = new NodeData(sx, sy, sz);
  const goalNode = new NodeData(gx, gy, gz);
  const genSuccessorsPartial = partial(genSuccessors, { width, height, depth });

  const planner = new AsyncAstar<NodeData>(
    startNode,
    goalNode,
    hash,
    genSuccessorsPartial,
    manhattan,
    stopFn
  );

  return planner;
}

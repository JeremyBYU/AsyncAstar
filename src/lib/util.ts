import { partial } from 'lodash';
import ndarray from 'ndarray';
import { AsyncAstar, NodeCost } from '../lib/asyncastar';

export function toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}


export function copyNdaray(arr: ndarray) {
  const arrData = arr.data.slice()
  const newArr = ndarray(arrData, arr.shape, arr.stride, arr.offset)
  return newArr
}

// export function drawPath(arr: ndarray, path: Array<[number, number, number]>): void {
//   path.forEach(node => {
//     const [x, y, z] = node
//     arr.set(x, y, 0, 255)
//     arr.set(x, y, 1, 0)
//     arr.set(x, y, 2, 0)
//   })
// }

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

function genSuccessors(map: ndarray, a: NodeData): [NodeData[], number[]] {
  const [ width, height, depth ] = [map.shape[0], map.shape[1], map.shape[2]];
  const neighbors = [];
  const transitions: number[] = [];
  // - Y TOP
  if (a.y - 1 > 0) {
    if (map.get(a.x, a.y -1, a.z) !== 255) {
      neighbors.push(new NodeData(a.x, a.y - 1, a.z));
      transitions.push(1);
    }
  }
  // -Y+X TOP-RIGHT
  if (a.y - 1 > 0 && a.x + 1 < width) {
    if (map.get(a.x + 1, a.y -1, a.z) !== 255) {
      neighbors.push(new NodeData(a.x + 1, a.y - 1, a.z));
      transitions.push(1);
    }
  }
  // + X RIGHT
  if (a.x + 1 < width) {
    if (map.get(a.x + 1, a.y, a.z) !== 255) {
      neighbors.push(new NodeData(a.x + 1, a.y, a.z));
      transitions.push(1);
    }
  }
  // + X + Y RIGHT-BOTTOM
  if (a.x + 1 < width && a.y + 1 < height) {
    if (map.get(a.x + 1, a.y + 1, a.z) !== 255) {
      neighbors.push(new NodeData(a.x + 1, a.y + 1, a.z));
      transitions.push(1);
    }
  }
  // + Y BOTTOM
  if (a.y + 1 < height) {
    if (map.get(a.x, a.y + 1, a.z) !== 255) {
      neighbors.push(new NodeData(a.x, a.y + 1, a.z));
      transitions.push(1);
    }
  }
  // + Y - X BOTTOM-LEFT
    if (a.y + 1 < height && a.x - 1 > 0) {
      if (map.get(a.x - 1, a.y + 1, a.z) !== 255) {
        neighbors.push(new NodeData(a.x - 1, a.y + 1, a.z));
        transitions.push(1);
      }
    }
  // - X LEFT
  if (a.x - 1 > 0) {
    if (map.get(a.x - 1, a.y, a.z) !== 255) {
      neighbors.push(new NodeData(a.x - 1, a.y, a.z));
      transitions.push(1);
    }
  }
  // - X - Y LEFT-TOP
  if (a.x - 1 > 0 && a.y - 1 > 0) {
    if (map.get(a.x - 1, a.y - 1, a.z) !== 255) {
      neighbors.push(new NodeData(a.x - 1, a.y - 1, a.z));
      transitions.push(1);
    }
  }
  return [neighbors, transitions];
}

function stopFn(a, b) {
  return a.x === b.x && a.y === b.y && a.z === b.z
}

export function createPlanner(
  map,
  start: [number, number, number],
  goal: [number, number, number]
) {
  // Spread operator does not work with typescript here (must destructure)... (https://github.com/Microsoft/TypeScript/issues/4130)
  const [sx, sy, sz] = start;
  const [gx, gy, gz] = goal;
  const startNode = new NodeData(sx, sy, sz);
  const goalNode = new NodeData(gx, gy, gz);
  const genSuccessorsPartial = partial(genSuccessors, map);

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

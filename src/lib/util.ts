import partial from 'lodash.partial';
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

const SCALE = 255.0;
const WEIGHT = 1;
const ST = 1.0;
const DG1 = 1.4142135; // root 2
const DG2 = 1.73025; // root 3

export function copyNdaray(arr: ndarray) {
  const arrData = arr.data.slice();
  const newArr = ndarray(arrData, arr.shape, arr.stride, arr.offset);
  return newArr;
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
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

function euclidean(a, b) {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
  );
}


/**
 * Octile Distance in 3 Dimensions
 * From Here: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
 * @param {any} a 
 * @param {any} b 
 * @returns {number} 
 */
function octile(a, b):number {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  const dz = Math.abs(a.z - b.z);
  const order = [dx, dy, dz];
  order.sort((n, m) => m - n);
  return order[0] * ST + (DG1 - 1) * order[1] + (DG2 - 1) * order[2];
}

function genSuccessors(
  map: ndarray,
  allowDiag: boolean = true,
  weight: number = WEIGHT,
  a: NodeData
): [NodeData[], number[]] {
  const [width, height, depth] = [map.shape[0], map.shape[1], map.shape[2]];
  const neighbors = [];
  const transitions: number[] = [];
  // - Y TOP
  let val;
  if (a.y - 1 > 0) {
    val = map.get(a.x, a.y - 1, a.z);
    if (val !== SCALE) {
      neighbors.push(new NodeData(a.x, a.y - 1, a.z));
      transitions.push((1 + val / SCALE * weight) * ST);
    }
  }
  // -Y+X TOP-RIGHT
  if (a.y - 1 > 0 && a.x + 1 < width && allowDiag) {
    val = map.get(a.x + 1, a.y - 1, a.z);
    if (val !== SCALE) {
      neighbors.push(new NodeData(a.x + 1, a.y - 1, a.z));
      transitions.push((1 + val / SCALE * weight) * DG1);
    }
  }
  // + X RIGHT
  if (a.x + 1 < width) {
    val = map.get(a.x + 1, a.y, a.z);
    if (val !== SCALE) {
      neighbors.push(new NodeData(a.x + 1, a.y, a.z));
      transitions.push((1 + val / SCALE * weight) * ST);
    }
  }
  // + X + Y RIGHT-BOTTOM
  if (a.x + 1 < width && a.y + 1 < height && allowDiag) {
    val = map.get(a.x + 1, a.y + 1, a.z);
    if (val !== SCALE) {
      neighbors.push(new NodeData(a.x + 1, a.y + 1, a.z));
      transitions.push((1 + val / SCALE * weight) * DG1);
    }
  }
  // + Y BOTTOM
  if (a.y + 1 < height) {
    val = map.get(a.x, a.y + 1, a.z);
    if (val !== SCALE) {
      neighbors.push(new NodeData(a.x, a.y + 1, a.z));
      transitions.push((1 + val / SCALE * weight) * ST);
    }
  }
  // + Y - X BOTTOM-LEFT
  if (a.y + 1 < height && a.x - 1 > 0 && allowDiag) {
    val = map.get(a.x - 1, a.y + 1, a.z);
    if (val !== SCALE) {
      neighbors.push(new NodeData(a.x - 1, a.y + 1, a.z));
      transitions.push((1 + val / SCALE * weight) * DG1);
    }
  }
  // - X LEFT
  if (a.x - 1 > 0) {
    val = map.get(a.x - 1, a.y, a.z);
    if (val !== SCALE) {
      neighbors.push(new NodeData(a.x - 1, a.y, a.z));
      transitions.push((1 + val / SCALE * weight) * ST);
    }
  }
  // - X - Y LEFT-TOP
  if (a.x - 1 > 0 && a.y - 1 > 0 && allowDiag) {
    val = map.get(a.x - 1, a.y - 1, a.z);
    if (val !== SCALE) {
      neighbors.push(new NodeData(a.x - 1, a.y - 1, a.z));
      transitions.push((1 + val / SCALE * weight) * DG1);
    }
  }
  // 3D Path Planning!
  if (depth > 1) {
    //////// Bottom of Cube ////////////
    // - Y - Z TOP-DOWN
    if (a.y - 1 > 0 && a.z - 1 > 0) {
      val = map.get(a.x, a.y - 1, a.z - 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x, a.y - 1, a.z - 1));
        transitions.push((1 + val / SCALE * weight) * DG1);
      }
    }
    // -Y+X-Z TOP-RIGHT-DOWN
    if (a.y - 1 > 0 && a.x + 1 < width && a.z - 1 > 0) {
      val = map.get(a.x + 1, a.y - 1, a.z - 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x + 1, a.y - 1, a.z - 1));
        transitions.push((1 + val / SCALE * weight) * DG2);
      }
    }
    // + X-Z RIGHT DOWN
    if (a.x + 1 < width && a.z - 1 > 0) {
      val = map.get(a.x + 1, a.y, a.z - 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x + 1, a.y, a.z - 1));
        transitions.push((1 + val / SCALE * weight) * DG1);
      }
    }
    // + X + Y - Z RIGHT-BOTTOM-DOWN
    if (a.x + 1 < width && a.y + 1 < height && a.z - 1 > 0) {
      val = map.get(a.x + 1, a.y + 1, a.z - 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x + 1, a.y + 1, a.z - 1));
        transitions.push((1 + val / SCALE * weight) * DG2);
      }
    }
    // + Y -Z BOTTOM-DOWN
    if (a.y + 1 < height && a.z - 1 > 0) {
      val = map.get(a.x, a.y + 1, a.z - 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x, a.y + 1, a.z - 1));
        transitions.push((1 + val / SCALE * weight) * DG1);
      }
    }
    // + Y - X -Z BOTTOM-LEFT-DOWN
    if (a.y + 1 < height && a.x - 1 > 0 && a.z - 1 > 0) {
      val = map.get(a.x - 1, a.y + 1, a.z - 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x - 1, a.y + 1, a.z - 1));
        transitions.push((1 + val / SCALE * weight) * DG2);
      }
    }
    // - X -Z  LEFT-DOWN
    if (a.x - 1 > 0 && a.z - 1 > 0) {
      val = map.get(a.x - 1, a.y, a.z - 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x - 1, a.y, a.z - 1));
        transitions.push((1 + val / SCALE * weight) * DG1);
      }
    }
    // - X - Y -Z LEFT-TOP-DOWN
    if (a.x - 1 > 0 && a.y - 1 > 0 && a.z - 1 > 0) {
      val = map.get(a.x - 1, a.y - 1, a.z - 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x - 1, a.y - 1, a.z - 1));
        transitions.push((1 + val / SCALE * weight) * DG2);
      }
    }
    // -Z DOWN
    if (a.z - 1 > 0) {
      val = map.get(a.x, a.y, a.z - 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x, a.y, a.z - 1));
        transitions.push((1 + val / SCALE * weight) * ST);
      }
    }

    //////// Top of Cube ////////////
    // - Y - Z TOP-UP
    if (a.y - 1 > 0 && a.z + 1 < depth) {
      val = map.get(a.x, a.y - 1, a.z + 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x, a.y - 1, a.z + 1));
        transitions.push((1 + val / SCALE * weight) * DG1);
      }
    }
    // -Y+X-Z TOP-RIGHT-UP
    if (a.y - 1 > 0 && a.x + 1 < width && a.z + 1 < depth) {
      val = map.get(a.x + 1, a.y - 1, a.z + 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x + 1, a.y - 1, a.z + 1));
        transitions.push((1 + val / SCALE * weight) * DG2);
      }
    }
    // + X-Z RIGHT UP
    if (a.x + 1 < width && a.z + 1 < depth) {
      val = map.get(a.x + 1, a.y, a.z + 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x + 1, a.y, a.z + 1));
        transitions.push((1 + val / SCALE * weight) * DG1);
      }
    }
    // + X + Y + Z RIGHT-BOTTOM-UP
    if (a.x + 1 < width && a.y + 1 < height && a.z + 1 < depth) {
      val = map.get(a.x + 1, a.y + 1, a.z + 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x + 1, a.y + 1, a.z + 1));
        transitions.push((1 + val / SCALE * weight) * DG2);
      }
    }
    // + Y + Z BOTTOM-UP
    if (a.y + 1 < height && a.z + 1 < depth) {
      val = map.get(a.x, a.y + 1, a.z + 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x, a.y + 1, a.z + 1));
        transitions.push((1 + val / SCALE * weight) * DG1);
      }
    }
    // + Y - X -Z BOTTOM-LEFT-UP
    if (a.y + 1 < height && a.x - 1 > 0 && a.z + 1 < depth) {
      val = map.get(a.x - 1, a.y + 1, a.z + 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x - 1, a.y + 1, a.z + 1));
        transitions.push((1 + val / SCALE * weight) * DG2);
      }
    }
    // - X -Z  LEFT-UP
    if (a.x - 1 > 0 && a.z + 1 < depth) {
      val = map.get(a.x - 1, a.y, a.z + 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x - 1, a.y, a.z + 1));
        transitions.push((1 + val / SCALE * weight) * DG1);
      }
    }
    // - X - Y -Z LEFT-TOP-UP
    if (a.x - 1 > 0 && a.y - 1 > 0 && a.z + 1 < depth) {
      val = map.get(a.x - 1, a.y - 1, a.z + 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x - 1, a.y - 1, a.z + 1));
        transitions.push((1 + val / SCALE * weight) * DG2);
      }
    }
    // -Z UP
    if (a.z + 1 < depth) {
      val = map.get(a.x, a.y, a.z + 1);
      if (val !== SCALE) {
        neighbors.push(new NodeData(a.x, a.y, a.z + 1));
        transitions.push((1 + val / SCALE * weight) * ST);
      }
    }
  }
  return [neighbors, transitions];
}

function stopFn(a, b) {
  return a.x === b.x && a.y === b.y && a.z === b.z;
}

export function createPlanner(
  map,
  start: [number, number, number],
  goal: [number, number, number],
  allowDiag: boolean = true,
  heuristic: string = 'manhattan',
  weight: number = WEIGHT
) {
  // Spread operator does not work with typescript here (must destructure)... (https://github.com/Microsoft/TypeScript/issues/4130)
  const [sx, sy, sz] = start;
  const [gx, gy, gz] = goal;
  const startNode = new NodeData(sx, sy, sz);
  const goalNode = new NodeData(gx, gy, gz);
  const genSuccessorsPartial = partial(genSuccessors, map, allowDiag, weight);
  let heuristicFn
  switch (heuristic) {
    case 'manhattan':
      heuristicFn = manhattan;
      break;
    case 'euclidean':
      heuristicFn = euclidean;
      break;
    case 'octile':
      heuristicFn = octile
      break;
    default:
      heuristicFn = manhattan
      break;
  }
  // const heuristicFn = heuristic === 'manhattan' ? manhattan : euclidean;

  const planner = new AsyncAstar<NodeData>(
    startNode,
    goalNode,
    hash,
    genSuccessorsPartial,
    heuristicFn,
    stopFn
  );

  return planner;
}

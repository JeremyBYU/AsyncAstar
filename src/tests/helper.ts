import fs from 'fs';

import Color from 'color';
import ndarray from 'ndarray';
import * as PNGJS from 'pngjs';
// import savePixels from 'save-pixels';

import { createPNG, savePixels } from './savepixels';

import { AsyncAstar } from '../lib/asyncastar';
import { copyNdaray, NodeData } from '../lib/util';

const ORANGE = Color('#FFA500')
  .rgb()
  .array();
const BLUE = Color('#0000FF')
  .rgb()
  .array();
const RED = Color('#FF0000')
  .rgb()
  .array();

const FRONTIER_COLOR = BLUE;
const CLOSED_COLOR = ORANGE;
const PATH_COLOR = RED;

function setColor(
  arr: ndarray,
  i: number,
  j: number,
  rgb: string | number[] = '#ff0000'
) {
  if (!Array.isArray(rgb)) {
    rgb = Color(rgb)
      .rgb()
      .array();
  }
  for (let z = 0; z < 3; z++) {
    arr.set(i, j, z, rgb[z]);
  }
}

export function drawPath(
  arr: ndarray,
  path: Array<[number, number, number]>,
  color,
  zExpected: number
): void {
  path.forEach(node => {
    const [x, y, z] = node;
    if (z !== zExpected) {
      return;
    }
    setColor(arr, y, x, color);
  });
}

const delay = time => new Promise(res => setTimeout(() => res(), time));

export async function saveImage(
  arr: ndarray,
  path = [],
  fname: string,
  planner: AsyncAstar<NodeData>,
  is3D = false
) {
  // if this is a 3D array, then we ned to capture how many slices of depth it
  const slices = is3D ? arr.shape[2] : 1;
  // Loop through every slice and create a picture drawing the nodes and path inside that planar dimension
  for (let i = 0; i < slices; i++) {
    const fnameI = is3D ? fname.slice(0, -4) + `_${i}.png` : fname;
    const tmpPNGFile = fs.createWriteStream(fnameI);
    // Pick out one dimension of the array
    const subArr = arr.pick(null, null, i);
    const [subPNG, subArrPNG] = createPNG(subArr, 'png');
    const nodeMap = planner.getAllNodes();
    for (const node of nodeMap.values()) {
      // Skip if this node is not on the same depth slice
      if (node.data.z !== i) {
        continue;
      }
      if (node.closed) {
        setColor(subArrPNG, node.data.y, node.data.x, CLOSED_COLOR);
      } else {
        setColor(subArrPNG, node.data.y, node.data.x, FRONTIER_COLOR);
      }
    }
    drawPath(subArrPNG, path, PATH_COLOR, i);

    subPNG.pack();
    subPNG.pipe(tmpPNGFile);
    await delay(100);

    // The colors have now been written for the open/closed, and path
  }
}

// export async function saveImage(
//   arr,
//   path = [],
//   fname,
//   planner: AsyncAstar<NodeData>
// ) {
//   // const tmpobj = tmp.fileSync({postfix: '.png'});
//   const tmpPNGFile = fs.createWriteStream(fname);
//   // const tmpPNGFile = fs.createWriteStream(`blah${i}.png`);
//   // console.log(tmpobj)
//   const nodeMap = planner.getAllNodes();
//   const newArr = copyNdaray(arr);

//   for (const node of nodeMap.values()) {
//     if (node.closed) {
//       setColor(newArr, node.data.x, node.data.y, CLOSED_COLOR);
//     } else {
//       setColor(newArr, node.data.x, node.data.y, FRONTIER_COLOR);
//     }
//   }

//   drawPath(newArr, path, PATH_COLOR, 0);
//   const myPng = savePixels(newArr, 'png');
//   myPng.pipe(tmpPNGFile);
//   await delay(100);
// }

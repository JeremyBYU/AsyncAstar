import fs from 'fs'

import Color from 'color'
import ndarray from 'ndarray';
import * as PNGJS from 'pngjs';
import savePixels from 'save-pixels';
import tmp from 'tmp'

import { AsyncAstar } from '../lib/asyncastar';
import { copyNdaray, NodeData } from '../lib/util';

const ORANGE = Color('#FFA500').rgb().array()
const BLUE = Color('#0000FF').rgb().array()
const RED = Color('#FF0000').rgb().array()

function setColor(arr:ndarray, i:number, j:number, rgb:string|number[]='#ff0000') {
  if (!Array.isArray(rgb)) {
    rgb = Color(rgb).rgb().array()
  }
  for(let z = 0; z < 3; z++) {
    arr.set(i, j, z, rgb[z])
  }
}


export function drawPath(arr: ndarray, path: Array<[number, number, number]>, color): void {
  path.forEach(node => {
    const [x, y, z] = node
    setColor(arr, x, y, color)
  })
}


const delay = time => new Promise(res=>setTimeout(()=>res(),time));

export async function saveImage(arr, path = [], fname, planner: AsyncAstar<NodeData>) {
  // const tmpobj = tmp.fileSync({postfix: '.png'});
  const tmpPNGFile = fs.createWriteStream(fname);
  // const tmpPNGFile = fs.createWriteStream(`blah${i}.png`);
  // console.log(tmpobj)
  const nodeMap = planner.getAllNodes()
  const newArr = copyNdaray(arr)

  for (const node of nodeMap.values()) {
    if (node.closed) {
      setColor(newArr, node.data.x, node.data.y, ORANGE )
    } else {
      setColor(newArr, node.data.x, node.data.y, BLUE )
    }
  }

  drawPath(newArr, path, RED)
  await delay(100)
  savePixels(newArr, "png").pipe(tmpPNGFile)
}
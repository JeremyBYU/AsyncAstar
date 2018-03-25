// tslint:disable:no-expression-statement
import { test } from 'ava';
import * as fs from 'fs';
import { toArrayBuffer } from './util';

import * as ndarray1 from 'ndarray'
import * as PNGJS from 'pngjs';

const PNG = PNGJS.default.PNG
const ndarray = ndarray1.default

console.log(PNG);
console.log(ndarray)

const buf = fs.readFileSync('src/tests/fixtures/44_44.png');
const img = PNG.sync.read(buf);

const imgArray = ndarray(
  new Uint8Array(img.data),
  [img.width | 0, img.height | 0, 4],
  [4, (4 * img.width) | 0, 1],
  0
);

// imgArray.get(WIDTH,HEIGHT,CHANNEL)

console.log(imgArray)

// const img  = UPNG.decode(abuff);        // put ArrayBuffer of the PNG file into UPNG.decode
// const rgba = UPNG.toRGBA8(img)[0];     // UPNG.toRGBA8 returns array of frames, size: width * height * 4 bytes.
// import { AsyncAstar } from '../lib/asyncastar';

test('double', t => {
  t.is(4, 4);
});

test('power', t => {
  t.is(16, 16);
});

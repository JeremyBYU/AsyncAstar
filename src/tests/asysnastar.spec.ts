// tslint:disable:no-expression-statement
import anyTest, { TestInterface } from 'ava';
import * as fs from 'fs';
import { createPlanner } from './util';

import ndarray from 'ndarray';
// import * as ndarray1 from 'ndarray'
import * as PNGJS from 'pngjs';

// Require imports necessitate this
const PNG = PNGJS.default.PNG;
// const ndarray = ndarray1.default

const test = anyTest as TestInterface<{ image: ndarray }>;

test.before(t => {
  const buf = fs.readFileSync('src/tests/fixtures/44_44.png');
  const img = PNG.sync.read(buf);
  const imgArray = ndarray(
    new Uint8Array(img.data),
    [img.width | 0, img.height | 0, 4],
    [4, (4 * img.width) | 0, 1],
    0
  );
  t.context.image = imgArray;
});

// test.beforeEach(t => {
// })

test('Loaded Image', t => {
  const maze = t.context.image;

  t.truthy(maze);
});

test('44X44 Maze', t => {
  const maze = t.context.image;
  const width = maze.shape[0];
  const height = maze.shape[1];
  const depth = 1;
  const start = [2, 2, 0] as [number, number, number];
  const goal = [40, 41, 0] as [number, number, number];

  const planner = createPlanner(width, height, depth, start, goal);
  const result = planner.search(100000);
  console.log(result);
});

// imgArray.get(WIDTH,HEIGHT,CHANNEL)

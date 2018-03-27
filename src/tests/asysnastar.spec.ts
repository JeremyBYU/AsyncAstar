// tslint:disable:no-expression-statement
// import anyTest, { TestInterface } from 'ava';
import * as fs from 'fs';
import { join } from 'path';

import ndarray from 'ndarray';
import * as PNGJS from 'pngjs';
import savePixels from 'save-pixels';

import {
  AsyncAstar,
  AsyncAstarResult,
  AsyncAstarStatus
} from '../lib/asyncastar';
import { copyNdaray, createPlanner, NodeData } from '../lib/util';
import { MAZE_TESTS, MAZES } from './fixtures/data';
import { saveImage } from './helper';

// Require imports necessitate this
const PNG = PNGJS.default.PNG;
const tempPNG = 'tmp.png';
const FIXTURE_FOLDER = 'src/tests/fixtures';

// Import the maze data (read PNG images)
const MAZE_DATA = MAZES.map(maze => {
  const fname = join(FIXTURE_FOLDER, maze.file || maze.name)
  if (maze.data) {
    return {...maze, fname}
  }
  const buf = fs.readFileSync(fname);
  const img = PNG.sync.read(buf);
  const data = ndarray(
    new Uint8Array(img.data),
    [img.width | 0, img.height | 0, 4],
    [4, (4 * img.width) | 0, 1],
    0
  );
  return { ...maze, data, fname };
});

MAZE_TESTS.forEach(mazeTest => {
  describe(mazeTest.name, () => {
    let mazeInfo
    let maze:ndarray;
    let result: AsyncAstarResult<NodeData>;
    let planner: AsyncAstar<NodeData>;
    beforeAll(() => {
      mazeInfo = MAZE_DATA.find(mzData => mazeTest.maze === mzData.name)
      maze = mazeInfo.data;
      planner = createPlanner(maze, mazeTest.start, mazeTest.goal, mazeTest.allowDiag, mazeTest.heuristic);
      result = planner.searchAsync();
    });
    test('Find Goal', () => {
      expect(result.status).toBe(AsyncAstarStatus.SUCCESS);
    });
    test('Correct Path', async () => {
      const pathData = result.path.map(node => [
        node.data.x,
        node.data.y,
        node.data.z
      ]);
      await saveImage(maze, pathData, mazeInfo.fname.slice(0,-4) + `_solved.png`, planner, mazeInfo.is3D)
      expect(pathData).toEqual(mazeTest.expectedPath);
    });
  });
});

// Create new image and write to it
// const newArr = copyNdaray(maze)
// drawPath(newArr, result.path)
// const tmpPNGFile = fs.createWriteStream(tempPNG);
// savePixels(newArr, "png").pipe(tmpPNGFile)

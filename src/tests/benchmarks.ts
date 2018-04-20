import * as fs from 'fs';
import { join } from 'path';

import * as Benchmark from 'benchmark';
import ndarray from 'ndarray';
import * as PNGJS from 'pngjs';

import AsyncAstar, {
  AsyncAstarResult,
  AsyncAstarStatus
} from '../lib/asyncastar';
import { copyNdarray, createPlanner, NodeData } from '../lib/util';
import { MAZE_BENCHMARKS, MAZES } from './fixtures/data';
import { saveImage } from './helper';
// import { performance } from 'perf_hooks';

// Require imports necessitate this
const PNG = PNGJS.default.PNG;

const tempPNG = 'tmp.png';
const FIXTURE_FOLDER = 'src/tests/fixtures';

// Import the maze data (read PNG images)
const MAZE_DATA = MAZES.map(maze2 => {
  const fname = join(FIXTURE_FOLDER, maze2.file || maze2.name);
  // Reading raw data
  if (maze2.data) {
    return { ...maze2, fname };
  }
  // Reading an actual picture (PNG)
  const buf = fs.readFileSync(fname);
  const img = PNG.sync.read(buf);
  const data = ndarray(
    new Uint8Array(img.data),
    [img.width | 0, img.height | 0, 4],
    [4, (4 * img.width) | 0, 1],
    0
  );
  return { ...maze2, data, fname };
});

// basic usage
// console.log(Benchmark)
// const bench = Benchmark.Benchmark({
//   setup() {
//     console.log('Setting up')
//   },
//   fn() {
//     console.log('yo')
//   }
// });
// // bench.run()
// console.log(bench)

// add tests

const planners = {
  AsyncAstar(mazeTest) {
    const mInfo = MAZE_DATA.find(mzData => mazeTest.maze === mzData.name);
    const maze1 = mInfo.data;
    const planner1 = createPlanner(
      maze1,
      mazeTest.start,
      mazeTest.goal,
      mazeTest.allowDiag,
      mazeTest.heuristic
    );
    return {planner: planner1, mazeInfo: mInfo, maze: maze1};
  }
};


// const test = MAZE_BENCHMARKS[0];
// const {planner, mazeInfo, maze} = planners.AsyncAstar(test);
// const result = planner.searchAsync();
// const pathData = result.path.map(node => [
//   node.data.x,
//   node.data.y,
//   node.data.z
// ]);
// saveImage(
//   maze,
//   pathData,
//   mazeInfo.fname.slice(0, -4) + `_solved.png`,
//   planner,
//   mazeInfo.is3D
// );
// console.log(result)

const suite = new Benchmark.Suite('Small Obstacle');

suite
  .add('AsyncAstar', () => {
    // console.log('run')
    const mazeTest = MAZE_BENCHMARKS[0];
    const {planner, mazeInfo, maze} = planners.AsyncAstar(mazeTest);
    const result = planner.searchAsync();
    // console.log('run finished')
  }, {
    onCycle() {
      // console.log('bench cycle')
    }
  })
  // add listeners
  .on('cycle', event => {
    // console.log(event)
    const name = event.target.name
    const meanTime = event.target.stats.mean.toFixed(3)
    const rme = event.target.stats.rme.toFixed(2)
    console.log(`${name} x${meanTime} sec. ± ${rme}%`)
    // console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .on('start', () => {
    console.log('Starting Small Obstacle Suite')
  })
  .run({ async: false });



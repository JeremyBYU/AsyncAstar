import {createPlanner } from './tests/util'

const width = 44
const height = 44
const depth = 1;
const start = [2, 2, 0] as [number, number, number];
const goal = [2, 1, 0] as [number, number, number];

const planner = createPlanner(width, height, depth, start, goal);
const result = planner.search(100000);
console.log(result)
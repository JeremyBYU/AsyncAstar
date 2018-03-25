/**
 *   AsyncAstar.ts
 *   github.com/jeremybyu/AsyncAstar
 *   Licensed under the MIT license.
 *
 *   Implementation By Jeremy Castagno (@jeremybyu)
 */

import * as Heap from 'heap';
import { HeapT } from '../types/heap';

export type HashFn<T> = (node: T) => string;

export type StopFn<T> = (node: T, goalNode: T) => boolean;

export type GenSuccessorsFn<T> = (node: T) => [T[], number[]];

export type HeuristicFn<T> = (node: T, gaolNode:T) => number;

export interface AsynAstarResult<T> {
  status: AsyncAstarStatus;
  path?: Array<NodeCost<T>>;
}

export enum AsyncAstarStatus {
  NORM = 1,
  SUCCESS,
  FAIL,
  ERROR
}

export class NodeCost<T> {
  public data: T;
  public g: number;
  public f: number;
  public closed: boolean;
  public open: boolean;

  constructor(data) {
    this.data = data;
    this.g = 0;
    this.f = 0;
    this.closed = false;
    this.open = true;
  }
}

export class AsyncAstar<T> {
  public finished: boolean;

  private nodeSet: Map<string, NodeCost<T>>;
  private startNode: NodeCost<T>;
  private goalNode: NodeCost<T>;
  private hashFn: HashFn<T>;
  private genSuccessorsFn: GenSuccessorsFn<T>;
  private heuristicFn: HeuristicFn<T>;
  private stopFn: StopFn<T>;
  private openList: HeapT<NodeCost<T>>;

  constructor(
    startNode: T,
    goalNode: T,
    hashFn: HashFn<T>,
    genSuccessorsFn: GenSuccessorsFn<T>,
    heuristicFn: HeuristicFn<T>,
    stopFn?: StopFn<T>
  ) {
    this.startNode = new NodeCost(startNode);
    this.goalNode = new NodeCost(goalNode);
    this.hashFn = hashFn
    this.genSuccessorsFn = genSuccessorsFn
    this.heuristicFn = heuristicFn
    this.stopFn = stopFn ? stopFn : (a, b) => a === b;

    this.nodeSet = new Map();
    this.nodeSet.set(this.hashFn(this.startNode.data), this.startNode);
    this.nodeSet.set(this.hashFn(this.goalNode.data), this.startNode);

    this.openList = new Heap.default((a, b) => a.f - b.f);

    this.finished = false;
  }
  public search(iterations = Number.POSITIVE_INFINITY) {
    if (this.finished) {
      return AsyncAstarStatus.ERROR;
    }
    // Instead of a While loop, we use the iterations requested (node expansions)
    for (let i = 0; i < iterations; i++) {
      const curNode = this.openList.pop();
      // Check if the open list is empty
      if (curNode === undefined) {
        return { status: AsyncAstarStatus.FAIL };
      }
      // Check if we have found the goal
      if (this.stopFn(curNode.data, this.goalNode.data)) {
        // TODO get path
        return { status: AsyncAstarStatus.SUCCESS };
      }
      // Put this node on the closed 'list', simply set a bit flag
      curNode.closed = true;
      curNode.open = false;
      const [neighbors, transition] = this.genSuccessorsFn(curNode.data)
      // Iterate through neighbors. Remember the neighbors are Nodes (T) not NodeCost<T>
      // Hence we look it up in the node set using the hash function, which return NodeCost<T>
      for (let j = 0; j < neighbors.length; j++) {
        let possibleNode = this.nodeSet.get(this.hashFn(neighbors[j]))
        // Skip any nodes in the closed set
        if (possibleNode && possibleNode.closed) { continue }

        if (!possibleNode) {
          // New Node
          possibleNode = new NodeCost(neighbors[j])
          possibleNode.g = curNode.g + transition[j]
          possibleNode.f = possibleNode.g + this.heuristicFn(possibleNode.data, this.goalNode.data)
          // Push onto the open list
          this.openList.push(possibleNode)
        } else {
          // Must already be in the open list/frontier
          const newG = curNode.g + transition[j]
          if (newG < possibleNode.g) {
            // This path is better!
            possibleNode.g = newG
            possibleNode.f = newG + this.heuristicFn(possibleNode.data, this.goalNode.data)
            this.openList.updateItem(possibleNode);
          }

        }

      }
    }
    // We looped thorough all iterations, but did not find the goal
    return { status: AsyncAstarStatus.NORM }
  }

}

// const heap = new Heap.default();
// heap.push(1)
// heap.push(2)
// console.info(heap)

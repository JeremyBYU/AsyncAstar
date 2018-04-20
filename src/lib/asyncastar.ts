/**
 *   AsyncAstar.ts
 *   github.com/jeremybyu/AsyncAstar
 *   Licensed under the MIT license.
 *
 *   Implementation By Jeremy Castagno (@jeremybyu)
 * 
 *   Use AsyncAstar class to instantiate a planner.
 */

 /** ignore this comment */
import * as Heap from 'heap';
import { HeapT } from '../types/heap';

export type HashFn<T> = (node: T) => string;

export type StopFn<T> = (node: T, goalNode: T) => boolean;

export type GenSuccessorsFn<T> = (node: T) => [T[], number[]];

export type HeuristicFn<T> = (node: T, gaolNode:T) => number;

export interface AsyncAstarResult<T> {
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
  public parent: NodeCost<T>

  constructor(data, open = true, g = 0) {
    this.data = data;
    this.g = g;
    this.f = 0;
    this.closed = false;
    this.open = open;
    this.parent = null
  }
}

export default class AsyncAstar<T> {
  public finished: boolean;

  private nodeSet: Map<string, NodeCost<T>>;
  private startNode: NodeCost<T>;
  private goal: T;
  private hashFn: HashFn<T>;
  private genSuccessorsFn: GenSuccessorsFn<T>;
  private heuristicFn: HeuristicFn<T>;
  private stopFn: StopFn<T>;
  private openList: HeapT<NodeCost<T>>;

  constructor(
    start: T,
    goal: T,
    hashFn: HashFn<T>,
    genSuccessorsFn: GenSuccessorsFn<T>,
    heuristicFn: HeuristicFn<T>,
    stopFn?: StopFn<T>
  ) {
    this.startNode = new NodeCost(start);
    // this.goalNode = new NodeCost(goalNode, false, Number.POSITIVE_INFINITY);
    this.goal = goal
    this.hashFn = hashFn
    this.genSuccessorsFn = genSuccessorsFn
    this.heuristicFn = heuristicFn
    this.stopFn = stopFn ? stopFn : (a, b) => this.hashFn(a) === this.hashFn(b);

    this.nodeSet = new Map();
    this.nodeSet.set(this.hashFn(this.startNode.data), this.startNode);
    // this.nodeSet.set(this.hashFn(this.goalNode.data), this.goalNode);

    this.openList = new Heap.default((a, b) => a.f - b.f);
    this.openList.push(this.startNode)

    this.finished = false;
  }
  public searchAsync(iterations = Number.POSITIVE_INFINITY, closedNodeCb?, openNodeCb?) :AsyncAstarResult<T> {
    if (this.finished) {
      return { status: AsyncAstarStatus.ERROR};
    }
    // Instead of a While loop, we use the iterations requested (node expansions)
    for (let i = 0; i < iterations; i++) {
      const curNode = this.openList.pop();
      // Check if the open list is empty
      if (curNode === undefined) {
        this.finished = true
        return { status: AsyncAstarStatus.FAIL };
      }
      // Check if we have found the goal
      if (this.stopFn(curNode.data, this.goal)) {
        this.finished = true
        return { status: AsyncAstarStatus.SUCCESS, path: this.getPath(curNode) };
      }
      // Put this node on the closed 'list', simply set a bit flag
      curNode.closed = true;
      curNode.open = false;
      const [neighbors, transition] = this.genSuccessorsFn(curNode.data)
      if (closedNodeCb) {
        closedNodeCb(curNode)
      }
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
          possibleNode.f = possibleNode.g + this.heuristicFn(possibleNode.data, this.goal)
          possibleNode.parent = curNode
          // Push onto the open list
          this.openList.push(possibleNode)
          this.nodeSet.set(this.hashFn(neighbors[j]), possibleNode)
          if (openNodeCb) {
            openNodeCb(possibleNode)
          }
        } else {
          // Must already be in the open list/frontier
          const newG = curNode.g + transition[j]
          if (newG < possibleNode.g) {
            // This path is better!
            possibleNode.g = newG
            possibleNode.f = newG + this.heuristicFn(possibleNode.data, this.goal)
            possibleNode.parent = curNode
            this.openList.updateItem(possibleNode);
          }

        }

      }
    }
    // We looped thorough all iterations, but did not find the goal
    return { status: AsyncAstarStatus.NORM }
  }
  public getPath(goal: NodeCost<T>): Array<NodeCost<T>> {
    const path = []
    path.push(goal)
    // Iterate through the path
    let node = goal
    while (node.parent !== null) {
      const parent = node.parent
      path.push(parent)
      node = parent
    }
    path.reverse()
    return path
  }
  public updateHeuristic(newHeuristicFn:HeuristicFn<T>) {
    this.heuristicFn = newHeuristicFn
  }
  public updateGenSuccessors(newGenSuccessors:GenSuccessorsFn<T>) {
    this.genSuccessorsFn = newGenSuccessors
  }
  public getAllNodes() {
    return this.nodeSet
  }
  public reset(start, goal) {
    this.startNode = new NodeCost(start);
    this.goal = goal

    this.nodeSet = new Map();
    this.nodeSet.set(this.hashFn(this.startNode.data), this.startNode);
    // this.nodeSet.set(this.hashFn(this.goalNode.data), this.goalNode);

    this.openList = new Heap.default((a, b) => a.f - b.f);
    this.openList.push(this.startNode)

    this.finished = false;
  }

}


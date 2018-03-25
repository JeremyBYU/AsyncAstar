import { AsyncAstar } from './asyncastar'


function hash(node:Node2D) {
  return `[${node.x}][${node.y}][${node.z}]`
}

class Node2D {
  public x: number
  public y: number
  public z: number

  constructor(x, y ,z) {
    this.x = x
    this.y = y
    this.z = z

  }
  public valueOf() {
    return this.toString()
  }
  public toString() {
    return hash(this)
  }

}

const startNode = new Node2D(0, 0, 0)
const goalNode = new Node2D(1, 1, 1)

const planner = new AsyncAstar<Node2D>(startNode, goalNode, hash)
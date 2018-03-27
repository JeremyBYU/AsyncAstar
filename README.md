# AsyncAStar

This module allows one to execute A* search in an Asynchronous pattern. It is very similar to [EasyStar](https://easystarjs.com/), however this module can be used for more than 2D planning for game development as EasyStar is designed for. It allows one to specify a generic `Generate Successors` function, not needing to know anything about the graph. In other words, this module only cares about the *algorithm* of A*, not the graph, which is from your specific problem domain. It could be 2D, 3D, or however many dimensions you may need (though A* performance suffers greatly at higher dimensions).


## Getting Started

Install : `npm  install asyncastar`

### Simple 2D or 3D Path Planning
Since most people will probably do 2D or 3D path planning, there is a simple wrapper for `AsyncAStar` called
`createPlanner` that assumes a 3D discretized space using `ndarray` as the data holder of this space. The demonstration below shows 3D planning within a plane (basically 2D).

```js
import { createPlanner} from '../lib/util';
const start = [0, 0, 0]
const goal = [2, 2, 0]
const maze = ndarray([0,0,0,0,0,0,0,0,0], [3,3,1]) // Empty 3X3X1 Maze
planner = createPlanner(maze, mazeTest.start, mazeTest.goal);

let result = planner.searchAsync(1) // only 1 expansion
console.log(result)


result = planner.searchAsync(3) // allow 3 more expansions
console.log(result)


```

Full API: https://jeremybyu.github.io/AsyncAstar/


## Issues/Bugs/Feature Requests

Feel free to file any issues (bugs), or feature requests.  Please follow the Issue template however.

## Development

First download, pull, and run tests.  Make sure its all working!

1. `git pull https://github.com/JeremyBYU/AsyncAstar.git`
2. `npm install`
3. `npm run test`

Then submit any PR's, following the contributing guidelines.



X and Y might be flipped in NDARRAY






<!-- ### Options

Initialize it- 
User Defined
* Node Class
  * equality
  * Hashing function
  * x, y z

* Successor Function as well as edge cost
  * returns list of nodes as well as cost (travel cost + heat map)

* Stop Node

* Start Node

* Num Expansions

Library
* NodeCost Class
  * Encapsulates Node Class
  * Has g, f, closed, frontier

* Member Attributes
  * NodeSet (dict, or Map)
  * Frontier (Open List) Priority Queue
* Member Functions
  * addNode()
  * Initialize Routine
    * Add start PriorityQueue
    * Set the hashing function
  * GenerateSuccesors
    * Call the user one
    * Remove those in the closed list
  * ExpandRoutine
    * CurrentNode = Pop frontier (chceck empty)
    * Goal Check
    * Add Closed Bit to node (curNode.closed = true)
    * Generate successor and costs arrays
    * Skip those in closed list
    * Calclate a temporary path cost 
  * 



```
updateItem = (array, item, cmp=defaultCmp) ->
  pos = array.indexOf(item)
  return if pos is -1
  _siftdown(array, 0, pos, cmp)
  _siftup(array, pos, cmp)
``` -->
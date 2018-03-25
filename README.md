# async-astar

Stuff


Percolate up (FastPriorityQueue) is sift down (heap)



### Options

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
```
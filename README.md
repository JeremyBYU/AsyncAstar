# async-astar

Stuff


Percolate up (FastPriorityQueue) is sift down (heap)


```
updateItem = (array, item, cmp=defaultCmp) ->
  pos = array.indexOf(item)
  return if pos is -1
  _siftdown(array, 0, pos, cmp)
  _siftup(array, pos, cmp)
```
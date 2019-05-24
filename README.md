# GRID

grid data structure

---------

## Install

Development:
```
https://rawgit.com/luizbills/grid/master/build/grid.js
```

Production:
```
https://rawgit.com/luizbills/grid/master/build/grid.min.js
```

## Usage

```js
// create a empty 2x2 grid
const g = new Grid(2, 2) // create a grid 2x2

// set values
g.set(0, 0, "first cell") // zero-based index
g.set(1, 1, "last cell")

// get values
console.log(g.get(0, 0)) // => "first cell"
console.log(g.get(1, 1)) // => "last cell"

// check a position
console.log(g.has(0, 1)) // => false

// create a 2x2 grid from a Array
const ga = Grid.fromArray([1,2,3,4], 2, 2)

console.log(g.get(0, 0)) // => 1
console.log(g.get(0, 1)) // => 2
console.log(g.get(1, 0)) // => 3
console.log(g.get(1, 1)) // => 4

// export the grid as Array
console.log(ga.toArray()); // => [1,2,3,4]

// export the grid as String
console.log(ga.toString()); // => 1,2,3,4

// use forEach to interact
ga.forEach(function (value, x, y) {
	// do something...
})

// sanitizes a X position with .clipX (or use .clipY for Y positions)
console.log(ga.clipX(5)) // => 1
console.log(ga.clipY(-1)) // => 0

// clone a grid
const cloned = ga.clone()

// clear all stored values
ga.clear()

// public properties
g.width
g.height
g.length // === g.width * g.height
```

---------

## License
MIT

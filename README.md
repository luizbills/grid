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
var g = grid(5, 5); // create a grid 5x5

g.set(0, 0, "first cell");
g.set(4, 4, "last cell");

console.log( g.get(4, 4) ); // => "last cell"

g.remove(4, 4);

console.log( g.get(4, 4) ); // => undefined

console.log( g.isValid(-1, 4) ); // => false (because is outside of the grid)
console.log( g.isValid(5, 5) ); // => false (because the positions of grid is 0-based)
console.log( g.isValid(2, 3) ); // => true (a valid position)

g.resize(8, 8); // changes the size of the grid

console.log( g.isValid(5, 5) ); // => true (now is valid)

g.reset(); // clear all

console.log( g.get(0, 0) ); // => undefined

g.forEach(function(currentValue, x, y, grid) {
  grid.set(x, y, x + "," + y);
});

console.log( g.get(2,3) ); // => "2,3"

/* others methods
  
  g.clone(); // returns a copy of the grid
  
  g.map(); // similar to Array.prototype.map

*/
```

---------

## License
MIT

# GRID

grid data structure

---------

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

g.reset(); // clear all

console.log( g.get(0, 0) ); // => null

g.forEach(function(currentValue, x, y) {
  this.set(x, y, x + "," + y);
}, g /* Context (optional). Value to use as "this" when executing callback. */);

console.log( g.get(2,3) ); // => 2,3
```

---------

## License
MIT

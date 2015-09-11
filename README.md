# GRID

grid data structure

---------

## Usage

```js
var g = grid(5, 5); // create a grid 5x5

g.set(0, 0, "first cell");
g.set(4, 4, "last cell");

log( g.get(4, 4) ); // => "last cell"

g.remove(4, 4);

log( g.get(4, 4) ); // => null

g.reset(); // clear

log( g.get(, 0) ); // => null


g.forEach(function(cuurentvalue, x, y) {
  this.set(x, y, x + "," + y);
}, g /* Optional. Value to use as this when executing callback. */);

log( g.get(2,3) ); // => 2,3
```

---------

## License
MIT

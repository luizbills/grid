#GRID

grid data structure

===

###Usage

```js
var g = grid(5, 5); // create a grid 5x5

g.set(0, 0, "first cell");
g.set(4, 4, "last cell");

console.log( g.get(4,4) ); // => "last cell"
```

###License
MIT

var grid = require("../src/grid.js");

var w = 10,
  h = 5;

var g = grid(w, h);

g.forEach(function(value, x, y) {
  this.set(x, y, Math.random());
}, g);

console.log('should logs 7 true and 6 false... horrible tests I know :D');

// pass
console.log( !!g.get(0, 0) );
console.log( !!g.get(w - 1, h - 1) );
console.log( !!g.get(w - 1, Math.round(h/2)) );
console.log( !!g.get(Math.round(w/2), h - 1) );
console.log( !!g.get(Math.round(w/2), Math.round(h/2)) );
console.log( !!g.isValid(Math.round(w/2), Math.round(h/2)) );
g.remove(1,1)
console.log( g.get(1, 1) === undefined );

// reject
try {
  g.get(w - w - 1, 0); // x negative
} catch(e) {
  console.log(false);
}

try {
  g.get(0, h - h - 1); // y negative
} catch(e) {
  console.log(false);
}

try {
  g.get(w - w - 1, h - h - 1); // both negatives
} catch(e) {
  console.log(false);
}

try {
  g.get(w, Math.round(h/2)); // x overflow
} catch(e) {
  console.log(false);
}

try {
  g.get(Math.round(w/2), h); // x overflow
} catch(e) {
  console.log(false);
}

console.log( !!g.isValid(w + 10, h + 1) );


const test = require('tape');
const Grid = require('../src');

const w = 3;
const h = 3;
const grid = new Grid(w, h);

let actual, expected;

test('.get()', assert => {
  grid.clear();
  grid.set(0, 0, '1');

  actual = grid.get(0, 0);
  expected = '1';
  assert.equal(actual, expected, 'should return the value saved in the coordinates x, y');

  actual = grid.get(-1, -1);
  expected = '1';
  assert.equal(actual, expected, 'coordinates x, y should be clipped if necessary');

  expected = grid.set(w-1, h-1, 'last');

  actual = grid.get(w + 99, h + 99);
  expected = 'last';
  assert.equal(actual, expected, 'coordinates x, y should be clipped if necessary');

  assert.end();
})

test('.set()', assert => {
  grid.clear();
  grid.set(0, 0, '2');

  actual = grid.get(0, 0);
  expected = '2';

  assert.equal(actual, expected, 'should save a value in the coordinates x, y');

  assert.end();
})

test('.has()', assert => {
  grid.clear();
  grid.set(0, 0, '2');

  actual = grid.has(0, 0);
  expected = true;

  assert.equal(actual, expected, 'should return true if has a value different of null/undefined in the coordinates x, y ');

  actual = grid.has(1, 1);
  expected = false;

  assert.equal(actual, expected, 'should return falae if has a value equal of null/undefined in the coordinates x, y ');

  assert.end();
})

test('.clear()', assert => {
  grid.set(0, 0, '1');
  grid.clear();

  actual = grid.get(0,0);
  expected = null;

  assert.equal(actual, expected, 'should clear all stored values');

  assert.end();
})

test('.clone()', assert => {
  grid.clear();
  grid.set(0, 0, 'x');

  actual = grid.clone() instanceof Grid;
  expected = grid instanceof Grid;
  assert.equal(actual, expected, 'should returns a copy of the grid');

  actual = grid.clone();
  expected = grid;
  assert.notEqual(actual, expected, 'should returns a copy of the grid');

  actual = grid.clone().get(0,0);
  expected = grid.get(0,0);
  assert.equal(actual, expected, 'should returns a copy with same cells');

  actual = grid.clone().length;
  expected = grid.length;
  assert.equal(actual, expected, 'should returns a copy with same length');

  actual = grid.clone().width;
  expected = grid.width;
  assert.equal(actual, expected, 'should returns a copy with same width');

  actual = grid.clone().height;
  expected = grid.height;
  assert.equal(actual, expected, 'should returns a copy with same height');

  assert.end();
})

test('.clipX()', assert => {
  grid.clear();

  actual = grid.clipX(-10);
  expected = 0;
  assert.equal(actual, expected, 'should clamp the x to min=0 or max=(grid.width - 1)');

  actual = grid.clipX(w + 99);
  expected = w - 1;
  assert.equal(actual, expected, 'should clamp the x to min=0 or max=(grid.width - 1)');

  assert.end();
})

test('.clipY()', assert => {
  grid.clear();

  actual = grid.clipY(-10);
  expected = 0;
  assert.equal(actual, expected, 'should clamp the y to min=0 or max=(grid.width - 1)');

  actual = grid.clipY(h + 99);
  expected = h - 1;
  assert.equal(actual, expected, 'should clamp the y to min=0 or max=(grid.height - 1)');

  assert.end();
})

test('.toArray()', assert => {
  grid.clear();

  const values = []
  let i = 0

  for(; i < grid.length; i++) {
    values.push(i + 1); // values => [1, 2, 3, 4, ...]
  }

  i = 0
  grid.forEach((value, x, y) => {
    grid.set(x, y, values[i++])
  })

  actual = grid.toArray();
  expected = values;
  assert.deepEqual(actual, expected, 'should return the stored values as an array');

  actual = Array.isArray(grid.toArray());
  expected = Array.isArray(values);
  assert.equal(actual, expected, 'should return the stored values as an array');

  assert.end();
})

test('.toString()', assert => {
  grid.clear();

  const values = []
  let i = 0

  for(; i < grid.length; i++) {
    values.push(i + 1); // values => [1, 2, 3, 4, ...]
  }

  i = 0
  grid.forEach((value, x, y) => {
    grid.set(x, y, values[i++])
  })

  actual = grid.toString();
  expected = values.join(',');
  assert.equal(actual, expected, 'should return the stored values as string');

  assert.end();
})

test('.forEach()', assert => {
  grid.clear();

  let coordinates = []

  grid.forEach((value, x, y) => {
    const coord = `${x},${y}`;
    grid.set(x, y, coord);
    coordinates.push(coord)
  })

  actual = grid.toArray();
  expected = coordinates;
  assert.deepEqual(actual, expected, 'should executes a provided function once for each cell of grid');

  actual = grid.length;
  expected = coordinates.length;
  assert.deepEqual(actual, expected, 'should executes a provided function once for each cell of grid');

  let count = 0;
  grid.forEach(function () {
    count++;
    return false
  })

  actual = count;
  expected = 1;
  assert.deepEqual(actual, expected, 'should stop the loop if the callback returns false');

  let position;
  const lastPosition = {
    x: grid.width - 1,
    y: grid.height - 1,
  }
  grid.forEach(function (val, x, y) {
    position = {x, y}
    return false
  }, true)

  actual = position;
  expected = lastPosition;
  assert.deepEqual(actual, expected, 'should do a reverse loop if the second argument is truly');

  assert.end();
})

test('static .fromArray()', assert => {
  const values = [1, 2, 3, 4]

  const gridFromArray = Grid.fromArray(2, 2, values)

  actual = gridFromArray.toArray();
  expected = values;
  assert.deepEqual(actual, expected, 'should populate the grid with the values in array');

  assert.end();
})

test('.width', assert => {
  grid.clear();

  actual = grid.width;
  expected = w;

  assert.equal(actual, expected, 'should return the grid width');

  assert.end();
})

test('.height', assert => {
  grid.clear();

  actual = grid.height;
  expected = h;

  assert.equal(actual, expected, 'should return the grid height');

  assert.end();
})

test('.length', assert => {
  grid.clear();

  actual = grid.length;
  expected = w * h;

  assert.equal(actual, expected, 'should return the total of cells');

  assert.end();
})
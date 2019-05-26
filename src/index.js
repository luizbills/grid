class Grid {
  constructor (width, height) {
    this.__width = Math.abs(width);
    this.__height = Math.abs(height);
    this.clear()
  }

  set (x, y, value) {
    this.__cells[this.__getIndex(x, y)] = value;
    return this;
  }

  get (x, y) {
    return this.__cells[this.__getIndex(x, y)] || null;
  }

  has (x, y) {
    return this.get(x, y) != null;
  }

  get width () {
    return this.__width;
  }

  get height () {
    return this.__height;
  }

  get length () {
    return this.__width * this.__height;
  }

  forEach (callback) {
    const cells = this.__cells,
          w = this.__width,
          h = this.__height;

    for (let y = 0; y < h; y++) {
      let proceed;
      for (let x = 0; x < w; x++) {
        proceed = callback(cells[this.__getIndex(x, y)], x, y, this);
        if (false === proceed) break;
      }
      if (false === proceed) break;
    }
    return this;
  }

  clone () {
    return Grid.fromArray(
      this.__width,
      this.__height,
      this.__cells
    );
  }

  clear () {
    this.__cells = Array(this.__width * this.__height);
    return this;
  }

  clipX (x) {
    return this.__clip(x, 0, this.__width - 1);
  }

  clipY (y) {
    return this.__clip(y, 0, this.__height - 1);
  }

  toArray () {
    return this.__cells.slice(0);
  }

  toString () {
    return this.__cells.join(',');
  }

  // internals
  __getIndex (x, y) {
    x = this.clipX(x)
    y = this.clipY(y)
    return x + (y * this.__width);
  }

  __clip (n, min, max) {
    return Math.min(Math.max(n, min), max);
  }
}

Grid.fromArray = (width, height, array) => {
  const grid = new Grid(width, height);
  let i = 0;
  grid.forEach((val, x, y) => {
    grid.set(x, y, array[i++])
  })
  return grid;
}

if (typeof module !== 'undefined') {
  module.exports = Grid;
} else {
  window.Grid = Grid
}

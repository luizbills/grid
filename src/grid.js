(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
      // Node
      module.exports = factory();
  } else {
      // Browser
      root.grid = factory();
  }
})(this, function () {
  function grid(width, height) {
    width = +width || 1;
    height = +height || 1;

    var instance = {
      /** @readonly */
      width: width,

      /** @readonly */
      height: height,

      /** @readonly */
      length: width * height,

      get: _getCell,
      set: _setCell,
      remove: _clearCell,

      reset: _resetGrid,

      forEach: _forEach,

      _cells: []
    };

    return instance;
  }

  function _getCell(x, y) {
    // #ifdef DEBUG
    _validate(x, y, this.width, this.height);
    // #endif
    return this._cells[_getIndex(x, y, this.width)];
  }

  function _setCell(x, y, value) {
    // #ifdef DEBUG
    _validate(x, y, this.width, this.height);
    // #endif
    return (this._cells[_getIndex(x, y, this.width)] = value);
  }

  function _clearCell(x, y) {
    // #ifdef DEBUG
    _validate(x, y, this.width, this.height);
    // #endif
    this._cells[_getIndex(x, y, this.width)] = null;
  }

  function _resetGrid() {
    this._cells = [];
  }

  function _forEach(callback, thisArg) {
    var i = 0,
      cells = this._cells,
      len = this.length;

    for (; i < len; i++) {
      var x = _getX(i, this.width),
        y = _getY(i, this.width),
        value = cells[len] != null ? cells[len] : null;

      callback.call(thisArg, value, x, y);
    }
  }


  // helpers
  function _getIndex(x, y, width) {
    return x + (y * width);
  }

  function _getX(index, width) {
    return index % width;
  }

  function _getY(index, width) {
    return Math.floor(index / width);
  }
  
  // #ifdef DEBUG
  function _validate(x, y, width, height) {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      throw new Error('Invalid coordinates');
    }
    else if (width < 0 || height < 0) {
      throw new Error('Invalid grid dimensions');
    }
  }
  // #endif

  // exports
  return grid;
});

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
  var NULL;

  function grid(width, height) {
    width = (width|0) || 1;
    height = (height|0) || 1;

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
      isValid: _isValidPosition,

      reset: _resetGrid,

      forEach: _forEach,

      _cells: []
    };

    return instance;
  }

  function _getCell(x, y) {
    // #ifdef DEBUG
    if ( !_validate(x, y, this.width, this.height) ) throw new Error('Invalid coordinates');
    // #endif
    return this._cells[_getIndex(x, y, this.width)];
  }

  function _setCell(x, y, value) {
    // #ifdef DEBUG
    if ( !_validate(x, y, this.width, this.height) ) throw new Error('Invalid coordinates');
    // #endif
    return (this._cells[_getIndex(x, y, this.width)] = value);
  }

  function _clearCell(x, y) {
    // #ifdef DEBUG
    if ( !_validate(x, y, this.width, this.height) ) throw new Error('Invalid coordinates');
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
        value = cells[len] !== NULL ? cells[len] : NULL;

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

  function _isValidPosition(x, y) {
    return _validate(x, y, this.width, this.height);
  }

  function _validate(x, y, width, height) {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      return false;
    }
    return true
  }

  // exports
  return grid;
});

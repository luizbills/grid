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
      resize: _resizeGrid,

      reset: _resetGrid,

      forEach: _forEach,
      map: _map,
      clone: _clone,

      /** @private */
      _cells: []
    };

    return instance;
  }

  function _getCell(x, y) {
    if ( !_validate(x, y, this.width, this.height) ) throw new Error('Invalid coordinates');
    return this._cells[_getIndex(x, y, this.width)];
  }

  function _setCell(x, y, value) {
    if ( !_validate(x, y, this.width, this.height) ) throw new Error('Invalid coordinates');
    return (this._cells[_getIndex(x, y, this.width)] = value);
  }

  function _clearCell(x, y) {
    if ( !_validate(x, y, this.width, this.height) ) throw new Error('Invalid coordinates');
    this._cells[_getIndex(x, y, this.width)] = NULL;
  }

  function _resizeGrid (width, height) {
    if ( width < 0 || height < 0 ) throw new Error('Invalid grid size');
    this.width = width;
    this.height = height;
    this.length = width * height;
  }

  function _resetGrid() {
    this._cells = [];
  }

  function _isValidPosition(x, y) {
    return _validate(x, y, this.width, this.height);
  }

  function _forEach(callback, thisArg) {
    var i = 0,
      _this = this,
      cells = _this._cells,
      len = _this.length;

    for (; i < len; i++) {
      callback.call(thisArg, cells[i], _getX(i, _this.width), _getY(i, _this.width), _this);
    }
  }

  function _map(callback, thisArg) {
    var i = 0,
      _this = this,
      cells = _this._cells,
      len = _this.length,
      result = grid(_this.width, _this.height);

    for (; i < len; i++) {
      var x = _getX(i, _this.width),
        y = _getY(i, _this.width);

      result.set(x, y, callback.call(thisArg, cells[i], x, y, _this));
    }

    return result;
  }

  function _clone() {
    var i = 0,
      _this = this,
      cells = _this._cells,
      len = _this.length,
      result = grid(_this.width, _this.height);

    for (; i < len; i++) {
      if ( cells[i] === NULL ) continue;
      result.set(_getX(i, _this.width), _getY(i, _this.width), cells[i]);
    }

    return result;
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

  function _validate(x, y, width, height) {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      return false;
    }
    return true
  }

  // exports
  return grid;
});


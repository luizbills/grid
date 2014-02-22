(function(window, undefined) {
  "use strict";

  function Grid (width, height, initialValue) {
    var i, len, v, x, y;

    this.width = width || 1;
    this.height = height || 1;
    this.length = this.width * this.height;

    this.cells = [];

    if (typeof initialValue === 'undefined') return;

    for(i = 0, len = this.length; i < len; i++) {
      if (typeof initialValue === 'function') {
        x = i % this.width;
        y = ~~(i / this.width) % this.height;
        this.cells[i] = initialValue.call(this, x, y);
      } else {
        this.cells[i] = initialValue;
      }
    }

  }

  Grid.prototype = {

    set: function (x, y, value) {
      this.cells[x + y*this.height] = value;
    },

    // get value on cell
    get: function (x, y) {
      return this.cells[x + y*this.height];
    },

    // clear one cell or all grid
    clear: function (x, y) {
      if (arguments.length === 2) {
        delete this.cells[x + y*this.height];
      } else {
        this.cells.length = 0;
      }
    },

    has: function (x, y) {
      return this.cells[x + y*this.height] !== undefined;
    },

    forEach: function (callback) {
      var i, len, x, y;

      for(i = 0, len = this.length; i < len; i++) {
        x = i % this.width;
        y = ~~(i / this.width) % this.height;
        callback.call(this, x, y);
      }
    },

    toString: function() {
      var str = "";

      this.forEach(function(x, y) {
        str += "(" + x + "," + y + ") -> " + this.get(x, y) + "\n";
      });

      return str;
    }

  };

  window.Grid = Grid;
}(window));

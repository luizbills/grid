/** 
 * grid-data v2.1.0 by Luiz "Bills"
 * https://github.com/luizbills/grid | MIT
 */
(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Grid =
  /*#__PURE__*/
  function () {
    function Grid(width, height) {
      _classCallCheck(this, Grid);

      this.__width = Math.abs(width);
      this.__height = Math.abs(height);
      this.clear();
    }

    _createClass(Grid, [{
      key: "set",
      value: function set(x, y, value) {
        this.__cells[this.__getIndex(x, y)] = value;
        return this;
      }
    }, {
      key: "get",
      value: function get(x, y) {
        return this.__cells[this.__getIndex(x, y)] || null;
      }
    }, {
      key: "has",
      value: function has(x, y) {
        return this.get(x, y) != null;
      }
    }, {
      key: "forEach",
      value: function forEach(callback) {
        var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var cells = this.__cells,
            w = this.__width,
            h = this.__height,
            limitX = !reverse ? w : -1,
            limitY = !reverse ? h : -1;
        var x = !reverse ? 0 : w - 1,
            y = !reverse ? 0 : h - 1;

        while (y != limitY) {
          var proceed = void 0;
          x = !reverse ? 0 : w - 1;

          while (x != limitX) {
            proceed = callback(cells[this.__getIndex(x, y)], x, y, this);
            if (false === proceed) break;
            x += reverse ? -1 : 1;
            console.log(x, y);
          }

          if (false === proceed) break;
          y += reverse ? -1 : 1;
          console.log(x, y);
        }

        return this;
      }
    }, {
      key: "clone",
      value: function clone() {
        return Grid.fromArray(this.__width, this.__height, this.__cells);
      }
    }, {
      key: "clear",
      value: function clear() {
        this.__cells = Array(this.__width * this.__height);
        return this;
      }
    }, {
      key: "clipX",
      value: function clipX(x) {
        return this.__clip(x, 0, this.__width - 1);
      }
    }, {
      key: "clipY",
      value: function clipY(y) {
        return this.__clip(y, 0, this.__height - 1);
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return this.__cells.slice(0);
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.__cells.join(',');
      } // internals

    }, {
      key: "__getIndex",
      value: function __getIndex(x, y) {
        x = this.clipX(x);
        y = this.clipY(y);
        return x + y * this.__width;
      }
    }, {
      key: "__clip",
      value: function __clip(n, min, max) {
        return Math.min(Math.max(n, min), max);
      }
    }, {
      key: "width",
      get: function get() {
        return this.__width;
      }
    }, {
      key: "height",
      get: function get() {
        return this.__height;
      }
    }, {
      key: "length",
      get: function get() {
        return this.__width * this.__height;
      }
    }]);

    return Grid;
  }();

  Grid.fromArray = function (width, height, array) {
    var grid = new Grid(width, height);
    var i = 0;
    grid.forEach(function (val, x, y) {
      grid.set(x, y, array[i++]);
    });
    return grid;
  };

  if (typeof module !== 'undefined') {
    module.exports = Grid;
  } else {
    window.Grid = Grid;
  }

}());

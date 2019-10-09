"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Computer =
/*#__PURE__*/
function () {
  function Computer(manufacturer, processor) {
    _classCallCheck(this, Computer);

    this._manufacturer = manufacturer;
    this._processor = processor;
  }

  _createClass(Computer, [{
    key: "showInfo",
    value: function showInfo() {
      return [this.manufacturer, this.processor];
    }
  }, {
    key: "manufacturer",
    get: function get() {
      return this._manufacturer;
    },
    set: function set(newManufacturer) {
      this._manufacturer = newManufacturer;
    }
  }, {
    key: "processor",
    get: function get() {
      return this._processor;
    },
    set: function set(newProcessor) {
      this._processor = newProcessor;
    }
  }]);

  return Computer;
}();

var Ultrabook =
/*#__PURE__*/
function (_Computer) {
  _inherits(Ultrabook, _Computer);

  function Ultrabook(manufacturer, processor, hardDiskSize) {
    var _this;

    _classCallCheck(this, Ultrabook);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ultrabook).call(this, manufacturer, processor));
    _this._hardDiskSize = hardDiskSize;
    return _this;
  }

  _createClass(Ultrabook, [{
    key: "showInfo",
    value: function showInfo() {
      return [_get(_getPrototypeOf(Ultrabook.prototype), "showInfo", this).call(this), this.hardDiskSize];
    }
  }, {
    key: "hardDiskSize",
    get: function get() {
      return this._hardDiskSize;
    },
    set: function set(newHardDiskSize) {
      this._hardDiskSize = newHardDiskSize;
    }
  }]);

  return Ultrabook;
}(Computer);

var computer = new Computer("HP", "AMD");
var ultrabook = new Ultrabook("Lenovo", "Intel", 256);
console.log(computer.showInfo());
console.log(ultrabook.showInfo());
//# sourceMappingURL=es5.js.map

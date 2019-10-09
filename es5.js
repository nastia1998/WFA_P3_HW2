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

var express = require('express');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var port = 3000;

var Datastore = require('nedb');

var computers = new Datastore({
  filename: 'computers.db',
  autoload: true
});

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

app.get('/computers/:id', function (req, res) {
  var compId = req.params.id;
  computers.findOne({
    _id: compId
  }, function (err, doc) {
    err === true ? res.json(err) : res.json(doc);
  });
});
app.get('/computers', function (req, res) {
  computers.find({}, function (err, docs) {
    err === true ? res.json(err) : res.json(docs);
  });
});
app.post('/computers', function (req, res) {
  var computer = new Computer(req.body.manufacturer, req.body.processor);
  computers.insert(computer, function (err, doc) {
    err === true ? res.json(err) : res.json(doc);
  });
});
app.put('/computers', function (req, res) {
  var comp = req.body;
  var replComp = [];
  computers.update({
    _id: comp._id
  }, {
    $set: {
      _manufacturer: comp._manufacturer,
      _processor: comp._processor
    }
  }, {}, function (err, numReplaced) {
    if (err) {
      res.json(err);
    } else {
      computers.findOne({
        _id: comp._id
      }, function (err, doc) {
        if (err) {
          res.json(err);
        } else {
          replComp = doc;
          res.json(replComp);
        }
      });
    }
  });
});
app["delete"]('/computers', function (req, res) {
  var id = req.body.id;
  var delComp = [];
  computers.findOne({
    _id: id
  }, function (err, doc) {
    err === true ? res.json(err) : delComp = doc;
  });
  computers.remove({
    _id: id
  }, function (err, numDeleted) {
    err === true ? res.json(err) : res.json(delComp);
  });
});
app.get('/', function (req, res) {
  return res.send('Hello World!');
});
app.listen(port, function () {
  return console.log("Server is listening on port ".concat(port, "!"));
});
//# sourceMappingURL=es5.js.map

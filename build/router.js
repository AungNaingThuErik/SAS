"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _HealthcheckController = _interopRequireDefault(require("./controllers/HealthcheckController"));

var _AdminController = _interopRequireDefault(require("./controllers/AdminController"));

var router = _express["default"].Router();

router.use('/', _HealthcheckController["default"]);
router.use('/', _AdminController["default"]);
var _default = router;
exports["default"] = _default;
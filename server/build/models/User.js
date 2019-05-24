"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

require("mongoose-type-email");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _mongoose.default.model('User', new _mongoose.default.Schema({
  address: {
    type: String,
    unique: true
  },
  email: {
    type: _mongoose.default.SchemaTypes.Email,
    index: true
  },
  firstName: String,
  lastName: String,
  github: String,
  twitter: String,
  token: String,
  tokenCreatedAt: Date
}, {
  timestamps: true
}));

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ObjectId
} = _mongoose.default.Schema.Types;

var _default = _mongoose.default.model('Project', new _mongoose.default.Schema({
  missions: [{
    type: ObjectId,
    ref: 'Mission'
  }],
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  title: String,
  description: String
}, {
  timestamps: true
}));

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ethereumjsWallet = _interopRequireDefault(require("ethereumjs-wallet"));

var _uuidTokenGenerator = _interopRequireDefault(require("uuid-token-generator"));

var _apolloDatasource = require("apollo-datasource");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAPI extends _apolloDatasource.DataSource {
  initialize(config) {
    this.context = config.context;
    this.user = this.context.user || null;
  }

  async me() {
    return _User.default.findOne({
      _id: this.user.id
    });
  }

  async updateProfile({
    firstName,
    lastName,
    email,
    twitter,
    github
  }) {
    await _User.default.update({
      address: this.user.address
    }, {
      firstName,
      lastName,
      email,
      twitter,
      github
    });
    return firstName;
  }

  async generateToken(privateKey) {
    let wallet;

    try {
      wallet = _ethereumjsWallet.default.fromPrivateKey(Buffer.from(new Uint8Array(privateKey.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))));
    } catch (e) {
      return null;
    }

    const buf2hex = buffer => {
      return Array.prototype.map.call(new Uint8Array(buffer), x => `00${x.toString(16)}`.slice(-2)).join('');
    };

    const address = buf2hex(wallet.getAddress());
    const generator = new _uuidTokenGenerator.default(256, _uuidTokenGenerator.default.BASE62);
    const token = generator.generate();
    await _User.default.update({
      address
    }, {
      address,
      token,
      tokenCreatedAt: new Date()
    }, {
      upsert: true
    });
    return new Buffer(token).toString('base64');
  }

}

exports.default = UserAPI;
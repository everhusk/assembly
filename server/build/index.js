"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ApolloServer", {
  enumerable: true,
  get: function () {
    return _apolloServer.ApolloServer;
  }
});
Object.defineProperty(exports, "typeDefs", {
  enumerable: true,
  get: function () {
    return _schema.default;
  }
});
Object.defineProperty(exports, "resolvers", {
  enumerable: true,
  get: function () {
    return _resolvers.default;
  }
});
Object.defineProperty(exports, "UserAPI", {
  enumerable: true,
  get: function () {
    return _UserAPI.default;
  }
});
exports.server = exports.context = exports.dataSources = void 0;

var _apolloServer = require("apollo-server");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _UserAPI = _interopRequireDefault(require("./datasources/UserAPI"));

var _ProjectAPI = _interopRequireDefault(require("./datasources/ProjectAPI"));

var _User = _interopRequireDefault(require("./models/User"));

var _Mission = _interopRequireDefault(require("./models/Mission"));

var _Project = _interopRequireDefault(require("./models/Project"));

var _missions = _interopRequireDefault(require("./data/missions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
_dotenv.default.config();

_mongoose.default.connect('mongodb://localhost/sn', {
  useMongoClient: true
});

_mongoose.default.connection.on('error', console.error.bind(console, '❌ db connection error:'));

_mongoose.default.connection.once('open', async () => {
  console.log('✅ db connection established');

  if (process.env.NODE_ENV === 'dev') {
    // populate missions collection for dev env if it's empty
    if ((await _Mission.default.findOne()) === null) {
      await _Mission.default.insertMany(_missions.default);
      const missions = await _Mission.default.find();

      for (let mission of missions) {
        const rand = Math.floor(Math.random() * 4) + 1;

        for (let i = 1; i <= rand; i++) {
          _Project.default.create({
            title: 'Project ' + i,
            missions: mission.id,
            description: 'Project ' + i + ' description'
          });
        }
      }
    }
  }
});

const dataSources = () => ({
  userAPI: new _UserAPI.default(),
  projectAPI: new _ProjectAPI.default()
}); // the function that sets up the global context for each resolver, using the req


exports.dataSources = dataSources;

const context = async ({
  req
}) => {
  if (req.body.operationName === 'login') {
    return;
  }

  const auth = req.headers && req.headers.authorization || '';
  const token = new Buffer(auth, 'base64').toString('ascii');
  const minCreatedAt = new Date();
  minCreatedAt.setHours(minCreatedAt.getHours() - 24);
  const user = await _User.default.findOne({
    token,
    tokenCreatedAt: {
      $gte: minCreatedAt
    }
  });

  if (!user) {
    throw new _apolloServer.AuthenticationError('You are not logged in or your token has expired.');
  }

  return {
    user
  };
};

exports.context = context;
const server = new _apolloServer.ApolloServer({
  typeDefs: _schema.default,
  resolvers: _resolvers.default,
  dataSources,
  context,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
}); // Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test

exports.server = server;

if (process.env.NODE_ENV !== 'test') {
  server.listen({
    port: 4000
  }).then(({
    url
  }) => console.log(`🚀 app running at ${url}`));
} // export all the important pieces for integration/e2e tests to use
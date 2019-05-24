"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mission = _interopRequireDefault(require("./models/Mission"));

var _Project = _interopRequireDefault(require("./models/Project"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// noinspection JSUnusedGlobalSymbols
var _default = {
  Query: {
    me: async (_, __, {
      dataSources
    }) => dataSources.userAPI.me(),
    missions: async () => _Mission.default.find(),
    mission: async (_, {
      id
    }) => _Mission.default.findOne({
      _id: id
    }),
    project: async (_, {
      id
    }) => _Project.default.findOne({
      _id: id
    })
  },
  Mutation: {
    login: async (_, {
      login
    }, {
      dataSources
    }) => dataSources.userAPI.generateToken(login),
    updateProfile: async (_, {
      profile
    }, {
      dataSources
    }) => dataSources.userAPI.updateProfile(profile),
    createProject: async (_, {
      project
    }, {
      dataSources
    }) => dataSources.projectAPI.createProject(project)
  },
  Mission: {
    projects: async mission => _Project.default.find({
      missions: mission.id
    })
  },
  User: {
    projects: async user => _Project.default.find({
      owner: user.id
    })
  },
  Project: {
    missions: async project => _Mission.default.find({
      _id: project.missions
    })
  }
};
exports.default = _default;
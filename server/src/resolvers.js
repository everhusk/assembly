import Mission from './models/Mission'
import Project from './models/Project'

// noinspection JSUnusedGlobalSymbols
export default {
  Query: {
    me: async (_, __, { dataSources }) =>
      dataSources.userAPI.me(),

    missions: async () =>
      Mission.find(),

    mission: async (_, { id }) =>
      Mission.findOne({ _id: id }),

    project: async (_, { id }) =>
      Project.findOne({ _id: id }),
  },

  Mutation: {
    login: async (_, { login }, { dataSources }) =>
      dataSources.userAPI.generateToken(login),

    updateProfile: async (_, { profile }, { dataSources }) =>
      dataSources.userAPI.updateProfile(profile),

    createProject: async (_, { project }, { dataSources }) =>
      dataSources.projectAPI.createProject(project),
  },

  Mission: {
    projects: async (mission) =>
      Project.find({ missions: mission.id }),
  },

  User: {
    projects: async (user) =>
      Project.find({ owner: user.id }),
  },

  Project: {
    missions: async (project) =>
      Mission.find({ _id: project.missions }),
  },
}

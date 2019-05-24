/* eslint-disable no-console */
import { ApolloServer, AuthenticationError } from 'apollo-server'
import dotEnv from 'dotenv'
import mongoose from 'mongoose'

import typeDefs from './schema'
import resolvers from './resolvers'
import UserAPI from './datasources/UserAPI'
import ProjectAPI from './datasources/ProjectAPI'
import User from './models/User'
import Mission from './models/Mission'
import Project from './models/Project'
import missionsData from './data/missions'

dotEnv.config()

mongoose.connect('mongodb://localhost/sn', { useMongoClient: true })
mongoose.connection.on('error', console.error.bind(console, '❌ db connection error:'))

mongoose.connection.once('open', async () => {
  console.log('✅ db connection established')
  await Mission.insertMany(missionsData)
  const missions = await Mission.find()
  for (let mission of missions) {
    const rand = Math.floor(Math.random() * 4) + 1
    for (let i = 1; i <= rand; i++) {
      Project.create({ title: 'Project ' + i, missions: mission.id, description: 'Project ' + i + ' description' })
    }
  }
})

export const dataSources = () => ({
  userAPI: new UserAPI(),
  projectAPI: new ProjectAPI(),
})

// the function that sets up the global context for each resolver, using the req
export const context = async ({ req }) => {

  if (req.body.operationName === 'login') {
    return
  }
  const auth = (req.headers && req.headers.authorization) || ''
  const token = new Buffer(auth, 'base64').toString('ascii')
  const minCreatedAt = new Date()
  minCreatedAt.setHours(minCreatedAt.getHours() - 24)

  const user = await User.findOne({ token, tokenCreatedAt: { $gte: minCreatedAt } })
  if (!user) {
    throw new AuthenticationError('You are not logged in or your token has expired.')
  }
  return { user }
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
  },
})

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`))
}

// export all the important pieces for integration/e2e tests to use
export {
  typeDefs,
  resolvers,
  ApolloServer,
  UserAPI,
}

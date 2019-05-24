"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _graphqlTag.default`
  type Query {
    me: User
    missions: [Mission!]!
    mission(id: ID!): Mission
    project(id: ID!): Project
  }
  
  input ProfileInput {
    firstName: String!
    lastName: String!
    email: String!
    twitter: String
    github: String
  }
  
  input ProjectInput {
    title: String!
    description: String!
    missions: [String!]!
  }
  
  type Mutation {
    login(login: String!): String
    updateProfile(profile: ProfileInput): String
    createProject(project: ProjectInput): Project
  }
  
  type User {
    id: ID!
    address: String!
    email: String
    firstName: String
    lastName: String
    twitter: String
    github: String
    modules: [Module!]
    projects: [Project!]
    offers: [Offer!]
  }
  
  type Mission {
    id: ID!
    title: String!
    description: String!
    projects: [Project!]!
  }
  
  type Project {
    id: ID!
    title: String!
    owner: User!
    missions: [Mission!]!
    description: String!
  }
  
  type Module {
    id: ID!
    title: String!
    description: String!
    volume: Int!
    assignee: User
    isDone: Boolean!
  }
  
  type Offer {
    id: ID!
    assignee: User
    module: Module
  }
`;

exports.default = _default;
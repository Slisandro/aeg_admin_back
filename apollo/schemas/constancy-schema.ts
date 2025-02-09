const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Constancy {
    id: ID!
    userId: String!
    user: User
    courseId: String!
    course: Course
    clientId: String! 
    client: Client
    startDate: String!
    endDate: String!
    entityType: String!
  }

  type Course {
    id: ID!
    name: String!
    duration: Int!
    entityType: String!
  }

  type Client {
    id: ID!
    name: String!
    representative: String!
    code: String!
    entityType: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    entityType: String!
  }

  type Query {
    constanciesCount: Int
    getAllConstancies: [Constancy!]
    getConstanciesByUser(userId: ID!): [Constancy!]
    getConstanciesByCourse(courseId: ID!): [Constancy!] 
    getConstanciesByClient(clientId: ID!): [Constancy!]
  }

  type Mutation {
    createOrUpdateConstancy(userId: ID!, courseId: ID!, clientId: ID!, startDate: String!, endDate: String!, entityType: String!): Boolean
    deleteConstancy(id: ID!): Boolean
  }
`;

module.exports = typeDefs;

export {};
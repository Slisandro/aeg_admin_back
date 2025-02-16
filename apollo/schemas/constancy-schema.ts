const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Constancy {
    id: String!
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
    id: String!
    name: String!
    duration: Int!
    entityType: String!
  }

  type Client {
    id: String!
    name: String!
    representative: String!
    code: String!
    entityType: String!
  }

  type User {
    id: String!
    name: String!
    email: String!
    password: String!
    role: String!
    entityType: String!
  }

  type Query {
    constanciesCount: Int
    getAllConstancies: [Constancy!]
    getConstanciesByUser(userId: String!): [Constancy!]
    getConstanciesByCourse(courseId: String!): [Constancy!] 
    getConstanciesByClient(clientId: String!): [Constancy!]
  }

  type Mutation {
    createOrUpdateConstancy(userId: String!, courseId: String!, clientId: String!, startDate: String!, endDate: String!, entityType: String!): Boolean
    deleteConstancy(id: String!): Boolean
  }
`;

module.exports = typeDefs;

export {};
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Constancy {
    id: ID!
    userId: String!
    courseId: String!
    clientId: String! 
    startDate: String!
    endDate: String!
    entityType: String!
  }

  type Query {
    constanciesCount: Int
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
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    entityType: String!
  }

  type Query {
    usersCount: Int
    getUserById(id: ID!): User
    getAllUsers: [User!]
  }

  type Mutation {
    createOrUpdateUser(id: String, name: String!, email: String!, password: String!, role: String!, entityType: String!): Boolean,
    deleteUser(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
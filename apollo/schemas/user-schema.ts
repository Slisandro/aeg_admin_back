const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    password: String!
    role: String!
    entityType: String!
  }

  type Query {
    usersCount: Int
    getUserById(id: String!): User
    getAllUsers: [User!]
  }

  type Mutation {
    createOrUpdateUser(id: String, name: String!, email: String!, password: String!, role: String!, entityType: String!): Boolean,
    deleteUser(id: String!): Boolean
  }
`;

module.exports = typeDefs;
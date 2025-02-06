const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Client {
    id: ID!
    name: String!
    representative: String!
    code: String!
    entityType: String!
  }

  type Query {
    clientsCount: Int
    getClientById(id: ID!): Client
    getAllClients: [Client!]
  }

  type Mutation {
    createOrUpdateClient(id: String, name: String!, representative: String!, code: String!, entityType: String!): Boolean
    deleteClient(id: ID!): Boolean
  }
`;

module.exports = typeDefs;

export {};
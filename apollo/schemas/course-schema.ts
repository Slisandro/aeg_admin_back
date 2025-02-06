const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Course {
    id: ID!
    name: String!
    duration: Int!
    entityType: String!
  }

  type Query {
    coursesCount: Int
    getCourseById(id: ID!): Course
    getAllCourses: [Course!]
  }

  type Mutation {
    createOrUpdateCourse(id: String, name: String!, duration: Int!, entityType: String!): Boolean
    deleteCourse(id: ID!): Boolean
  }
`;

module.exports = typeDefs;

export {};
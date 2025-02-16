const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Course {
    id: String!
    name: String!
    duration: Int!
    entityType: String!
  }

  type Query {
    coursesCount: Int
    getCourseById(id: String!): Course
    getAllCourses: [Course!]
  }

  type Mutation {
    createOrUpdateCourse(id: String, name: String!, duration: Int!, entityType: String!): Boolean
    deleteCourse(id: String!): Boolean
  }
`;

module.exports = typeDefs;

export {};
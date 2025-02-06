const userSchema = require("./user-schema.js");
const courseSchema = require("./course-schema.js");
const constancySchema = require("./constancy-schema.js");
const clientSchema = require("./client-schema.js");

const schemas = [
    userSchema,
    courseSchema,
    constancySchema,
    clientSchema
];

module.exports = schemas;

export {};
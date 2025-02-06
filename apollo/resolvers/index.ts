const userResolvers = require("./user-resolvers.js");
const courseResolvers = require("./course-resolvers.js");
const constancyResolvers = require("./constancy-resolvers.js");
const clientResolvers = require("./client-resolvers.js");

const resolvers = [
    userResolvers,
    clientResolvers,
    constancyResolvers,
    courseResolvers,
];

module.exports = resolvers;

export {}
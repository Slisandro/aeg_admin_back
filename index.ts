const resolvers = require("./apollo/resolvers/index.js");
const schemas = require("./apollo/schemas/index.js");
const { 
  startServerAndCreateLambdaHandler, 
  handlers
} = require("@as-integrations/aws-lambda");

const { ApolloServer } = require("@apollo/server");

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  cache: "bounded"
});

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
)
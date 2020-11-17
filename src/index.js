require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const OzonAPI = require('./datasources/ozon');

// set up any dataSources our resolvers need
const dataSources = () => ({
    ozonAPI: new OzonAPI()
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    OzonAPI
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

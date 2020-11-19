require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginUsageReporting } = require("apollo-server-core");
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const OzonAPI = require('./datasources/ozon');

// set up any dataSources our resolvers need
const dataSources = () => ({
  ozonAPI: new OzonAPI()
});


const myPlugin = {
  requestDidStart(requestContext) {
    return {
      parsingDidStart() {
        return (err) => {
          if (err) {
            console.error(err);
          }
        }
      },
      validationDidStart() {
        // This end hook is unique in that it can receive an array of errors,
        // which will contain every validation error that occurred.
        return (errs) => {
          if (errs) {
            errs.forEach(err => console.error(err));
          }
        }
      },
      executionDidStart() {
        return (err) => {
          if (err) {
            console.error(err);
          }
        }
      },

      /* The `parsingDidStart` request lifecycle event fires
         when parsing begins. The event is scoped within an
         associated `requestDidStart` server lifecycle event. */
      parsingDidStart(requestContext) {
        console.log('Parsing started!')
      },
      responseForOperation(requestContext) {        
        console.log('request operationName: ', requestContext.operationName);
        console.log('request source: ', requestContext.source);
        console.log('request document: ', requestContext.document);
        console.log('request logger: ', requestContext.logger);
      },

    }
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  OzonAPI,
  plugins: [
    myPlugin
  ],
  context: () => {
    return {
      token: 'f9303b04-8db4-4d34-b2a9-356ba490f977',
      usedcrs: 'EPSG:28992'
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

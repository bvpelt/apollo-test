const { ApolloServerPluginUsageReporting } = require("apollo-server-core");

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
  
  module.exports = myPlugin;
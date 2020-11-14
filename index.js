const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
  title: String
  author: Author
}

type Author {
  name: String
  books: [Book]
}

type Post {
    title: String
    body: String
    mediaUrls: [String]
}



  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
  books: [Book]
  authors: [Author]
  activiteiten: String
}

type Mutation {
  createPost(post: PostAndMediaInput): Post
}

input PostAndMediaInput {
  "A main title for the post"
  title: String
  "The text body of the post."
  body: String
  "A list of URLs to render in the post."
  mediaUrls: [String]
}

`;

//
// data set
const books = [
    {
        title: 'The Awakening',
        author: {
            name: 'Kate Chopin'
        }
    },
    {
        title: 'City of Glass',
        author: {
            name: 'Paul Auster'
        }
    },
];

const authors = [
    {
        name: 'Kate Chopin',
        books: [{ title: 'The Awakening' }]

    },
    {

        name: 'Paul Auster',
        books: [{ title: 'City of Glass' }]

    },
];


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
        authors: () => authors,
        activiteiten: async (_source, _args, { dataSources }) => {
            return dataSources.moviesAPI.getActiviteiten();
        }
    }
};


class MoviesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://nep-knooppunt-test.viewer.dso.kadaster.nl/publiek/omgevingsdocumenten/api/presenteren/v5';
    }

    async getMovie(id) {
        return this.get(`movies/${id}`);
    }

    async getMostViewedMovies(limit = 10) {
        const data = await this.get('movies', {
            per_page: limit,
            order_by: 'most_viewed',
        });
        return data.results;
    }

    async getActiviteiten(limit = 10) {
        const data = await this.get('activiteiten', {
            per_page: limit,

        });
        return data.results;
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            moviesAPI: new MoviesAPI(),
        };
    }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

/* eslint-disable no-console */
import { GraphQLServer } from 'graphql-yoga';

// Types
// Scalar types (single item): String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float,
    inStock: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    title() {
      return 'Twister';
    },
    price() {
      return 9.99;
    },
    releaseYear() {
      return null;
    },
    rating() {
      return 9.5;
    },
    inStock() {
      return true;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up');
});

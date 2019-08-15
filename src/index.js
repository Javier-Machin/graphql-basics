/* eslint-disable no-console */
import { GraphQLServer } from 'graphql-yoga';

// Types
// Scalar types (single item): String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String, location: String ): String!
    add(a: Float!, b: Float!): Float!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      return args.a + args.b;
    },
    greeting(parent, args, ctx, info) {
      const { name, location } = args;
      return name && location ? `Hello, ${name} from ${location}` : 'Hello!';
    },
    me() {
      return {
        id: '1234030',
        name: 'Javi',
        email: 'javi@example.com'
      };
    },
    post() {
      return {
        id: 'a4032',
        title: 'post title',
        body: 'post body',
        published: true
      };
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

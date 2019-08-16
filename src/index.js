/* eslint-disable no-console */
import { GraphQLServer } from 'graphql-yoga';

// Types
// Scalar types (single item): String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: '1',
    name: 'Javi',
    email: 'javi@example.com',
    age: 30
  },
  {
    id: '2',
    name: 'Miguel',
    email: 'miguel@example.com'
  },
  {
    id: '2',
    name: 'Manolo',
    email: 'manolo@example.com',
    age: 33
  }
];

// Demo posts data
const posts = [
  {
    id: '1',
    title: 'first post title',
    body: 'first post body',
    published: true
  },
  {
    id: '2',
    title: 'second post title',
    body: 'second post body',
    published: false
  },
  {
    id: '3',
    title: 'third post title',
    body: 'third post body',
    published: true
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
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
    me() {
      return {
        id: '1234030',
        name: 'Javi',
        email: 'javi@example.com'
      };
    },
    users(parent, args, ctx, info) {
      if (!args.query) return users;

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    post() {
      return {
        id: 'a4032',
        title: 'post title',
        body: 'post body',
        published: true
      };
    },
    posts(parent, args, ctx, info) {
      const { query } = args;
      if (!query) return posts;

      return posts.filter(post => {
        return (
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
        );
      });
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

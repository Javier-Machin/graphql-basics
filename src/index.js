/* eslint-disable no-console */
import { GraphQLServer } from 'graphql-yoga';

// Types
// Scalar types (single item): String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: '11',
    name: 'Javi',
    email: 'javi@example.com',
    age: 30
  },
  {
    id: '22',
    name: 'Miguel',
    email: 'miguel@example.com'
  },
  {
    id: '33',
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
    published: true,
    author: '11'
  },
  {
    id: '2',
    title: 'second post title',
    body: 'second post body',
    published: false,
    author: '22'
  },
  {
    id: '3',
    title: 'third post title',
    body: 'third post body',
    published: true,
    author: '33'
  }
];

// Demo comments data
const comments = [
  {
    id: '1',
    text: 'first comment',
    author: '11',
    post: '1'
  },
  {
    id: '2',
    text: 'second comment',
    author: '11',
    post: '2'
  },
  {
    id: '3',
    text: 'third comment',
    author: '22',
    post: '3'
  },
  {
    id: '4',
    text: 'fourth comment',
    author: '33',
    post: '3'
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    },
    comments(parent, args, ctx, info) {
      return comments;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post);
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

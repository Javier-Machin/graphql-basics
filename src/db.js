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
    name: 'Manuel',
    email: 'manuel@example.com',
    age: 33
  }
];

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

const db = {
  users,
  posts,
  comments
};

export default db;

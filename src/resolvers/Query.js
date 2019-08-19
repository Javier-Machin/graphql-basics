const Query = {
  me() {
    return {
      id: '1234030',
      name: 'Javi',
      email: 'javi@example.com'
    };
  },
  users(parent, args, { db }, info) {
    if (!args.query) return db.users;

    return db.users.filter(user => {
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
  posts(parent, args, { db }, info) {
    const { query } = args;
    if (!query) return db.posts;

    return db.posts.filter(post => {
      return (
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
      );
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  }
};

export default Query;

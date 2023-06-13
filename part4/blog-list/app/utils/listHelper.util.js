const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducerFn = (total, cur) => total + cur.likes;

  return blogs.reduce(reducerFn, 0);
};

favoriteBlog = (blogs) => {
  const reducerFn = (max, cur) =>
    Math.max(max.likes, cur.likes) === max.likes ? max : cur;

  return blogs.reduce(reducerFn);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

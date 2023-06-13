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

mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return { author: null, blogs: null };
  }

  const authorHistogram = {};
  blogs.forEach((b) => {
    if (authorHistogram[b.author] === undefined) {
      authorHistogram[b.author] = 1;
    } else {
      authorHistogram[b.author]++;
    }
  });

  const maxBlogs = Math.max(...Object.values(authorHistogram));

  let returnValue = undefined;

  Object.keys(authorHistogram).forEach((a) => {
    if (authorHistogram[a] === maxBlogs) {
      returnValue = { author: a, blogs: maxBlogs };
    }
  });

  return returnValue;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};

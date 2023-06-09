const listHelper = require('../app/utils/listHelper.util');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    title: 'A cool blog',
    author: 'Ian de Jesus',
    url: 'https://google.com',
    likes: 123,
    id: '6487e81d9c1193da2dc3effa',
  },
  {
    title: 'Another blog',
    author: 'Ian de Jesus',
    url: 'https://spotify.com',
    likes: 321,
    id: '6487eb5f973dae5d15269bf3',
  },
];

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(449);
  });
});

describe('favorite blog', () => {
  test('of a list with one blog is the same favorite blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test('of many blogs is the one with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    expect(result).toEqual(listWithManyBlogs[2]);
  });
});

describe('most blogs', () => {
  test('of an empty list is null', () => {
    expect(listHelper.mostBlogs([])).toEqual({ author: null, blogs: null });
  });

  test('of a list with 1 blog should contain that blog author', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });

  test('of a list with many blogs should the author with the most blogs', () => {
    expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({
      author: 'Ian de Jesus',
      blogs: 2,
    });
  });
});

describe('most likes', () => {
  const listWithTwoAuthorsWithSameLikes = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 123,
      __v: 0,
    },
    {
      _id: '5a422aa71b123176234d17f8',
      title: 'Functional Programming Essentials',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 321,
      __v: 0,
    },
    {
      title: 'A cool blog',
      author: 'Ian de Jesus',
      url: 'https://google.com',
      likes: 123,
      id: '6487e81d9c1193da2dc3effa',
    },
    {
      title: 'Another blog',
      author: 'Ian de Jesus',
      url: 'https://spotify.com',
      likes: 321,
      id: '6487eb5f973dae5d15269bf3',
    },
  ];

  test('of an empty list is null', () => {
    expect(listHelper.mostLikes([])).toEqual({ author: null, likes: null });
  });

  test('of a list with 1 blog should contain that blog author', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('of a list with many blogs should the author with the most blogs', () => {
    expect(listHelper.mostLikes(listWithManyBlogs)).toEqual({
      author: 'Ian de Jesus',
      likes: 444,
    });
  });

  test('of a list authors with the same amount of likes can return any one of them', () => {
    expect(listHelper.mostLikes(listWithTwoAuthorsWithSameLikes)).toEqual({
      author: 'Ian de Jesus',
      likes: 444,
    });
  });
});

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../app/models/blog.model');
mongoose.set('bufferTimeoutMS', 30000);
jest.setTimeout(50000);

const api = supertest(app);

const initialBlogs = [
  {
    title: 'A cool blog',
    author: 'Ian de Jesus',
    url: 'https://google.com',
    likes: 123,
  },
  {
    title: 'Another cool blog',
    author: 'Pan de Jesus',
    url: 'https://google.com',
    likes: 321,
  },
  {
    title: 'An extra blog by Pan de Jesus',
    author: 'Pan de Jesus',
    url: 'https://google.com',
    likes: 5,
  },
];

beforeAll(async () => {
  await Blog.deleteMany({});
  const promises = initialBlogs.map((blog) => new Blog(blog).save());
  await Promise.all(promises);
});

describe('blog API routes', () => {
  test('should return all the blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(initialBlogs.length);
  });

  test('responses should contain the id property and not _id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });

  test('post requests should create new documents', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'Jan de Jesus',
      url: 'https://google.com',
      likes: 3,
    };

    await api.post('/api/blogs').send(newBlog);
    const newBlogListResponse = await api.get('/api/blogs');
    const newBlogList = newBlogListResponse.body;

    expect(newBlogList.length).toBe(initialBlogs.length + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

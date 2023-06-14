const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../app/models/blog.model');
mongoose.set('bufferTimeoutMS', 10000);
jest.setTimeout(10000);

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

beforeEach(async () => {
  await Blog.deleteMany({});
  const promises = initialBlogs.map((blog) => new Blog(blog).save());
  await Promise.all(promises);
});

describe('blog API GET endpoints', () => {
  test('should return all the blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(initialBlogs.length);
  });

  test('responses should contain the id property and not _id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('blog API POST endpoints', () => {
  test('should create new documents', async () => {
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

  test('should set the likes property to 0 if it is undefined in the request', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'Jan de Jesus',
      url: 'https://google.com',
    };

    const response = await api.post('/api/blogs').send(newBlog);
    const createdBlog = response.body;

    expect(createdBlog.likes).toBe(0);
  });

  test('should respond with 400 status if a POST title property is missing', async () => {
    const newBlog = {
      author: 'Jan de Jesus',
      url: 'https://google.com',
      likes: 3,
    };

    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.status).toBe(400);
  });

  test('should respond with 400 status if a POST url property is missing', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'Jan de Jesus',
      likes: 3,
    };

    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.status).toBe(400);
  });
});

describe('blog API DELETE endpoints', () => {
  test('should remove documents from the database', async () => {
    const getResponse = await api.get('/api/blogs');
    const oldListOfBlogs = getResponse.body;
    const idToDelete = oldListOfBlogs[0].id;

    const deleteResponse = await api.delete(`/api/blogs/${idToDelete}`);

    const newGetResponse = await api.get('/api/blogs');
    const newListOfBlogs = newGetResponse.body;

    expect(newListOfBlogs.length).toBe(oldListOfBlogs.length - 1);
  });

  test('should return a 404 status code if the id does not exist in the database', async () => {
    const invalidId = '64893a80a5af920d9793edd2';

    const deleteResponse = await api.delete(`/api/blogs/${invalidId}`);

    expect(deleteResponse.status).toBe(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

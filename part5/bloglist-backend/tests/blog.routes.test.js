const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../app/models/blog.model');
const User = require('../app/models/user.model');
const userController = require('../app/controllers/user.controller');
mongoose.set('bufferTimeoutMS', 30000);
jest.setTimeout(30000);

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

const initialUser = {
  name: 'Test de Jesus',
  username: 'test.user',
  password: 'testpassword',
};

beforeEach(async () => {
  await User.deleteMany({});
  const { name, username, password } = initialUser;
  const testUser = await userController.createUser({
    name,
    username,
    password,
  });
  await Blog.deleteMany({});
  const promises = initialBlogs.map((blog) =>
    new Blog({ ...blog, user: testUser._id }).save()
  );
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
    expect(response.body[0]._id).not.toBeDefined();
  });
});

describe('blog API POST endpoints', () => {
  let token;
  beforeEach(async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: initialUser.username, password: initialUser.password });
    token = loginResponse.body.token;
  });

  test('returns a 401 status code if no Bearer token is provided', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'Jan de Jesus',
      url: 'https://google.com',
      likes: 3,
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
  });

  test('returns a 401 status code if Bearer token is malformatted', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'Jan de Jesus',
      url: 'https://google.com',
      likes: 3,
    };

    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(401);
  });

  test('should create new documents', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'Jan de Jesus',
      url: 'https://google.com',
      likes: 3,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);
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

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);
    const createdBlog = response.body;

    expect(createdBlog.likes).toBe(0);
  });

  test('should respond with 400 status if a POST title property is missing', async () => {
    const newBlog = {
      author: 'Jan de Jesus',
      url: 'https://google.com',
      likes: 3,
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);
    expect(response.status).toBe(400);
  });

  test('should respond with 400 status if a POST url property is missing', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'Jan de Jesus',
      likes: 3,
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);
    expect(response.status).toBe(400);
  });
});

describe('blog API DELETE endpoints', () => {
  let token;
  beforeEach(async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: initialUser.username, password: initialUser.password });
    token = loginResponse.body.token;
  });

  test('should remove documents from the database', async () => {
    const getResponse = await api.get('/api/blogs');
    const oldListOfBlogs = getResponse.body;
    const idToDelete = oldListOfBlogs[0].id;

    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set('Authorization', `Bearer ${token}`);

    const newGetResponse = await api.get('/api/blogs');
    const newListOfBlogs = newGetResponse.body;

    expect(newListOfBlogs.length).toBe(oldListOfBlogs.length - 1);
  });

  test('should return a 404 status code if the id does not exist in the database', async () => {
    const invalidId = '64893a80a5af920d9793edd2';

    const deleteResponse = await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteResponse.status).toBe(404);
  });
});

describe('blog API PATCH endpoints', () => {
  test('should successfully update likes', async () => {
    const getResponse = await api.get('/api/blogs');
    const blogList = getResponse.body;
    const idToUpdate = blogList[0].id;

    await api.patch(`/api/blogs/${idToUpdate}`).send({ likes: 32 });

    const newGetResponse = await api.get('/api/blogs');
    const targetPost = newGetResponse.body.find((e) => e.id === idToUpdate);
    const newLikes = targetPost.likes;

    expect(newLikes).toBe(32);
  });

  test('should return a 404 status code for documents that do not exist', async () => {
    const invalidId = '64893a80a5af920d9793edd2';

    const patchResponse = await api.patch(`/api/blogs/${invalidId}`);

    expect(patchResponse.status).toBe(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

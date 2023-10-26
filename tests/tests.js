import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import blogRoutes from '../routes/blogRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import initMongoServer from '../mongoConfigs/mongoTestConfig.js';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import { createToken, hashPassword } from '../helpers/helpers.js';
import 'dotenv/config';

const app = express();
const should = chai.should();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/blogs', blogRoutes);
app.use('/user', userRoutes);

chai.use(chaiHttp);

const createTestBlogs = async () => {
  const blogA = new Blog({
    title: 'Test blog A',
    caption: 'This is test blog A',
    content: 'Test blog A is the best blog ever',
    region: 'South America',
    author: 'Test',
    image:
      'https://res.cloudinary.com/dawxbqbbj/image/upload/v1694769182/tfolarjj127n9la4tkbn.jpg',
    published: true,
  });

  // To prevent same-millisecond timestamps being generated
  await new Promise((resolve) => setTimeout(resolve, 5));

  const blogB = new Blog({
    title: 'Test blog B',
    caption: 'This is test blog B',
    content: 'Test blog B is the best blog ever',
    region: 'Asia',
    author: 'Test',
    image:
      'https://res.cloudinary.com/dawxbqbbj/image/upload/v1694769182/tfolarjj127n9la4tkbn.jpg',
    published: true,
  });

  return [blogA, blogB];
};

const createTestUser = async () => {
  const hashedPassword = await hashPassword('Password!234');
  const testUser = new User({ username: 'Test', password: hashedPassword });
  return testUser;
};

// Global variable used for blogA and B use in blog test block, note: refactor to restrict access
let blogA;
let blogB;

// Tests set up
before(async () => {
  await initMongoServer();
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

  [blogA, blogB] = await createTestBlogs();
  const testUser = await createTestUser();

  await Promise.all([blogA.save(), blogB.save(), testUser.save()]);
});

describe('Blog route tests', () => {
  // Create token with test id value
  const token = createToken(1);

  it('should return a list of blogs ordered by latest first when calling GET /blogs', async () => {
    const res = await chai.request(app).get('/blogs');
    res.should.have.status(200);
    res.body.should.be.an('array');
    // Latest first
    res.body[0].should.have.property('title', 'Test blog B');
  });

  it('should return specific blog when calling GET /blogs/:id', async () => {
    const res = await chai
      .request(app)
      .get(`/blogs/${blogA._id}`)
      .set({ Authorization: `Bearer ${token}` });
    res.should.have.status(200);
    res.body.should.have.property('title', 'Test blog A');
  });

  it('should return a string confirming published property updated when calling PATCH /blogs', async () => {
    const res = await chai
      .request(app)
      .patch('/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send({ id: blogA._id, published: false });

    res.should.have.status(200);
    res.text.should.deep.include('Blog published updated');
  });
});

describe('User route tests', () => {
  it('should log valid user in and return a token when calling POST /user', async () => {
    const res = await chai
      .request(app)
      .post('/user')
      .set({ 'content-type': 'application/json' })
      .send({ username: 'Test', password: 'Password!234' });

    res.should.have.status(200);
    res.body.should.have.property('token');
  });
});

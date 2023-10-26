import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import blogRoutes from '../routes/blogRoutes.js';
import initMongoServer from '../mongoConfigs/mongoTestConfig.js';
import Blog from '../models/blog.js';
import { createToken } from '../helpers/helpers.js';
import 'dotenv/config';

const app = express();
const should = chai.should();

app.use(express.urlencoded({ extended: false }));
app.use('/blogs', blogRoutes);

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

describe('Blog route tests', () => {
  let blogA;
  let blogB;
  // Create token with test id value
  const token = createToken(1);
  // Tests set up
  before(async () => {
    await initMongoServer();
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });

    [blogA, blogB] = await createTestBlogs();

    await Promise.all([blogA.save(), blogB.save()]);
  });

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

  it('should return a string confirming blog published updated when calling PATCH /blogs', async () => {
    const res = await chai
      .request(app)
      .patch('/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send({ id: blogA._id, published: false });

    res.should.have.status(200);
    res.text.should.deep.include('Blog published updated');
  });
});

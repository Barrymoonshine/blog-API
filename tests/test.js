import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import blogRoutes from '../routes/blogRoutes.js';
import initMongoServer from '../mongoConfigs/mongoTestConfig.js';
import Blog from '../models/blog.js';

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

// Tests set up
before(async () => {
  await initMongoServer();
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

  const [blogA, blogB] = await createTestBlogs();

  await Promise.all([blogA.save(), blogB.save()]);
});

describe('Blog route tests', () => {
  it('should return a list of blogs when calling GET /blogs', async () => {
    const res = await chai.request(app).get('/blogs');
    console.log('res', res);

    res.should.have.status(200);
    res.body.should.be.an('array');
    // res.body.should.deep.include({ title: 'Test blog A' });
    // res.body.should.deep.include({ title: 'Test blog B' });
  });
});

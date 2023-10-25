import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import blogRoutes from '../routes/blogRoutes.js';

const app = express();
const should = chai.should();

app.use(express.urlencoded({ extended: false }));
app.use('/blogs', blogRoutes);

chai.use(chaiHttp);

before((done) => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
    done();
  });
});

describe('Blog Route tests', () => {
  it('should return a list of blogs when calling GET /blogs', async () => {
    const res = await chai.request(app).get('/blogs');
    console.log('res', res);

    res.should.have.status(200);
  });
});

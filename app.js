import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes.js';

const app = express();

const dbURI = `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0.wym9xjg.mongodb.net/blog-API?retryWrites=true&w=majority`;

const connectToDb = async () => {
  try {
    await mongoose.connect(dbURI);
    app.listen(3000, '0.0.0.0', () => {
      console.log('Server is listening on port 3000');
    });
  } catch (err) {
    console.log(`Mongoose connection error: ${err}`);
  }
};
connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/blogs', blogRoutes);

app.get('/', (req, res) => {
  res.json({ msg: 'Hello World!' });
});

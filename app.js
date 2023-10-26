import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import db from './mongoConfigs/mongoConfig.js';

const app = express();

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is listening on port 3000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://blog-api-client-theta.vercel.app',
    ],
    methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/blogs', blogRoutes);
app.use('/user', userRoutes);
app.use('/comments', commentRoutes);
app.use('/like', likeRoutes);
app.use('/auth', authRoutes);

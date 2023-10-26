import mongoose from 'mongoose';

const dbURI = `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0.wym9xjg.mongodb.net/blog-API?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

export default db;

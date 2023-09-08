import mongoose from 'mongoose';

const { Schema } = mongoose;

const likeSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  docType: {
    type: String,
    required: true,
  },
  docID: {
    type: String,
    required: true,
  },
});

const Like = mongoose.model('Likes', likeSchema);

export default Like;

/* eslint-disable indent */
import { Schema, model } from 'mongoose';

  const postSchema = new Schema({
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 150,
      trim: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now
      },
      comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
        default: [],
      }],
      owner: { 
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      }
  }, {
    timestamps: true,
  });

const Post = model('post', postSchema);

export default Post;

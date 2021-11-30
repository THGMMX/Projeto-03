import mongoose from 'mongoose';

import InvalidIdException from '../exceptions/InvalidIdException';
import { idValidation } from '../validation/idValidation';

class PostRepository {
  constructor(model) {
    this.postModel = model;
  }

  async getAll(title) {
    const posts = await this.postModel.find({
      title: { $regex: new RegExp(title, 'i') },
    });
    return posts;
  }

  async getOne(id) {
    const posts = await this.postModel.findById(id).populate('comments');
    return posts;
  }

  async create(body, userId) {
    const newPost = await this.postModel.create({ ...body, owner: userId });
    return newPost;
  }

  async findOneById(postId) {
    const post = await this.postModel.findOne({
      _id: postId,
    }).populate('comments');
    return post;
  }

  async findOneByIdAndOwnerId(postId, ownerId) {
    const post = await this.postModel.findOne({
      _id: postId,
      owner: ownerId,
    }).populate('comments');
    return post;
  }

  async updatePostById(postId, infoToUpdate) {
    const editedPost = await this.postModel.findByIdAndUpdate(
    { _id: postId }, 
    infoToUpdate, 
    { new: true },
    );
    return editedPost;
  }

  async deleteOneById(postId) {
    await this.postModel.findByIdAndDelete(postId);    
  }

  async insertCommentId(postId, commentId) {
    await this.postModel.findByIdAndUpdate(postId, { $push: { comments: commentId } });
  }

  async removeCommentId(postId, commentId) {
    await this.postModel.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
  }
}

export default PostRepository;

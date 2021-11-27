// import mongoose from 'mongoose';


class CommentRepository {
    constructor(Model) {
      this.commentModel = Model;
    }

    async findAllByPostId(postId) {
        const comment = await this.commentModel.find({post: postId});
    
        return comment;
      }

      
      async createNewComment(newComment) {
        const savedComment = await this.commentModel.create(newComment);
        return savedComment;
      }
  


}




export default CommentRepository;
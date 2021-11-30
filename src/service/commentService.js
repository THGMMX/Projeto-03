import CommentNotFoundException from '../exceptions/CommentNotFoundException';
import { commentValidation } from '../validation/commentValidation';
import { idValidation } from '../validation/idValidation';
class CommentService {
  constructor(commentRepository, postRepository) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
  }

  async validateOwnership(commentId, ownerId) {
    const ownership = await this.commentRepository.findOneByIdAndOwnerId(commentId, ownerId);
    if (!ownership) {
      throw new InvalidOwnerException();
    }
  }

  async findCommentIdAndValidateOwnership(commentId, ownerId) {
    const comment = await this.commentRepository.findByCommentId(commentId);
    if (!comment) {
      throw new CommentNotFoundException();
    }
    await this.validateOwnership(commentId, ownerId);
    return comment;
  }

  async findAllByPostId(postId) {
    const comments = await this.commentRepository.findAllByPostId(postId);
    return comments;
  }
  
  async create(body, postId, ownerId) {
    await commentValidation(body);
    idValidation(postId);
    const savedComment = await this.commentRepository.createNewComment({ ...body, post: postId, owner: ownerId });
      await this.postRepository.insertCommentId(postId, savedComment._id);
    return savedComment;
  }

  async updateOne(commentId, ownerId, body) {
    await commentValidation(body);
    idValidation(commentId);
    await this.findCommentIdAndValidateOwnership(commentId, ownerId);
    const commentData = {text: body.text};
    const editedComment = await this.commentRepository.updateCommentById(commentId, commentData);
    return editedComment;
  }

  async deleteOne(commentId, ownerId) {
    idValidation(commentId);
    const comment = await this.findCommentIdAndValidateOwnership(commentId, ownerId);
    await this.commentRepository.deleteOne(commentId);
    await this.postRepository.removeCommentId(comment.post, commentId);
  }
}

export default CommentService;

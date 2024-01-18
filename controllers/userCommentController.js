const CommentService = require('../services/userCommentService');

class CommentController {
  // get all comments of a single user
  static getallCommentsOfUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const comments = await CommentService.getallCommentsOfUser(userId);
      if (!comments) {
        return res
          .status(404)
          .json({ success: false, message: 'Sorry!! Unable to find comments' });
      }
      res
        .status(200)
        .json({ success: true, message: 'comments available', data: comments });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }
  };

  // get all comments from a single post
  static getSpecificComments = async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await CommentService.getSpecificComments(postId);

      if (!comments) {
        return res
          .status(404)
          .json({ success: false, message: 'Sorry!! Unable to find comments' });
      }
      res
        .status(200)
        .json({ success: true, message: 'comments available', data: comments });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }
  };

  // Create new comment
  static createComment = async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.params.userId;
      const data = req.body;

      const createdComment = await CommentService.createComment(
        postId,
        userId,
        data
      );

      if (!createdComment) {
        return res
          .status(404)
          .json({ success: false, message: 'Unable to create new comment' });
      }

      res.status(200).json({
        success: true,
        message: 'Successfully created comment',
        data: createdComment,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }
  };

  //Update the comment
  static updateComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const userId = req.params.userId;
      const data = req.body;

      const updatedComment = await CommentService.updateComment(
        commentId,
        userId,
        data
      );

      if (!updatedComment) {
        return res
          .status(404)
          .json({ success: false, message: 'Unable to update the comment' });
      }

      res.status(200).json({
        success: true,
        message: 'Successfully updated the comment',
        data: createdComment,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }
  };

  //Delete the comment
  static deleteComment = async (req, res) => {
    try {
      const id = req.params.commentId;
      const userId = req.params.userId;

      const deletedComment = await CommentService.deleteComment(id, userId);
      if (!deletedComment) {
        return res
          .status(404)
          .json({ success: false, message: 'Cannot delete comment' });
      }
      res.status(200).json({
        success: true,
        message: 'Successfully deleted comment',
        data: deletedComment,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }
  };
}

module.exports = CommentController;

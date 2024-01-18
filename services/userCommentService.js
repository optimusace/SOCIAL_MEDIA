const UserBasicInfo = require('../models/userBasicInfoModel');
const UserPost = require('../models/userPostModel');
const UserComment = require('../models/usersCommentModel');
const mongoose = require('mongoose');

class CommentService {
  // get all comments of a single user
  static getallCommentsOfUser = async (userid) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(userid)) return null;

      const user = await UserBasicInfo.find(userid);
      if (!user) return null;

      const comments = await UserComment.find({ userId: userId });

      if (comments.length > 0) {
        return comments;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  };

  // get all comments from a single post
  static getSpecificComments = async (postId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(postId)) return null;

      const post = await UserPost.findById(postId);
      if (!post) return null;

      const comments = await UserComment.find({ postId: postId });

      if (comments.length > 0) {
        return comments;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  };

  // Create new comment
  static createComment = async (postId, userId, data) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) return null;

      if (!mongoose.Types.ObjectId.isValid(postId)) return null;

      const user = await UserBasicInfo.findById(userId);
      const post = await UserPost.findById(postId);

      if (!user) {
        return null;
      }
      if (!post) {
        return null;
      }

      const newComment = await UserComment.create({
        userId,
        postId,
        comment: data,
      });

      return newComment;
    } catch (err) {
      throw err;
    }
  };

  //Update the comment
  static updateComment = async (id, userId, data) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;

      if (!mongoose.Types.ObjectId.isValid(userId)) return null;

      const user = await UserBasicInfo.findById(userId);

      if (!user) return null;

      if (userId === comment.userId.toString()) {
        const updateComment = await UserComment.findByIdAndUpdate(id, {
          comment: data,
        });

        if (!updateComment) return null;

        const updatedData = await UserComment.findById(id);
        return updatedData;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  };

  //Delete the comment
  static deleteComment = async (id, userId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;

      if (!mongoose.Types.ObjectId.isValid(userId)) return null;

      const user = await UserBasicInfo.findById(userId);

      if (!user) return null;

      if (userId === comment.userId.toString()) {
        const deletedComment = await UserComment.findByIdAndDelete(id);

        if (!deletedComment) return null;

        return deletedComment;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  };
}

module.exports = CommentService;

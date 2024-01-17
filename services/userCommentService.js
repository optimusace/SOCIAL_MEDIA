const UserBasicInfo = require('../models/userBasicInfoModel');
const UserPost = require('../models/userPostModel');
const UserComment = require('../models/usersCommentModel');
const mongoose = require('mongoose');

class CommentService {
  static createComment = async (postId, userId, data) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return null;
      }
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
    } catch (err) {
      throw err;
    }
  };
}

module.exports = CommentService;

const mongoose = require('mongoose');
const validator = require('validator');

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserPost',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserBasicInfo',
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

commentSchema.pre('save', (next) => {
  //sanitize the user inputs
  if (this.comment) {
    this.comment = validator.escape(this.comment);
  }
  next();
});

const UserComment = mongoose.model('UserComment', commentSchema);

module.exports = UserComment;

const express = require("express")
const CommentController = require("../controllers/userCommentController")

const router = express.Router()

router.get("/:userId",CommentController.getallCommentsOfUser)
router.get("/:postId",CommentController.getSpecificComments)
router.post("/:postId/:userId",CommentController.createComment)
router.put("/:userId/:commentId",CommentController.updateComment)
router.delete("/:userId/:commentId",CommentController.deleteComment)

module.exports = router

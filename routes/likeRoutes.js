const express = require("express")
const LikeController = require("../controllers/likeController")

const router = express.Router() 

router.get("/:postId",LikeController.getLikes)
router.post("/:postId/:userId",LikeController.createLike)
router.delete("/:postId/:userId",LikeController.deleteLike)

module.exports = router
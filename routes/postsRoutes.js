const express = require("express")
const PostController = require("../controllers/userPostController")
const upload = require("../config/multer")

const router = express.Router()

router.get("/",PostController.getAllPosts)
router.get("/:userId",PostController.getPostsOfUser)
router.get("/:userId/:postId",PostController.getSpecificPost)
router.post("/:userId",upload.single("media"),PostController.createPost)
router.put("/:userId/:postId",upload.single("media"),PostController.updatePost)
router.delete("/:userId/:postId",PostController.deletePost)

module.exports = router
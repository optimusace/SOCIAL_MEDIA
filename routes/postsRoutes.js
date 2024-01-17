const express = require("express")
const PostController = require("../controllers/userPostController")
const upload = require("../config/multer")

const router = express.Router()

router.get("/",PostController.getAllPosts)
router.get("/:userId",PostController.getPostsOfUser)
router.get("/post/:postId",PostController.getSpecificPost)
router.post("/:userId",upload.single("media"),PostController.createPost)
router.put("/post/:postId",upload.single("media"),PostController.updatePost)
router.delete("/post/:postId",PostController.deletePost)

module.exports = router
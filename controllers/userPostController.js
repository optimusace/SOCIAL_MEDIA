
const PostService = require("../services/userPostService")

class PostController{

    //get all posts of all users
    static getAllPosts = async(req,res)=>{
        try{
            const posts = await PostService.getAllPosts()
            if(!posts){
                return res.status(404).json({success:false,message:"Sorry!! Unable to find posts"})
            }
            res.status(200).json({success:true,message:"All Posts - available",data:posts})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Server Error",error:err.message})
        }
    }

    //get all posts of a specific user using user id 
    static getPostsOfUser = async(req,res)=>{
        try{
            const userId = req.params.userId
            const posts = await PostService.getAllPostsOfUser(userId)
            if(!posts){
                return res.status(404).json({success:false,message:"Sorry!! Unable to find posts"})
            }
            res.status(200).json({success:true,message:"Posts of specific user - available",data:posts})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Server Error",error:err.message})
        }
    }

    //get details about the specific post
    static getSpecificPost = async(req,res)=>{
        try{
            const postId = req.params.postId
            const post = await PostService.getSpecificPost(postId)
            if(!post){
                return res.status(404).json({success:false,message:"Unable to find post"})
            }
            res.status(200).json({success:true,message:"Post available",data:post})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Error",error:err.message})
        }
    }

    //create new post
    static createPost = async(req,res)=>{
        try{
            const userId = req.params.userId 
            const data = req.body 
            const file = req.file 
            const createdPost = await PostService.createPost(userId,data,file)
            if(!createdPost){
                return res.status(404).json({success:false,message:"Unable to create new post"})
            }
            res.status(200).json({success:true,message:"Successfully created post",data:createdPost})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Error",error:err.message})
        }
    }

    //update post 
    static updatePost = async(req,res)=>{
        try{
            const postId = req.params.postId 
            const data = req.body 
            const file = req.file 
            const updatedPost = await PostService.updatePost(postId,data,file)
            if(!updatedPost){
                return res.status(404).json({success:false,message:"Sorry, cannot update post"})
            }
            res.status(200).json({success:true,message:"Successfully updated post",data:updatedPost})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Error",error:err.message})
        }
    }

    //delete post 
    static deletePost = async(req,res)=>{
        try{
            const postId = req.params.postId
            const deletedPost = await PostService.deletePost(postId)
            if(!deletedPost){
                return res.status(404).json({success:false,message:"Cannot delete post"})
            }
            res.status(200).json({success:true,message:"Successfully deleted post",data:deletedPost})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Error",error:err.message})
        }

    }

}

module.exports = PostController
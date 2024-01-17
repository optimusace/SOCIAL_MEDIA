const LikeService = require("../services/likeService")

class LikeController{

    static getLikes = async (req,res)=>{
        try{
            const postId = req.params.userId
            const likes = await LikeService.getLikes(postId)
            if(!likes){
                return res.status(404).json({success:false,message:"Cannot get likes for the post"})
            }
            res.status(200).json({success:true,message:"Likes for the post is available",data:likes})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Server Error",error:err.message})
        }
    }

    static createLike = async (req,res)=>{
        try{
            const postId = req.params.postId
            const userId = req.params.userId
            const newLike = await LikeService.createLike(postId,userId)
            if(!newLike){
                return res.status(404).json({success:false,message:"Sorry, Unable to create like for the post"})
            }
            res.status(200).json({success:true,message:"Successfully liked the post",data:newLike})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Server Error",error:err.message})
        }
    }

    static deleteLike = async (req,res)=>{
        try{
            const postId = req.params.postId
            const userId = req.params.userId 
            const deletedLike = await LikeService.deleteLike(postId,userId)
            if(!deletedLike){
                return res.status(404).json({success:false,message:"Sorry, unable to delete like for the post"})
            }
            res.status(200).json({success:true,message:"Successfully deleted like for the post",data:deletedLike})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Server Error",error:err.message})
        }
    }

}

module.exports = LikeController
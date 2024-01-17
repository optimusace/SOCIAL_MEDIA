const Like = require("../models/likeModel")
const mongoose = require("mongoose")

class LikeService{

    static getLikes = async (postId)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(postId)){
                return null
            }
            const likes = await Like.find({postId:postId})
            return likes
        }catch(err){
            throw err 
        }
    }

    static createLike = async(postId,userId)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)){
                return null
            }
            const newLike = await Like.create({
                postId,
                userId
            })
            return newLike
        }catch(err){
            throw err
        }
    }

    static deleteLike = async(postId,userId)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)){
                return null 
            }
            const deletedLike = await Like.findOneAndDelete({postId:postId,userId:userId})
            if(!deletedLike){
                return null 
            }
            return deletedLike
        }catch(err){
            throw err
        }
    } 

}

module.exports = LikeService
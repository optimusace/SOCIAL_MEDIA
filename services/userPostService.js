const UserBasicInfo = require("../models/userBasicInfoModel")
const UserPost = require("../models/userPostModel")
const mongoose = require("mongoose")

class PostService{

    //get posts of all users
    static getAllPosts = async ()=>{
        try{
            const posts = await UserPost.find()
            if(posts.length > 0){
                return posts
            }else{
                return null
            }
        }catch(err){
            throw err
        }
    }

    //get all posts of a specific user using user id 
    static getAllPostsOfUser = async (userId)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(userId)){
                return null
            }
            const userPosts = await UserPost.find({userId:userId})
            if(userPosts.length > 0){
                return userPosts
            }else{
                return null
            }
        }catch(err){
            throw err 
        }
    }

    //get specific post using post id
    static getSpecificPost = async (postId)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(postId)){
                return null
            }
            const post = await UserPost.findById(postId)
            if(!post){
                return null 
            }
            return post
        }catch(err){   
            throw err
        }
    }

    //create new post
    static createPost = async (userId,data,file)=>{
        try{
            /* 
             - check if user id is valid 
             - check if user with given id exists in the database
             - if user exists then he can create post
            */
            if(!mongoose.Types.ObjectId.isValid(userId)){
                return null
            }
            const user = await UserBasicInfo.findById(userId)
            if(!user){
                return null
            }
            let createdUser = null
            if(!file){
                createdUser = await UserPost.create({
                    userId,
                    ...data
                })
            }else{
                createdUser = await UserPost.create({
                    userId,
                    ...data,
                    media:{
                        mediaName : file.filename,
                        mediaPath : file.path
                    }
                })   
            }
            return createdUser
        }catch(err){
            throw err
        }
    }

    //update post details
    static updatePost = async (postId,data,file)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(postId)){
                return null
            }
            let update = null 
            if(!file){
                update = await UserPost.findByIdAndUpdate(postId,{
                    ...data
                })
            }else{
                update = await UserPost.findByIdAndUpdate(postId,{
                    ...data,
                    media:{
                        mediaName:file.filename,
                        mediaPath:file.path 
                    }
                })
            }
            if(!update){
                return null 
            }
            const updatedData = await UserPost.findById(postId)
            return updatedData
        }catch(err){
            throw err
        }
    }
    
    //delete post
    static deletePost = async (postId)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(postId)){
                return null
            }
            const deletedData = await UserPost.findByIdAndDelete(postId)
            if(!deletedData){
                return null
            }
            return deletedData
        }catch(err){
            throw err
        }   
    }

}

module.exports = PostService
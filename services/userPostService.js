const UserPost = require("../models/userPostModel")
const mongoose = require("mongoose")

class PostService{

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

    static getSpecificPost = async (id)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(id)){
                return null
            }
            const post = await UserPost.findById(id)
            if(!post){
                return null 
            }
            return post
        }catch(err){   
            throw err
        }
    }

    static createPost = async (data,file)=>{
        try{
            const createdUser = await UserPost.create({})
            return createdUser
        }catch(err){
            throw err
        }
    }

    static updatePost = async (id,data,file)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid())
        }catch(err){

        }
    }
    
    static deletePost = ()=>{

    }

}

module.exports = PostService
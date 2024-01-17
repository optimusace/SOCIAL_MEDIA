const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
},{timestamps:true})

const Like = mongoose.model("Like",likeSchema)

module.exports = Like
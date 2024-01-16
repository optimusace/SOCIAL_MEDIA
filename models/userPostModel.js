const mongoose = require("mongoose")
const validator = require("validator")

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true 
    },
    caption:{
        type:String,
        trim:true
    },
    media:{
        mediaName:String,
        mediaPath:String
    }
},{timestamps:true})

postSchema.pre("save",function(next){
    //sanitize the user inputs
    if(this.caption){
        this.caption = validator.escape(this.caption)
    }
    next()
})

const UserPost = mongoose.model("UserPost",postSchema)

module.exports = UserPost
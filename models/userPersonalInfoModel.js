const mongoose = require("mongoose")
const validator = require("validator")

const personalInfoSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    personalityType:{
        type:String,
        trim:true
    },
    sports:{
        type:Array
    },
    books:{
        type:Array
    },
    media:{         //'media' represents collective word for movies and TV Shows
        type:Array
    },
    musicGenre:{
        type:Array
    },
    study:{
        type:Array
    },
    jobs:{
        type:Array
    },
    height:{
        type:String,
        trim:true
    },
    weight:{
        type:String,
        trim:true
    },
    zodiacSign:{
        type:String,
        trim:true
    }
},{timestamps:true})

personalInfoSchema.pre("save",function(next){
    if(this.personalityType){
        this.personalityType = validator.escape(this.personalityType)
    }
    if(this.sports){
        this.sports = this.sports.map((sport)=>{return validator.escape(sport)})
    }
    if(this.books){
        this.books = this.books.map((book)=>{return validator.escape(book)})
    }
    if(this.media){
        this.media = this.media.map((md)=>{return validator.escape(md)})
    }
    if(this.musicGenre){
        this.musicGenre = this.musicGenre.map((genre)=>{return validator.escape(genre)})
    }
    if(this.study){
        this.study = this.study.map((std)=>{return validator.escape(std)})
    }
    if(this.jobs){
        this.jobs = this.jobs.map((job)=>{return validator.escape(job)})
    }
    if(this.height){
        this.height = validator.escape(this.height)
    }
    if(this.weight){
        this.weight = validator.escape(this.weight)
    }
    if(this.zodiacSign){
        this.zodiacSign = validator.escape(this.zodiacSign) 
    }
    next()
})

const UserPersonalInfo = mongoose.model("UserPersonalInfo",personalInfoSchema)

module.exports = UserPersonalInfo
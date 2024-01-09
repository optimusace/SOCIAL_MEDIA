const mongoose = require("mongoose")
const validator = require("validator")

const basicInfoSchema = new mongoose.Schema({
    fullName:{
        type:String,
        trim:true
    },
    userName:{
        type:String,
        default:()=>{
            const letters = "abcdefghijklmnopqrstuvwxyz"
            let randomUserName = ""
            for(let i=0;i<8;i++){
                const randomIndex = Math.floor(Math.random()*letters.length)
                randomUserName += letters[randomIndex]
            }
            return randomUserName
        }
    },
    photo:{
        imageName:String,
        imagePath:String
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        validate:{
            validator:(value)=>{
                return validator.isEmail(value)
            },
            message:"Email Address is not valid"
        }
    },
    contact:{
        type:String,
        trim:true
    },
    dob:{
        type:Date
    },
    address:{
        type:String,
        trim:true
    }
},{timestamps:true})

userSchema.pre("save",function(next){
    //sanitize the input fields value if present
    if(this.fullName){
        this.fullName = validator.escape(this.fullName)
    }
    if(this.userName){
        this.userName = validator.escape(this.userName)
    }
    if(this.email){
        this.email = validator.escape(this.email)
    }
    if(this.contact){
        this.contact = validator.escape(this.contact)
    }
    if(this.address){
        this.address = validator.escape(this.address)
    }
    next()
}) 

const UserBasicInfo = mongoose.model("UserBasicInfo",basicInfoSchema)

module.exports = UserBasicInfo

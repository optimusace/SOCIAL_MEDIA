const UserBasicInfo = require("../models/userBasicInfoModel")
const mongoose = require("mongoose")

class BasicInfoService{

    //GET ALL USERS INFORMATION
    static getUsers = async ()=>{
        try{
            const users = await UserBasicInfo.find()
            if(users.length > 0 ){
                return users
            }else{
                return null
            }
        }catch(err){
            throw err
        }
    }

    //GET SPECIFIC USER INFORMATION
    static getSpecificUser = async (id)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(id)){
                return null
            }
            const user = await UserBasicInfo.findById(id)
            if(!user){
                return null
            }
            return user
        }catch(err){
            throw err
        }
    }

    //ADD USER OR CREATE NEW USER
    static addUser = async (data,file)=>{
        try{
            if(data.dob){
                data.dob = new Date(data.dob)   //parse the Date string to the Date object (to match the Date datatype in model)
            }
            let newUser = null
            if(file){
                newUser = await UserBasicInfo.create({
                    ...data,   
                    photo:{
                    imageName:file.filename,
                    imagePath:file.path
                }})
            }else{
                newUser = await UserBasicInfo.create(data)
            } 
            return newUser
        }catch(err){
            if(err && err.name === "ValidationError"){
                const errors = {}
                for(let key in err.errors){
                    errors[key] = err.errors[key].message
                }
                throw {validationError : errors}
            }
            else if(err.code === 11000){
                throw {duplicateEmail : "Provided email is already registered"}
            
            }else{
                throw err
            }

        }
    }

    //UPDATE USER 
    static updateUser = async (id,data,file)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(id)){
                return null 
            }
            let updatedUser = null
            if(file){
                updatedUser = await UserBasicInfo.findByIdAndUpdate(id,{
                    ...data,
                    photo:{
                        imageName:file.filename,
                        imagePath:file.path
                    }
                })
            }else{
                updatedUser = await UserBasicInfo.findByIdAndUpdate(id,data)
            }
            
            if(!updatedUser){
                return null
            }
            const updatedData = await UserBasicInfo.findById(id)
            return updatedData
        }catch(err){
            if(err && err.name === "ValidationError"){
                const errors = {}
                for(let key in err.errors){
                    errors[key] = err.errors[key].message
                }
                throw {validationError : errors}
            }
            else if(err.code === 11000){
                throw {duplicateEmail : "Provided email is already registered"}
            
            }else{
                throw err
            }
        }
    }

    //DELETE USER 
    static deleteUser = async (id)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(id)){
                return null 
            }
            const deletedUser = await UserBasicInfo.findByIdAndDelete(id)
            if(!deletedUser){
                return null 
            }
            return deletedUser
        }catch(err){
            throw err
        }
    }

}

module.exports = BasicInfoService
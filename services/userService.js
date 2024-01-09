const User = require("../models/userModel")
const mongoose = require("mongoose")

class UserService{

    //GET ALL USERS INFORMATION
    static getUsers = async ()=>{
        try{
            const users = await User.find()
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
            const user = await User.findById(id)
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
                newUser = await User.create({
                    ...data,   
                    photo:{
                    imageName:file.filename,
                    imagePath:file.path
                }})
            }else{
                newUser = await User.create(data)
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
                updatedUser = await User.findByIdAndUpdate(id,{
                    ...data,
                    photo:{
                        imageName:file.filename,
                        imagePath:file.path
                    }
                })
            }else{
                updatedUser = await User.findByIdAndUpdate(id,data)
            }
            
            if(!updatedUser){
                return null
            }
            const updatedData = await User.findById(id)
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
            const deletedUser = await User.findByIdAndDelete(id)
            if(!deletedUser){
                return null 
            }
            return deletedUser
        }catch(err){
            throw err
        }
    }

}

module.exports = UserService
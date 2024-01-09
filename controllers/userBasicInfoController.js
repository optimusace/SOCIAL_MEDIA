const BasicInfoService = require("../services/userBasicInfoService")

class BasicInfoController{

    static getUsers = async(req,res)=>{
        try{
            const user = await BasicInfoService.getUsers()
            if(!user){
                return res.status(404).json({success:false,message:"Unable to find users in the record"})
            }
            res.status(200).json({success:true,message:"Users found",data:user})
        }catch(err){
            res.status(500).json({success:false,message:"Internal server error",error:err.message})
        }
    } 

    static getSpecificUser = async(req,res)=>{
        try{
            const id = req.params.id
            const user = await BasicInfoService.getSpecificUser(id)
            if(!user){
                return res.status(404).json({success:false,message:"User not found"})
            }
            res.status(200).json({success:true,message:"User found",data:user})
        }catch(err){
            res.status(500).json({success:false,message:"Internal server error",error:err.message})
        }
    }

    static addUser = async(req,res)=>{
        try{
            const data = req.body
            const file = req.file
            const newUser = await BasicInfoService.addUser(data,file)
            res.status(200).json({success:true,message:"User created successfully",data:newUser})
        }catch(err){
            console.log("Error while adding data : ",err)
            if(err.validationError){
                return res.status(404).json({success:false,message:"Validations failed. Cannot create user",error:err.validationError})
            }
            if(err.duplicateEmail){
                return res.status(404).json({success:false,message:"Validation failed. Cannot create user",error:err.duplicateEmail})
            }
            res.status(500).json({success:false,message:"Internal server error",error:err.message})
        }
    }

    static updateUser = async(req,res)=>{
            try{
                const id = req.params.id 
                const data = req.body 
                const file = req.file
                const updatedUser = await BasicInfoService.updateUser(id,data,file)
                if(!updatedUser){
                    return res.status(404).json({success:false,message:"Cannot update user information"})
                }
                res.status(200).json({success:true,message:"User information updated successfully",data:updatedUser})
            }catch(err){
                if(err.validationError){
                    return res.status(404).json({success:false,message:"Validations Failed. Cannot update user",error:err.validationError})
                }
                if(err.duplicateEmail){
                    return res.status(404).json({success:false,message:"Validation failed. Cannot create user",error:err.duplicateEmail})
                }
                res.status(500).json({success:false,message:"Internal Server error",error:err.message})
            }
    }

    static deleteUser = async(req,res)=>{
        try{
            const id = req.params.id 
            const deletedUser = await BasicInfoService.deleteUser(id)
            if(!deletedUser){
                return res.status(404).json({success:false,message:"Cannot delete user"})
            }
            res.status(200).json({success:true,message:"User deleted successfully",data:deletedUser})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Server Error",error:err.message})
        }
    }

}

module.exports = BasicInfoController
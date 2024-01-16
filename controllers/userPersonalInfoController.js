const PersonalInfoService = require("../services/userPersonalInfoService")

class PersonalInfoController{

    static getPersonalInfo = async (req,res)=>{
        try{
            const userId = null
            const personalInfo = await PersonalInfoService.getPersonalInfo(userId);
            if(!personalInfo){
                return res.status(404).json({success:false,message:"Cannot find personal info"})
            }
            return res.status(200).json({success:true,message:"Personal info for user available",data:personalInfo})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Server Error",error:err.message})
        }
    }

    static createPersonalInfo = async(req,res)=>{
        try{
            const data = req.body 
            const userId = null 
            const newPersonalInfo = await PersonalInfoService.createPersonalInfo(userId,data)
            if(!newPersonalInfo){
                return res.status(404).json({success:false,message:"Cannot create personal info for the user"})
            }
            res.status(200).json({success:true,message:"Successfully created personal info for user",data:newPersonalInfo})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Server Error",error:err.message})
        }
    }

    static updatePersonalInfo = async(req,res)=>{
        try{
            const data = req.body 
            const userId = null
            const updatedInfo = await PersonalInfoService.updatePersonalInfo(userId,data)
            if(!updatedInfo){
                return res.status(404).json({success:false,message:"Cannot update personal info for the user"})
            }
            res.status(200).json({success:true,message:"Successfully updated personal info for user",data:updatedInfo})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Server Error",error:err.message})
        }
    }

    static deletePersonalInfo = async(req,res)=>{
        try{
            const userId = null 
            const deletedInfo = await PersonalInfoService.deletePersonalInfo(userId)
            if(!deletedInfo){
                return res.status(404).json({success:false,message:"Cannot delete personal info"})
            }
            res.status(200).json({success:true,message:"Successfully deleted personal info",data:deletedInfo})
        }catch(err){
            res.status(500).json({success:false,message:"Internal Server Error",error:err.message})
        }
    }
}

module.exports = PersonalInfoController


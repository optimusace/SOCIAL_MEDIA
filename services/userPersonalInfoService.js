const UserPersonalInfo = require("../models/userPersonalInfoModel")
const UserBasicInfo = require("../models/userBasicInfoModel")

class PersonalInfoService{

    //get personal info of all users - not needed, no any reason to get personal info of all the users
    
    //get the personal info of a specific user using user id
    static getPersonalInfo = async (userId)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(userId)){
                return null
            }
            const personalInfo = await UserPersonalInfo.findOne({userId:userId})
            if(!personalInfo){
                return null 
            }
            return personalInfo
        }catch(err){
            throw err
        }
    }

    //create personal info for a specific user  
    static createPersonalInfo = async(userId,data)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(userId)){
                return null
            }

            /* 
            - check if given userId exits in the user collection
            - only add personal info if given userid exits in the user collection
            */
            const user = await UserBasicInfo.findById(userId)
            if(!user){
                return null
            }
            const newPersonalInfo = await UserPersonalInfo.create({
                userId,
                ...data
            })
            return newPersonalInfo
        }catch(err){
            throw err
        }
    }

    //update personal info of a specific user using user id 
    static updatePersonalInfo = async (userId,data)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(userId)){
                return null
            }
            const update = await UserPersonalInfo.findOneAndUpdate({userId:userId},data)
            if(!updatedInfo){
                return null
            }
            const updatedInfo = await UserPersonalInfo.findOne({userId:userId})
            return updatedInfo
        }catch(err){
            throw err
        }
    }

    //delete personal info of a specific user using user id 
    static deletePersonalInfo = async(userId)=>{
        try{
            if(!mongoose.Types.ObjectId.isValid(userId)){
                return null
            }
            const deletedInfo = UserPersonalInfo.findOneAndDelete({userId:userId})
            if(!deletedInfo){
                return null
            }
            return deletedInfo
        }catch(err){
            throw err
        }
    }


}

module.exports = PersonalInfoService
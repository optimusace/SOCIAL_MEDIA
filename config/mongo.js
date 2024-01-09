const mongoose = require("mongoose")

const connectDB = async (connectionString)=>{
    try{
        const mongooseInstance = await mongoose.connect(connectionString)
        console.log("Successfully connected to database")
        return mongooseInstance
    }catch(err){
        throw err
    }
}

module.exports = connectDB
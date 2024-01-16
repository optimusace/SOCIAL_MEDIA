require("dotenv").config()
const express = require("express")
const connectDB = require("./config/mongo")
const upload = require("./config/multer")
const BasicInfoController = require("./controllers/userBasicInfoController")
const PersonalInfoController = require("./controllers/userPersonalInfoController")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

app.set("view engine","ejs")
app.set("views","./views")

app.get("/check",(req,res)=>{
    res.send("Routing is working")
})

// USER ROUTES 
app.get("/api/v1/users/basic",BasicInfoController.getUsers)
app.get("/api/v1/users/basic/:id",BasicInfoController.getSpecificUser)
app.post("/api/v1/users/basic",upload.single("photo"), BasicInfoController.addUser)
app.put("/api/v1/users/basic/:id",upload.single("photo"),BasicInfoController.updateUser)
app.delete("/api/v1/users/basic/:id",BasicInfoController.deleteUser)
 
app.get("/api/v1/users/personalinfo",PersonalInfoController.getPersonalInfo)
app.post("/api/v1/users/personalinfo",PersonalInfoController.createPersonalInfo)
app.put("/api/v1/users/personalinfo",PersonalInfoController.updatePersonalInfo)
app.delete("/api/v1/users/personalinfo",PersonalInfoController.deletePersonalInfo)

app.use((req,res)=>{
    res.status(404).send("Unable to find requested resource")
})

const startServer = async () =>{
    try{
        const connectionString = process.env.MONGO_ATLAS_URL + process.env.DB_NAME
        await connectDB(connectionString)
        app.listen(process.env.PORT,()=>{
            console.log("Server started on port : ",process.env.PORT)
        })
    }catch(err){
        console.error(err.message)
    }
}
startServer()


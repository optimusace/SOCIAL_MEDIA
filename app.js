require("dotenv").config()
const express = require("express")
const connectDB = require("./config/mongo")
const upload = require("./config/multer")
const cors = require("cors")
const BasicInfoController = require("./controllers/userBasicInfoController")
const PostController = require("./controllers/userPostController")
const PersonalInfoController = require("./controllers/userPersonalInfoController")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

app.set("view engine","ejs")
app.set("views","./views")

// USERS BASIC INFO ROUTES 
app.get("/api/v1/users/basic",BasicInfoController.getUsers)
app.get("/api/v1/users/basic/:id",BasicInfoController.getSpecificUser)
app.post("/api/v1/users/basic",upload.single("photo"), BasicInfoController.addUser)
app.put("/api/v1/users/basic/:id",upload.single("photo"),BasicInfoController.updateUser)
app.delete("/api/v1/users/basic/:id",BasicInfoController.deleteUser)
 
//USERS PERSONAL INFO ROUTES
app.get("/api/v1/users/personalinfo/:userId",PersonalInfoController.getPersonalInfo)
app.post("/api/v1/users/personalinfo/:userId",upload.none(),PersonalInfoController.createPersonalInfo)
app.put("/api/v1/users/personalinfo/:userId",upload.none(),PersonalInfoController.updatePersonalInfo)
app.delete("/api/v1/users/personalinfo/:userId",PersonalInfoController.deletePersonalInfo)

//POST ROUTES
app.get("/api/v1/posts",PostController.getAllPosts)
app.get("/api/v1/posts/:userId",PostController.getPostsOfUser)
app.get("/api/v1/posts/:userId/:postId",PostController.getSpecificPost)
app.post("/api/v1/posts/:userId",upload.single("media"),PostController.createPost)
app.put("/api/v1/posts/:userId/:postId",upload.single("media"),PostController.updatePost)
app.delete("/api/v1/posts/:userId/:postId",PostController.deletePost)

app.use((req,res)=>{
    res.status(404).send("Unable to find requested resource")
})

const startServer = async () =>{
    try{
        const connectionString = process.env.MONGO_ATLAS_URL
        await connectDB(connectionString)
        app.listen(process.env.PORT,()=>{
            console.log("Server started on port : ",process.env.PORT)
        })
    }catch(err){
        console.error(err.message)
    }
}
startServer()
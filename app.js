require("dotenv").config()
const express = require("express")
const connectDB = require("./config/mongo")
const upload = require("./config/multer")
const UserController = require("./controllers/userController")

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
app.get("/api/v1/users",UserController.getUsers)
app.get("/api/v1/users/:id",UserController.getSpecificUser)
app.post("/api/v1/users",upload.single("photo"), UserController.addUser)
app.put("/api/v1/users/:id",upload.single("photo"),UserController.updateUser)
app.delete("/api/v1/users/:id",UserController.deleteUser)

app.use((req,res)=>{
    res.status(404).send("Unable to find requested resource")
})

const startServer = async () =>{
    try{
        const connectionString = process.env.MONGO_URL + process.env.DB_NAME
        await connectDB(connectionString)
        app.listen(process.env.PORT,()=>{
            console.log("Server started on port : ",process.env.PORT)
        })
    }catch(err){
        console.error(err.message)
    }
}
startServer()


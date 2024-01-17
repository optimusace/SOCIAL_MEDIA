require("dotenv").config()
const express = require("express")
const connectDB = require("./config/mongo")
const cors = require("cors")
const basicInfoRoutes = require("./routes/basicInfoRoutes")
const personalInfoRoutes= require("./routes/personalInfoRoutes")
const postsRoutes = require("./routes/postsRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

//SET VIEW ENGINE
app.set("view engine","ejs")
app.set("views","./views")

//ROUTES
app.use("/api/v1/users/basic",basicInfoRoutes)
app.use("/api/v1/users/personalinfo",personalInfoRoutes)
app.use("/api/v1/posts",postsRoutes)

app.use((req,res)=>{
    res.status(404).send("Unable to find requested resource")
})

//CONNECT TO DATABASE AND START SERVER 
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
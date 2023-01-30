const express =require("express")
const app=express()
const cors=require("cors")
const Connection = require("./Connection/Connection")
const router = require("./Routes/Route")
app.use(cors())
app.use(express.json())
app.use("/",router)




app.listen(5000,()=>
{
    try {
        Connection()
        console.log("Server is listening to port 5000")
    } catch (error) {
        console.log("Something went wrong")
    }
})
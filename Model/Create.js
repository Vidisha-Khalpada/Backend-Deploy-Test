const mongoose=require("mongoose")
const CreateSchema=new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    userID:{type:String,required:true}
})

const CreateModel=mongoose.model("CreateBlog",CreateSchema)

module.exports=CreateModel
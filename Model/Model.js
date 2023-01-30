const mongoose=require("mongoose")
const BlogSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const BlogModel=mongoose.model("Blog",BlogSchema)

module.exports=BlogModel
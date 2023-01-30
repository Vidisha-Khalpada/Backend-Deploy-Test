const mongoose=require("mongoose")
const env=require("dotenv")
mongoose.set('strictQuery', true)
env.config({
    path:".env"
})
const user=process.env.USER
const password=process.env.PASSWORD

const Connection=async()=>
{
    await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.kdtb6h5.mongodb.net/NewBlog`)
}

module.exports=Connection
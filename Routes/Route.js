const express=require("express")
const BlogModel = require("../Model/Model")
const router=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const env=require("dotenv")
const authenticate = require("../Middleware/authentication")
const CreateModel = require("../Model/Create")
env.config({
    path:".env"
})
let jwtsecret=process.env.JWT_SECRET

router.post("/api/register",async(req,res)=>
{
    try {
        let data=await req.body
        let name=data.input.name
        let exitinguser=await BlogModel.find({name:name})
        if(exitinguser.length>0)
        {
            return res.send({message:"The user is already registered.. Please login"})
        }
        bcrypt.hash(data.input.password,5, async function(err, hash){
            exitinguser=await BlogModel.create({
                name:data.input.name,
                email:data.input.email,
                password:hash
            })
            res.send({
                message:"Successfull Signup"
            })
        })
        
    } catch (error) {
        res.status(400).send("Something went wrong...")
    }
})

router.post("/api/login",async(req,res)=>
{
    let data=await req.body
    
    try {
        const existinguser=await BlogModel.find({email:data.input.email})
        if(existinguser.length>0)
        {
            bcrypt.compare(data.input.password, existinguser[0].password, function(err, result) {
                if(result)
                {
                    let{name,email,_id}=existinguser[0]
                    const token=jwt.sign({name:name,email:email,_id:_id},jwtsecret)
                    return res.send({token:token,message:"Login Successfull..."})
                }
                else
                {
                    return res.send("Login failed...")
                }
            })
        }
        else
        {
            return res.send({
                message:"The user is not registered..."
            })
        }

    } catch (error) {
        res.status(400).send("Something went wrong...")
    }
})
router.get("/api/getblogs",authenticate,async(req,res)=>
{
    try {
        let data=await CreateModel.find()
        res.send({
            data:data
        })
    } catch (error) {
        res.status(400).send("Something went wrong...")
    }
})
router.post("/api/create",authenticate,async(req,res)=>
{
    try {
        let {title,content,userId}=req.body
        
        await CreateModel.create({
            title:title,content:content,userID:userId
        })
        return res.send("The Blog is successfully created")
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch("/api/update/:blogid",authenticate,async(req,res)=>
{
    try {
        let payload=req.body
        let noteid=req.params.blogid
        let userID=req.body.userID
        const user=await CreateModel.findOne({id:noteid})
        if(user.userID===userID)
        {
            await CreateModel.findByIdAndUpdate(noteid,payload)
            res.send("The blog is successfully updated...")
        }
        else
        {
            res.send("Not Authorized...")
        }
        
    } catch (error) {
        res.status(400).send("Something went wrong...")
    }
})

router.delete("/api/delete/:blogid",authenticate,async(req,res)=>
{
    try {
        let id=req.params.blogid
        let userId=req.body.userID
        let bloguser=await CreateModel.findOne({_id:id})
        if(bloguser.userID===userId)
        {
            await CreateModel.findByIdAndDelete(id)
            res.send("The blog is successfully deleted...")
        }
        else
        {
            res.send("Not Authorized...")
        }
        
    } catch (error) {
        res.status(400).send("Something went wrong...")
    }
})
module.exports=router
const jwt=require("jsonwebtoken")
const env=require("dotenv")
env.config({
    path:".env"
})
let jwtsecret=process.env.JWT_SECRET
const authenticate=(req,res,next)=>
{
    const token=req.headers?.authorization?.split(" ").pop()
    if(token)
    {
        const decoded=jwt.verify(token,jwtsecret)
        if(decoded)
        {
            let userId=decoded._id
            req.body.userId=userId
            next()
        }
        else
        {
            res.send("Please login")
        }
    }
    else
    {
        res.send("Please login")
    }

}
module.exports=authenticate
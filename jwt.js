const jwt=require("jsonwebtoken");
const fs = require("fs");
const path=require("path");
var publicKey = fs.readFileSync(path.resolve(__dirname,"./public.key"),"utf-8");

const jwtAuthMiddleware=(req,res,next)=>{

  //Extract token from header 
   const token=req.headers.authorization.split(" ")[1];
   try{
    const decoded=jwt.verify(token,publicKey);
    console.log(decoded);
    
    req.user=decoded;//Adding user to request object
    next();
   }catch(err){
    return res.status(401).json({error:"Unauthorized"});
   } 

}



module.exports={jwtAuthMiddleware};
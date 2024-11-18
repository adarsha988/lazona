const JWT= require("jsonwebtoken")


const generateJWT=(payload)=>{
   return   JWT.sign(
        {
            data:payload,},
           process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_DURATION}
        );
       
}
const verifyJWT= (token)=>{
   try{
    return JWT.verify(token,process.env.JWT_SECRET)
        
}
catch(err){
   throw new Error("token is invalid");
}
       
}
module.exports={generateJWT,verifyJWT }
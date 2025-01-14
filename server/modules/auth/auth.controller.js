const bcrypt = require("bcrypt");
const authModel =require("../auth/auth.model");
const userModel=require("../users/user.model");


const {generateOTP, verifyOTP}=require("../../utils/otp");
const { mailOption } = require("../../services/mailer");
const{generateJWT}= require("../../utils/jwt")
const login = async (email,password)=>
    {
 const  user= await userModel.findOne({email
  , isArchived:false
      }).select("+password");
      if (!user) throw new Error("User doesn't exist")
    
    if (!user?.isActive) throw new Error ("user is not active.Contact admin");
    
    if (!user.isEmailVerified)throw new Error ("Email not verified !! Verify email to get started....");
 const isValidPass= await bcrypt.compare(password,user?.password)
    if(!isValidPass) throw new Error("Wrong Password");
    //return jwt token 
    const payload={
      id:user?._id,
      email:user?.email,
      roles:user?.roles||[],
    }
    const token= await generateJWT(payload);
    return {
    user:{name:user?.name,email:user?.email,roles:user?.roles},
    token};
    };
    
const register =async(payload)=>{
    let {password,roles,...rest}=payload;
   rest.password=await bcrypt.hash(password,+process.env.SALT_ROUND)
   const user =await userModel.create(rest);
   const token=generateOTP();
await authModel.create( {email:user?.email, token});
const mail=await mailOption(user?.email,token);
  return mail;
  }

  const regenerateToken= async(email)=>{
    const auth = await authModel.findOne({email});
    if (!auth) throw new Error("user not found")
      const newToken = await generateOTP(); 
    await authModel.findOneAndUpdate(
      {email},
      {token:newToken},
      {new:true})
await mailOption(email,newToken);
      return true;

  }
  const verifyEmail= async(email,token) =>{
    //email exists check
    const auth=await authModel.findOne({email});
    if (!auth) throw new Error("User not found");
  
    
  //token expire check
   
   const isValidToken= await verifyOTP(token);
   if (!isValidToken) throw new Error("Token expired");

  //check token match with email
  const emailValid = (auth?.token===token);
  
if (!emailValid) throw new Error ("Token mismatch")
//userModel isEmailVerified True
await userModel.findOneAndUpdate(
  {email},
  {isEmailVerified:true},
  {new:true})


  //remove that email form authModel
// const authData=await authModel.deleteOne({email});

return true;

}
const generateFTPToken= async(email)=>{
  const user = await userModel.findOne({
    isActive:true,
    isArchived:false,
    email});
  if (!user) throw new Error("User doesn't exist")

    const fpToken=generateOTP();
    await authModel.create( {email:email, token: fpToken})
     mailOption(email,fpToken)
    return true;  
  }

const forgetPassword=async(email,token ,password)=>{
  const  user= await authModel.findOne({
    email});
  if (!user) throw new Error("User doesn't exist")
  const isValidToken= await verifyOTP(token);
 if (!isValidToken) throw new Error("Token expired");
 await authModel.findOneAndUpdate(
  {email},
  {password:await bcrypt.hash(
    password,+process.env.SALT_ROUND)},
  {new:true})
await authModel.deleteOne({email});
  return true;

}
  

    module.exports={  generateFTPToken,forgetPassword, login,register,verifyEmail,regenerateToken}
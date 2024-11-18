const nodemailer= require("nodemailer");


const transporter= nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port:"465",
    secure:"true",
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASS,
    }
})

const mailOption=async(email,token)=>{

   const info= await transporter.sendMail({
       from:process.env.GMAIL_USER,
       to:email,
       subject:"OTP verification",
       html:`<div> Hi, your OTP Code is <b>${token}</b></div>`
    })
    return info.messageId;
}

module.exports={mailOption}
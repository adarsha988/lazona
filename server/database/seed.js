require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const userController = require("../modules/users/user.controller");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
var setup = {
  initialize: async () => {
    await mongoose.connection.dropDatabase();
    console.log("DB reset");
   console.log("C reating Admin user")
   const payload={
    name:"Adarsha",
    email:"Adarashkd@gmail.com",
    password:await bcrypt.hash("12345",+process.env.SALT_ROUND),
    isEmailVerified:true,
    roles:["admin"],
   };
   await userController.create(payload);

    console.log("---------DONE--------");
    console.log("Creating Normal user")
    const Userpayload={
        name:"Aarsha",
        email:"Aarashkd@gmail.com",
        password:await bcrypt.hash("12345",+process.env.SALT_ROUND),
        isEmailVerified:true,
       
       };
       await userController.create(Userpayload)
       console.log("Done")
      },
};
setup.initialize();

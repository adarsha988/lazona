require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const userController = require("../modules/users/user.controller");
const categoryController= require("../modules/categories/category.controller");
const productController= require("../modules/products/product.controller");
const { faker } = require('@faker-js/faker');

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
       console.log("....DONE....")
       console.log("Creating categories");
       const cat1= await categoryController.create({name:"Tshirts"});
       const cat2= await categoryController.create({name:"Jeans"});
       const cat3= await categoryController.create({
        name:"bag",
       });
      console.log("Done")
      console.log("----Creating products")
           
      const productNumber=100;
        for(let i=0; i< productNumber; i++){  
          
          const productName= faker.commerce.productName();
          await productController.create({
          name: productName,
          alias: faker.helpers.slugify(productName+i).toLowerCase(),
          description :faker.commerce.productDescription(),
          quantity:faker.number.int({ min: 10, max: 100 }) ,
          price:faker.commerce.price({ min: 100, max: 200, dec: 0 }),
          category: faker.number.binary({ min: 0, max: 65535 })=== 0 ? cat1?._id:cat2?._id ,
          images:[
            faker.image.urlLoremFlickr({}),
            faker.image.urlLoremFlickr({}),
            faker.image.urlLoremFlickr({})]
        }) 
        }
   
      console.log("-----Products Created-----")

    },
};
setup.initialize();

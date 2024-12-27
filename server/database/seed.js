require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const userController = require("../modules/users/user.controller");
const categoryController= require("../modules/categories/category.controller");
const productController= require("../modules/products/product.controller");

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
      await productController.create({
        name:"Black Tshirt",
        alias:["black tees","black tshirt"],
        description :"polyfiber  made tshirt",
        quantity:5,
        price:2000,
        category: cat1?._id,
        images:["https://lostsoles.co.uk/shop/relax-fit-tshirt-black/#&gid=1&pid=1",
        " https://lostsoles.co.uk/shop/relax-fit-tshirt-black/#&gid=1&pid=1",
        "https://owayo-cdn.com/cdn-cgi/image/format=auto,fit=contain,width=490/newhp/img/productHome/productSeitenansicht/productservice/tshirts_classic_herren_basic_productservice/st2020_sre.png "]
      }) 
      await productController.create({
        name:"Jeans",
        alias:["jeans","pant"],
        description :"polyfiber  made jeans",
        quantity:5,
        price:2300,
        category: cat2?._id,
        images:["https://www.jiomart.com/images/product/original/rvldnyxvsm/s-2-jeans-men-s-regular-fit-denim-jeans-blue-product-images-rvldnyxvsm-0-202305260640.jpg?im=Resize=(1000,1000)",
        "https://img.drz.lazcdn.com/g/kf/S4fb9e340efd54d3a85bd1e2e0514eaa5A.jpg_720x720q80.jpg",
        "https://wornwear.patagonia.com/cdn/shop/files/jxj1bhp7fgrybk5uvvpq.jpg?v=1724163293"]
      })
      await productController.create({
        name:"bags",
        alias:["bag","ba"],
        description :"polyfiber  made jeans",
        quantity:0,
        price:5300,
        category: cat3?._id,
        images:["https://www.meroshopping.com/images/Xlab_bag_XLB_9050NU_Laptop_Backpack_.jpg"]
      });
      console.log("-----Products Created-----")

    },
};
setup.initialize();

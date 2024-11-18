const router = require("express").Router();
const userRouter= require('../modules/users/user.routes')
const authRouter= require('../modules/auth/auth.routes')
const categoryRouter= require("../modules/categories/category.routes")
const productRouter= require("../modules/products/product.routes");
const orderRouter= require("../modules/orders/order.routes");
router.get("/",(req,res,next)=>{
    res.json({data:"",msg:"Api router is working"});

});

router.use('/users',userRouter)
router.use('/auth',authRouter)
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);
 router.use("/products", productRouter);


router.all("*",(req,res,next)=>{ 

    res.json({data:"",msg:"routes not available"});
});
     
module.exports=router;
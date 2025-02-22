const router= require('express').Router();
const multer  = require('multer');
const Controller=require("./user.controller")
const {secureAPI}=require("../../utils/secure")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./public/users')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() +"."+file.originalname.split(".")[1];

    cb(null, uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

router.get("/",secureAPI(["admin"]),async (req,res,next)=>{
  try{
   const {size,page,name,role}= req.query;
   const search={name,role}
  const result= await Controller.list(size,page,search);
  res.json({data:result,msg:'Success'})
  }
  catch(e){
  next(e);
}
})
router.post("/",secureAPI(["admin"]),async (req,res,next)=>{
  try{
    req.body.created_by= req.currentUser;
    req.body.updated_by= req.currentUser;
    req.body.updated_at= new Date();
    const result= await Controller.create(req.body);
    res.json({data:result,msg:'Success'})
  }
  catch(e){
  next(e);
}
})

router.get("/profile",secureAPI(["admin","user"]),async (req,res,next)=>{
  try{
  const result= await Controller.getById(req.currentUser);
 res.json({data:result,msg:'Success'})
  }
  catch(e){
  next(e);
}
});

router.put("/profile",
  secureAPI(["admin","user"]),
  upload.single('image'),
  async (req,res,next)=>{
  try{
   if (req?.file){
    req.body.image="users/"+req.file.filename
   }
     const{id,...rest}= req.body;
     rest.created_by= req.currentUser;
     rest.updated_by= req.currentUser;
     req.body.updated_at= new Date();
     const me = req.currentRoles.includes("admin")?req.body.id: req.currentUser;
    if(!me) throw new Error("User ID is required")
     const result= await Controller.updateById(me,rest);
    res.json({data:result,msg:'Success'})
    }
  catch(e){
  next(e);
}
});
router.put("/change_password",secureAPI(["user"]),async (req,res,next)=>{
  try{
   const {oldPassword,newPassword}=req.body;
  if (!oldPassword || !newPassword) throw new Error("password are missing")
   const result= await Controller.changePassword(req.currentUser,oldPassword,newPassword);
 res.json({data:result,msg:'Success'})
    }
  catch(e){
  next(e);
}
});
router.put("/reset_password",secureAPI(["admin"]),async (req,res,next)=>{
  try{
   const {id,...rest}=req.body;
   rest.created_by= req.currentUser;
   rest.updated_by= req.currentUser;
   req.body.updated_at= new Date();
   const result= await Controller.resetPassword(id,rest);
 res.json({data:result,msg:'Success'})
    }
  catch(e){
  next(e);
}
});
router.patch("/status/:id",secureAPI(["admin"]),async (req,res,next)=>{
  try{
    req.body.created_by= req.currentUser;
    req.body.updated_by= req.currentUser;
    req.body.updated_at= new Date();
   const result= await Controller.block(req.params.id,req.body);
 res.json({data:result,msg:'Success'})
    }
  catch(e){
  next(e);
}
});

router.get("/:id",secureAPI(["admin"]),async (req,res,next)=>{
  try{
    
  const result= await Controller.getById(req.params.id);
 res.json({data:result,msg:'Success'})
  }
  catch(e){
  next(e);
}
});
router.delete("/:id",secureAPI(["admin"]),async (req,res,next)=>{
  try{
    req.body.created_by= req.currentUser;
    req.body.updated_by= req.currentUser;
    req.body.updated_at= new Date();
   const result= await Controller.archive(req.params.id,req.body);
 res.json({data:result,msg:'Success'})
  }
  catch(e){
  next(e);
}
});



module.exports= router;
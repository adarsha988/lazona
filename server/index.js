require("dotenv").config();
const cors= require("cors");
const express =require("express");
const app= express();
const mongoose= require("mongoose");
const port= (process.env.PORT||3000);
const DB_URL=(process.env.DB_URL);
const indexRouter=require('./routes')

mongoose.connect(DB_URL).then(
    console.log("Database Connected...")
)
app.use(cors());
app.use(express.json())
app.use(express.static("public"));
app.use("/",indexRouter)
app.use((err,req,res,next)=>{
const errMsg=err? err.toString().split("Error: ")[1]:"something went wrong";
res.status(500).json({data:"",msg:errMsg})

})




app.listen(port,()=>{
    console.log(`app is running in port ${port}`)
})
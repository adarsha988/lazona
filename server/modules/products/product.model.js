const {Schema,model}=require("mongoose")
const {ObjectId}= Schema.Types
const { commonSchema } = require("../../utils/commonSchema")
const productSchema = new Schema({
 
    name:{type:String,required:true,
        maxlength:30,
        minlength:2
    },
    description:{type:String},
    alias: [{ type: String, required: true, unique: true }],
     price:{type:Number,required:"Product price"},
     quantity:{type:Number,required:true},
     category:{type:ObjectId,ref:"Category"},
     images:{type:[String],default:[]},
     ...commonSchema
})

   module.exports= model("product",productSchema)
   
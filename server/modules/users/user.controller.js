const Model=require("./user.model");
const bcrypt= require("bcrypt")


const create =async(payload)=>{
    const{roles,password,...rest}=payload;
    rest.password=await bcrypt.hash(payload.password,+process.env.SALT_ROUND)
    rest.roles=[roles]
    rest.isActive=true;
    rest.isEmailVerified=true;
    rest.isArchived=false;
    return Model.create(rest);
}

const list = async (size, page, search) => {
    const pageNum = parseInt(page) || 1;
    const limit = parseInt(size) || 20;
    const { name, role } = search || {};
    
    const query = {};
    if (name) {
        query.name = new RegExp(name, "gi"); 
    }
    if (role) {
        query.roles = role; 
    }

    const response = await Model.aggregate([
        {
            '$match': query
        },
        {
            '$sort': {
                created_at: -1,
            },
        },
        {
            '$facet': {
                'metadata': [
                    {
                        '$count': 'total'
                    }
                ],
                'data': [
                    {
                        '$skip': (pageNum - 1) * limit
                    },
                    {
                        '$limit': limit
                    }
                ]
            }
        },
        {
            '$addFields': {
                'total': {
                    '$arrayElemAt': ['$metadata.total', 0]
                }
            }
        },
        {
            '$project': {
                'data': 1,
                'total': 1
            }
        },
        {
            '$project': {
                'data.password': 0,
            }
        }
    ]).allowDiskUse(true);
    
    const newData = response[0] || { data: [], total: 0 };
   const { data, total } = newData;
    return { data, total: total || 0, limit, pageNum };
};

const getById=(id)=>{
    return Model.findOne({_id:id})
}
const updateById=(id,payload)=>{
    return Model.findOneAndUpdate({_id:id},payload,{new :true})
}
const changePassword = async(id, oldPassword,newPassword)=>{
    const user = await Model.findOne({_id:id}).select("+password")
    if(!user) throw new Error (" user doesn't exit")
    const isValidPass=await bcrypt.compare(oldPassword,user?.password);

    if (!isValidPass) throw new Error("incorrect password");
const  newPass= await bcrypt.hash(newPassword,+process.env.SALT_ROUND)

    return Model.findOneAndUpdate(
        {_id:user?._id},
        {password:newPass},
        {new:true})
}
const resetPassword=async(id,payload)=>{
    const user = await Model.findOne({_id:id})
    if(!user) throw new Error (" user doesn't exit")

const  newPass= await bcrypt.hash(payload.password,+process.env.SALT_ROUND)
   
   return Model.findOneAndUpdate(
        {_id:user?._id},
        {...payload,password:newPass},
        {new:true})
}
const block =async(id,payload)=>{
    const user = await Model.findOne({_id:id})
    if(!user) throw new Error (" user doesn't exit")
       return Model.findOneAndUpdate(
            {_id:user?._id},
            payload,
            {new:true})

};
const archive= async (id,payload)=>{
    const user = await Model.findOne({_id:id})
    if(!user) throw new Error (" user doesn't exit")
        return Model.findOneAndUpdate(
            {_id:user?._id},
            payload,
            {new:true})

  
}
  
module.exports={archive,block,create,changePassword,getById,list,resetPassword,updateById};
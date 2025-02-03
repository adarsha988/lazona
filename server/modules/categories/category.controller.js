const slugify = require('slugify')
const productModel = require('../products/product.model');
const Model= require('./category.model')

const slugGenerator =(payload)=>{

 return slugify(payload,{
    lower: true,
    strict:true
 })
}


const create= async(payload)=>{
    console.log(payload)
    try {
        if (!payload.name) {
            throw new Error('Category name is required');
        }
        payload.slug = await slugGenerator(payload.name);
        const newCategory = await Model.create(payload);
        return newCategory;
    } catch (error) {
        throw error;
    }
}

const list = async(limit,page,search)=>{

    const pageNum = parseInt(page) || 1;
    const size = parseInt(limit) || 15;
    const { name} = search || {};
    
    const query = {};
    if (name) {
        query.name = new RegExp(name, "gi"); 
    }

    const response = await Model.aggregate([
        {
            '$match': query
        },
        {
            '$sort': {
                created_at: 1,
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
                        '$skip': (pageNum - 1) * size
                    },
                    {
                        '$limit': size
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
}

const getById = (id)=>{

    return Model.findOne({_id:id});

}

const updateById = async(id,payload)=>{
if(payload.name){
    payload.slug= await slugGenerator(payload.name)
}
    return Model.findOneAndUpdate({_id:id},payload,{new:true})
}

const deleteById= async(id)=>{
try {const isUsed=await productModel.findOne({category:id});
if(isUsed) throw new Error(`Category is in use. Please remove from product name ${isUsed.name} before deleting`)
    return  Model.deleteOne({_id:id})
}catch(e){
    console.log(e.message)
return e.message
}
}

module.exports={create,list,getById,updateById,deleteById}
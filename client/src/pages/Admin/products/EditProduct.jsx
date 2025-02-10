import React, { useCallback, useEffect, useState } from 'react'
import { list } from '../../../Services/Category'
import { create } from '../../../Services/Product'
import { SERVER_URL, URLS } from '../../../constants';
import useApi from '../../../hooks/useApi';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';


function EditProduct() { 
    const {id}= useParams();
    const {updateById,getById}= useApi();
  const Navigate=useNavigate();
 
  console.log(id)
    const [categories,setCategories]= useState([]);
    const [error,setError]=useState(null);
    const [msg,setMsg]= useState("")
    const [loading,setLoading]= useState(false)
    const [preview,setPreview]= useState([])

    const [productDetail,setProductDetail]=useState({
        name:"",
        quantity:"",
        price:"",
        alias:"",
        brand:"",
        category_name:""
    })


const allcategories= useCallback( async()=>{
   const data=await list()
   if(!data) return null
   setCategories(data.data.data.data)

},[])
const [files,setFiles]=useState([]);


const handleFile=(e)=>{
if(e.target.files.length>4)alert("can't upload more than 4 file")
  else{
 setFiles([...e.target.files])
}



}


const handleChange=async(e)=>{
    e.preventDefault();
    setLoading(true)
    try{const formData = new FormData();
      files.forEach((file,idx)=>{
        formData.append("images",file)
      }
      )
      formData.append("images",files)
      formData.append("name",productDetail?.name);
      formData.append("quantity",productDetail?.quantity);
      formData.append("price",productDetail?.price);
      formData.append("alias",productDetail?.alias);
      formData.append("brand",productDetail?.brand);
      formData.append("category",productDetail?.category);
      formData.append("id",id);
  
    const data= await updateById(URLS.PRODUCTS,id,formData)
   
     if(data?.msg=== "Success"){
        setMsg("Product Added Successfully!")
     }
     setTimeout(()=>{
    Navigate("/admin/products")
     },3000)
    }
      catch(e){
        const errMsg = e.response ?JSON.stringify(e.response.data.msg):"Something went wrong";
        setError(errMsg)
      }finally{
        setLoading(false)
        setMsg("")
        setFiles([])
        setProductDetail({name:'',
          quantity:"",
          price:"",
          alias:"",
          brand:"",
          category_name:""})
        setError(null)
      }
    
}

useEffect(()=>{
allcategories();
},[allcategories])

useEffect(()=>{
  if(!files) return;
 
  const setFiles= files.map((file)=>{
   return URL.createObjectURL(file) })
    setPreview(setFiles);
    return ()=>setFiles.forEach((url)=>URL.revokeObjectURL(url))
   
   
  
},[files])

useEffect(()=>{
const fetchData=async()=>{ 
  console.log(id)
    const data= await getById(URLS.PRODUCTS,id)
    console.log(data)
    const {created_at,updated_at,isArchived,category,id:dataId,...rest}=data;
  console.log({...rest})
    setProductDetail((prev)=>{
        return{...prev,...rest}
    })
    
    setPreview(()=>
    {
        return [...rest.images]
    })
    console.log(preview)
}

    fetchData();


},[id,getById])

  return (
    <div className='container col-sm-6'>
        <form onSubmit={(e)=>handleChange(e)}>
            <div className="text-center">
                <h1>Add Products</h1>
            </div>
    <div className="mb-3 ">
      <label htmlFor="TextInput" className="form-label">Image</label>
      <input type="file"  className="form-control" placeholder=""  onChange={(e)=>{handleFile(e)}} multiple/>
      {preview && Array.from(preview).map((obj, index) => {
        // console.log(obj.startsWith('blob:') ? obj : `${SERVER_URL}/${obj}`)
  return (
    <div
      key={index}
      style={{
        height: '100px',
        width: '100px',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      <img
        src={obj.startsWith('blob:') ? obj : `${SERVER_URL}/${obj}`}
        alt={`preview-${index}`}
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
})}

    </div>
    <div className="mb-3 ">
      <label htmlFor="TextInput" className="form-label">ProductName</label>
      <input type="text" value={productDetail?.name} className="form-control" placeholder="" onChange={(e)=>{setProductDetail((prev)=>({...prev,name:e.target.value}))}}/>
    </div>
    <div className="mb-3">
      <label htmlFor="disabledTextInput" className="form-label">quantity</label>
      <input type="number" value={productDetail?.quantity} className="form-control" placeholder=""onChange={(e)=>{setProductDetail((prev)=>({...prev,quantity:e.target.value}))}}/>
    </div>
    <div className="mb-3">
      <label htmlFor="disabledTextInput" className="form-label">price</label>
      <input type="number" value={productDetail?.price} className="form-control" placeholder=""onChange={(e)=>{setProductDetail((prev)=>({...prev,price:e.target.value}))}}/>
    </div>
    <div className="mb-3">
      <label htmlFor="disabledTextInput" className="form-label">alias</label>
      <input type="text" value={productDetail?.alias} className="form-control" placeholder=""onChange={(e)=>{setProductDetail((prev)=>({...prev,alias:e.target.value}))}}/>
    </div>
    <div className="mb-3">
      <label htmlFor="disabledTextInput" className="form-label">brand</label>
      <input type="text" value={productDetail?.brand} className="form-control" placeholder=" "onChange={(e)=>{setProductDetail((prev)=>({...prev,brand:e.target.value}))}}/>
    </div>
    <div className="mb-3">
  <label htmlFor="disabledSelect" className="form-label">categories</label>
  <select
    id="disabledSelect"
    value={productDetail?.category_name}
    className="form-select"
    onChange={(e) => {
      setProductDetail((prev) => ({
        ...prev,
        category_name: e.target.value,
      }));
    }}
  >
    <option value="">select one</option>
    {categories.length > 0 &&
      categories.map((cat) => (
        <option key={cat._id} value={cat._id}>
          {cat?.name}
        </option>
      ))}
  </select>
</div>

{(error||msg) && <Alert variant={error?"danger":"success"}>
{error? error:msg}
</Alert>}
    <button type="submit" className="btn btn-primary" disabled={loading}>Submit</button>
  
</form>
    </div>
  )
}

export default EditProduct
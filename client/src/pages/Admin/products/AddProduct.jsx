import React, { useCallback, useEffect, useState } from 'react'
import { list } from '../../../Services/Category'
import { create } from '../../../Services/Product'
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function AddProduct() {
  const Navigate=useNavigate();
    const [categories,setCategories]= useState([]);
    const [error,setError]=useState(null);
    const [msg,setMsg]= useState("")
    const [loading,setLoading]= useState(false)
    const [preview,setPreview]= useState([])

    const [productDetail,setProductDetail]=useState({
        name:'',
        quantity:"",
        price:"",
        description:"",
        alias:"",
        brand:"",
        category:""
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
    console.log(productDetail.name)
    try{
      setLoading(true)
      const formData = new FormData();
      files.forEach((file)=>{
        formData.append("images",file)
      }
      )
      console.log(formData,'formData')
      formData.append("images", files);
      formData.append("name",productDetail?.name);
      formData.append("quantity",productDetail?.quantity);
      formData.append("price",productDetail?.price);
      formData.append("description",productDetail?.description);
      formData.append("alias",productDetail?.alias);
      formData.append("brand",productDetail?.brand);
      formData.append("category",productDetail?.category);
    
    
    const {data}= await create(formData)
     if(data?.msg==="Success"){
        setMsg(`${productDetail?.name} Product Added Successfully. Redirecting in 3 secs`)
     }
     setTimeout(()=>{
      Navigate("/admin/products")
       },3000)
    }
      catch(e){
        const errMsg = e.response ?JSON.stringify(e.response.data.msg):"Something went wrong";
        setError(errMsg)
      }finally{
        setTimeout(()=>{
          setLoading(false)
          setMsg("")
          setFiles([])
          setProductDetail({ 
            name:"",
            quantity:"",
            price:"",
            description:"",
            alias:"",
            brand:"",
            category:""})
          setError(null)
        },2500)
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

  return (
    <div className='container col-sm-6'>
        <form onSubmit={(e)=>handleChange(e)}>
            <div className="text-center">
                <h1>Add Products</h1>
            </div>
    <div className="mb-3 ">
      <label htmlFor="TextInput" className="form-label">Image</label>
      <input type="file"  className="form-control" placeholder=""  onChange={(e)=>{handleFile(e)}} multiple/>
      <div className="grid gap-0 column-gap-3">
  {preview &&
    Array.from(preview).map((obj, idx) => (
      <div
        key={idx}
        className="p-2 g-col-6"
     
      >
        <div
          style={{
            height: '100px',
            width: '100%',
            border: '1px solid black',
          }}
        >
          <img
            src={obj}
            alt={`preview-${idx}`}
            style={{
              height: '50%',
              width: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    ))}
</div>

     
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
      <label htmlFor="disabledTextInput" className="form-label">description</label>
      <input type="text" value={productDetail?.description} className="form-control" placeholder=""onChange={(e)=>{setProductDetail((prev)=>({...prev,description:e.target.value}))}}/>
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
      <select id="disabledSelect" value={productDetail?.category} className="form-select"onChange={(e)=>{setProductDetail((prev)=>({...prev,category:e.target.value}))}}>
        <option value="">select one </option>
        {categories.length>0 ?categories.map((cat)=>{
         return  <option key={cat._id}value={cat._id}>{cat?.name}</option>
        }):null}
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

export default AddProduct
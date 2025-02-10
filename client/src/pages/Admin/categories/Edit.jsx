
import { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';


function Edit() {
  const {id}=useParams();
  const navigate=useNavigate();
  const{updateById,getById,error}=useCategories();
  const[category,setCategory]=useState({});
 


  const handleSubmit=async(e)=>{
  try{
    e.preventDefault();
const data=await updateById(category.name,id);
 
 if(data.msg==="Success"){
  return navigate("/admin/categories")
 } 
    
  }catch(e){

alert(error||e)
  }finally{
    setCategory("")
  }
  }    

  useEffect(()=>{
        const data =async()=>{
        const fetchData=await getById(id);
        setCategory(fetchData?.data.data);
         
      }
        data();
  },[getById,id])
  return (
  <div className='container' style={{ border:'2px solid #ccc', boxSizing:"border-box"}}>
<h1 className='mb-4'>Add new categories</h1>
<div  className="d-flex justify-content-center">
<Form onSubmit={(e)=>{handleSubmit(e)}}>
      <Form.Group className="mb-3" >
        <Form.Label>New Category</Form.Label>
        <Form.Control type="text" value={category?.name||""}style={{width:"20rem", height:"2rem", padding:"1rem"}} placeholder="Enter category" onChange={(e)=>setCategory((prev)=>{ return {...prev,name:e.target.value}})}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Slug</Form.Label>
        <Form.Control type="text" value={category?.slug||""}style={{width:"20rem", height:"2rem", padding:"1rem"}} placeholder="Enter category" disabled/>
      </Form.Group>
     <Stack direction="horizontal"gap={3}>
       <Button variant="primary" type="submit" className='px-5'>
        Update
      </Button>
    <Link to="/admin/categories">
    <Button variant="danger" type="submit" className='btn-sm p-1'>
        Go back
      </Button>
    </Link>  
     </Stack>
    </Form>
    </div>
  </div>
   
  );
}

export default Edit;


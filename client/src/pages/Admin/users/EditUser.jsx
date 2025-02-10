
import { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../../../hooks/useUsers';


function EditUser() {
  const {id}=useParams();
  const navigate=useNavigate();
  const{updateById,getById,error}=useUsers();
  const[payload,setPayload]=useState({
    name:"",
    email:"",
    roles:""
  });
 


  const handleSubmit=async(e)=>{
  try{
    e.preventDefault();
    payload.id=id
const data=await updateById(payload);
 
 if(data.msg==="Success"){
  alert("User successfully updated !!")
  return navigate("/admin/users")
 } 
    
  }catch(e){

alert(error||e)
  }finally{
    setPayload({
       name:"",
      email:"",
      roles:""
    })
  }
  }    

  useEffect(()=>{
        const data =async()=>{
        const fetchData=await getById(id);
        const {created_at,created_by,isActive,isArchived,isEmailVerified,roles,updated_at,updated_by,...rest}=fetchData;
        rest.roles= roles.toString();
        setPayload(rest);
         
      }
        data();
  },[getById,id])
  return (
  <div className='container' style={{ border:'2px solid #ccc', boxSizing:"border-box"}}>
<h1 className='mb-4'>Add new users</h1>
<div  className="d-flex justify-content-center">
<Form onSubmit={(e)=>{handleSubmit(e)}}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={payload?.name||""}style={{width:"20rem", height:"2rem", padding:"1rem"}} placeholder="Enter payload" onChange={(e)=>setPayload((prev)=>{ return {...prev,name:e.target.value}})}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="Email" value={payload?.email||""}style={{width:"20rem", height:"2rem", padding:"1rem"}} placeholder="Enter payload" onChange={(e)=>setPayload((prev)=>{return{...prev,email:e.target.value}})}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Select value={payload?.roles} onChange={(e)=>setPayload((prev)=>{return{...prev,roles:e.target.value}})}>
        <option>Open this select menu</option>
        <option value="admin">admin</option>
        <option  value="user">user</option>
        </Form.Select>
      </Form.Group>
     <Stack direction="horizontal"gap={3}>
       <Button variant="primary" type="submit" className='px-5'>
        Update
      </Button>
    <Link to="/admin/users">
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

export default EditUser;


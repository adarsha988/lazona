import React, { useState } from 'react';
import {useSignUp} from '../hooks/useSignUp';

const SignupPage = () => {
  const{Error,Email,register,submitted}= useSignUp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  });
  const [errors, setErrors] = useState({});
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    newErrors=>({...newErrors,...Error})
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const{confirmPassword,...payload}=formData
     register(payload)
    }
  };

  return (
    <div style={{  backgroundColor: '#E6E6FA',maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <p className=" text-center fs-1 fw-bold">Sign Up</p>
          { Email&& submitted &&<Verify Email={Email}/>}
      {!submitted && !Email && <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
             display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
             display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
             display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}          />
          {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
             display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}          />
          {errors.confirmPassword && <small style={{ color: 'red' }}>{errors.confirmPassword}</small>}
        </div>
        <button type="submit" variant="primary" 
        style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}
        disabled={ submitted===true ? true:false}
        >
          Sign Up
        </button>
      </form> }
      
    </div>
  );
};

const Verify=({Email})=> {
  const{verify,regenerate}= useSignUp();
const [verification,setVerification]= useState({
  email:Email,
  token:""
})
const [msg,setMsg]=useState("")

const handleChange=async(e)=>{
e.preventDefault();
    const data=await verify({payload:verification})
    if (data.data.msg === "success") setMsg("Email has been verified");
    else {
      setMsg("Something went wrong...");
    }
}
const handleResendToken=async(e)=>{
e.preventDefault();
    const data=await regenerate({Email})
    if (data.data.msg === "success") setMsg("Email has been sent");
    else {
      setMsg("Something went wrong...");
    }
}

 return <>
  {msg && <div style={{ color: 'green' }}>
  <p>{msg}</p> 
  </div>}
 <div style={{ color: 'green' }}>
  <p>Form submitted successfully!</p> 
<div style={{ marginBottom: '15px' }}>
  <label htmlFor="email">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    readOnly={true}
    value={Email}
    style={{
      border: '1px solid #ccc',
      borderRadius: '4px',
     display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
  />
</div>
<div style={{ marginBottom: '15px' }}>
  <label htmlFor="token">Token</label>
  <input
    type="text"
    id="token"
    value={verification?.token}
    style={{
      border: '1px solid #ccc',
      borderRadius: '4px',
     display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}     
     onChange={(e)=>{     const sanitizedToken = e.target.value.replace(/\s/g, ""); 
     setVerification((prev)=>({...prev,token:sanitizedToken }))} }/>
     
</div>
<div className='d-flex justify-content-between'>
<div className='text-success mt-3'><p> check email for token!</p></div>
<button className='btn btn-link text-decoration-none mt-0' onClick={(e)=>handleResendToken(e)}>Regenerate Token</button>
</div>
<button type="submit" variant="primary" 
style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}
onClick={(e)=>handleChange(e)}>
  verify
</button>

</div> </>}

export default SignupPage;

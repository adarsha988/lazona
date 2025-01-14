import React, { useState } from 'react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
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
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log('Form Data:', formData);
    }
  };

  return (
    <div style={{  backgroundColor: '#E6E6FA',maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <p className=" text-center fs-1 fw-bold">Sign Up</p>
      {submitted && <p style={{ color: 'green' }}>Form submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
             display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.username && <small style={{ color: 'red' }}>{errors.username}</small>}
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
        <button type="submit" variant="primary" style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;

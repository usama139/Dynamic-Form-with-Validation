import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    contact: '',
    country: '',
    dob: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    contact: '',
    country: '',
    dob: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

  
    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    
    const contactRegex = /^[0-9]{10}$/;
    if (!formData.contact || !contactRegex.test(formData.contact)) {
      newErrors.contact = 'Contact must be a 10-digit number';
      valid = false;
    }

   
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain at least 1 uppercase letter, 1 number, and be 6 characters long';
      valid = false;
    }

    
    if (!formData.country) {
      newErrors.country = 'Please select a country';
      valid = false;
    }

  
    if (!formData.dob) {
      newErrors.dob = 'Please select your date of birth';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (validateForm()) {
      try {
     
        const response = await axios.post('http://localhost:5000/save', formData);
        console.log(response); 

        alert('Data saved successfully!');
        setFormData({
          username: '',
          password: '',
          email: '',
          contact: '',
          country: '',
          dob: ''
        }); 
      } catch (error) {
        console.error('Error saving data:', error);
        alert('Error saving data');
      }
    } else {
      alert('Please fix the errors in the form');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Form with Validation</h1>
        <form onSubmit={handleSubmit}>
         
          <div className="form-field">
            <label htmlFor="username">Username:</label>
            <input
            placeholder='Enter your full Name'
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <input
            placeholder='Enter your Password'
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
            placeholder='Enter your Email Address'
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

        
          <div className="form-field">
            <label htmlFor="contact">Contact:</label>
            <input
            placeholder='Enter Your Contact'
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <p className="error">{errors.contact}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="country">Country:</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Canada">Canada</option>
            </select>
            {errors.country && <p className="error">{errors.country}</p>}
          </div>

        
          <div className="form-field">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <p className="error">{errors.dob}</p>}
          </div>

         
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

const UserAuthentication = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', isExpert: false });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('/user/signup', formData);
      console.log('Signup successful:', response.data);

    } catch (error) {
      console.error('Signup error:', error);

    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/user/login', formData);
      console.log('Login successful:', response.data);

    } catch (error) {
      console.error('Login error:', error);
    
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>User Authentication</h2>
      <TextField
        type="text"
        name="name"
        label="Name"
        variant="outlined"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        type="email"
        name="email"
        label="Email"
        variant="outlined"
        margin="normal"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        variant="outlined"
        margin="normal"
        value={formData.password}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="isExpert"
            checked={formData.isExpert}
            onChange={handleChange}
          />
        }
        label="Expert"
      />
      <Box sx={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
        <Button variant="contained" onClick={handleLogin} style={{ marginLeft: '10px' }}>Login</Button>
      </Box>
    </Box>
  );
};

export default UserAuthentication;

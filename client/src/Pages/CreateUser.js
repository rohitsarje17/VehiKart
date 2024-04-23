import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isExpert: false,
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/signup', formData);
      console.log(response.data);
      alert('User created successfully!');
      localStorage.setItem("userData", JSON.stringify(formData)); // Saving user data to localStorage
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Create An Account</Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Box>
        <div>
          <input
            type="checkbox"
            id="isExpert"
            name="isExpert"
            checked={formData.isExpert}
            onChange={() => setFormData({ ...formData, isExpert: !formData.isExpert })}
          />
          <label htmlFor="isExpert">Is Expert</label>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Create User
        </Button>
      </form>
    </Container>
  );
};

export default CreateUser;

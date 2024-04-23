import React, {useState}from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useNavigate, useParams} from 'react-router-dom';
import { TextField, Button, Container,Typography,FormControlLabel, InputLabel, Select, MenuItem ,Input,Checkbox} from "@mui/material";
import axios from 'axios';

function UpdateVehicle() {
    const { id } = useParams();
  const [formData, setFormData] = useState({
    manufacturer: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    location: '',
    photos: [],
    isInspected: false,
    userId: localStorage.getItem('userId'), 
    contactNumber: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const photos = Array.from(e.target.files);
    setFormData({ ...formData, photos });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if(!localStorage.getItem('userId'))
    {
      navigate('/signup');
    }
    else{
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/vehicle/${id}`, formData);
      console.log(response.data);
      alert('Vehicle added successfully!');
      setFormData({
        manufacturer: '',
        model: '',
        year: '',
        mileage: '',
        price: '',
        location: '',
        photos: [],
        isInspected: false,
        userId: '',
        contactNumber: '',
      });
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Failed to add vehicle. Please try again.');
    }
  }
  };

  return (
    <div style={{ backgroundColor: '#BED7DC' }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '2%' }}>
          <Typography variant='h5'>
            Tell us something about your vehicle....
          </Typography>
          <Container maxWidth="sm">
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2%', borderRadius: '2%' }}>
              <form onSubmit={handleSubmit}>
                {/* Add manufacturer field */}
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    required
                  />
                </Box>
                {/* Add model, year, mileage, price, location fields */}
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Mileage (in km)"
                    name="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Box>
                {/* Add file input for photos */}
                <Box mb={2}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </Box>
                {/* Add isInspected field */}
                <Box mb={2}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.isInspected} onChange={handleChange} name="isInspected" />}
                    label="Is Inspected"
                  />
                </Box>

                <Box mb={2}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Box>
              </form>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default UpdateVehicle;
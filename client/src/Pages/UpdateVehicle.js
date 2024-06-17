import React, {useState}from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useNavigate, useParams} from 'react-router-dom';
import { TextField, Button, Container,Typography,FormControlLabel, InputLabel, Select, MenuItem ,Input,Checkbox} from "@mui/material";
import axios from 'axios';

function Sell() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    manufacturer: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    location: '',
    photos: [],
    userId: localStorage.getItem('userId'),
    contactNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, photos: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('userId')) {
      navigate('/signup');
    } else {
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          if (key === 'photos') {
            formData.photos.forEach((photo) => {
              formDataToSend.append('photos', photo);
            });
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
        const response = await axios.put(`http://localhost:5000/vehicle/${id}`, formDataToSend);
        console.log(response.data);
        alert('Vehicle Updated successfully!');
        setFormData({
          manufacturer: '',
          model: '',
          year: '',
          mileage: '',
          price: '',
          location: '',
          photos: [],
          userId: '',
          contactNumber: '',
        });
      } catch (error) {
        console.error('Error updating vehicle:', error);
        alert('Failed to update vehicle. Please try again.');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#BED7DC' }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '2%' }}>
          <Typography variant='h5'>
            Update Info about your vehicle
          </Typography>
          <Container maxWidth="sm">
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '2%', borderRadius: '2%' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  type="file"
                  label="Photos"
                  name="photos"
                  onChange={handlePhotoChange}
                  inputProps={{ accept: 'image/*', multiple: true }}
                />
                {formData.photos.map((photo, index) => (
                  <img key={index} src={URL.createObjectURL(photo)} alt={`Photo ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
                ))}
                <TextField
                  fullWidth
                  label="Manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  
                />
                <TextField
                  fullWidth
                  label="Model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  
                />
                <TextField
                  fullWidth
                  label="Year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  
                />
                <TextField
                  fullWidth
                  label="Mileage (in km)"
                  name="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={handleChange}
                  
                />
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  
                />
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  
                />
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default Sell;


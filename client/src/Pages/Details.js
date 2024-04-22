import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';

const Details = () => {
  const { id } = useParams(); // Get the vehicle ID from the URL params
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(`/api/vehicles/${id}`); // Fetch vehicle details by ID
        setVehicle(response.data); // Update the vehicle state with fetched data
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  if (!vehicle) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">{vehicle.brand} {vehicle.model}</Typography>
      <Typography variant="h6">Year: {vehicle.year}</Typography>
      <Typography variant="h6">Mileage: {vehicle.mileage} km</Typography>
      <Typography variant="h6">Price: {vehicle.price} lakhs</Typography>
      <Typography variant="h6">Location: {vehicle.location}</Typography>
      {/* Add more details as needed */}
    </div>
  );
};

export default Details;

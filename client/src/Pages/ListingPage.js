import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MediaCard from '../components/card';
import Filters from '../components/Filters';
import axios from 'axios';
import '../styles/listing.css'; // Import CSS file for styling

function ListingPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await axios.get('http://localhost:5000/vehicle');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }

    fetchVehicles();
  }, []);

  return (
    <div className='listing-page-main'>
      <Grid container>
        <Grid item xs={3}>
          <Filters />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {vehicles.map(vehicle => (
              <Grid key={vehicle._id} item xs={4}>
                <MediaCard vehicle={vehicle} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ListingPage;

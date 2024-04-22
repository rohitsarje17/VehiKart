import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

export default function MediaCard({ vehicle }) {
console.log(vehicle.id)
  const navigate = useNavigate();

  const handleClick = (path)=>{
    navigate(path)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={vehicle.photos.length > 0 ? vehicle.photos[0] : 'https://via.placeholder.com/150'} // Use the first photo or a placeholder if no photo available
        title={`${vehicle.manufacturer} ${vehicle.model}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {`${vehicle.manufacturer} ${vehicle.model}`}
        </Typography>
        <Typography variant='body5' color="text.secondary">
          {`${vehicle.year} | ${vehicle.mileage} km | ${vehicle.location}`}
        </Typography>
        <Typography variant="h6">
          ₹ {vehicle.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>handleClick(`/vehicle/${vehicle._id}`)}>View Details</Button>
      </CardActions>
    </Card>
  );
}


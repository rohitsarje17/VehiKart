import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { Typography } from '@mui/material';
import ActionAreaCard from './features';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function BasicGrid() {
const navigate = useNavigate();

const handleClick = (path)=>{
  console.log("Clicked");
   navigate(path);
}
  return (
    <div style={{backgroundColor: '#BED7DC' , padding: '2%'}}>
    <Box sx={{ flexGrow: 1 }}>
   <div style={{display: 'flex', justifyContent: 'center'}}>
    <Typography variant='h3'>
      VehiKart- where value meets trust
    </Typography>
 </div>
 <div style={{marginTop: '2%' , marginBottom: '2%'}}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Item>
            <div>
            <img style={{height: '200px' , width: '300px'}} src='https://www.shutterstock.com/image-vector/buying-renting-new-used-red-600nw-1062265193.jpg' alt='buy_car'></img>
            </div>
            <Button variant="contained" onClick={()=>handleClick('/viewVehicles')}>Buy Vehicle</Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <div>
                <img style={{height: '200px' , width: '300px'}} src='https://media.istockphoto.com/id/1488289944/vector/motorcycle-sale-motorcycle-rental-seller-gives-bike-and-buyer-money-customer-with-cash-and.jpg?s=612x612&w=0&k=20&c=DqPNK6Yx_hNR-tu-VFCXxBuyo2zdea_UworWwmAGOi8='></img>
            </div>
            <Button variant="contained" onClick={()=>handleClick('/sell')}>Sell Vehicle</Button>
          </Item>
        </Grid>
      </Grid>
      </div>
      <div style={{marginTop: '2%', backgroundColor: '#074173', padding: '2% 1%'}}>
      <div style={{display: 'flex' , justifyContent: 'center'}}>
      <Typography variant = 'h5' color='white'>Our Features</Typography></div>
      <Grid container spacing = {3}>
      <Grid item xs = {4}>
      <Item>
      <ActionAreaCard image ="https://t3.ftcdn.net/jpg/01/60/22/04/360_F_160220460_0tiUyOCEJCE9FPhGGmMNPdu8LOPFp63g.jpg"
      title = "Buy and Sell your vehicle Hassle free" 
      info = "Create account and  you are good to go!! "/>
       </Item></Grid> 
       <Grid item xs = {4}>
      <Item>
       <ActionAreaCard image ='https://img.freepik.com/premium-vector/car-technical-inspection-flat-vector-illustration-cartoon-employee-repairing-inspecting-car-while-owner-marking-items-giant-list-diagnostic-repair-maintenance-concept-banner-design_179970-5969.jpg' 
        title = "Buy and Sell your vehicle Hassle free" 
      info = "Create account and  you are good to go!! "
       />
       </Item></Grid>
       <Grid item xs = {4}>
      <Item>
       <ActionAreaCard image ='https://media.istockphoto.com/id/624288380/vector/car-showroom-purchase-sale-or-rental-car-seller-man.jpg?s=612x612&w=0&k=20&c=ZItA69t7OdHb6hQcpGzyNVFQ-XTtQTqOwVvcvLrclPQ=' 
       title = "Buy and Sell your vehicle Hassle free" 
      info = "Create account and  you are good to go!! "/>
       </Item></Grid>  
     </Grid>
      </div>
    </Box>

  </div>
  );
}
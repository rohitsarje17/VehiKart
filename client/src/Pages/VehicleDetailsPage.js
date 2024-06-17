// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import {TextField} from '@mui/material'

// const Container = styled('div')({
//   padding: '20px',
//   maxWidth: '600px',
//   margin: 'auto',
//   marginTop: '50px',
//   border: '1px solid #ccc',
//   borderRadius: '5px',
//   boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//   backgroundColor: '#fff',
// });

// const Title = styled(Typography)({
//   marginBottom: '20px',
// });

// const DetailsItem = styled(Typography)({
//   marginBottom: '10px',
// });

// const VehicleDetailsPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [vehicle, setVehicle] = useState(null);
//   const [user, setUser] = useState(null);
//   const uid = localStorage.getItem('userId');
//   const [reviewData, setReviewData] = useState("");
//   // console.log(uid);
//   useEffect(() => {
//     async function fetchVehicleAndUser() {
//       try {
//         // Fetch vehicle details
//         const vehicleResponse = await axios.get(`http://localhost:5000/vehicle/${id}`);
//         setVehicle(vehicleResponse.data);

//         // Fetch user details to check if they're an expert
//         const userResponse = await axios.get(`http://localhost:5000/user/${uid}`);
//         setUser(userResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     fetchVehicleAndUser();
//   }, [id, uid]);
//   //console.log(user.user.email);
//   const handleRequestTestDrive = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/testdrive/request', {
//         vehicleId: id,
//         requestedDate: new Date().toISOString(),
//         userId: uid,
//       });
//       alert('Test Drive Requested');
//       console.log('Test drive requested:', response.data.testDrive);
//     } catch (error) {
//       console.error('Error requesting test drive:', error);
//     }
//   };

//   const handleUpdateVehicle = () => {
//     navigate(`/vehicle/update/${id}`);
//   };

//   const handleDeleteVehicle = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/vehicle/${id}`);
//       alert('Vehicle deleted');
//       navigate('/');
//     } catch (error) {
//       console.error('Error deleting vehicle:', error);
//     }
//   };

// const handleMarkInspected = async (id, userId) => {
//   try {
//     const response = await axios.put(`http://localhost:5000/vehicle/inspect/${id}`, { userId });
//     //return response.data;
//     alert("Vehicle marked as Inspected ")
//   } catch (error) {
//     alert("Failed to mark as inspected")
//   }
// };

// const handleAddReview = async (id,uid,reviewData) => {   
//   try{ 
//     const response = await axios.put(`http://localhost:5000/vehicle/review/${id}`, {
//     userId: uid,
//     reviews : reviewData});
//     alert("Review Added successfully!")
//   } catch (error) {
//     alert("Could not add review. Please try again ")
//     console.error(error);
//   }
//   setReviewData("")
// };

// if (!user) {
//   return <Typography>Login to view Details</Typography>;
// }
//   if (!vehicle) {
//     return <Typography>Failed to load Vehicle Details </Typography>;
//   }

//   const isOwner = vehicle.owner._id === uid;
//   const isExpert = user.user.isExpert;
//   const inspectedByUser = vehicle.isInspected && vehicle.inspectedBy._id === uid;
//  // console.log(isExpert);

//   return (
//     <Container>
//       <Title variant="h4">{`${vehicle.manufacturer} ${vehicle.model}`}</Title>
//       <DetailsItem variant="body1">{`Year: ${vehicle.year}`}</DetailsItem>
//       <DetailsItem variant="body1">{`Mileage: ${vehicle.mileage} km`}</DetailsItem>
//       <DetailsItem variant="body1">{`Price: ₹ ${vehicle.price}`}</DetailsItem>
//       <DetailsItem variant="body1">{`Predicted Price: ₹ ${vehicle.predictedPrice}`}</DetailsItem>
//       <DetailsItem variant="body1">{`Location: ${vehicle.location}`}</DetailsItem>
//       <DetailsItem variant="body1">{`Owner: ${vehicle.owner.name}`}</DetailsItem>
//       <DetailsItem variant="body1">{`Reviews: ${vehicle.reviews || 'No reviews'}`}</DetailsItem>
//       <DetailsItem variant="body1">{`Contact Number: ${vehicle.contactNumber}`}</DetailsItem>
//       <DetailsItem variant="body1">{`Inspected: ${vehicle.isInspected ? 'Yes' : 'No'}`}</DetailsItem>
//       {vehicle.isInspected && (
//         <DetailsItem variant="body1">{`Inspected By: ${vehicle.inspectedBy.name}`}</DetailsItem>
//       )}

//       {isOwner ? (
//         <div>
//           <Button variant="contained" color="primary" onClick={handleUpdateVehicle}>
//             Update Vehicle
//           </Button>
//           <Button variant="contained" color="secondary" onClick={handleDeleteVehicle} style={{ marginLeft: '10px' }}>
//             Delete Vehicle
//           </Button>
//         </div>
//       ) : (
//         <Button variant="contained" color="primary" onClick={handleRequestTestDrive}>
//           Request Test Drive
//         </Button>
//       )}

//       {isExpert && !inspectedByUser && (
//       <div>
//         <Button variant="contained" color="primary" onClick={() => handleMarkInspected(id,uid)} style={{ marginTop: '10px' }}>
//           Mark as Inspected
//         </Button></div>
//       )}

//       {isExpert && inspectedByUser && (
//         <div style={{padding : '2%'}}>
//         <TextField
//                     label="Review"
//                     name="Review"
//                     type="text"
//                     value={reviewData}
//                     onChange={(e) => setReviewData(e.target.value)}
//                     required
//                   />
//         <Button variant="contained" color="primary" onClick={()=> handleAddReview(id ,uid , reviewData)} style={{ marginTop: '10px' }}>
//           Add Review
//         </Button></div>
//       )}
//     </Container>
//   );
// };

// export default VehicleDetailsPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Container = styled('div')({
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
  marginTop: '50px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
});

const Title = styled(Typography)({
  marginBottom: '20px',
});

const DetailsItem = styled(Typography)({
  marginBottom: '10px',
});

const VehicleDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [user, setUser] = useState(null);
  const uid = localStorage.getItem('userId');
  const [reviewData, setReviewData] = useState('');

  useEffect(() => {
    async function fetchVehicleAndUser() {
      try {
        // Fetch vehicle details
        const vehicleResponse = await axios.get(`http://localhost:5000/vehicle/${id}`);
        setVehicle(vehicleResponse.data);

        // Fetch user details to check if they're an expert
        const userResponse = await axios.get(`http://localhost:5000/user/${uid}`);
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchVehicleAndUser();
  }, [id, uid]);

  const handleRequestTestDrive = async () => {
    try {
      const response = await axios.post('http://localhost:5000/testdrive/request', {
        vehicleId: id,
        requestedDate: new Date().toISOString(),
        userId: uid,
      });
      alert('Test Drive Requested');
    } catch (error) {
      console.error('Error requesting test drive:', error);
    }
  };

  const handleUpdateVehicle = () => {
    navigate(`/vehicle/update/${id}`);
  };

  const handleDeleteVehicle = async () => {
    try {
      await axios.delete(`http://localhost:5000/vehicle/${id}`);
      alert('Vehicle deleted');
      navigate('/');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleMarkInspected = async (id, userId) => {
    try {
      await axios.put(`http://localhost:5000/vehicle/inspect/${id}`, { userId });
      alert("Vehicle marked as Inspected");
    } catch (error) {
      alert("Failed to mark as inspected");
    }
  };

  const handleAddReview = async (id, uid, reviewData) => {
    try {
      await axios.put(`http://localhost:5000/vehicle/review/${id}`, {
        userId: uid,
        reviews: reviewData,
      });
      alert("Review added successfully!");
    } catch (error) {
      alert("Could not add review. Please try again");
    }
    setReviewData('');
  };

  if (!user) {
    return <Typography>Login to view Details</Typography>;
  }

  if (!vehicle) {
    return <Typography>Failed to load Vehicle Details</Typography>;
  }

  const isOwner = vehicle.owner._id === uid;
  const isExpert = user.user.isExpert;
  const inspectedByUser = vehicle.isInspected && vehicle.inspectedBy._id === uid;

  return (
    <Container>
      <Title variant="h4">{`${vehicle.manufacturer} ${vehicle.model}`}</Title>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} style={{ marginBottom: '20px' }}>
        {vehicle.photos?.map((photo, index) => (
          <div key={index}>
            <img src={photo} alt={`Vehicle Photo ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <DetailsItem variant="body1">{`Year: ${vehicle.year}`}</DetailsItem>
      <DetailsItem variant="body1">{`Mileage: ${vehicle.mileage} km`}</DetailsItem>
      <DetailsItem variant="body1">{`Price: ₹ ${vehicle.price}`}</DetailsItem>
      <DetailsItem variant="body1">{`Predicted Price: ₹ ${vehicle.predictedPrice}`}</DetailsItem>
      <DetailsItem variant="body1">{`Location: ${vehicle.location}`}</DetailsItem>
      <DetailsItem variant="body1">{`Owner: ${vehicle.owner.name}`}</DetailsItem>
      <DetailsItem variant="body1">{`Reviews: ${vehicle.reviews || 'No reviews'}`}</DetailsItem>
      <DetailsItem variant="body1">{`Contact Number: ${vehicle.contactNumber}`}</DetailsItem>
      <DetailsItem variant="body1">{`Inspected: ${vehicle.isInspected ? 'Yes' : 'No'}`}</DetailsItem>
      {vehicle.isInspected && (
        <DetailsItem variant="body1">{`Inspected By: ${vehicle.inspectedBy.name}`}</DetailsItem>
      )}

      {isOwner ? (
        <div>
          <Button variant="contained" color="primary" onClick={handleUpdateVehicle}>
            Update Vehicle
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDeleteVehicle} style={{ marginLeft: '10px' }}>
            Delete Vehicle
          </Button>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleRequestTestDrive}>
          Request Test Drive
        </Button>
      )}

      {isExpert && !inspectedByUser && (
        <div>
          <Button variant="contained" color="primary" onClick={() => handleMarkInspected(id, uid)} style={{ marginTop: '10px' }}>
            Mark as Inspected
          </Button>
        </div>
      )}

      {isExpert && inspectedByUser && (
        <div style={{ padding: '2%' }}>
          <TextField
            label="Review"
            name="Review"
            type="text"
            value={reviewData}
            onChange={(e) => setReviewData(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" onClick={() => handleAddReview(id, uid, reviewData)} style={{ marginTop: '10px' }}>
            Add Review
          </Button>
        </div>
      )}
    </Container>
  );
};

export default VehicleDetailsPage;

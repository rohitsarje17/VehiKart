// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';

// const UserProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const id = localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/user/${id}`);
//         setUser(response.data.user);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchUserProfile();
//   }, [id]);

//   const handleRemoveVehicle = (vehicleId) => {
    
//     console.log('Removing vehicle with ID:', vehicleId);
//   };

//   if (!user) {
//     return <Typography variant="h4">Loading...</Typography>;
//   }

//   return (
//     <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent:'center'}}>
//     <div style={{padding: '3%'}}>
//       {/* <Avatar alt="Profile Image" src="/dummy_profile_image.jpg" sx={{ width: 100, height: 100, marginBottom: 20 }} /> */}
//       <Typography variant="h4" gutterBottom>User Profile</Typography>
//       <Typography variant="h6" gutterBottom>Name: {user.name}</Typography>
//       <Typography variant="h6" gutterBottom>Email: {user.email}</Typography>
//       <Typography variant="h6" gutterBottom>Expert: {user.isExpert ? 'Yes' : 'No'}</Typography>
//       </div>
//       <div style={{padding: '3% 10%'}}>
//       <div style={{ marginTop: 20 }}>
//         <Typography variant="h6" gutterBottom>Added Vehicles:</Typography>
//         {user.addedVehicles && user.addedVehicles.length > 0 ? (
//           user.addedVehicles.map((vehicle) => (
//             <div key={vehicle._id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
//               <Typography>{vehicle.manufacturer} {vehicle.model}</Typography>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 startIcon={<DeleteIcon />}
//                 onClick={() => handleRemoveVehicle(vehicle._id)}
//                 style={{ marginLeft: 10 }}
//               >
//                 Remove
//               </Button>
//             </div>
//           ))
//         ) : (
//           <Typography>No vehicles added yet.</Typography>
//         )}
//       </div>
//       <div style={{ marginTop: 40 }}>
//       <Typography variant="h6" gutterBottom>Requested Test Drives:</Typography>
//           {user.requestedTestDrives && user.requestedTestDrives.length > 0 ? (
//             user.requestedTestDrives.map((testDrive) => (
//               <div key={testDrive._id} style={{ marginBottom: 20 }}>
//                 <Typography variant="subtitle1">Vehicle Requested for Test Drive: {testDrive.vehicle.model}</Typography>
//                 <Typography variant="subtitle1">Requested Date: {testDrive.requestedDate}</Typography>
//                 <Typography variant="subtitle1">Status: {testDrive.status}</Typography>
//               </div>
//             ))
//           ) : (
//             <Typography>No requested test drives.</Typography>
//           )}
//           </div>
//       {user.isExpert && (
//         <div style={{ marginTop: 40 }}>
//           <Typography variant="h6" gutterBottom>Inspected Vehicles:</Typography>
//           {user.inspectedVehicles && user.inspectedVehicles.length > 0 ? (
//             user.inspectedVehicles.map((inspection) => (
//               <div key={inspection._id} style={{ marginBottom: 10 }}>
//                 <Typography>{inspection.brand} {inspection.model} ✅</Typography>
//               </div>
//             ))
//           ) : (
//             <Typography>No inspected vehicles.</Typography>
//           )}
//         </div>
//       )}
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ViewIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const id = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);
  const navigate = useNavigate();
  const handleViewVehicle =  async  (vehicleId) => {
    navigate(`/vehicle/${vehicleId}`)
  };

  if (!user) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div style={{ padding: '3%' }}>
        <Typography variant="h4" gutterBottom>User Profile</Typography>
        <Typography variant="h6" gutterBottom>Name: {user.name}</Typography>
        <Typography variant="h6" gutterBottom>Email: {user.email}</Typography>
        <Typography variant="h6" gutterBottom>Expert: {user.isExpert ? 'Yes' : 'No'}</Typography>
      </div>

      <div style={{ padding: '3% 10%' }}>
        <div style={{ marginTop: 20 }}>
          <Typography variant="h6" gutterBottom>Added Vehicles:</Typography>
          {user.addedVehicles && user.addedVehicles.length > 0 ? (
            user.addedVehicles.map((vehicle) => (
              <div key={vehicle._id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Typography>{vehicle.manufacturer} {vehicle.model}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ViewIcon />}
                  onClick={() => handleViewVehicle(vehicle._id)}
                  style={{ marginLeft: 10 }}
                >
                  View Vehicle
                </Button>
              </div>
            ))
          ) : (
            <Typography>No vehicles added yet.</Typography>
          )}
        </div>

        <div style={{ marginTop: 40 }}>
          <Typography variant="h6" gutterBottom>Requested Test Drives:</Typography>
          {user.requestedTestDrives && user.requestedTestDrives.length > 0 ? (
            user.requestedTestDrives.map((testDrive) => (
              <div key={testDrive._id} style={{ marginBottom: 20 }}>
                <Typography variant="subtitle1">Vehicle Requested for Test Drive: {testDrive.vehicle.model}</Typography>
                <Typography variant="subtitle1">Requested Date: {testDrive.requestedDate}</Typography>
                <Typography variant="subtitle1">Status: {testDrive.status}</Typography>
              </div>
            ))
          ) : (
            <Typography>No requested test drives.</Typography>
          )}
        </div>

        {user.isExpert && (
          <div style={{ marginTop: 40 }}>
            <Typography variant="h6" gutterBottom>Inspected Vehicles:</Typography>
            {user.inspectedVehicles && user.inspectedVehicles.length > 0 ? (
              user.inspectedVehicles.map((inspection) => (
                <div key={inspection._id} style={{ marginBottom: 10 }}>
                  <Typography>{inspection.brand} {inspection.model} ✅</Typography>
                </div>
              ))
            ) : (
              <Typography>No inspected vehicles.</Typography>
            )}
          </div>)}
        {/* )} */}
      
    </div>
    </div>
  );
};

export default UserProfilePage;

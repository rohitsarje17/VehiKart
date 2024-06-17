// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import ViewIcon from '@mui/icons-material/Visibility';
// import { useNavigate } from 'react-router';

// const UserProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [pendingTestDrives, setPendingTestDrives] = useState([]);
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

//     const fetchPendingTestDrives = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/testdrive/pending');
//         setPendingTestDrives(response.data.pendingTestDrives);
//       } catch (error) {
//         console.error('Error fetching pending test drives:', error);
//       }
//     };

//     fetchUserProfile();
//     fetchPendingTestDrives(); // Fetch pending test drives
//   }, [id]);
  
//   const navigate = useNavigate();

//   const handleViewVehicle = async (vehicleId) => {
//     navigate(`/vehicle/${vehicleId}`);
//   };

//   if (!user) {
//     return <Typography variant="h4">Loading...</Typography>;
//   }

//   return (
//     <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
//       <div style={{ padding: '3%' }}>
//         <Typography variant="h4" gutterBottom>User Profile</Typography>
//         <Typography variant="h6" gutterBottom>Name: {user.name}</Typography>
//         <Typography variant="h6" gutterBottom>Email: {user.email}</Typography>
//         <Typography variant="h6" gutterBottom>Expert: {user.isExpert ? 'Yes' : 'No'}</Typography>
//       </div>

//       <div style={{ padding: '3% 10%' }}>
//         <div style={{ marginTop: 20 }}>
//           <Typography variant="h6" gutterBottom>Added Vehicles:</Typography>
//           {user.addedVehicles?.length > 0 ? (
//             user.addedVehicles.map((vehicle) => (
//               <div key={vehicle._id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
//                 <Typography>{vehicle.manufacturer} {vehicle.model}</Typography>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   startIcon={<ViewIcon />}
//                   onClick={() => handleViewVehicle(vehicle._id)}
//                   style={{ marginLeft: 10 }}
//                 >
//                   View Vehicle
//                 </Button>
//               </div>
//             ))
//           ) : (
//             <Typography>No vehicles added yet.</Typography>
//           )}
//         </div>

//         <div style={{ marginTop: 40 }}>
//           <Typography variant="h6" gutterBottom>Requested Test Drives:</Typography>
//           {user.requestedTestDrives?.length > 0 ? (
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
//         </div>

//         <div style={{ marginTop: 40 }}>
//           <Typography variant="h6" gutterBottom>Pending Test Drives:</Typography>
//           {pendingTestDrives?.length > 0 ? (
//             pendingTestDrives.map((testDrive) => (
//               <div key={testDrive._id} style={{ marginBottom: 20 }}>
//                 <Typography variant="subtitle1">User: {testDrive.user.name}</Typography>
//                 <Typography variant="subtitle1">Vehicle: {testDrive.vehicle.model}</Typography>
//                 <Typography variant="subtitle1">Requested Date: {testDrive.requestedDate}</Typography>
//               </div>
//             ))
//           ) : (
//             <Typography>No pending test drives.</Typography>
//           )}
//         </div>

//         {user.isExpert && (
//           <div style={{ marginTop: 40 }}>
//             <Typography variant="h6" gutterBottom>Inspected Vehicles:</Typography>
//             {user.inspectedVehicles?.length > 0 ? (
//               user.inspectedVehicles.map((inspection) => (
//                 <div key={inspection._id} style={{ marginBottom: 10 }}>
//                   <Typography>{inspection.brand} {inspection.model} ✅</Typography>
//                 </div>
//               ))
//             ) : (
//               <Typography>No inspected vehicles.</Typography>
//             )}
//         </div>
//           )}
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import ViewIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false); // Modal state
  const [testDriveDetails, setTestDriveDetails] = useState(null); // Test drive details for the modal
  const [pendingTestDrives, setPendingTestDrives] = useState([]);
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
      const fetchPendingTestDrives = async () => {
      try {
        const response = await axios.get('http://localhost:5000/testdrive/pending');
        setPendingTestDrives(response.data.pendingTestDrives);
      } catch (error) {
        console.error('Error fetching pending test drives:', error);
      }
    };

    fetchUserProfile();
    fetchPendingTestDrives();
  }, [id]);

  const navigate = useNavigate();

  // Function to handle opening the modal and fetching test drive details
  const handleOpenModal = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/testdrive/${id}`);
      setTestDriveDetails(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching test drive details:', error);
    }
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpen(false);
    setTestDriveDetails(null);
  };

  if (!user) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  const StyledBox = styled(Box)({
    padding: '20px',
    margin: '20px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  });


  const handleAcceptTestDrive = async (testDriveId) => {
    try {
      const response = await axios.put(`http://localhost:5000/testdrive/${testDriveId}/accept`);
      alert('Test Drive accepted');
    } catch (error) {
      console.error('Error accepting test drive:', error);
      alert('Failed to accept test drive');
    }
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' ,justifyContent: 'center' }}>
      <div style={{ padding: '3% 10%' }}>
      <StyledBox>
        {/* User Information */}
        <Typography variant="h4" gutterBottom>User Profile</Typography>
        <Typography variant="h6" gutterBottom>Name: {user.name}</Typography>
        <Typography variant="h6" gutterBottom>Email: {user.email}</Typography>
        <Typography variant="h6" gutterBottom>Expert: {user.isExpert ? 'Yes' : 'No'}</Typography>
        </StyledBox>
        {user.isExpert && (
          <StyledBox>
        <div style={{ marginTop: '40' }}>
            <Typography variant="h6" gutterBottom>Pending Test Drives:</Typography>
           {pendingTestDrives?.length > 0 ? (
             pendingTestDrives.map((testDrive) => (
               <div key={testDrive._id} style={{ marginBottom: 20 }}>
                 <Typography variant="subtitle1">User: {testDrive.user.name}</Typography>
                 <Typography variant="subtitle1">Vehicle: {testDrive.vehicle.model}</Typography>
                 <Typography variant="subtitle1">Requested Date: {testDrive.requestedDate}</Typography>
                 <Button
              variant="contained"
              color="primary"
              onClick={() => handleAcceptTestDrive(testDrive._id)}
            >
              Accept Test Drive
            </Button>
               </div>
             ))
           ) : (
             <Typography>No pending test drives.</Typography>
           )}
         </div></StyledBox>)
        }
        </div>
        {/* Added Vehicles Section */}
        <div>
        <div style={{ marginTop: 20 }}>
        <StyledBox>
          <Typography variant="h6" gutterBottom>Added Vehicles:</Typography>
          {user.addedVehicles?.length > 0 ? (
            user.addedVehicles.map((vehicle) => (
              <div key={vehicle._id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Typography>{vehicle.manufacturer} {vehicle.model}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ViewIcon />}
                  onClick={() => navigate(`/vehicle/${vehicle._id}`)}
                  style={{ marginLeft: 10 }}
                >
                  View Vehicle
                </Button>
              </div>
            ))
          ) : (
            <Typography>No vehicles added yet.</Typography>
          )}</StyledBox>
        </div>

        {/* Requested Test Drives Section */}
        <div style={{ marginTop: 40 }}>
        <StyledBox>
          <Typography variant="h6" gutterBottom>Requested Test Drives:</Typography>
          {user.requestedTestDrives?.length > 0 ? (
            user.requestedTestDrives.map((testDrive) => (
              <div key={testDrive._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <Typography variant="subtitle1">Vehicle Requested for Test Drive: {testDrive.vehicle.model}</Typography>
                  <Typography variant="subtitle1">Requested Date: {testDrive.requestedDate}</Typography>
                  <Typography variant="subtitle1">Status: {testDrive.status}</Typography>
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ViewIcon />}
                  onClick={() => handleOpenModal(testDrive._id)}
                >
                  View Test Drive
                </Button>
              </div>
            ))
          ) : (
            <Typography>No requested test drives.</Typography>
          )}

          {/* Modal for Test Drive Details */}
          <Dialog open={open} onClose={handleCloseModal}>
            <DialogTitle>Test Drive Details</DialogTitle>
            <DialogContent>
              {testDriveDetails ? (
                <>
                  <Typography>Vehicle: {testDriveDetails.vehicle.manufacturer} {testDriveDetails.vehicle.model}</Typography>
                  <Typography>{testDriveDetails.requester.name}</Typography>
                  <Typography>Requested Date: {testDriveDetails.requestedDate}</Typography>
                  <Typography>Status: {testDriveDetails.status}</Typography>
                </>
              ) : (
                <Typography>Loading...</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">Close</Button>
            </DialogActions>
          </Dialog></StyledBox>
        </div>

        {/* Inspected Vehicles Section */}
        {user.isExpert && (
          <div style={{ marginTop: 40 }}>
          <StyledBox>
            <Typography variant="h6" gutterBottom>Inspected Vehicles:</Typography>
            {user.inspectedVehicles?.length > 0 ? (
              user.inspectedVehicles.map((inspection) => (
                <div key={inspection._id} style={{ marginBottom: 10 }}>
                  <Typography>{inspection.brand} {inspection.model} ✅</Typography>
                </div>
              ))
            ) : (
              <Typography>No inspected vehicles.</Typography>
            )}
            </StyledBox>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;



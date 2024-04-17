import express from 'express';
import {
  requestTestDrive,
  acceptTestDrive,
  getPendingTestDrives,
  getTestDriveById,
  getUserRequestedTestDrives
} from '../controllers/testDriveController';


const testDriveRouter = express.Router();

testDriveRouter.post('/request', requestTestDrive); 
testDriveRouter.put('/:id/accept', acceptTestDrive); 
testDriveRouter.get('/pending', getPendingTestDrives);
testDriveRouter.get('/:id', getTestDriveById); 
testDriveRouter.get('/user/:userId', getUserRequestedTestDrives); 
export default testDriveRouter;

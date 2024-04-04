
import express from 'express';
import {
  requestTestDrive,
  acceptTestDrive,
  getPendingTestDrives
} from '../controllers/testDriveController';


const testDriveRouter = express.Router();

testDriveRouter.post('/request', requestTestDrive); 
testDriveRouter.put('/:id/accept', acceptTestDrive); 
testDriveRouter.get('/pending', getPendingTestDrives);


export default testDriveRouter;

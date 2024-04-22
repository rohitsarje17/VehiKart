import mongoose from 'mongoose';
import TestDrive from '../models/TestDrive';
import User from '../models/User';
import Vehicle from '../models/Vehicle';

export const requestTestDrive = async (req, res, next) => {
    const { vehicleId, requestedDate, userId } = req.body;

    let existingUser;
    let existingVehicle;

    try {
        existingUser = await User.findById(userId);
        existingVehicle = await Vehicle.findById(vehicleId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!existingVehicle) {
        return res.status(400).json({ message: "Vehicle not found" });
    }

    if (!existingUser) {
        return res.status(400).json({ message: "User not found" });
    }

    let testDrive;
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        testDrive = new TestDrive({ user: userId, vehicle: vehicleId, requestedDate: new Date(requestedDate) });

        existingUser.requestedTestDrives.push(testDrive);
        // existingVehicle.requestedTestDrives.push(testDrive);

        await existingUser.save({ session });
        // await existingVehicle.save({ session });
        await testDrive.save({ session });

        await session.commitTransaction();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!testDrive) {
        return res.status(500).json({ message: "Unable to create a test drive request" });
    }

    return res.status(201).json({ testDrive });
};


export const acceptTestDrive = async (req, res, next) => {
  const { id } = req.params;

  let testDrive;

  try {
      testDrive = await TestDrive.findById(id);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!testDrive) {
      return res.status(404).json({ message: "Test drive request not found" });
  }

  testDrive.status = "Confirmed";

  try {
      await testDrive.save();
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(200).json({ message: "Test drive request accepted successfully", testDrive });
};


export const getPendingTestDrives = async (req, res) => {
    try {

      const pendingTestDrives = await TestDrive.find({ status: "Pending" })
        .populate("user") 
        .populate("vehicle"); 
  
      res.status(200).json({ pendingTestDrives });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getUserRequestedTestDrives = async (req, res, next) => {
    const userId = req.params.userId;
  
    try {
   
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
   
      await user.populate('requestedTestDrives').execPopulate();
  

      const requestedTestDrives = user.requestedTestDrives;
  
      return res.status(200).json({ requestedTestDrives });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const getTestDriveById = async (req, res) => {
    const testDriveId = req.params.id;
  
    try {
      const testDrive = await TestDrive.findById(testDriveId)
        .populate({
          path: "user",
          select: "name email contactNumber"
        })
        .populate({
          path: "vehicle",
          select: "manufacturer model location contactNumber photos"
        });
  
      if (!testDrive) {
        return res.status(404).json({ message: "Test drive not found" });
      }
  
      const response = {
        requester: {
          name: `Requester - ${testDrive.user.name}`,
          email: testDrive.user.email,
          contactNumber: testDrive.user.contactNumber
        },
        vehicle: {
          manufacturer: testDrive.vehicle.manufacturer,
          model: testDrive.vehicle.model,
          location: testDrive.vehicle.location,
          contactNumber: testDrive.vehicle.contactNumber,
          photos: testDrive.vehicle.photos
        },
        requestedDate: testDrive.requestedDate,
        status: testDrive.status
      };
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  
  
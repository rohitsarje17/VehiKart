import Vehicle from '../models/Vehicle';
import User from '../models/User';
import mongoose  from 'mongoose';
import {v2 as cloudinary} from 'cloudinary';
import fileUpload from 'express-fileupload';
import TestDrive from '../models/TestDrive';
          
cloudinary.config({ 
  cloud_name: 'djayfusym', 
  api_key: '423227749291446', 
  api_secret: 'NJNSVbW8x_ENyk-2KxbzkfNGMzI' 
});


export const addVehicle = async (req, res) => {
  try {
    const {
        manufacturer,
        model,
        year,
        mileage,
        price,
        location,
        userId,
        contactNumber
    } = req.body;

    const files = req.files.photos;

   
    const uploadedPhotos = await Promise.all(files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        return result.url;
    }));

    const newVehicle = new Vehicle({
        manufacturer,
        model,
        year,
        mileage,
        price,
        owner: userId,
        location,
        contactNumber,
        photos: uploadedPhotos,
    });

 
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
       
        const savedVehicle = await newVehicle.save({ session });

     
        const existingUser = await User.findById(userId);
        existingUser.addedVehicles.push(savedVehicle);
        await existingUser.save({ session });

       
        await session.commitTransaction();

        res.status(201).json(savedVehicle);
    } catch (error) {

        await session.abortTransaction();
        throw error; 
    } finally {
       
        session.endSession();
    }
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate({
      path: "owner",
      select: "name"
    })
    .populate({
      path:"inspectedBy",
      select:"name",
    });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateVehicle = async (req, res) => {
    try {
      const vehicleId = req.params.id;
      const userId = req.body.userId;
      
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
   
      if (vehicle.owner.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update this vehicle' });
      }
  
      const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, req.body, { new: true });
      res.status(200).json(updatedVehicle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  export const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
  
      const vehicle = await Vehicle.findById(id);
      if (!vehicle) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Vehicle not found' });
      }
 
      const testDrives = await TestDrive.find({ vehicle: id });
  

      await TestDrive.deleteMany({ vehicle: id }, { session });
        const usersWhoInspected = await User.find({ inspectedVehicles: id });
  
   
      await Promise.all(
        usersWhoInspected.map(async (user) => {
          user.inspectedVehicles = user.inspectedVehicles.filter(
            (vehicleId) => vehicleId.toString() !== id
          );
          await user.save({ session });
        })
      );
  
      await User.updateMany(
        { requestedTestDrives: id },
        { $pull: { requestedTestDrives: id } },
        { session }
      );
  
    
      await Vehicle.findByIdAndDelete(id, { session });
  
      await session.commitTransaction();
  
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  
  export const updateVehicleReview = async (req, res) => {
    // const { vehicleId } = req.params.id;
    const { reviews , userId} = req.body;

    try {
      const vehicle = await Vehicle.findById(req.params.id)
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        const user = await User.findById(userId);

        if (!user.isExpert) {
            return res.status(403).json({ message: "You are not a expert" });
        }
        if (vehicle.inspectedBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this review" });
        }

        vehicle.reviews = reviews;
        await vehicle.save();
        
        return res.status(200).json({ message: "Review updated successfully", vehicle });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const markVehicleAsInspected = async (req, res) => {
  try {
    const vehicleId= req.params.id;
    const { userId } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.isInspected = true;
    vehicle.inspectedBy = userId;
    await vehicle.save({ session });

    const user = await User.findById(userId);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }

    user.inspectedVehicles.push(vehicle);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Vehicle marked as inspected", vehicle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


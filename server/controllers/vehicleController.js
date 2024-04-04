
import Vehicle from '../models/Vehicle';


export const addVehicle = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      mileage,
      price,
      predictedPrice,
      owner,
      location,
      photos,
      reviews
    } = req.body;

    const newVehicle = new Vehicle({
      brand,
      model,
      year,
      mileage,
      price,
      predictedPrice,
      owner,
      location,
      photos,
      reviews
    });

    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
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
    const vehicle = await Vehicle.findById(req.params.id);
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
      const userId = req.user.id;
      
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
    try {
      const vehicleId = req.params.id;
      const userId = req.user.id; 
      
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  

      if (vehicle.owner.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this vehicle' });
      }
  
      await Vehicle.findByIdAndDelete(vehicleId);
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateVehicleReview = async (req, res) => {
    const { vehicleId } = req.params;
    const { review } = req.body;

    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

     
        if (req.user.isExpert) {

            vehicle.review = review;
            await vehicle.save();
            return res.status(200).json({ message: "Review updated successfully", vehicle });
        } else {
            return res.status(403).json({ message: "You are not authorized to update this review" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

import Vehicle from '../models/Vehicle';
import User from '../models/User';

export const markVehicleAsInspected = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { userId } = req.user; 

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.isInspected = true;
    vehicle.inspectedBy = userId; 
    await vehicle.save();

   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.inspections.push(vehicleId);
    await user.save();

    res.status(200).json({ message: "Vehicle marked as inspected", vehicle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

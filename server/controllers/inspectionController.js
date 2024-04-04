import Vehicle from '../models/Vehicle';

export const markVehicleAsInspected = async (req, res) => {
    try {
      const { vehicleId } = req.params;
  
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
  
      vehicle.isInspected = true;
      await vehicle.save();
  
      res.status(200).json({ message: "Vehicle marked as inspected", vehicle });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
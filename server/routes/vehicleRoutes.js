import express from 'express';
import {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  updateVehicleReview,
  markVehicleAsInspected,
} from '../controllers/vehicleController';

const vehicleRouter = express.Router();


vehicleRouter.post('/', addVehicle);

vehicleRouter.get('/', getAllVehicles);

vehicleRouter.get('/:id', getVehicleById);

vehicleRouter.put('/:id', updateVehicle);

vehicleRouter.delete('/:id', deleteVehicle);

vehicleRouter.put("/review/:id", updateVehicleReview);

vehicleRouter.put("/inspect/:id", markVehicleAsInspected);

export default vehicleRouter;

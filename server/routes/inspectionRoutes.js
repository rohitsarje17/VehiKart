
import express from "express";
import { markVehicleAsInspected } from "../controllers/vehicleController";


const router = express.Router();


router.put("/:vehicleId/inspect", markVehicleAsInspected);


export default router;

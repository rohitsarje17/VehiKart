
import TestDrive from "../models/TestDrive";

export const requestTestDrive = async (req, res) => {
  try {
    const { user, vehicle, requestedDate } = req.body;

 
    const testDrive = new TestDrive({ user, vehicle, requestedDate });

    await testDrive.save();

    res.status(201).json({ message: "Test drive requested successfully", testDrive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const acceptTestDrive = async (req, res) => {
  try {
    const { id } = req.params;

    const testDrive = await TestDrive.findById(id);
    if (!testDrive) {
      return res.status(404).json({ message: "Test drive request not found" });
    }

    testDrive.status = "Confirmed";
    await testDrive.save();

    res.status(200).json({ message: "Test drive request accepted successfully", testDrive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

  
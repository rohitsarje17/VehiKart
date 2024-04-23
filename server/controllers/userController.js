import bcrypt from "bcryptjs";
import User from "../models/User";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signup = async (req, res, next) => {
  const { name, email, password ,phoneNumber , isExpert} = req.body;
  try {
 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, phoneNumber ,  password: hashedPassword ,isExpert});
    await newUser.save();

    return res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export  const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    return res.status(200).json({ message: "Login successful", user });;

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, isExpert , phoneNumber } = req.body; // Include isExpert in the request body
  try {
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateFields = { name, email,phoneNumber, ...(password && { password: hashedPassword }) };
    
    if (isExpert !== undefined) {
      updateFields.isExpert = isExpert;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateFields, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
      let user = await User.findById(id)
                             .populate({
                                path: "addedVehicles",
                                select: "manufacturer model photos",
                            
                             })
                             .populate({
                                path: "requestedTestDrives",
                                populate: {
                                  path: "vehicle",
                                  select: "manufacturer model photos"
                                }
                               });

                               if (user && user.isExpert) {

                                user = await User.populate(user, {
                                  path: "inspectedVehicles"
                                });
                              }
                            

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};




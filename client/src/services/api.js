import axios from 'axios';

axios.defaults.baseURL="http://localhost:5000"

export const signup = async (userData) => {                  //userData should have name,email,password,isExpert
    try {
      const response = await axios.post('/user/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  export const login = async (userData) => {                 //userData : email,password
    try {
      const response = await axios.post('/user/login', userData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  export const updateUser = async (id, userData) => {         //id : userId of User whose data is to be updated , userData:name, email, password, isExpert
    try {
      const response = await axios.put(`/user/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  export const deleteUser = async (id) => {                  //id: userID of user whose data is to be deleted.
    try {
      const response = await axios.delete(`/user/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  export const getAllUsers = async () => {
    try {
      const response = await axios.get('/user');
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  
  export const getUserById = async (id) => {     //id: userId (returns user info , added vehicles , requestedTestdrives and inspectedVehicles(only when user is expert))
    try {
      const response = await axios.get(`/user/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

export const addVehicle = async (vehicleData) => {   //vehicleData:manufacturer,model,year,mileage,price,location,photos,userId(who is adding car),contactNumber
  try {
    const response = await axios.post('/vehicle', vehicleData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const markVehicleAsInspected = async (id, userId) => {  //id: id of the vehicle , userId of the Expert i.e currentlylogged in user
    try {
      const response = await axios.put(`/vehicle/inspect/${id}`, { userId });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

export const getAllVehicles = async () => {
  try {
    const response = await axios.get('/vehicle');
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getVehicleById = async (id) => {
  try {
    const response = await axios.get(`/vehicle/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await axios.put(`/vehicle/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await axios.delete(`/vehicle/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateVehicleReview = async (id, reviewData) => {    //id:vehicleId , reviewData : review (string)
  try {
    const response = await axios.put(`/vehicle/review/${id}`, reviewData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};


export const requestTestDrive = async (testDriveData) => {
    try {
      const response = await axios.post('/testdrive/request', testDriveData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  export const acceptTestDrive = async (id) => {
    try {
      const response = await axios.put(`/testdrive/${id}/accept`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  export const getPendingTestDrives = async () => {
    try {
      const response = await axios.get('/testdrive/pending');
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  export const getTestDriveById = async (id) => {
    try {
      const response = await axios.get(`/testdrive/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  export const getUserRequestedTestDrives = async (userId) => {
    try {
      const response = await axios.get(`/testdrive/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  
  
  
  
  
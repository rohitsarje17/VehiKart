import './App.css';
import LandingPage from './Pages/LandingPage';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignIn from './Pages/Signup.js';
import ListingPage from './Pages/ListingPage.js';
import PrimarySearchAppBar from './components/navbar.js';
import Sell from './Pages/Sell.js';
import Details from './Pages/Details.js';
import CreateUser from './Pages/CreateUser.js';
import UserProfilePage from './Pages/Profile.js';
import VehicleDetailsPage from './Pages/VehicleDetailsPage.js';


function App() {
  return (
    <BrowserRouter>
    <PrimarySearchAppBar />
    <Routes>
    <Route element={<LandingPage />} path='/'></Route>
    <Route element={<SignIn />} path='/signup'></Route>
    <Route element={<ListingPage />} path='/viewVehicles'></Route>
    <Route element={<UserProfilePage />} path='/profile'></Route>
    <Route element={<Sell />} path='/sell'></Route>
    <Route element={<VehicleDetailsPage />} path='/vehicle/:id'></Route>
    <Route element={<CreateUser />} path='/createAccount'></Route>



    </Routes>
    </BrowserRouter>
    
  );
}

export default App;

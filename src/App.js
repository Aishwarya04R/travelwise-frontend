import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPasswordUsername from './components/ForgotPasswordUsername';
import ForgotPasswordAnswer from './components/ForgotPasswordAnswer';
import ForgotPasswordNewPassword from './components/ForgotPasswordNewPassword';
import Packages from './components/Packages';
import PackageDetails from './components/PackageDetails';
import EditPackage from './components/EditPackage';
import MyBookings from './components/MyBookings';
import Hotels from './components/Hotels';
import HotelDetails from './components/HotelDetails';
import EditHotel from './components/EditHotel';
import HotelBooking from './components/HotelBooking';
import AdminDashboard from './components/AdminDashboard';
import CheckoutPage from './components/CheckoutPage';
import ItineraryPlanner from './components/ItineraryPlanner';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { useAuth } from './context/AuthContext'; // <-- 1. IMPORT THIS
import SOSButton from './components/SOSButton';   // <-- 2. IMPORT THIS
import DreamCatcher from './components/DreamCatcher';


function App() {
  const { user } = useAuth(); // <-- 3. GET THE CURRENT USER

  return (
    <div>
      <Header />
      {/* Conditionally render the SOS button only if the user is logged in */}
      {user && <SOSButton />} 
      <main>
        <Routes>
          {/* ... (all your existing routes) ... */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<div className="form-page-container"><Register /></div>} />
          <Route path="/login" element={<div className="form-page-container"><Login /></div>} />
          <Route path="/forgot-password" element={<div className="form-page-container"><ForgotPasswordUsername /></div>} />
          <Route path="/forgot-password/answer" element={<div className="form-page-container"><ForgotPasswordAnswer /></div>} />
          <Route path="/forgot-password/new" element={<div className="form-page-container"><ForgotPasswordNewPassword /></div>} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/edit-package/:id" element={<EditPackage />} />
          <Route path="/admin/edit-hotel/:id" element={<EditHotel />} />
          <Route path="/plan-trip" element={<ItineraryPlanner />} />
          <Route path="/dream-trip" element={<DreamCatcher />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;


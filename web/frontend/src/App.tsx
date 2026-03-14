import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FoodProvider } from './context/FoodContext';
import { DonationProvider } from './context/DonationContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import MapPage from './pages/MapPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import GiverListings from './pages/giver/GiverListings';
import SharerImpact from './pages/sharer/SharerImpact';
import DonorDashboard from './pages/donor/DonorDashboard';

function App() {
  return (
    <AuthProvider>
      <FoodProvider>
        <DonationProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/giver/listings" element={<GiverListings />} />
                  <Route path="/sharer/impact" element={<SharerImpact />} />
                  <Route path="/donor/dashboard" element={<DonorDashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </DonationProvider>
      </FoodProvider>
    </AuthProvider>
  );
}

export default App;
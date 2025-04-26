import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChefHat, Heart, Users, Target, Pi as Pie, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-24"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Plateful</h1>
        
        <div className="card mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Plateful is dedicated to creating a sustainable, equitable food ecosystem across India. 
            We connect food providers who have excess food with NGOs that distribute meals to those in need,
            while offering transparent impact tracking for donors who support our mission.
          </p>
          
          <p className="text-gray-700">
            In a country where millions face hunger daily while tons of perfectly good food goes to waste,
            we believe technology can bridge this gap and create a more efficient distribution system
            that benefits everyone involved.
          </p>
        </div>
        
        <div className="card mb-12">
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <ChefHat size={30} className="text-secondary-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Step 1: Plate Givers</h3>
              <p className="text-gray-600">
                Restaurants, cafes, and grocery stores list their excess food on our platform with details about quantity, type, and expiry.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <Heart size={30} className="text-primary-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Step 2: Plate Sharers</h3>
              <p className="text-gray-600">
                Verified NGOs view available food on our real-time map and request pickups from nearby providers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Users size={30} className="text-yellow-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Step 3: Donors</h3>
              <p className="text-gray-600">
                Donors support verified NGOs financially and track exactly how their contributions create impact through reports and photos.
              </p>
            </div>
          </div>
        </div>
        
        <div className="card mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-primary-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Pie size={36} className="text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-primary-700">1,500+</h3>
              <p className="text-primary-800">Meals Shared</p>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Target size={36} className="text-secondary-500" />
              </div>
              <h3 className="text-xl font-bold text-secondary-700">350+</h3>
              <p className="text-secondary-800">People Impacted</p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp size={36} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-yellow-700">₹50,000+</h3>
              <p className="text-yellow-800">Donated</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">
            Since our inception, Plateful has been working tirelessly to bridge the gap between food waste and hunger.
            Through the generosity of our food providers and donors, we've been able to make a meaningful difference
            in communities across India.
          </p>
          
          <p className="text-gray-700">
            Our goal is to create a sustainable ecosystem where no good food goes to waste and everyone has access 
            to nutritious meals, regardless of their economic situation.
          </p>
        </div>
        
        <div className="card text-center">
          <h2 className="text-2xl font-semibold mb-6">Join Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Whether you're a restaurant with excess food, an NGO serving those in need, or someone who wants to support
            this cause, we invite you to become part of the Plateful community.
          </p>
          
          <Link to="/register" className="btn btn-primary mx-auto inline-block">
            Join Plateful Today
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
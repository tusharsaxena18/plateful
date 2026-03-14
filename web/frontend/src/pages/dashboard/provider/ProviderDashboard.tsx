import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle, Package, MapPin, Clock, CalendarClock } from 'lucide-react';
import FoodCard from '../../../components/food/FoodCard';
import { FoodListing } from '../../../types/food';
import { useAuth } from '../../../contexts/AuthContext';

// Mock data
const mockFoodListings: FoodListing[] = [
  {
    id: 'food-1',
    providerId: 'provider-1',
    providerName: 'Campus Dining Hall',
    title: 'Leftover Pasta and Salad',
    description: 'Vegetarian pasta with tomato sauce and garden salad from lunch service. Well preserved and refrigerated.',
    foodType: 'cooked',
    quantity: 20,
    unit: 'servings',
    expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    location: {
      address: '123 University Ave, College Town',
      lat: 40.7128,
      lng: -74.0060,
    },
    images: ['https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    perishability: 7,
    dietaryInfo: ['vegetarian'],
    estimatedMeals: 20,
  },
  {
    id: 'food-2',
    providerId: 'provider-1',
    providerName: 'Campus Dining Hall',
    title: 'Fresh Fruit and Vegetables',
    description: 'Assorted fruits and vegetables including apples, oranges, carrots, and celery. Perfect for healthy snacks.',
    foodType: 'raw',
    quantity: 10,
    unit: 'kg',
    expiryTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    location: {
      address: '123 University Ave, College Town',
      lat: 40.7128,
      lng: -74.0060,
    },
    images: ['https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    perishability: 5,
    dietaryInfo: ['vegan', 'gluten-free'],
    estimatedMeals: 15,
  },
  {
    id: 'food-3',
    providerId: 'provider-1',
    providerName: 'Campus Dining Hall',
    title: 'Rice and Curry',
    description: 'Leftover rice and vegetable curry. Well packaged and still warm.',
    foodType: 'cooked',
    quantity: 15,
    unit: 'servings',
    expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
    location: {
      address: '123 University Ave, College Town',
      lat: 40.7128,
      lng: -74.0060,
    },
    images: ['https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    status: 'reserved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    perishability: 8,
    dietaryInfo: ['vegetarian'],
    estimatedMeals: 15,
  }
];

const ProviderDashboard: React.FC = () => {
  const [foodListings, setFoodListings] = useState<FoodListing[]>([]);
  const [upcomingPickups, setUpcomingPickups] = useState<any[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      // In a real app, this would be an API call
      setFoodListings(mockFoodListings);
      setUpcomingPickups([
        {
          id: 'pickup-1',
          listingId: 'food-3',
          ngoId: 'ngo-1',
          ngoName: 'Food First Foundation',
          status: 'approved',
          pickupTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
          createdAt: new Date().toISOString(),
          foodTitle: 'Rice and Curry',
        }
      ]);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-800 mb-2">Welcome back, {currentUser?.name}</h1>
        <p className="text-neutral-600">
          Your contribution is making a difference in reducing food waste.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/provider/add-listing"
            className="card flex items-center gap-4 hover:shadow-elevated transition-shadow bg-primary-50 border border-primary-100"
          >
            <div className="bg-primary-600 p-3 rounded-full text-white">
              <PlusCircle size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-primary-800">Add New Food Listing</h3>
              <p className="text-primary-600">List your surplus food for NGOs to collect</p>
            </div>
          </Link>

          <Link
            to="/provider/listings"
            className="card flex items-center gap-4 hover:shadow-elevated transition-shadow bg-secondary-50 border border-secondary-100"
          >
            <div className="bg-secondary-600 p-3 rounded-full text-white">
              <Package size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-800">Manage Listings</h3>
              <p className="text-secondary-600">View and manage your food listings</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Impact Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="text-3xl font-bold text-primary-700">43</h3>
            <p className="text-primary-600">Meals Saved</p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg">
            <h3 className="text-3xl font-bold text-secondary-700">12</h3>
            <p className="text-secondary-600">Listings Created</p>
          </div>
          <div className="bg-accent-50 p-4 rounded-lg">
            <h3 className="text-3xl font-bold text-accent-700">7</h3>
            <p className="text-accent-600">NGOs Helped</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="text-3xl font-bold text-neutral-700">21kg</h3>
            <p className="text-neutral-600">CO₂ Saved</p>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Pickups */}
      {upcomingPickups.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Upcoming Pickups</h2>
          <div className="space-y-4">
            {upcomingPickups.map((pickup) => (
              <div key={pickup.id} className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-neutral-800">{pickup.foodTitle}</h3>
                    <div className="flex items-center text-neutral-600 mt-1">
                      <CalendarClock size={16} className="mr-2" />
                      <p>Pickup by {pickup.ngoName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-primary-600 bg-primary-50 px-3 py-1 rounded-full flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>
                        {new Date(pickup.pickupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Active Listings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Active Listings</h2>
          <Link
            to="/provider/listings"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </Link>
        </div>

        {foodListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodListings.map((listing, index) => (
              <FoodCard 
                key={listing.id} 
                listing={listing} 
                role="provider"
                delay={0.1 * index}
              />
            ))}
          </div>
        ) : (
          <div className="card bg-neutral-50 border border-neutral-200 text-center py-8">
            <h3 className="text-lg font-semibold text-neutral-700 mb-2">No Active Listings</h3>
            <p className="text-neutral-600 mb-4">You don't have any active food listings at the moment.</p>
            <Link to="/provider/add-listing" className="btn btn-primary inline-flex">
              <PlusCircle size={18} className="mr-2" />
              Add New Listing
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProviderDashboard;
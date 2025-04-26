import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FoodMap from '../components/common/FoodMap';
import FoodListingCard from '../components/common/FoodListingCard';
import { useFood } from '../context/FoodContext';
import { useAuth } from '../context/AuthContext';

const MapPage: React.FC = () => {
  const { foodListings, createRequest } = useFood();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'cooked' | 'raw'>('all');
  
  const filteredListings = foodListings
    .filter(listing => listing.status === 'available')
    .filter(listing => 
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.giverName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(listing => filterType === 'all' || listing.type === filterType);
  
  const handleRequest = (listingId: string) => {
    if (currentUser && currentUser.role === 'sharer') {
      createRequest(listingId, currentUser.id, currentUser.name);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-24"
    >
      <h1 className="text-3xl font-bold mb-8">Food Sharing Map</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FoodMap />
        </div>
        
        <div>
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Filter Listings</h2>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Type
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 rounded text-sm ${
                    filterType === 'all'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('cooked')}
                  className={`px-3 py-1 rounded text-sm ${
                    filterType === 'cooked'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  Cooked
                </button>
                <button
                  onClick={() => setFilterType('raw')}
                  className={`px-3 py-1 rounded text-sm ${
                    filterType === 'raw'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  Raw
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 overflow-y-auto max-h-[60vh]">
            {filteredListings.length > 0 ? (
              filteredListings.map(listing => (
                <FoodListingCard
                  key={listing.id}
                  listing={listing}
                  onRequest={() => handleRequest(listing.id)}
                  showRequest={currentUser?.role === 'sharer'}
                />
              ))
            ) : (
              <div className="card text-center py-8">
                <p className="text-gray-500">No available food listings found.</p>
                {currentUser?.role === 'giver' && (
                  <button
                    onClick={() => window.location.href = '/giver/listings'}
                    className="btn btn-primary mt-4"
                  >
                    Create a Listing
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapPage;
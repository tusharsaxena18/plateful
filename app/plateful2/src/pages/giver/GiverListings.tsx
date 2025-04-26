{/*import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFood } from '../../context/FoodContext';
import { useAuth } from '../../context/AuthContext';
import FoodListingCard from '../../components/common/FoodListingCard';
import FoodListingForm from '../../components/forms/FoodListingForm';

const GiverListings: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  const { getListingsByGiver, getRequestsForGiver, updateRequest } = useFood();
  
  // Handle the case where there's no authenticated user or user isn't a giver
  if (!currentUser || currentUser.role !== 'giver') {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="card">
          <p>You need to be logged in as a food provider to view this page.</p>
        </div>
      </div>
    );
  }
  
  const myListings = getListingsByGiver(currentUser.id);
  const myRequests = getRequestsForGiver(currentUser.id);
  
  const handleAcceptRequest = (requestId: string) => {
    updateRequest(requestId, 'accepted');
  };
  
  const handleRejectRequest = (requestId: string) => {
    updateRequest(requestId, 'rejected');
  };
  
  const handleCompleteRequest = (requestId: string) => {
    updateRequest(requestId, 'completed');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-24"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Food Listings</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : 'Add New Listing'}
        </button>
      </div>
      
      {showForm && (
        <div className="mb-8">
          <FoodListingForm onSuccess={() => setShowForm(false)} />
        </div>
      )}
      
      {myRequests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
          
          <div className="space-y-4">
            {myRequests.map(({ request, listing }) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{request.sharerName} has requested:</h3>
                    <p className="text-gray-700">{listing.description}</p>
                    <p className="text-sm text-gray-500">Quantity: {listing.quantity}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="btn btn-secondary"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="btn btn-outline"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    
                    {request.status === 'accepted' && (
                      <button
                        onClick={() => handleCompleteRequest(request.id)}
                        className="btn btn-primary"
                      >
                        Mark Completed
                      </button>
                    )}
                    
                    {request.status === 'completed' && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                        Completed
                      </span>
                    )}
                    
                    {request.status === 'rejected' && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h2 className="text-xl font-semibold mb-4">My Active Listings</h2>
        
        {myListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map(listing => (
              <FoodListingCard key={listing.id} listing={listing} showRequest={false} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-8">
            <p className="text-gray-500">You don't have any food listings yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary mt-4"
            >
              Create Your First Listing
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GiverListings;*/}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFood } from '../../context/FoodContext';
import { useAuth } from '../../context/AuthContext';
import FoodListingCard from '../../components/common/FoodListingCard';
import FoodListingForm from '../../components/forms/FoodListingForm';

const GiverListings: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  const { getListingsByGiver, getRequestsForGiver, updateRequest } = useFood();
  
  // ✅ Image upload is handled inside FoodListingForm — no need to manage it here
  
  if (!currentUser || currentUser.role !== 'giver') {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="card">
          <p>You need to be logged in as a food provider to view this page.</p>
        </div>
      </div>
    );
  }
  
  const myListings = getListingsByGiver(currentUser.id);
  const myRequests = getRequestsForGiver(currentUser.id);
  
  const handleAcceptRequest = (requestId: string) => {
    updateRequest(requestId, 'accepted');
  };
  
  const handleRejectRequest = (requestId: string) => {
    updateRequest(requestId, 'rejected');
  };
  
  const handleCompleteRequest = (requestId: string) => {
    updateRequest(requestId, 'completed');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-24"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Food Listings</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : 'Add New Listing'}
        </button>
      </div>
      
      {showForm && (
        <div className="mb-8">
          <FoodListingForm onSuccess={() => setShowForm(false)} />
        </div>
      )}
      
      {myRequests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
          
          <div className="space-y-4">
            {myRequests.map(({ request, listing }) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{request.sharerName} has requested:</h3>
                    <p className="text-gray-700">{listing.description}</p>
                    <p className="text-sm text-gray-500">Quantity: {listing.quantity}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="btn btn-secondary"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="btn btn-outline"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    
                    {request.status === 'accepted' && (
                      <button
                        onClick={() => handleCompleteRequest(request.id)}
                        className="btn btn-primary"
                      >
                        Mark Completed
                      </button>
                    )}
                    
                    {request.status === 'completed' && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                        Completed
                      </span>
                    )}
                    
                    {request.status === 'rejected' && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h2 className="text-xl font-semibold mb-4">My Active Listings</h2>
        
        {myListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map(listing => (
              <FoodListingCard key={listing.id} listing={listing} showRequest={false} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-8">
            <p className="text-gray-500">You don't have any food listings yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary mt-4"
            >
              Create Your First Listing
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GiverListings;

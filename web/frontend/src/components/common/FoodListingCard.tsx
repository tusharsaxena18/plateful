{/*import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { FoodListing } from '../../types';

interface FoodListingCardProps {
  listing: FoodListing;
  onRequest?: () => void;
  showRequest?: boolean;
  
}

const FoodListingCard: React.FC<FoodListingCardProps> = ({ listing, onRequest, showRequest = true }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusBadge = () => {
    switch (listing.status) {
      case 'available':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Available</span>;
      case 'requested':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Requested</span>;
      case 'claimed':
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Claimed</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">{listing.description}</h3>
        {getStatusBadge()}
      </div>
      
      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Tag size={16} className="mr-2 text-primary-500" />
          <span>{listing.type === 'cooked' ? 'Cooked Food' : 'Raw Ingredients'}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-primary-500" />
          <span>Expires: {formatDate(listing.expiry)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-2 text-primary-500" />
          <span>Posted: {formatDate(listing.createdAt)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-2 text-primary-500" />
          <span>{listing.giverName}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="font-medium">Quantity: {listing.quantity}</span>
        
        {showRequest && listing.status === 'available' && onRequest && (
          <button 
            onClick={onRequest} 
            className="btn btn-secondary"
          >
            Request
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default FoodListingCard;*/}
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { FoodListing } from '../../types';

interface FoodListingCardProps {
  listing: FoodListing;
  onRequest?: () => void;
  showRequest?: boolean;
}

const FoodListingCard: React.FC<FoodListingCardProps> = ({ listing, onRequest, showRequest = true }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusBadge = () => {
    switch (listing.status) {
      case 'available':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Available</span>;
      case 'requested':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Requested</span>;
      case 'claimed':
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Claimed</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card hover:shadow-lg transition-shadow"
    >
      {/* Conditionally render the image if it exists */}
      {listing.image && (
        <img
          src={listing.image}
          alt={listing.description}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      )}

      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">{listing.description}</h3>
        {getStatusBadge()}
      </div>

      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Tag size={16} className="mr-2 text-primary-500" />
          <span>{listing.type === 'cooked' ? 'Cooked Food' : 'Raw Ingredients'}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-primary-500" />
          <span>Expires: {formatDate(listing.expiry)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-2 text-primary-500" />
          <span>Posted: {formatDate(listing.createdAt)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-2 text-primary-500" />
          <span>{listing.giverName}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-medium">Quantity: {listing.quantity}</span>

        {showRequest && listing.status === 'available' && onRequest && (
          <button
            onClick={onRequest}
            className="btn btn-secondary"
          >
            Request
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default FoodListingCard;


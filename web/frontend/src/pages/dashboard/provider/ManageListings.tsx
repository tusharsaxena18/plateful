import React from 'react';
import { motion } from 'framer-motion';

const ManageListings = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-6">Manage Food Listings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Your food listings will appear here.</p>
      </div>
    </motion.div>
  );
};

export default ManageListings;
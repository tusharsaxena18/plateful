import React from 'react';
import { motion } from 'framer-motion';

const NgoDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">NGO Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard content will go here */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
          <p className="text-gray-600">
            Manage your food pickup requests and track your impact in reducing food waste.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NgoDashboard;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDonation } from '../../context/DonationContext';
import { useAuth } from '../../context/AuthContext';
import ImpactReportCard from '../../components/common/ImpactReportCard';
import ImpactReportForm from '../../components/forms/ImpactReportForm';

const SharerImpact: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  const { getImpactReportsBySharer, getTotalImpact, getTotalDonationAmount } = useDonation();
  
  // Handle the case where there's no authenticated user or user isn't a sharer
  if (!currentUser || currentUser.role !== 'sharer') {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="card">
          <p>You need to be logged in as an NGO to view this page.</p>
        </div>
      </div>
    );
  }
  
  const myReports = getImpactReportsBySharer(currentUser.id);
  const impactStats = getTotalImpact(currentUser.id);
  const totalDonations = getTotalDonationAmount(currentUser.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-24"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Impact Dashboard</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-secondary"
        >
          {showForm ? 'Cancel' : 'Create Impact Report'}
        </button>
      </div>
      
      {showForm && (
        <div className="mb-8">
          <ImpactReportForm onSuccess={() => setShowForm(false)} />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card bg-primary-50"
        >
          <h3 className="text-lg font-semibold text-primary-800 mb-2">Total Meals Served</h3>
          <p className="text-3xl font-bold text-primary-600">{impactStats.mealsServed}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card bg-secondary-50"
        >
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">People Impacted</h3>
          <p className="text-3xl font-bold text-secondary-600">{impactStats.peopleImpacted}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card bg-yellow-50"
        >
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Total Donations</h3>
          <p className="text-3xl font-bold text-yellow-600">₹{totalDonations}</p>
        </motion.div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Impact Reports</h2>
        
        {myReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myReports.map(report => (
              <ImpactReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-8">
            <p className="text-gray-500">You haven't created any impact reports yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-secondary mt-4"
            >
              Create Your First Report
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SharerImpact;
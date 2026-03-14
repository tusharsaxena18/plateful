import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDonation } from '../../context/DonationContext';
import { useAuth } from '../../context/AuthContext';
import { mockUsers } from '../../data/mockData';
import ImpactReportCard from '../../components/common/ImpactReportCard';
import DonationForm from '../../components/common/DonationForm';

const DonorDashboard: React.FC = () => {
  const [selectedSharer, setSelectedSharer] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const { getDonationsByDonor, impactReports } = useDonation();
  
  // Handle the case where there's no authenticated user or user isn't a donor
  if (!currentUser || currentUser.role !== 'donor') {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="card">
          <p>You need to be logged in as a donor to view this page.</p>
        </div>
      </div>
    );
  }
  
  const myDonations = getDonationsByDonor(currentUser.id);
  
  // Get NGOs that the donor has donated to
  const donatedSharerIds = new Set(myDonations.map(donation => donation.sharerId));
  const sharers = mockUsers.filter(user => user.role === 'sharer' && user.verified);
  
  // Get reports from NGOs the donor has supported
  const relevantReports = impactReports.filter(report => 
    donatedSharerIds.has(report.sharerId)
  );

  const handleSupportClick = (sharerId: string) => {
    setSelectedSharer(sharerId);
  };

  const handleDonationSuccess = () => {
    setSelectedSharer(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-24"
    >
      <h1 className="text-3xl font-bold mb-8">Your Donor Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
            
            {myDonations.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-primary-50 rounded-lg p-4 flex-1">
                    <h3 className="text-sm font-medium text-primary-600 mb-1">
                      Total Donated
                    </h3>
                    <p className="text-2xl font-bold text-primary-700">
                      ₹{myDonations.reduce((sum, donation) => sum + donation.amount, 0)}
                    </p>
                  </div>
                  
                  <div className="bg-secondary-50 rounded-lg p-4 flex-1">
                    <h3 className="text-sm font-medium text-secondary-600 mb-1">
                      Organizations Supported
                    </h3>
                    <p className="text-2xl font-bold text-secondary-700">
                      {donatedSharerIds.size}
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 flex-1">
                    <h3 className="text-sm font-medium text-yellow-600 mb-1">
                      Recurring Donations
                    </h3>
                    <p className="text-2xl font-bold text-yellow-700">
                      {myDonations.filter(d => d.recurring).length}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Recent Donations</h3>
                  <div className="space-y-3">
                    {myDonations
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .slice(0, 5)
                      .map(donation => (
                        <div key={donation.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{donation.sharerName}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(donation.createdAt).toLocaleDateString()}
                              {donation.recurring && ' (Monthly)'}
                            </p>
                          </div>
                          <p className="font-semibold">₹{donation.amount}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">
                You haven't made any donations yet. Support an NGO to see your impact here.
              </p>
            )}
          </div>
          
          {relevantReports.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Impact from Organizations You Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relevantReports
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 4)
                  .map(report => (
                    <ImpactReportCard key={report.id} report={report} />
                  ))}
              </div>
            </div>
          )}
        </div>
        
        <div>
          {selectedSharer ? (
            <DonationForm
              sharerId={selectedSharer}
              sharerName={sharers.find(s => s.id === selectedSharer)?.name || ''}
              onSuccess={handleDonationSuccess}
            />
          ) : (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Support an NGO</h2>
              <div className="space-y-4">
                {sharers.map(sharer => (
                  <motion.div
                    key={sharer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 cursor-pointer"
                    onClick={() => handleSupportClick(sharer.id)}
                  >
                    <h3 className="font-medium mb-1">{sharer.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{sharer.address}</p>
                    <button className="btn btn-sm btn-primary">
                      {donatedSharerIds.has(sharer.id) ? 'Donate Again' : 'Support'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DonorDashboard;
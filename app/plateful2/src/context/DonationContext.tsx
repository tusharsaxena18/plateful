import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Donation, ImpactReport } from '../types';
import { mockDonations, mockImpactReports } from '../data/mockData';

interface DonationContextType {
  donations: Donation[];
  impactReports: ImpactReport[];
  addDonation: (donation: Omit<Donation, 'id' | 'createdAt'>) => void;
  addImpactReport: (report: Omit<ImpactReport, 'id' | 'createdAt'>) => void;
  getDonationsByDonor: (donorId: string) => Donation[];
  getDonationsBySharer: (sharerId: string) => Donation[];
  getImpactReportsBySharer: (sharerId: string) => ImpactReport[];
  getTotalDonationAmount: (sharerId: string) => number;
  getTotalImpact: (sharerId: string) => { mealsServed: number; peopleImpacted: number };
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<Donation[]>(mockDonations);
  const [impactReports, setImpactReports] = useState<ImpactReport[]>(mockImpactReports);

  const addDonation = (donation: Omit<Donation, 'id' | 'createdAt'>) => {
    const newDonation: Donation = {
      ...donation,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setDonations([...donations, newDonation]);
  };

  const addImpactReport = (report: Omit<ImpactReport, 'id' | 'createdAt'>) => {
    const newReport: ImpactReport = {
      ...report,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setImpactReports([...impactReports, newReport]);
  };

  const getDonationsByDonor = (donorId: string) => {
    return donations.filter(donation => donation.donorId === donorId);
  };

  const getDonationsBySharer = (sharerId: string) => {
    return donations.filter(donation => donation.sharerId === sharerId);
  };

  const getImpactReportsBySharer = (sharerId: string) => {
    return impactReports.filter(report => report.sharerId === sharerId);
  };

  const getTotalDonationAmount = (sharerId: string) => {
    return getDonationsBySharer(sharerId).reduce((total, donation) => total + donation.amount, 0);
  };

  const getTotalImpact = (sharerId: string) => {
    const reports = getImpactReportsBySharer(sharerId);
    return {
      mealsServed: reports.reduce((total, report) => total + report.mealsServed, 0),
      peopleImpacted: reports.reduce((total, report) => total + report.peopleImpacted, 0)
    };
  };

  return (
    <DonationContext.Provider 
      value={{ 
        donations, 
        impactReports, 
        addDonation, 
        addImpactReport,
        getDonationsByDonor,
        getDonationsBySharer,
        getImpactReportsBySharer,
        getTotalDonationAmount,
        getTotalImpact
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = (): DonationContextType => {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
};
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FoodListing, Request } from '../types';
import { mockFoodListings, mockRequests } from '../data/mockData';

interface FoodContextType {
  foodListings: FoodListing[];
  requests: Request[];
  addFoodListing: (listing: Omit<FoodListing, 'id' | 'createdAt' | 'status'>) => void;
  updateFoodListing: (id: string, updates: Partial<FoodListing>) => void;
  createRequest: (foodListingId: string, sharerId: string, sharerName: string) => void;
  updateRequest: (id: string, status: Request['status']) => void;
  getListingsByGiver: (giverId: string) => FoodListing[];
  getRequestsBySharer: (sharerId: string) => Request[];
  getRequestsForGiver: (giverId: string) => { request: Request; listing: FoodListing }[];
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [foodListings, setFoodListings] = useState<FoodListing[]>(mockFoodListings);
  const [requests, setRequests] = useState<Request[]>(mockRequests);

  const addFoodListing = (listing: Omit<FoodListing, 'id' | 'createdAt' | 'status'>) => {
    const newListing: FoodListing = {
      ...listing,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'available'
    };
    setFoodListings([...foodListings, newListing]);
  };

  const updateFoodListing = (id: string, updates: Partial<FoodListing>) => {
    setFoodListings(foodListings.map(listing => 
      listing.id === id ? { ...listing, ...updates } : listing
    ));
  };

  const createRequest = (foodListingId: string, sharerId: string, sharerName: string) => {
    const newRequest: Request = {
      id: Math.random().toString(36).substr(2, 9),
      foodListingId,
      sharerId,
      sharerName,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setRequests([...requests, newRequest]);
    
    // Update the food listing status
    updateFoodListing(foodListingId, { status: 'requested' });
  };

  const updateRequest = (id: string, status: Request['status']) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status } : request
    ));

    // If request is completed or rejected, update the food listing status
    const request = requests.find(r => r.id === id);
    if (request) {
      if (status === 'completed') {
        updateFoodListing(request.foodListingId, { status: 'claimed' });
      } else if (status === 'rejected') {
        updateFoodListing(request.foodListingId, { status: 'available' });
      }
    }
  };

  const getListingsByGiver = (giverId: string) => {
    return foodListings.filter(listing => listing.giverId === giverId);
  };

  const getRequestsBySharer = (sharerId: string) => {
    return requests.filter(request => request.sharerId === sharerId);
  };

  const getRequestsForGiver = (giverId: string) => {
    const giverListings = getListingsByGiver(giverId);
    const listingIds = giverListings.map(listing => listing.id);
    
    return requests
      .filter(request => listingIds.includes(request.foodListingId))
      .map(request => {
        const listing = foodListings.find(l => l.id === request.foodListingId)!;
        return { request, listing };
      });
  };

  return (
    <FoodContext.Provider 
      value={{ 
        foodListings, 
        requests, 
        addFoodListing, 
        updateFoodListing,
        createRequest,
        updateRequest,
        getListingsByGiver,
        getRequestsBySharer,
        getRequestsForGiver
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = (): FoodContextType => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};
export type UserRole = 'provider' | 'ngo' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  verified?: boolean;
  organizationDetails?: {
    registrationNumber?: string;
    taxId?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    documents?: string[];
  };
}

export interface FoodListing {
  id: string;
  providerId: string;
  providerName: string;
  type: 'cooked' | 'raw';
  description: string;
  quantity: number;
  unit: 'servings' | 'kg' | 'g';
  expiry: string;
  imageUrl?: string;
  createdAt: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'requested' | 'claimed';
  perishabilityScore: number;
}

export interface Request {
  id: string;
  foodListingId: string;
  ngoId: string;
  ngoName: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  pickupTime?: string;
  distance?: number;
}

export interface Donation {
  id: string;
  donorId: string;
  ngoId: string;
  ngoName: string;
  amount: number;
  createdAt: string;
  recurring: boolean;
  purpose: 'logistics' | 'food';
}

export interface ImpactReport {
  id: string;
  ngoId: string;
  title: string;
  description: string;
  mealsServed: number;
  peopleImpacted: number;
  imageUrls: string[];
  createdAt: string;
  donationId?: string;
}

export interface Analytics {
  totalMealsServed: number;
  totalPeopleImpacted: number;
  totalDonations: number;
  foodWastePrevented: number;
  activeProviders: number;
  activeNGOs: number;
  pickupsByRegion: Record<string, number>;
  impactByMonth: Array<{
    month: string;
    mealsServed: number;
    peopleImpacted: number;
  }>;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
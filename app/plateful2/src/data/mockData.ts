import { User, FoodListing, Request, Donation, ImpactReport } from '../types';

export const mockUsers: User[] = [
  {
    id: 'giver1',
    name: 'Food For All Restaurant',
    email: 'giver@example.com',
    role: 'giver',
    address: '123 Food St, Mumbai, India',
    location: { lat: 19.076, lng: 72.877 },
    verified: true
  },
  {
    id: 'giver2',
    name: 'Green Harvest Grocers',
    email: 'grocer@example.com',
    role: 'giver',
    address: '456 Harvest Rd, Delhi, India',
    location: { lat: 19.086, lng: 72.887 },
    verified: true
  },
  {
    id: 'sharer1',
    name: 'Helping Hands NGO',
    email: 'ngo@example.com',
    role: 'sharer',
    address: '789 Help Ave, Mumbai, India',
    location: { lat: 19.066, lng: 72.867 },
    verified: true
  },
  {
    id: 'donor1',
    name: 'Rahul Sharma',
    email: 'donor@example.com',
    role: 'donor',
    verified: true
  }
];

export const mockFoodListings: FoodListing[] = [
  {
    id: 'food1',
    giverId: 'giver1',
    giverName: 'Food For All Restaurant',
    type: 'cooked',
    description: 'Leftover rice and curry dishes, still fresh and warm',
    quantity: '15 meals',
    expiry: '2025-07-10T18:00:00Z',
    createdAt: '2025-07-10T12:00:00Z',
    location: { lat: 19.076, lng: 72.877 },
    status: 'available'
  },
  {
    id: 'food2',
    giverId: 'giver2',
    giverName: 'Green Harvest Grocers',
    type: 'raw',
    description: 'Fresh vegetables that are slightly bruised but perfectly edible',
    quantity: '10kg assorted vegetables',
    expiry: '2025-07-12T18:00:00Z',
    createdAt: '2025-07-10T10:00:00Z',
    location: { lat: 19.086, lng: 72.887 },
    status: 'available'
  },
  {
    id: 'food3',
    giverId: 'giver1',
    giverName: 'Food For All Restaurant',
    type: 'cooked',
    description: 'Freshly prepared extra biryani from a catering event',
    quantity: '25 meals',
    expiry: '2025-07-10T20:00:00Z',
    createdAt: '2025-07-10T14:00:00Z',
    location: { lat: 19.076, lng: 72.877 },
    status: 'requested'
  }
];

export const mockRequests: Request[] = [
  {
    id: 'req1',
    foodListingId: 'food3',
    sharerId: 'sharer1',
    sharerName: 'Helping Hands NGO',
    status: 'pending',
    createdAt: '2025-07-10T15:00:00Z'
  }
];

export const mockDonations: Donation[] = [
  {
    id: 'don1',
    donorId: 'donor1',
    sharerId: 'sharer1',
    sharerName: 'Helping Hands NGO',
    amount: 5000,
    createdAt: '2025-07-01T10:00:00Z',
    recurring: true
  }
];

export const mockImpactReports: ImpactReport[] = [
  {
    id: 'imp1',
    sharerId: 'sharer1',
    title: 'July Food Distribution',
    description: 'Successfully distributed meals to underprivileged families in Mumbai slums',
    mealsServed: 150,
    peopleImpacted: 50,
    imageUrls: [
      'https://images.pexels.com/photos/6646992/pexels-photo-6646992.jpeg',
      'https://images.pexels.com/photos/6647217/pexels-photo-6647217.jpeg'
    ],
    createdAt: '2025-07-05T18:00:00Z'
  }
];
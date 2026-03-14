import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { MapPin, Calendar, Clock, Users, Package, Utensils } from 'lucide-react';
import { FoodListing } from '../../../types/food';
import { useNotification } from '../../../contexts/NotificationContext';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mock data
const mockFoodListings: FoodListing[] = [
  {
    id: 'food-1',
    providerId: 'provider-1',
    providerName: 'Campus Dining Hall',
    title: 'Leftover Pasta and Salad',
    description: 'Vegetarian pasta with tomato sauce and garden salad from lunch service. Well preserved and refrigerated.',
    foodType: 'cooked',
    quantity: 20,
    unit: 'servings',
    expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    location: {
      address: '123 University Ave, College Town',
      lat: 40.7128,
      lng: -74.0060,
    },
    images: ['https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    perishability: 7,
    dietaryInfo: ['vegetarian'],
    estimatedMeals: 20,
  },
  {
    id: 'food-2',
    providerId: 'provider-2',
    providerName: 'Green Restaurant',
    title: 'Fresh Fruit and Vegetables',
    description: 'Assorted fruits and vegetables including apples, oranges, carrots, and celery. Perfect for healthy snacks.',
    foodType: 'raw',
    quantity: 10,
    unit: 'kg',
    expiryTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    location: {
      address: '456 Main St, Downtown',
      lat: 40.7282,
      lng: -73.9942,
    },
    images: ['https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    perishability: 5,
    dietaryInfo: ['vegan', 'gluten-free'],
    estimatedMeals: 15,
  },
  {
    id: 'food-3',
    providerId: 'provider-3',
    providerName: 'Community Center',
    title: 'Rice and Curry',
    description: 'Leftover rice and vegetable curry. Well packaged and still warm.',
    foodType: 'cooked',
    quantity: 15,
    unit: 'servings',
    expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
    location: {
      address: '789 Park Ave, Uptown',
      lat: 40.7580,
      lng: -73.9855,
    },
    images: ['https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    perishability: 8,
    dietaryInfo: ['vegetarian'],
    estimatedMeals: 15,
  }
];

const FoodMap: React.FC = () => {
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [selectedListing, setSelectedListing] = useState<FoodListing | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 11
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupNotes, setPickupNotes] = useState('');

  const mapRef = useRef(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      // In a real app, this would be an API call
      setListings(mockFoodListings);
    };

    fetchData();

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setViewState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 12
        });
      });
    }
  }, []);

  const handleMarkerClick = (listing: FoodListing) => {
    setSelectedListing(listing);
    
    // Center the map on the selected listing
    setViewState({
      latitude: listing.location.lat,
      longitude: listing.location.lng,
      zoom: 14
    });
  };

  const handleRequestPickup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickupDate) {
      addNotification('Please select a pickup date and time', 'error');
      return;
    }
    
    setIsRequesting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      addNotification('Pickup request sent successfully!', 'success');
      setSelectedListing(null);
      setPickupDate('');
      setPickupNotes('');
    } catch (error) {
      console.error('Error requesting pickup:', error);
      addNotification('Failed to request pickup. Please try again.', 'error');
    } finally {
      setIsRequesting(false);
    }
  };

  const formatExpiryTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800 mb-2">Food Map</h1>
        <p className="text-neutral-600">
          Discover available food listings near you and request pickups.
        </p>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="h-[600px] relative">
          <Map
            ref={mapRef}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken="pk.eyJ1IjoiZGV2dGVzdDEyMyIsImEiOiJjbHNhZjdyYTcwYm9uMnNxaDFsdGdoZXF2In0.P7H6A4_Xvgf1TdVyeZnXug"
          >
            <NavigationControl position="top-right" />
            
            {listings.map((listing) => (
              <Marker
                key={listing.id}
                latitude={listing.location.lat}
                longitude={listing.location.lng}
                anchor="bottom"
                onClick={() => handleMarkerClick(listing)}
              >
                <div className="cursor-pointer">
                  <div className={`
                    p-1.5 rounded-full
                    ${listing.foodType === 'cooked' ? 'bg-primary-500' : 'bg-secondary-500'}
                  `}>
                    <MapPin size={24} color="white" />
                  </div>
                </div>
              </Marker>
            ))}
            
            {selectedListing && (
              <Popup
                latitude={selectedListing.location.lat}
                longitude={selectedListing.location.lng}
                anchor="bottom"
                onClose={() => setSelectedListing(null)}
                closeOnClick={false}
                className="food-popup"
              >
                <div className="p-1 max-w-xs">
                  <div className="mb-3">
                    {selectedListing.images && selectedListing.images.length > 0 ? (
                      <img
                        src={selectedListing.images[0]}
                        alt={selectedListing.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-32 bg-neutral-200 flex items-center justify-center rounded-lg">
                        <Package size={32} className="text-neutral-400" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-neutral-800 mb-1">
                    {selectedListing.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-500 mb-3">
                    by {selectedListing.providerName}
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-neutral-600">
                      <div className="mr-2">
                        {selectedListing.foodType === 'cooked' ? (
                          <Utensils size={16} />
                        ) : (
                          <Package size={16} />
                        )}
                      </div>
                      <span>
                        {selectedListing.quantity} {selectedListing.unit} of {selectedListing.foodType} food
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-neutral-600">
                      <Clock size={16} className="mr-2" />
                      <span>Expires: {formatExpiryTime(selectedListing.expiryTime)}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-neutral-600">
                      <MapPin size={16} className="mr-2" />
                      <span>{selectedListing.location.address}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-neutral-600">
                      <Users size={16} className="mr-2" />
                      <span>Serves approx. {selectedListing.estimatedMeals || selectedListing.quantity} people</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleRequestPickup} className="space-y-3 pt-3 border-t">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Pickup Date & Time
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                          <Calendar size={16} />
                        </div>
                        <input
                          type="datetime-local"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Notes (Optional)
                      </label>
                      <textarea
                        value={pickupNotes}
                        onChange={(e) => setPickupNotes(e.target.value)}
                        className="block w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg"
                        rows={2}
                        placeholder="Any special instructions for pickup"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isRequesting}
                      className={`btn btn-primary w-full py-2 text-sm ${isRequesting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isRequesting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Requesting...
                        </span>
                      ) : (
                        'Request Pickup'
                      )}
                    </button>
                  </form>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Available Food Listings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <div 
              key={listing.id}
              onClick={() => handleMarkerClick(listing)}
              className="card hover:shadow-elevated transition-shadow cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  listing.foodType === 'cooked' ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'
                }`}>
                  {listing.foodType === 'cooked' ? (
                    <Utensils size={20} />
                  ) : (
                    <Package size={20} />
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-neutral-800">{listing.title}</h3>
                  <p className="text-sm text-neutral-500">{listing.providerName}</p>
                  <p className="text-sm text-neutral-600 mt-1">
                    {listing.quantity} {listing.unit} • Expires {formatExpiryTime(listing.expiryTime)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodMap;
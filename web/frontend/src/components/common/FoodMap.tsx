import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useFood } from '../../context/FoodContext';
import { useAuth } from '../../context/AuthContext';
import { FoodListing } from '../../types';

interface MapCenterProps {
  position: [number, number];
}

// Component to handle map center updates
const MapCenter: React.FC<MapCenterProps> = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(position);
  }, [map, position]);
  
  return null;
};

const FoodMap: React.FC = () => {
  const { foodListings, createRequest } = useFood();
  const { currentUser } = useAuth();
  
  // Customize marker icons
  const giverIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const requestFood = (listing: FoodListing) => {
    if (currentUser && currentUser.role === 'sharer') {
      createRequest(
        listing.id,
        currentUser.id,
        currentUser.name
      );
    }
  };

  // Initial map center (Mumbai, India)
  const defaultCenter: [number, number] = [19.076, 72.877];

  return (
    <div className="h-[70vh] w-full rounded-lg overflow-hidden shadow-md z-10">
      <MapContainer 
        center={defaultCenter}
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapCenter position={defaultCenter} />
        
        {foodListings.map(listing => (
          <Marker 
            key={listing.id}
            position={[listing.location.lat, listing.location.lng]}
            icon={giverIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{listing.giverName}</h3>
                <p className="text-sm">{listing.description}</p>
                <p className="text-sm">Quantity: {listing.quantity}</p>
                <p className="text-sm">Type: {listing.type === 'cooked' ? 'Cooked Food' : 'Raw Ingredients'}</p>
                
                {currentUser?.role === 'sharer' && listing.status === 'available' && (
                  <button 
                    onClick={() => requestFood(listing)} 
                    className="mt-2 px-3 py-1 bg-secondary-500 text-white text-sm rounded hover:bg-secondary-600 transition"
                  >
                    Request
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FoodMap;
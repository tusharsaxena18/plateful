interface Location {
  lat: number;
  lng: number;
}

export const calculateDistance = (point1: Location, point2: Location): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => {
  return value * Math.PI / 180;
};

export const findNearbyNGOs = <T extends { location: Location }>(
  listing: { location: Location },
  ngos: T[],
  maxDistance: number = 10 // Default 10km radius
): T[] => {
  return ngos.filter(ngo => {
    const distance = calculateDistance(listing.location, ngo.location);
    return distance <= maxDistance;
  }).sort((a, b) => {
    const distanceA = calculateDistance(listing.location, a.location);
    const distanceB = calculateDistance(listing.location, b.location);
    return distanceA - distanceB;
  });
};

export const optimizePickupRoute = <T extends { location: Location }>(
  startPoint: Location,
  pickups: T[]
): T[] => {
  let route: T[] = [];
  let remaining = [...pickups];
  let currentPoint = startPoint;

  while (remaining.length > 0) {
    const nearest = remaining.reduce((nearest, current) => {
      const nearestDistance = calculateDistance(currentPoint, nearest.location);
      const currentDistance = calculateDistance(currentPoint, current.location);
      return currentDistance < nearestDistance ? current : nearest;
    }, remaining[0]);

    route.push(nearest);
    remaining = remaining.filter(point => point !== nearest);
    currentPoint = nearest.location;
  }

  return route;
};
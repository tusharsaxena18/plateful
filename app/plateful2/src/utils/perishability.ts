interface FoodItem {
  type: 'cooked' | 'raw';
  expiry: string;
}

export const calculatePerishabilityScore = (item: FoodItem): number => {
  const now = new Date();
  const expiryDate = new Date(item.expiry);
  const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  // Base score based on food type
  const baseScore = item.type === 'cooked' ? 8 : 5;
  
  // Adjust score based on time until expiry
  let timeScore = 0;
  if (hoursUntilExpiry <= 4) {
    timeScore = 10;
  } else if (hoursUntilExpiry <= 12) {
    timeScore = 8;
  } else if (hoursUntilExpiry <= 24) {
    timeScore = 6;
  } else if (hoursUntilExpiry <= 48) {
    timeScore = 4;
  } else {
    timeScore = 2;
  }
  
  // Final score is average of base score and time score
  return (baseScore + timeScore) / 2;
};

export const sortByPerishability = <T extends FoodItem>(items: T[]): T[] => {
  return [...items].sort((a, b) => {
    const scoreA = calculatePerishabilityScore(a);
    const scoreB = calculatePerishabilityScore(b);
    return scoreB - scoreA;
  });
};
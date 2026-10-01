/** Merchandising groups preserve the existing category URLs. */
export const collectionGroups = [
  { id: 'home', name: 'Home Textiles', categories: ['blankets', 'bed-linen', 'bed-sheets', 'comforters', 'bedspreads'] },
  { id: 'travel', name: 'Travel & Luggage', categories: ['travel-luggage', 'luggage', 'travel'] },
  { id: 'footwear', name: 'Footwear', categories: ['footwear'] },
];

export const catalogueBrands = [
  { id: 'hanaa', name: 'HANAA' }, { id: 'damas', name: 'DAMAS GOLD' },
  { id: 'royalon', name: 'ROYALON 3D' }, { id: 'travelgo', name: 'TRAVEL GO' },
  { id: 'infinity', name: 'INFINITY PARIS' }, { id: 'magicwalk', name: 'MAGICWALK' },
  { id: 'adda', name: 'ADDA' },
];

// Add approved product-slug -> brand-ID associations here. Never infer from names.
export const approvedProductBrands: Record<string, string> = {};

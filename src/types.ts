export interface Villa {
  id: string;
  name: string;
  type: 'pool-villa' | 'bush-suite' | 'residence';
  tagline: string;
  description: string;
  longDescription: string;
  size: string;
  capacity: string;
  view: string;
  rate: number; // rate per night in USD
  amenities: string[];
  features: string[];
  image: string;
}

export interface Experience {
  id: string;
  title: string;
  category: 'wildlife' | 'water' | 'wellness' | 'community';
  tagline: string;
  description: string;
  longDescription: string;
  highlights: string[];
  duration: string;
  included: string;
  image: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  inclusionList: string[];
  validity: string;
  priceDetails: string;
}

export interface JournalStory {
  id: string;
  title: string;
  category: 'conservation' | 'culture' | 'design' | 'nature';
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'getting-here' | 'stay' | 'excursions' | 'general';
}

export interface Inquiry {
  id: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  specialRequests: string[];
  activities: string[];
  dateCreated: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}

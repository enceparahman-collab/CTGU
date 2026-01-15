
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
  nik: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: 'Event' | 'Daily' | 'Achievement';
}

export interface GuestMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  date: string;
  category: 'Promo' | 'Store Info' | 'Internal';
}

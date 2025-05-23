
export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio: string;
  location: string;
  joinedDate: Date;
  placesVisited: number;
  followers: number;
  following: number;
  interests: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  location: string;
  date: Date;
  images: string[];
  tags: string[];
  isPrivate: boolean;
  author: UserProfile;
  likes: number;
  comments: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface TravelTip {
  id: string;
  title: string;
  content: string;
  category: string;
  author: UserProfile;
  likes: number;
}

// Mock data for development
export const mockCurrentUser: UserProfile = {
  id: "1",
  name: "Alex Johnson",
  username: "alexjourneys",
  avatar: "/placeholder.svg",
  bio: "Travel enthusiast exploring the world one city at a time ✈️",
  location: "Currently in: Tokyo, Japan",
  joinedDate: new Date("2024-01-15"),
  placesVisited: 27,
  followers: 148,
  following: 92,
  interests: ["Photography", "Hiking", "Food", "Culture"]
};

export const mockTravelTips: TravelTip[] = [
  {
    id: "1",
    title: "Essential Packing Tips",
    content: "Always roll your clothes instead of folding them to save space and prevent wrinkles.",
    category: "Packing",
    author: mockCurrentUser,
    likes: 24
  },
  {
    id: "2",
    title: "Japan Travel Etiquette",
    content: "Remember to remove your shoes before entering homes and many traditional establishments.",
    category: "Culture",
    author: mockCurrentUser,
    likes: 35
  }
];

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Cherry Blossom Season in Kyoto",
    content: "Experiencing the magical hanami season in Japan's cultural capital...",
    location: "Kyoto, Japan",
    date: new Date("2024-04-05"),
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
      "https://images.unsplash.com/photo-1493997181344-712f2f19d87a"
    ],
    tags: ["Japan", "Culture", "Spring", "Nature"],
    isPrivate: false,
    author: mockCurrentUser,
    likes: 127,
    comments: 23,
    coordinates: {
      lat: 35.0116,
      lng: 135.7681
    }
  }
];

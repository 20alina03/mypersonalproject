
// Mock user data
export const mockCurrentUser = {
  id: "user_1",
  name: "Alex Johnson",
  username: "alexjourneys",
  email: "alex@example.com",
  avatar: "/placeholder.svg",
  bio: "Travel enthusiast and photographer. Exploring the world one city at a time.",
  location: "San Francisco, CA",
  joinedDate: new Date("2023-01-15"),
  placesVisited: 27,
  followers: 148,
  following: 92,
  travelInterests: ["Photography", "Hiking", "Street Food", "Architecture", "Cultural Experiences"]
};

// Mock journal entries
export const mockJournalEntries = [
  {
    id: "entry_1",
    title: "A Week in Tokyo",
    excerpt: "Exploring the bustling streets and serene temples of Japan's capital.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Tokyo, Japan",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    date: new Date("2024-02-15"),
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    author: {
      id: "user_1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg"
    },
    tags: ["Asia", "City", "Culture"],
    likes: 24,
    comments: 5,
    isPrivate: false
  },
  {
    id: "entry_2",
    title: "Safari Adventures in Kenya",
    excerpt: "An unforgettable journey through the savanna witnessing majestic wildlife.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Maasai Mara, Kenya",
    coordinates: { lat: -1.4167, lng: 35.1333 },
    date: new Date("2023-11-10"),
    imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53",
    author: {
      id: "user_1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg"
    },
    tags: ["Africa", "Wildlife", "Safari"],
    likes: 32,
    comments: 8,
    isPrivate: false
  },
  {
    id: "entry_3",
    title: "Ancient Wonders in Greece",
    excerpt: "Exploring the historical sites and beautiful islands of Greece.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Athens, Greece",
    coordinates: { lat: 37.9838, lng: 23.7275 },
    date: new Date("2023-09-22"),
    imageUrl: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb",
    author: {
      id: "user_1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg"
    },
    tags: ["Europe", "History", "Culture"],
    likes: 18,
    comments: 3,
    isPrivate: false
  },
  {
    id: "entry_4",
    title: "Exploring the Amazon Rainforest",
    excerpt: "An adventure deep into the world's largest tropical rainforest.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Manaus, Brazil",
    coordinates: { lat: -3.1190, lng: -60.0217 },
    date: new Date("2023-07-15"),
    imageUrl: "https://images.unsplash.com/photo-1518182170546-07661fd94144",
    author: {
      id: "user_1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg"
    },
    tags: ["South America", "Nature", "Adventure"],
    likes: 42,
    comments: 11,
    isPrivate: false
  }
];

// Mock locations visited
export const mockLocations = [
  {
    id: "loc_1",
    name: "Tokyo",
    country: "Japan",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    visitDate: new Date("2024-02-10"),
    entryIds: ["entry_1"]
  },
  {
    id: "loc_2",
    name: "Maasai Mara",
    country: "Kenya",
    coordinates: { lat: -1.4167, lng: 35.1333 },
    visitDate: new Date("2023-11-05"),
    entryIds: ["entry_2"]
  },
  {
    id: "loc_3",
    name: "Athens",
    country: "Greece",
    coordinates: { lat: 37.9838, lng: 23.7275 },
    visitDate: new Date("2023-09-18"),
    entryIds: ["entry_3"]
  },
  {
    id: "loc_4",
    name: "Manaus",
    country: "Brazil",
    coordinates: { lat: -3.1190, lng: -60.0217 },
    visitDate: new Date("2023-07-10"),
    entryIds: ["entry_4"]
  }
];

// Mock travel tips
export const mockTravelTips = [
  {
    id: "tip_1",
    title: "Pack Travel-Size Toiletries",
    content: "Save space and stay within airline restrictions by using travel-size containers for your toiletries.",
    category: "Packing",
    icon: "luggage"
  },
  {
    id: "tip_2",
    title: "Learn Basic Local Phrases",
    content: "Take time to learn a few essential phrases in the local language of your destination - locals appreciate the effort!",
    category: "Cultural",
    icon: "language"
  },
  {
    id: "tip_3",
    title: "Use Offline Maps",
    content: "Download offline maps of your destination before traveling to navigate without using data or when signal is poor.",
    category: "Navigation",
    icon: "map"
  },
  {
    id: "tip_4",
    title: "Notify Your Bank Before Travel",
    content: "Inform your bank of your travel plans to prevent them from flagging foreign transactions as suspicious.",
    category: "Finance",
    icon: "credit-card"
  },
  {
    id: "tip_5",
    title: "Pack a First Aid Kit",
    content: "Always carry a basic first aid kit with bandages, pain relievers, and any personal medications you might need.",
    category: "Health",
    icon: "first-aid"
  }
];

// Mock user friends/roammates
export const mockRoammates = [
  {
    id: "user_2",
    name: "Emily Chen",
    username: "emilytravels",
    avatar: "",
    location: "New York, USA",
    placesVisited: 32,
    mutualConnections: 3
  },
  {
    id: "user_3",
    name: "Marco Rodriguez",
    username: "marcoexplores",
    avatar: "",
    location: "Barcelona, Spain",
    placesVisited: 45,
    mutualConnections: 1
  },
  {
    id: "user_4",
    name: "Sophie Martin",
    username: "sophiewanders",
    avatar: "",
    location: "Paris, France",
    placesVisited: 28,
    mutualConnections: 5
  },
  {
    id: "user_5",
    name: "Raj Patel",
    username: "rajadventures",
    avatar: "",
    location: "Mumbai, India",
    placesVisited: 22,
    mutualConnections: 2
  }
];

// Mock comments on journal entries
export const mockComments = [
  {
    id: "comment_1",
    entryId: "entry_1",
    userId: "user_3",
    userName: "Marco Rodriguez",
    userAvatar: "",
    content: "Tokyo is amazing! Did you visit the Robot Restaurant?",
    timestamp: new Date("2024-02-16T14:23:00"),
    likes: 3
  },
  {
    id: "comment_2",
    entryId: "entry_1",
    userId: "user_4",
    userName: "Sophie Martin",
    userAvatar: "",
    content: "Great photos! I'm planning a trip there next month.",
    timestamp: new Date("2024-02-17T09:45:00"),
    likes: 2
  },
  {
    id: "comment_3",
    entryId: "entry_2",
    userId: "user_2",
    userName: "Emily Chen",
    userAvatar: "",
    content: "The wildlife photos are incredible! What camera did you use?",
    timestamp: new Date("2023-11-12T16:30:00"),
    likes: 4
  }
];

// Mock travel planning/wishlist
export const mockWishlist = [
  {
    id: "wish_1",
    destination: "Kyoto",
    country: "Japan",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    notes: "Visit during cherry blossom season",
    priority: "high",
    plannedDate: new Date("2024-04-01")
  },
  {
    id: "wish_2",
    destination: "Santorini",
    country: "Greece",
    coordinates: { lat: 36.3932, lng: 25.4615 },
    notes: "Stay in a cave hotel with caldera view",
    priority: "medium",
    plannedDate: new Date("2024-06-15")
  },
  {
    id: "wish_3",
    destination: "Machu Picchu",
    country: "Peru",
    coordinates: { lat: -13.1631, lng: -72.5450 },
    notes: "Book Inca Trail hike in advance",
    priority: "high",
    plannedDate: new Date("2024-09-10")
  }
];

// Mock travel stats
export const mockTravelStats = {
  totalCountriesVisited: 12,
  totalCitiesVisited: 27,
  totalDistanceTraveled: 48250, // in kilometers
  longestTrip: {
    name: "Southeast Asia Tour",
    duration: 25, // in days
    countries: ["Thailand", "Vietnam", "Cambodia"]
  },
  mostVisitedRegion: "Europe",
  travelByMonth: [
    { month: "Jan", trips: 1 },
    { month: "Feb", trips: 1 },
    { month: "Mar", trips: 0 },
    { month: "Apr", trips: 1 },
    { month: "May", trips: 2 },
    { month: "Jun", trips: 3 },
    { month: "Jul", trips: 2 },
    { month: "Aug", trips: 2 },
    { month: "Sep", trips: 1 },
    { month: "Oct", trips: 0 },
    { month: "Nov", trips: 1 },
    { month: "Dec", trips: 1 }
  ]
};

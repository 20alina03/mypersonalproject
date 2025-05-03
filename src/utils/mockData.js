
// Mock data for social networking and search features

// Users data
export const users = [
  {
    id: "user1",
    name: "Alex Johnson",
    username: "alexjourneys",
    avatar: "/placeholder.svg",
    bio: "Travel enthusiast and photographer. Exploring the world one city at a time.",
    location: "San Francisco, CA",
    joinedDate: new Date("2023-01-15"),
    placesVisited: 27,
    followers: 148,
    following: 92,
    travelInterests: ["Photography", "Hiking", "Street Food", "Architecture", "Cultural Experiences"]
  },
  {
    id: "user2",
    name: "Maya Patel",
    username: "mayaexplores",
    avatar: "/placeholder.svg",
    bio: "Adventure seeker and foodie. Always planning the next trip!",
    location: "Chicago, IL",
    joinedDate: new Date("2022-06-22"),
    placesVisited: 18,
    followers: 95,
    following: 87,
    travelInterests: ["Food Tourism", "Museums", "City Walks", "Markets"]
  },
  {
    id: "user3",
    name: "Carlos Rodriguez",
    username: "carloswanders",
    avatar: "/placeholder.svg",
    bio: "Digital nomad working from beach cafes around the world.",
    location: "Currently: Bali",
    joinedDate: new Date("2023-03-10"),
    placesVisited: 42,
    followers: 512,
    following: 131,
    travelInterests: ["Remote Work", "Beaches", "Cafes", "Local Cuisine", "Island Life"]
  },
  {
    id: "user4",
    name: "Emma Wilson",
    username: "emmastravels",
    avatar: "/placeholder.svg",
    bio: "Sustainable travel advocate and nature lover.",
    location: "Portland, OR",
    joinedDate: new Date("2022-11-05"),
    placesVisited: 15,
    followers: 78,
    following: 65,
    travelInterests: ["Eco-Tourism", "Hiking", "Wildlife", "National Parks"]
  },
  {
    id: "user5",
    name: "Jun Kim",
    username: "junglobetrekker",
    avatar: "/placeholder.svg",
    bio: "Finding the best street food and hidden gems in every city.",
    location: "Seoul, South Korea",
    joinedDate: new Date("2023-02-18"),
    placesVisited: 31,
    followers: 237,
    following: 112,
    travelInterests: ["Street Food", "Night Markets", "Urban Photography", "City Life"]
  }
];

// Journal entries data
export const journalEntries = [
  {
    id: "entry1",
    title: "Sunrise at Angkor Wat",
    excerpt: "Witnessing the magnificent sunrise at the ancient temple complex was a breathtaking experience worth waking up at 4 AM for.",
    content: "The alarm went off at 4 AM, and despite the early hour, I jumped out of bed with excitement. Today was the day I'd finally see the legendary sunrise at Angkor Wat. After a quick tuk-tuk ride through the dark streets of Siem Reap, we arrived at the temple complex. Hundreds of travelers were already gathered, but there was a hushed silence as everyone waited in anticipation. As the first rays of light began to appear, the silhouette of the iconic temple spires emerged against the changing colors of the sky. The reflection in the lotus pond was simply perfect—a mirror image of the magnificent structure. The sky transitioned from deep blue to vibrant oranges and pinks, illuminating the ancient stone. It was worth every minute of lost sleep.",
    location: "Angkor Wat, Cambodia",
    date: new Date("2023-02-15"),
    imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526",
    author: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg"
    },
    likes: 87,
    comments: 14,
    tags: ["Temples", "Sunrise", "UNESCO", "Cambodia"],
    isPrivate: false,
    coordinates: { lat: 13.4125, lng: 103.8670 }
  },
  {
    id: "entry2",
    title: "Lost in Tokyo's Hidden Alleys",
    excerpt: "Exploring the narrow backstreets of Shinjuku led to discovering a tiny 8-seat ramen shop with the best tonkotsu I've ever tasted.",
    content: "After a long day of sightseeing in Tokyo, I decided to venture off the main streets of Shinjuku in search of an authentic dining experience. The neon glow faded as I turned into a narrow alleyway lined with tiny establishments, many with just a noren curtain marking their entrance. About halfway down, a small shop with steam billowing out and a line of locals caught my attention. I waited patiently for 30 minutes before being ushered to one of just 8 counter seats. The chef, an elderly man who had clearly been perfecting his craft for decades, barely looked up as he handed me a menu with just four options. I pointed to the signature tonkotsu ramen and watched in awe as he prepared it with methodical precision. The first spoonful of that rich, creamy broth was a revelation—complex, savory, and deeply satisfying. Sometimes getting lost leads to the most memorable discoveries.",
    location: "Shinjuku, Tokyo, Japan",
    date: new Date("2023-05-22"),
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    author: {
      id: "user3",
      name: "Carlos Rodriguez",
      avatar: "/placeholder.svg"
    },
    likes: 124,
    comments: 21,
    tags: ["Japan", "Food", "Ramen", "Tokyo", "Hidden Gems"],
    isPrivate: false,
    coordinates: { lat: 35.6938, lng: 139.7035 }
  },
  {
    id: "entry3",
    title: "Trekking Through the Misty Mountains of Peru",
    excerpt: "Four days on the Inca Trail to Machu Picchu through changing landscapes, ancient ruins, and culminating in that classic postcard view.",
    content: "Day one of the Inca Trail began with anticipation and nervous energy. Our group of eight plus two guides set out from Kilometer 82, the traditional starting point. The first day was relatively gentle, allowing us to adjust to the altitude and hiking rhythm. We passed small archaeological sites and enjoyed the lush river valley views. Day two was the most challenging—climbing to Dead Woman's Pass at 4,215 meters. The ascent was grueling, with each step becoming heavier as the oxygen thinned. But reaching the top brought an incredible sense of accomplishment and panoramic views that made every labored breath worthwhile. The third day was my favorite, traversing through diverse ecosystems from cloud forest to high jungle, passing multiple Incan sites along the way. The final day began at 3:30 AM to reach the Sun Gate at sunrise. Despite our exhaustion, seeing the first golden rays illuminate Machu Picchu spread out below us was an emotional moment. The ancient city emerging from the morning mist looked exactly like the iconic photos, yet somehow more magical when witnessed after the journey to get there.",
    location: "Inca Trail, Peru",
    date: new Date("2023-06-10"),
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
    author: {
      id: "user2",
      name: "Maya Patel",
      avatar: "/placeholder.svg"
    },
    likes: 156,
    comments: 32,
    tags: ["Hiking", "Inca Trail", "Machu Picchu", "Peru", "Adventure"],
    isPrivate: false,
    coordinates: { lat: -13.1631, lng: -72.5450 }
  },
  {
    id: "entry4",
    title: "Finding Solitude on New Zealand's South Island",
    excerpt: "A week-long solo road trip through dramatic landscapes, with nothing but sheep for company and the Milky Way as my nightlight.",
    content: "After months of non-stop work, I needed space to breathe. New Zealand's South Island in autumn seemed perfect—fewer tourists and spectacular colors. I picked up my campervan in Christchurch and headed south with no real plan except to drive until something called me to stop. The freedom was intoxicating. The first few nights I stayed at designated campsites, but by day three, I found a secluded spot overlooking Lake Pukaki with an unobstructed view of Mount Cook. The vivid turquoise of the lake against the golden tussock grass and snow-capped peak was almost unreal. I spent the day reading, hiking short trails, and simply sitting in silence. As darkness fell, the stars emerged with an intensity I've never seen before—the Milky Way so clear it looked like spilled paint across the sky. In the morning, I woke to a dusting of frost and the pink alpenglow on the mountain. For the rest of the week, I chased similar moments of solitude and natural beauty, from the rugged West Coast beaches to the majestic fjords. I spoke more to sheep than people and felt my mind clearing with each passing day. Sometimes the greatest luxury is simply space and silence.",
    location: "South Island, New Zealand",
    date: new Date("2023-04-05"),
    imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
    author: {
      id: "user4",
      name: "Emma Wilson",
      avatar: "/placeholder.svg"
    },
    likes: 93,
    comments: 17,
    tags: ["Road Trip", "Solo Travel", "New Zealand", "Nature", "Stargazing"],
    isPrivate: false,
    coordinates: { lat: -43.5890, lng: 170.1570 }
  },
  {
    id: "entry5",
    title: "Midnight Street Food Adventure in Bangkok",
    excerpt: "Venturing through Chinatown's Yaowarat Road at midnight for a sensory overload of flavors, aromas, and local culinary traditions.",
    content: "By day, Bangkok's Yaowarat Road is busy, but at night, it transforms into a food lover's paradise. After a tip from a local at my hotel, I arrived around 11 PM when the street food scene reaches its peak. The narrow street was lined with stalls, each specializing in one or two dishes they've perfected over generations. The air was thick with the aroma of grilling seafood, sizzling woks, and fragrant spices. I began with a simple plate of pad thai from an elderly woman whose stall had a long line of locals—always a good sign. The noodles were perfectly chewy, the sauce balanced between sweet, sour, and savory. Next was a stop for som tam (papaya salad) pounded to order in a large mortar with just the right amount of chili to make my lips tingle. I tried oyster omelets, mango sticky rice, and a bowl of boat noodles so rich and complex I'm still dreaming about them. What made the experience special wasn't just the incredible food, but the vibrant atmosphere—plastic stools spilling onto the street, the constant sizzle and clang of cooking, and the mix of tourists and locals all united in the pursuit of delicious food. I didn't finish my culinary tour until almost 2 AM, happily full and with a deeper appreciation for Thai food culture.",
    location: "Yaowarat Road, Bangkok, Thailand",
    date: new Date("2023-03-18"),
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    author: {
      id: "user5",
      name: "Jun Kim",
      avatar: "/placeholder.svg"
    },
    likes: 138,
    comments: 26,
    tags: ["Street Food", "Bangkok", "Thailand", "Night Market", "Culinary"],
    isPrivate: false,
    coordinates: { lat: 13.7393, lng: 100.5036 }
  }
];

// Comments data
export const comments = [
  {
    id: "comment1",
    entryId: "entry1",
    userId: "user2",
    userName: "Maya Patel",
    userAvatar: "/placeholder.svg",
    content: "This brings back amazing memories! I was there last year and the sunrise was truly magical. Did you explore the other temples too?",
    date: new Date("2023-02-15T10:23:00"),
    likes: 5
  },
  {
    id: "comment2",
    entryId: "entry1",
    userId: "user3",
    userName: "Carlos Rodriguez",
    userAvatar: "/placeholder.svg",
    content: "Your description captures the moment perfectly. It's definitely worth the early wake-up call!",
    date: new Date("2023-02-15T11:45:00"),
    likes: 3
  },
  {
    id: "comment3",
    entryId: "entry2",
    userId: "user5",
    userName: "Jun Kim",
    userAvatar: "/placeholder.svg",
    content: "As someone who lived in Tokyo for years, I love how you found one of those hidden gems! Did you catch the name of the place? I'd love to try it next time I'm there.",
    date: new Date("2023-05-22T15:12:00"),
    likes: 7
  },
  {
    id: "comment4",
    entryId: "entry3",
    userId: "user1",
    userName: "Alex Johnson",
    userAvatar: "/placeholder.svg",
    content: "The Inca Trail has been on my bucket list forever! Was it as challenging as they say? How did you prepare for the altitude?",
    date: new Date("2023-06-11T08:37:00"),
    likes: 4
  },
  {
    id: "comment5",
    entryId: "entry4",
    userId: "user5",
    userName: "Jun Kim",
    userAvatar: "/placeholder.svg",
    content: "Your photos are incredible! New Zealand in autumn sounds perfect for recharging. How was the weather during your trip?",
    date: new Date("2023-04-06T16:54:00"),
    likes: 2
  }
];

// Roammates (connections) data
export const roammates = [
  {
    userId: "user1",
    roammates: ["user2", "user3", "user5"],
    pending: ["user4"]
  },
  {
    userId: "user2",
    roammates: ["user1", "user4"],
    pending: ["user3"]
  },
  {
    userId: "user3",
    roammates: ["user1"],
    pending: ["user2", "user5"]
  },
  {
    userId: "user4",
    roammates: ["user2"],
    pending: ["user1"]
  },
  {
    userId: "user5",
    roammates: ["user1"],
    pending: ["user3"]
  }
];

// Popular search tags
export const popularTags = [
  { name: "Beach", count: 89 },
  { name: "City", count: 125 },
  { name: "Mountains", count: 64 },
  { name: "Food", count: 136 },
  { name: "Adventure", count: 93 },
  { name: "Culture", count: 78 },
  { name: "Wildlife", count: 42 },
  { name: "Road Trip", count: 58 },
  { name: "Budget", count: 67 },
  { name: "Luxury", count: 39 },
  { name: "Solo", count: 71 },
  { name: "Family", count: 53 },
  { name: "Hiking", count: 81 },
  { name: "UNESCO", count: 45 },
  { name: "Hidden Gems", count: 62 }
];

// Popular locations
export const popularLocations = [
  { name: "Paris, France", count: 135 },
  { name: "Kyoto, Japan", count: 98 },
  { name: "New York City, USA", count: 127 },
  { name: "Bali, Indonesia", count: 112 },
  { name: "Barcelona, Spain", count: 87 },
  { name: "Cape Town, South Africa", count: 64 },
  { name: "Bangkok, Thailand", count: 92 },
  { name: "Vancouver, Canada", count: 57 },
  { name: "Santorini, Greece", count: 76 },
  { name: "Queenstown, New Zealand", count: 49 }
];

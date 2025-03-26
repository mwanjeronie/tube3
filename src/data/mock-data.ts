import type { CategoryVideos, UserProfile } from "@/types"

export const mockVideos: CategoryVideos = {
  "Film & Animation": [
    { id: "1", videoId: "dQw4w9WgXcQ", title: "Cinematic Short Film", views: 1500000 },
    { id: "2", videoId: "dQw4w9WgXcQ", title: "3D Animation Showcase", views: 800000 },
  ],
  "Autos & Vehicles": [
    { id: "3", videoId: "dQw4w9WgXcQ", title: "New Tesla Review", views: 2000000 },
    { id: "4", videoId: "dQw4w9WgXcQ", title: "Classic Car Restoration", views: 1200000 },
  ],
  Music: [
    { id: "5", videoId: "dQw4w9WgXcQ", title: "Live Concert Performance", views: 3000000 },
    { id: "6", videoId: "dQw4w9WgXcQ", title: "Music Video Premiere", views: 900000 },
  ],
  "Pets & Animals": [
    { id: "7", videoId: "dQw4w9WgXcQ", title: "Cute Puppies Compilation", views: 2500000 },
    { id: "8", videoId: "dQw4w9WgXcQ", title: "Wildlife Documentary", views: 1100000 },
  ],
  Sports: [
    { id: "9", videoId: "dQw4w9WgXcQ", title: "Championship Highlights", views: 1800000 },
    { id: "10", videoId: "dQw4w9WgXcQ", title: "Extreme Sports Montage", views: 950000 },
  ],
  "Travel & Events": [
    { id: "11", videoId: "dQw4w9WgXcQ", title: "Hidden Gems in Asia", views: 1600000 },
    { id: "12", videoId: "dQw4w9WgXcQ", title: "Festival Around the World", views: 750000 },
  ],
  Gaming: [
    { id: "13", videoId: "dQw4w9WgXcQ", title: "Game Launch Stream", views: 2200000 },
    { id: "14", videoId: "dQw4w9WgXcQ", title: "Speedrun World Record", views: 1300000 },
  ],
  "People & Blogs": [
    { id: "15", videoId: "dQw4w9WgXcQ", title: "Day in My Life", views: 1900000 },
    { id: "16", videoId: "dQw4w9WgXcQ", title: "Transformation Story", views: 850000 },
  ],
  Comedy: [
    { id: "17", videoId: "dQw4w9WgXcQ", title: "Stand-up Special", views: 2800000 },
    { id: "18", videoId: "dQw4w9WgXcQ", title: "Prank Compilation", views: 1400000 },
  ],
  Entertainment: [
    { id: "19", videoId: "dQw4w9WgXcQ", title: "Movie Trailer Reaction", views: 2100000 },
    { id: "20", videoId: "dQw4w9WgXcQ", title: "Celebrity Interview", views: 1000000 },
  ],
  "News & Politics": [
    { id: "21", videoId: "dQw4w9WgXcQ", title: "Breaking News Coverage", views: 1700000 },
    { id: "22", videoId: "dQw4w9WgXcQ", title: "Political Analysis", views: 800000 },
  ],
  "How-to & Style": [
    { id: "23", videoId: "dQw4w9WgXcQ", title: "Makeup Tutorial", views: 2400000 },
    { id: "24", videoId: "dQw4w9WgXcQ", title: "DIY Home Decor", views: 1150000 },
  ],
  Education: [
    { id: "25", videoId: "dQw4w9WgXcQ", title: "Physics Explained", views: 1650000 },
    { id: "26", videoId: "dQw4w9WgXcQ", title: "Language Learning Tips", views: 720000 },
  ],
  "Science & Technology": [
    { id: "27", videoId: "dQw4w9WgXcQ", title: "AI Breakthrough", views: 2300000 },
    { id: "28", videoId: "dQw4w9WgXcQ", title: "Space Exploration News", views: 1250000 },
  ],
  "Nonprofits & Activism": [
    { id: "29", videoId: "dQw4w9WgXcQ", title: "Charity Campaign", views: 1550000 },
    { id: "30", videoId: "dQw4w9WgXcQ", title: "Environmental Initiative", views: 700000 },
  ],
}

export const mockProfile: UserProfile = {
  username: "creator123",
  balance: 1250.5,
  totalEarned: 3500.75,
  transactions: [
    { id: "1", type: "earn", amount: 250.0, date: "2024-02-28", status: "completed" },
    { id: "2", type: "withdraw", amount: 100.0, date: "2024-02-25", status: "completed" },
    { id: "3", type: "earn", amount: 175.5, date: "2024-02-20", status: "completed" },
    { id: "4", type: "withdraw", amount: 300.0, date: "2024-02-15", status: "pending" },
  ],
}

export const videoCategories = [
  "Film & Animation",
  "Autos & Vehicles",
  "Music",
  "Pets & Animals",
  "Sports",
  "Travel & Events",
  "Gaming",
  "People & Blogs",
  "Comedy",
  "Entertainment",
  "News & Politics",
  "How-to & Style",
  "Education",
  "Science & Technology",
  "Nonprofits & Activism",
]


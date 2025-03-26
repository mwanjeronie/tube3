export type TabName = "home" | "explore" | "create" | "wallet" | "profile"

export interface Video {
  id: string
  videoId: string
  url: string
  targetViews: number
  currentViews: number
  actualViews: number
  budget: number
  category: string
  createdAt: string
}

export interface ExploreVideo {
  id: string
  videoId: string
  title: string
  views: number
}

export interface Transaction {
  id: string
  type: "earn" | "withdraw"
  amount: number
  date: string
  status: "completed" | "pending"
}

export interface UserProfile {
  username: string
  balance: number
  totalEarned: number
  transactions: Transaction[]
}

export interface CategoryVideos {
  [category: string]: ExploreVideo[]
}


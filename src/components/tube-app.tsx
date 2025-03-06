import type React from "react"
import { Home, Search, Plus, CreditCard, User, Play, ChevronLeft, TrendingUp, ArrowDownToLine } from "lucide-react"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TabName = "home" | "explore" | "create" | "wallet" | "profile"

interface Video {
  id: string
  videoId: string
  url: string
  targetViews: number
  currentViews: number
  budget: number
  category: string
}

interface Transaction {
  id: string
  type: "earn" | "withdraw"
  amount: number
  date: string
  status: "completed" | "pending"
}

interface UserProfile {
  username: string
  balance: number
  totalEarned: number
  transactions: Transaction[]
}

const mockVideos = {
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

const mockProfile: UserProfile = {
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

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export default function TubeApp() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [activeTab, setActiveTab] = useState<TabName>("home")
  const [videos, setVideos] = useState<Video[]>([])
  const [formData, setFormData] = useState({
    url: "",
    targetViews: 1000,
    budget: 5,
    category: "All",
  })
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [profile] = useState<UserProfile>(mockProfile)

  // Load YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
  }, [])

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault()

    const videoId = getYouTubeVideoId(formData.url)
    if (!videoId) {
      alert("Please enter a valid YouTube URL")
      return
    }

    // Create new video campaign
    const newVideo: Video = {
      id: Date.now().toString(),
      videoId,
      url: formData.url,
      targetViews: formData.targetViews,
      currentViews: 0,
      budget: formData.budget,
      category: formData.category,
    }

    setVideos((prev) => [...prev, newVideo])
    setActiveTab("home")
    setFormData({ url: "", targetViews: 1000, budget: 5, category: "All" })

    // Simulate view increment
    const viewInterval = setInterval(() => {
      setVideos((prevVideos) => {
        const updatedVideos = prevVideos.map((video) => {
          if (video.id === newVideo.id) {
            const newViews = video.currentViews + Math.floor(Math.random() * 100) + 50
            if (newViews >= video.targetViews) {
              return null
            }
            return { ...video, currentViews: newViews }
          }
          return video
        })
        return updatedVideos.filter(Boolean) as Video[]
      })
    }, 5000)

    // Cleanup interval when all views are reached
    const cleanup = setInterval(() => {
      setVideos((prevVideos) => {
        const videoExists = prevVideos.some((v) => v.id === newVideo.id)
        if (!videoExists) {
          clearInterval(viewInterval)
          clearInterval(cleanup)
        }
        return prevVideos
      })
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-purple-700 p-4">
        <h1 className="text-yellow-400 font-bold text-xl">TUBE 3.0</h1>
      </header>

      <main className="flex-1 relative overflow-auto bg-gray-50">
        {activeTab === "home" && (
          <div className="p-4 container mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.length === 0 ? (
                <div className="bg-white p-4 rounded-lg shadow col-span-full">
                  <p className="text-gray-500">No active campaigns</p>
                </div>
              ) : (
                videos.map((video) => (
                  <div key={video.id} className="bg-white rounded-lg shadow flex flex-col">
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full rounded-t-lg"
                        src={`https://www.youtube.com/embed/${video.videoId}?modestbranding=1&rel=0`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-end items-center mb-2">
                        <span className="text-sm text-gray-500">
                          {Math.round((video.currentViews / video.targetViews) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 transition-all duration-500"
                          style={{ width: `${(video.currentViews / video.targetViews) * 100}%` }}
                        />
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        {video.currentViews.toLocaleString()} / {video.targetViews.toLocaleString()} views
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <div className="max-w-md mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-purple-700 mb-6">Create Campaign</h2>
              <form className="space-y-6" onSubmit={handleCreateCampaign}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={formData.url}
                      onChange={(e) => {
                        const url = e.target.value
                        setFormData((prev) => ({ ...prev, url }))
                      }}
                      className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Paste the full YouTube video URL you want to promote</p>
                </div>

                <div>
                  <div className="flex flex-col space-y-1.5 mb-6">
                    <label htmlFor="category-select" className="text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger
                        id="category-select"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                        aria-label="Select video category"
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="w-full min-w-[200px]">
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Film & Animation">Film & Animation</SelectItem>
                        <SelectItem value="Autos & Vehicles">Autos & Vehicles</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Pets & Animals">Pets & Animals</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Travel & Events">Travel & Events</SelectItem>
                        <SelectItem value="Gaming">Gaming</SelectItem>
                        <SelectItem value="People & Blogs">People & Blogs</SelectItem>
                        <SelectItem value="Comedy">Comedy</SelectItem>
                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                        <SelectItem value="News & Politics">News & Politics</SelectItem>
                        <SelectItem value="How-to & Style">How-to & Style</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Science & Technology">Science & Technology</SelectItem>
                        <SelectItem value="Nonprofits & Activism">Nonprofits & Activism</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Choose the most relevant category for your video</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Views</label>
                    <input
                      type="number"
                      required
                      min="1000"
                      step="1000"
                      value={formData.targetViews}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, targetViews: Number.parseInt(e.target.value) }))
                      }
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="e.g. 10000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget (PI)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">π</span>
                      <input
                        type="number"
                        required
                        min="5"
                        step="5"
                        value={formData.budget}
                        onChange={(e) => setFormData((prev) => ({ ...prev, budget: Number.parseInt(e.target.value) }))}
                        className="w-full p-3 pl-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-700 text-yellow-400 py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors font-medium"
                >
                  Create Campaign
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "explore" && (
          <div className="p-4 container mx-auto max-w-[1400px]">
            {!selectedCategory ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(mockVideos).map((category) => (
                  <div
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play size={48} className="text-purple-600 opacity-50" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-purple-700">{category}</h3>
                      <p className="text-sm text-gray-500">{mockVideos[category].length} videos</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mb-6 flex items-center text-purple-700 hover:text-purple-600"
                >
                  <ChevronLeft size={20} />
                  <span className="ml-1">Back to Categories</span>
                </button>
                <h2 className="text-2xl font-bold text-purple-700 mb-6">{selectedCategory}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockVideos[selectedCategory].map((video) => (
                    <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="aspect-video">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${video.videoId}?modestbranding=1&rel=0`}
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800">{video.title}</h3>
                        <p className="text-sm text-gray-500">{video.views.toLocaleString()} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="p-4 container mx-auto max-w-3xl">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-700 mb-1">Current Balance</h3>
                  <p className="text-2xl font-bold text-purple-700">π{profile.balance.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-700 mb-1">Total Earned</h3>
                  <p className="text-2xl font-bold text-green-700">π{profile.totalEarned.toFixed(2)}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-700 mb-1">Pending</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    π
                    {profile.transactions
                      .filter((t) => t.status === "pending")
                      .reduce((acc, t) => acc + t.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-purple-700 mb-6">Transaction History</h2>
              <div className="space-y-4">
                {profile.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      {transaction.type === "earn" ? (
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <TrendingUp className="text-green-600 w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <ArrowDownToLine className="text-blue-600 w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.type === "earn" ? "Earnings" : "Withdrawal"}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.type === "earn" ? "text-green-600" : "text-blue-600"}`}>
                        {transaction.type === "earn" ? "+" : "-"}π{transaction.amount.toFixed(2)}
                      </p>
                      <p
                        className={`text-xs ${
                          transaction.status === "completed" ? "text-green-500" : "text-amber-500"
                        }`}
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="p-4 container mx-auto max-w-3xl">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
                  <User size={40} className="text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.username}</h2>
                  <p className="text-gray-500">Member since February 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-purple-700 mb-6">Campaign History</h3>
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                    <div className="w-40 flex-shrink-0">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${video.videoId}?modestbranding=1&rel=0`}
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">Campaign #{video.id}</p>
                          <p className="text-sm text-gray-500">Category: {video.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {Math.round((video.currentViews / video.targetViews) * 100)}% Complete
                          </p>
                          <p className="text-sm text-gray-500">Budget: π{video.budget}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-600 transition-all duration-500"
                            style={{ width: `${(video.currentViews / video.targetViews) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {video.currentViews.toLocaleString()} / {video.targetViews.toLocaleString()} views
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs remain unchanged */}
      </main>

      <nav className="bg-purple-700 p-2 grid grid-cols-5 gap-2">
        <NavItem
          icon={<Home size={20} />}
          label="Home"
          onClick={() => setActiveTab("home")}
          isActive={activeTab === "home"}
        />
        <NavItem
          icon={<Search size={20} />}
          label="Explore"
          onClick={() => setActiveTab("explore")}
          isActive={activeTab === "explore"}
        />
        <NavItem
          icon={<Plus size={20} />}
          label="Create"
          onClick={() => setActiveTab("create")}
          isActive={activeTab === "create"}
        />
        <NavItem
          icon={<CreditCard size={20} />}
          label="Wallet"
          onClick={() => setActiveTab("wallet")}
          isActive={activeTab === "wallet"}
        />
        <NavItem
          icon={<User size={20} />}
          label="Profile"
          onClick={() => setActiveTab("profile")}
          isActive={activeTab === "profile"}
        />
      </nav>
    </div>
  )
}

function NavItem({
  icon,
  label,
  onClick,
  isActive,
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  isActive?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg py-2 px-1 cursor-pointer transition-colors
        ${isActive ? "bg-purple-500" : "bg-purple-600 hover:bg-purple-500"}`}
      onClick={onClick}
    >
      <div className="text-yellow-400">{icon}</div>
      <span className="text-yellow-400 text-xs mt-1">{label}</span>
    </div>
  )
}


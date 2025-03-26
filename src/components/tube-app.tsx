import { useState, useEffect } from "react"
import { Home, Search, Plus, CreditCard, User } from "lucide-react"
import type { TabName, Video } from "@/types"
import { mockVideos, mockProfile } from "@/data/mock-data"
import { loadYouTubeApi } from "@/utils/youtube"

// Components
import NavItem from "@/components/nav-item"
import HomeTab from "@/components/tabs/home-tab"
import ExploreTab from "@/components/tabs/explore-tab"
import CreateTab from "@/components/tabs/create-tab"
import WalletTab from "@/components/tabs/wallet-tab"
import ProfileTab from "@/components/tabs/profile-tab"

export default function TubeApp() {
  const [activeTab, setActiveTab] = useState<TabName>("home")
  const [videos, setVideos] = useState<Video[]>([])
  const [profile] = useState(mockProfile)

  // Load YouTube IFrame API
  useEffect(() => {
    loadYouTubeApi()
  }, [])

  const handleCreateCampaign = (videoId: string, targetViews: number, budget: number, category: string) => {
    // Create new video campaign
    const newVideo: Video = {
      id: Date.now().toString(),
      videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      targetViews,
      currentViews: 0,
      actualViews: 0,
      budget,
      category,
      createdAt: new Date().toISOString(),
    }

    setVideos((prev) => [...prev, newVideo])
    setActiveTab("home")

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

  // Handle when a video is actually viewed by a user
  const handleVideoViewed = (videoId: string) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === videoId) {
          return {
            ...video,
            actualViews: video.actualViews + 1,
          }
        }
        return video
      }),
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-purple-700 p-4">
        <h1 className="text-yellow-400 font-bold text-xl">TUBE 3.0</h1>
      </header>

      <main className="flex-1 relative overflow-auto bg-gray-50">
        {activeTab === "home" && <HomeTab videos={videos} onVideoViewed={handleVideoViewed} />}
        {activeTab === "explore" && <ExploreTab mockVideos={mockVideos} />}
        {activeTab === "create" && <CreateTab onCreateCampaign={handleCreateCampaign} />}
        {activeTab === "wallet" && <WalletTab profile={profile} />}
        {activeTab === "profile" && <ProfileTab profile={profile} videos={videos} />}
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


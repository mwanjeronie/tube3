import type { Video } from "@/types"
import CampaignCard from "../campaign-card"

interface HomeTabProps {
  videos: Video[]
  onVideoViewed: (videoId: string) => void
}

export default function HomeTab({ videos, onVideoViewed }: HomeTabProps) {
  return (
    <div className="p-4 container mx-auto max-w-[1400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.length === 0 ? (
          <div className="bg-white p-4 rounded-lg shadow col-span-full">
            <p className="text-gray-500">No active campaigns</p>
          </div>
        ) : (
          videos.map((video) => <CampaignCard key={video.id} video={video} onVideoViewed={onVideoViewed} />)
        )}
      </div>
    </div>
  )
}


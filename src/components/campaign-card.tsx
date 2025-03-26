import { useState, useEffect } from "react"
import type { Video } from "@/types"
import YouTubeEmbed from "./youtube-embed"

interface CampaignCardProps {
  video: Video
  onVideoViewed: (videoId: string) => void
}

export default function CampaignCard({ video, onVideoViewed }: CampaignCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [viewCounted, setViewCounted] = useState(false)

  // Track when video is viewed
  useEffect(() => {
    if (isPlaying && !viewCounted) {
      // Count as viewed after 3 seconds of playing
      const timer = setTimeout(() => {
        onVideoViewed(video.id)
        setViewCounted(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isPlaying, viewCounted, video.id, onVideoViewed])

  return (
    <div className="bg-white rounded-lg shadow flex flex-col">
      <div className="aspect-video">
        <YouTubeEmbed
          videoId={video.videoId}
          className="rounded-t-lg"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">Campaign Progress</span>
          <span className="text-sm text-gray-500">{Math.round((video.currentViews / video.targetViews) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 transition-all duration-500"
            style={{ width: `${(video.currentViews / video.targetViews) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600 flex justify-between">
          <span>
            {video.currentViews.toLocaleString()} / {video.targetViews.toLocaleString()} views
          </span>
          <span className="text-green-600 font-medium">
            {video.actualViews > 0 ? `${video.actualViews} actual views` : ""}
          </span>
        </div>
      </div>
    </div>
  )
}


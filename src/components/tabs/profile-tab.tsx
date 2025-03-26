import { User } from "lucide-react"
import type { UserProfile, Video } from "@/types"
import YouTubeEmbed from "../youtube-embed"

interface ProfileTabProps {
  profile: UserProfile
  videos: Video[]
}

export default function ProfileTab({ profile, videos }: ProfileTabProps) {
  return (
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
            <div
              key={video.id}
              className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-md border-2 border-gray-200 hover:border-purple-200 transition-colors"
            >
              <div className="w-40 flex-shrink-0">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <YouTubeEmbed videoId={video.videoId} />
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
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-gray-600">
                      {video.currentViews.toLocaleString()} / {video.targetViews.toLocaleString()} views
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      {video.actualViews > 0 ? `${video.actualViews} actual views` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


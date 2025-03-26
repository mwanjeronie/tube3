"use client"

import { useState } from "react"
import { Play, ChevronLeft } from "lucide-react"
import type { CategoryVideos } from "@/types"
import YouTubeEmbed from "../youtube-embed"

interface ExploreTabProps {
  mockVideos: CategoryVideos
}

export default function ExploreTab({ mockVideos }: ExploreTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
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
                  <YouTubeEmbed videoId={video.videoId} />
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
  )
}


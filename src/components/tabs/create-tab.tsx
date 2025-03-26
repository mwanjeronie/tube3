"use client"

import type React from "react"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { videoCategories } from "@/data/mock-data"
import { getYouTubeVideoId } from "@/utils/youtube"

interface CreateTabProps {
  onCreateCampaign: (videoId: string, targetViews: number, budget: number, category: string) => void
}

export default function CreateTab({ onCreateCampaign }: CreateTabProps) {
  const [formData, setFormData] = useState({
    url: "",
    targetViews: 1000,
    budget: 5,
    category: "All",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const videoId = getYouTubeVideoId(formData.url)
    if (!videoId) {
      alert("Please enter a valid YouTube URL")
      return
    }

    onCreateCampaign(videoId, formData.targetViews, formData.budget, formData.category)
    setFormData({ url: "", targetViews: 1000, budget: 5, category: "All" })
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-purple-700 mb-6">Create Campaign</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                  {videoCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
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
                onChange={(e) => setFormData((prev) => ({ ...prev, targetViews: Number.parseInt(e.target.value) }))}
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
  )
}


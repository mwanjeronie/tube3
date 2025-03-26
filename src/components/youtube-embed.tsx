"use client"

import { useRef, useEffect } from "react"

interface YouTubeEmbedProps {
  videoId: string
  className?: string
  onPlay?: () => void
  onPause?: () => void
}

export default function YouTubeEmbed({ videoId, className = "", onPlay, onPause }: YouTubeEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Listen for messages from the YouTube iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return

      try {
        const data = JSON.parse(event.data)
        if (data.event === "onStateChange") {
          // State 1 is playing
          if (data.info === 1 && onPlay) {
            onPlay()
          }
          // State 2 is paused
          else if (data.info === 2 && onPause) {
            onPause()
          }
        }
      } catch (e) {
        // Not a JSON message or not from YouTube
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [onPlay, onPause])

  return (
    <iframe
      ref={iframeRef}
      className={`w-full h-full ${className}`}
      src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&enablejsapi=1`}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}


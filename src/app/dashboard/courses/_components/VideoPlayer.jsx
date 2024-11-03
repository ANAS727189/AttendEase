import React from 'react'

export default function VideoPlayer({videoSrc}) {
  return (
    <div className="relative pt-[56.25%]">
      <iframe
        src={videoSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ProjectHero({ thumbnailUrl, title }) {
  const [height, setHeight] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setHeight(window.innerHeight)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const header = document.querySelector('header')
    if (header) {
      header.style.transition = 'none'
      header.style.transform = 'translateY(-100%)'
    }

    const timer = setTimeout(() => {
      if (header) {
        header.style.transition = 'transform 0.8s ease'
        header.style.transform = 'translateY(0)'
      }
      setVisible(true)
      document.body.classList.add('project-entered')
    }, 2000)

    return () => {
      clearTimeout(timer)
      if (header) {
        header.style.transition = ''
        header.style.transform = ''
      }
      document.body.classList.remove('project-entered')
    }
  }, [])

  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.8s ease',
  }

  return (
    <div
      className="relative w-full overflow-hidden bg-neutral-900 -mt-[100px]"
      style={{ height: height ? `${height}px` : '100dvh' }}
    >
      {/* Thumbnail */}
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover object-center"
          priority
        />
      )}

      {/* Scroll chevron */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce flex items-center justify-center w-14 h-14 rounded-full bg-white/30 backdrop-blur-md backdrop-saturate-150"
        style={fadeStyle}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  )
}

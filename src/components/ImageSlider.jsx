'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

export default function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0)
  const startX = useRef(null)
  const deltaX = useRef(0)
  const [dragOffset, setDragOffset] = useState(0)
  const isDragging = useRef(false)

  if (!images?.length) return null

  const count = images.length

  const goTo = (index) => {
    setCurrent((index + count) % count)
    setDragOffset(0)
  }

  const prev = () => goTo(current - 1)
  const next = () => goTo(current + 1)

  const dragStart = (x) => {
    startX.current = x
    deltaX.current = 0
    isDragging.current = true
  }

  const dragMove = (x) => {
    if (!isDragging.current) return
    deltaX.current = x - startX.current
    setDragOffset(deltaX.current)
  }

  const dragEnd = () => {
    if (!isDragging.current) return
    if (Math.abs(deltaX.current) > 50) {
      deltaX.current < 0 ? next() : prev()
    } else {
      setDragOffset(0)
    }
    isDragging.current = false
    deltaX.current = 0
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div
        className="relative aspect-video overflow-hidden bg-neutral-100 rounded-lg cursor-grab active:cursor-grabbing touch-none select-none"
        onTouchStart={(e) => dragStart(e.touches[0].clientX)}
        onTouchMove={(e) => dragMove(e.touches[0].clientX)}
        onTouchEnd={dragEnd}
        onMouseDown={(e) => dragStart(e.clientX)}
        onMouseMove={(e) => dragMove(e.clientX)}
        onMouseUp={dragEnd}
        onMouseLeave={dragEnd}
      >
        {/* Slide track */}
        <div
          className="flex h-full"
          style={{
            width: `${count * 100}%`,
            transform: `translateX(calc(${-current * (100 / count)}% + ${dragOffset}px))`,
            transition: isDragging.current ? 'none' : 'transform 0.4s ease',
          }}
        >
          {images.map((image, i) => (
            <div
              key={i}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / count}%` }}
            >
              <Image
                src={urlFor(image).width(1200).height(675).url()}
                alt={image.alt || `Slide ${i + 1}`}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>

      {count > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center text-black hover:opacity-50 transition-opacity"
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex gap-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-3 h-3 rounded-full border-2 border-black transition-colors"
                style={{ backgroundColor: i === current ? 'black' : 'transparent' }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center text-black hover:opacity-50 transition-opacity"
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

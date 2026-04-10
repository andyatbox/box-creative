'use client'

import { useEffect } from 'react'

export default function ProjectAnimator() {
  useEffect(() => {
    const header = document.querySelector('header')
    if (!header) return

    // Start: header hidden above, no transition so it snaps instantly
    header.style.transition = 'none'
    header.style.transform = 'translateY(-100%)'

    const timer = setTimeout(() => {
      // Animate both elements in after 2 seconds
      header.style.transition = 'transform 0.8s ease'
      header.style.transform = 'translateY(0)'
      document.body.classList.add('project-entered')
    }, 2000)

    return () => {
      clearTimeout(timer)
      header.style.transition = ''
      header.style.transform = ''
      document.body.classList.remove('project-entered')
    }
  }, [])

  return null
}

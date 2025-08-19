'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

type Slide = { src: string; alt?: string }

type Props = {
  slides: Slide[]
  durationMs?: number
  fadeMs?: number
  className?: string
  ratio?: number
  autoPlay?: boolean
}

export default function FadeCarousel({
  slides,
  durationMs = 3000,
  fadeMs = 600,
  className = '',
  ratio = 16 / 9,
  autoPlay = true,
}: Props) {
  const [index, setIndex] = useState(0)
  const [isPaused, setPaused] = useState(false)
  const timerRef = useRef<number | null>(null)

  const safeSlides = useMemo(() => slides.filter(Boolean), [slides])
  const next = () => setIndex((i) => (i + 1) % safeSlides.length)
  const prev = () => setIndex((i) => (i - 1 + safeSlides.length) % safeSlides.length)

  useEffect(() => {
    if (!autoPlay || isPaused || safeSlides.length <= 1) return
    timerRef.current && window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(next, durationMs)
    return () => timerRef.current && window.clearInterval(timerRef.current)
  }, [autoPlay, isPaused, durationMs, safeSlides.length])

  if (safeSlides.length === 0) return null

  const paddingTop = `${(1 / ratio) * 100}%`

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div style={{ paddingTop }} />

      {safeSlides.map((s, i) => (
        <div
          key={s.src + i}
          className="absolute inset-0"
          aria-hidden={i !== index}
        >
          <Image
            src={s.src}
            alt={s.alt ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            priority={i === index || i === (index + 1) % safeSlides.length}
            className="object-cover transition-opacity ease-in-out"
            style={{
              opacity: i === index ? 1 : 0,
              transitionDuration: `${fadeMs}ms`,
            }}
          />
        </div>
      ))}

      {/* 前へ / 次へ */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-3 py-2 hover:bg-black/60"
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-3 py-2 hover:bg-black/60"
      >
        ›
      </button>

      {/* インジケータ */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {safeSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index
                ? 'w-6 bg-white'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

// Assets
import d1 from '../assets/desktop-banner1.png'
import d2 from '../assets/desktop-banner2.png'
import d3 from '../assets/desktop-banner3.png'
import m1 from '../assets/mobail-banner1.png'
import m2 from '../assets/mobail-baaner2.png'
import m3 from '../assets/mobail-banner3.png'

const slides = [
  { desktop: d1, mobile: m1, alt: 'Banner 1' },
  { desktop: d2, mobile: m2, alt: 'Banner 2' },
  { desktop: d3, mobile: m3, alt: 'Banner 3' },
]

export default function HeroSlider() {
  const containerRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newIndex = 0;
    if (latest >= 0.66) {
      newIndex = 2;
    } else if (latest >= 0.33) {
      newIndex = 1;
    }

    if (newIndex !== current) {
      setDirection(newIndex > current ? 1 : -1)
      setCurrent(newIndex)
    }
  })

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: '300vh' }}
    >
      {/* 
        PREMIUM FULL-SCREEN SLIDER:
        - h-[calc(100vh-64px)] ensures it fits perfectly between navbar and screen bottom.
      */}
      <div className="sticky top-[64px] w-full h-[calc(100vh-64px)] overflow-hidden bg-[#fdfaf5]">
        
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              initial={{ y: '100%', scale: 1.1, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: '-10%', scale: 0.95, opacity: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1], // Custom premium ease out
                opacity: { duration: 0.8 }
              }}
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <picture className="w-full h-full flex items-center justify-center">
                <source media="(max-width: 768px)" srcSet={slides[current].mobile} />
                <img
                  src={slides[current].desktop}
                  alt={slides[current].alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top select-none pointer-events-none"
                />
              </picture>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-500 ${current === i
                  ? 'bg-maroon-700 h-10 shadow-lg'
                  : 'bg-black/10 h-2'
                  }`}
              />
            ))}
          </div>

          {/* Animation Hint - Positioned perfectly near the bottom of the screen */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 opacity-40">
            <div className="w-[1px] h-12 bg-gradient-to-b from-maroon-700 to-transparent animate-pulse" />
          </div>

          {/* ─── Integrated Marquee Strip ─── */}
          <div className="absolute bottom-0 w-full bg-gold py-2 overflow-hidden z-40 border-t border-white/20">
            <div className="flex animate-marquee whitespace-nowrap">
              {Array(4).fill([
                '🪷 Jan Seva, Desh Vikas',
                '🗳️ Join Lok Kalyan Party',
                '🌾 Farmers First Policy',
                '💪 Youth Empowerment',
                '🏥 Universal Healthcare',
                '📚 Education for All',
              ]).flat().map((text, i) => (
                <span key={i} className="font-heading font-bold text-maroon-800 mx-8 text-[11px] tracking-wide">
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

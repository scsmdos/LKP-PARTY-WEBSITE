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
    if (latest >= 0.8) {
      newIndex = 2;
    } else if (latest >= 0.4) {
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
      style={{ height: '200vh' }}
    >
      {/* 
        PREMIUM FULL-SCREEN SLIDER FIX: 
        - top-[64px] exactly aligns with the Navbar border so there is zero gap.
        - h-[calc(100vh-64px)] makes the slider reach the EXACT bottom of the laptop screen! 
      */}
      <div className="sticky top-[64px] w-full h-[calc(100vh-64px)] overflow-hidden bg-[#fdfaf5]">
        
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              initial={{ y: direction > 0 ? '100%' : '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: direction > 0 ? '-100%' : '100%' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <picture className="w-full h-full">
                <source media="(max-width: 768px)" srcSet={slides[current].mobile} />
                <img
                  src={slides[current].desktop}
                  alt={slides[current].alt}
                  loading="lazy"
                  decoding="async"
                  /* 
                    Using 'object-cover' perfectly fills the laptop screen space. 
                    'object-center' ensures central focus so important elements avoid getting cut.
                  */
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 opacity-40">
            <div className="w-[1px] h-12 bg-gradient-to-b from-maroon-700 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

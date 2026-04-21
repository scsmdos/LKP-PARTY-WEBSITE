import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

// Local Assets
import imgL1 from '../assets/abhimanyu-kumar-singh.png'
import imgL2 from '../assets/Kunal Kumar Singh.jpeg'
import imgL3 from '../assets/Sachin Singh.jpeg'
import imgL4 from '../assets/Mukesh Kr Dubey.jpeg'
import imgAbout from '../assets/about.png'

const photos = [
  { id: 101, src: imgL1, caption: 'National President Abhimanyu Kumar Singh at Patna Meet', category: 'Events' },
  { id: 102, src: imgL2, caption: 'Kunal Kumar Singh during Youth Outreach', category: 'Campaigns' },
  { id: 103, src: imgL3, caption: 'Sachin Singh at District Convention', category: 'Events' },
  { id: 104, src: imgL4, caption: 'Mukesh Kr Dubey - Public Dialogue Series', category: 'Campaigns' },
  { id: 105, src: imgAbout, caption: 'LKP Leadership Collective — Strategic Session', category: 'Events' },
]

const categories = ['All', 'Events', 'Rallies', 'Campaigns']

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'All' ? photos : photos.filter((p) => p.category === filter)
  const currentIdx = lightbox ? filtered.findIndex((p) => p.id === lightbox.id) : -1

  const goPrev = () => {
    if (currentIdx > 0) setLightbox(filtered[currentIdx - 1])
  }
  const goNext = () => {
    if (currentIdx < filtered.length - 1) setLightbox(filtered[currentIdx + 1])
  }

  return (
    <main>
      <PageHero
        title="Photo Gallery"
        subtitle="Capturing the spirit, energy and impact of Lok Kalyan Party across India."
        breadcrumb={[{ label: 'Gallery' }]}
      />

      <SectionWrapper className="bg-white !py-8 md:!py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-nowrap gap-1 sm:gap-2 justify-center mb-6 overflow-hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-heading font-semibold text-[10px] sm:text-[11px] px-3 sm:px-5 py-2 rounded-md border-2 transition-all duration-300 whitespace-nowrap ${
                  filter === cat
                    ? 'bg-maroon-600 text-white border-maroon-600'
                    : 'border-gray-200 text-gray-500 hover:border-maroon-400 hover:text-maroon-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence>
              {filtered.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setLightbox(photo)}
                  className="relative overflow-hidden rounded-lg cursor-pointer group aspect-square"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-maroon-900/0 group-hover:bg-maroon-900/50 transition-all duration-400 flex items-end p-3">
                    <p className="text-white font-heading font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.caption}
                    </p>
                  </div>
                  <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-body px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.category}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-white text-xl hover:text-gold transition-colors z-10" onClick={() => setLightbox(null)}>
              <FaTimes />
            </button>
            {currentIdx > 0 && (
              <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gold text-2xl transition-colors z-10" onClick={(e) => { e.stopPropagation(); goPrev() }}>
                <FaChevronLeft />
              </button>
            )}
            {currentIdx < filtered.length - 1 && (
              <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gold text-2xl transition-colors z-10" onClick={(e) => { e.stopPropagation(); goNext() }}>
                <FaChevronRight />
              </button>
            )}
            <motion.div
              key={lightbox.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <img src={lightbox.src} alt={lightbox.caption} className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
              <p className="text-center text-white/80 font-body text-xs mt-3">{lightbox.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

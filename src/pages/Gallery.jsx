import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80', caption: 'National Convention 2026', category: 'Events' },
  { id: 2, src: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80', caption: 'Youth Rally — New Delhi', category: 'Rallies' },
  { id: 3, src: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=800&q=80', caption: 'Party Anniversary Celebration', category: 'Events' },
  { id: 4, src: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80', caption: 'Ujjwal Kisan Yojana — Field Visit', category: 'Campaigns' },
  { id: 5, src: 'https://images.unsplash.com/photo-1620293023640-0e56fd0e62e5?w=800&q=80', caption: 'Women Empowerment Conclave', category: 'Events' },
  { id: 6, src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', caption: 'Digital Bharat Launch', category: 'Campaigns' },
  { id: 7, src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80', caption: 'Scholarship Distribution Ceremony', category: 'Events' },
  { id: 8, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', caption: 'Sports for Youth Initiative', category: 'Campaigns' },
  { id: 9, src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', caption: 'Mobile Health Clinic Launch', category: 'Campaigns' },
  { id: 10, src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80', caption: 'Village Development Tour', category: 'Rallies' },
  { id: 11, src: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&q=80', caption: 'Farmer Support Program', category: 'Campaigns' },
  { id: 12, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', caption: 'Leadership Meet 2026', category: 'Events' },
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

      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-heading font-semibold text-xs px-5 py-2 rounded-md border-2 transition-all duration-300 ${
                  filter === cat
                    ? 'bg-maroon-600 text-white border-maroon-600 shadow-maroon'
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

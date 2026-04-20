import React from 'react'
import { motion } from 'framer-motion'
import { FaNewspaper, FaExternalLinkAlt } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'National Convention 2026 — Full Address by Party President', date: 'April 10, 2026' },
  { id: 'LXb3EKWsInQ', title: 'Youth Integration Rally — Live Coverage from New Delhi', date: 'April 5, 2026' },
  { id: 'jNQXAC9IVRw', title: 'Farmers Policy Launch — Press Conference', date: 'March 28, 2026' },
  { id: 'BRRolKTlF6Q', title: 'Mahila Shakti Abhiyan — 100K SHG Milestone Celebration', date: 'March 20, 2026' },
]

const pressReleases = [
  { date: 'April 18, 2026', title: 'LKP launches healthcare-for-all initiative', source: 'The Hindu', link: '#' },
  { date: 'April 15, 2026', title: 'LKP scholarship scheme — 50,000 beneficiaries', source: 'Indian Express', link: '#' },
  { date: 'April 12, 2026', title: 'Farmer rally draws historic crowd at Jantar Mantar', source: 'NDTV', link: '#' },
  { date: 'April 8, 2026', title: 'Digital Bharat MoU signed with 5 tech giants', source: 'Economic Times', link: '#' },
  { date: 'April 5, 2026', title: 'LKP\'s 100-day plan receives national attention', source: 'Hindustan Times', link: '#' },
  { date: 'April 1, 2026', title: 'Women Wing registers 100,000th SHG', source: 'Business Standard', link: '#' },
]

export default function Media() {
  return (
    <main>
      <PageHero
        title="Media Center"
        subtitle="Videos, press releases, and official statements from Lok Kalyan Party."
        breadcrumb={[{ label: 'Media' }]}
      />

      {/* Video Section */}
      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-body text-gold font-semibold tracking-widest uppercase text-xs">Watch & Share</span>
            <h2 className="section-title mt-2 gold-underline">Featured Videos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="rounded-lg overflow-hidden shadow-md"
              >
                <div className="aspect-video bg-gray-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    className="w-full h-full"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="bg-white p-4 border-t-2 border-gold">
                  <p className="font-body text-gray-400 text-[10px] uppercase mb-1">{v.date}</p>
                  <h3 className="font-heading font-bold text-maroon-700 text-xs leading-snug">{v.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Press Coverage */}
      <SectionWrapper className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-body text-gold font-semibold tracking-widest uppercase text-xs">In the News</span>
            <h2 className="section-title mt-2 gold-underline">Press Coverage</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pressReleases.map((p, i) => (
              <motion.a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all border border-transparent hover:border-gold/30 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-maroon-50 flex items-center justify-center text-maroon-600 flex-shrink-0">
                    <FaNewspaper className="text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="bg-gold/10 text-gold font-heading font-bold text-[9px] px-2 py-0.5 rounded-sm uppercase">{p.source}</span>
                      <FaExternalLinkAlt className="text-gray-300 group-hover:text-gold transition-colors text-[10px] flex-shrink-0" />
                    </div>
                    <h3 className="font-heading font-bold text-maroon-700 text-xs mb-1 group-hover:text-maroon-500 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="font-body text-gray-400 text-[9px] uppercase">{p.date}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}

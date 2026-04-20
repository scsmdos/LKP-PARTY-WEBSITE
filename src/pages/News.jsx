import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

const allNews = [
  {
    id: 1, category: 'National', date: 'April 18, 2026',
    title: 'Lok Kalyan Party launches nationwide healthcare initiative for rural India',
    excerpt: 'A groundbreaking program to bring mobile clinics and telemedicine to over 10,000 villages.',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    featured: true,
  },
  {
    id: 2, category: 'Youth', date: 'April 15, 2026',
    title: 'LKP announces 50,000 scholarship scheme for meritorious students from rural backgrounds',
    excerpt: 'Full funding for higher education including engineering, medical and management degrees.',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    featured: false,
  },
  {
    id: 3, category: 'Farmers', date: 'April 12, 2026',
    title: 'Massive farmer rally in New Delhi draws thousands from 15 states',
    excerpt: 'Party president unveils new agricultural policy with MSP guarantees and crop insurance reforms.',
    img: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80',
    featured: false,
  },
  {
    id: 4, category: 'Women', date: 'April 10, 2026',
    title: 'Mahila Shakti Abhiyan crosses milestone — 100,000 SHGs registered nationwide',
    excerpt: 'The women-led self-help group movement reaches a new peak with ₹500cr fund allocation.',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
    featured: false,
  },
  {
    id: 5, category: 'National', date: 'April 8, 2026',
    title: 'LKP signs MoU with 5 tech companies for Digital Bharat Abhiyan expansion',
    excerpt: 'New partnerships will bring high-speed internet to 20,000 additional villages by year end.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    featured: false,
  },
  {
    id: 6, category: 'Youth', date: 'April 5, 2026',
    title: 'Youth Wing hosts national debate competition with 5,000 participants',
    excerpt: 'Annual "Yuva Awaaz" competition empowers young voices on national policy issues.',
    img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80',
    featured: false,
  },
]

const categories = ['All', 'National', 'Youth', 'Farmers', 'Women']

export default function News() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = allNews.filter((n) => {
    const matchCat = filter === 'All' || n.category === filter
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main>
      <PageHero
        title="News & Blog"
        subtitle="Latest updates, press releases and stories from Lok Kalyan Party."
        breadcrumb={[{ label: 'News & Blog' }]}
      />

      <SectionWrapper className="bg-white !py-8 md:!py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter Bar: Centered on Mobile */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`font-heading font-semibold text-[10px] sm:text-[11px] px-5 py-2 rounded-md border-2 transition-all ${
                    filter === cat
                      ? 'bg-maroon-700 text-white border-maroon-700 shadow-md'
                      : 'border-gray-100 text-gray-500 hover:border-maroon-400 hover:text-maroon-700'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-auto flex justify-center">
              <FaSearch className="absolute left-6 md:left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-12 md:pl-9 py-2 w-full md:w-64 text-sm rounded-md shadow-sm border-gray-100 placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-gold/30 transition-all flex flex-col group"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={n.img}
                    alt={n.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-maroon-700 text-white font-body font-bold text-[9px] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      {n.category}
                    </span>
                    {n.featured && (
                      <span className="bg-gold text-maroon-900 font-body font-bold text-[9px] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="font-body text-gray-400 text-[10px] uppercase mb-2">{n.date}</p>
                  <h3 className="font-heading font-bold text-maroon-700 text-base leading-tight mb-3 line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="font-body text-gray-500 text-xs leading-relaxed mb-5 line-clamp-2">{n.excerpt}</p>
                  <button className="mt-auto font-heading font-bold text-gold text-xs inline-flex items-center gap-1 hover:gap-2 transition-all">
                    READ MORE <FaArrowRight className="text-[10px]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-gray-400 text-lg">No articles found. Try a different filter.</p>
            </div>
          )}
        </div>
      </SectionWrapper>
    </main>
  )
}

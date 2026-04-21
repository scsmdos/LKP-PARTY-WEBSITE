import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

const allNews = [
  {
    id: 1, category: 'Employment', date: 'April 20, 2026',
    title: "LKP's 10 Lakh Jobs Blueprint: Reviving Bihar's Industrial Hubs",
    excerpt: 'LKP leadership unveils a massive plan to re-open closed sugar mills and set up IT parks to provide local employment to Bihar youths.',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
    featured: true,
  },
  {
    id: 2, category: 'Education', date: 'April 18, 2026',
    title: "Transforming Bihar's Classrooms: 500 Smart Model Schools Announced",
    excerpt: 'Under the "Nalanda Revival" initiative, every block in Bihar will feature a world-class digital learning center by 2027.',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    featured: false,
  },
  {
    id: 3, category: 'Migration Fix', date: 'April 15, 2026',
    title: '"Bihar se Palayan Rokna" — LKP Pledges North Bihar Economic Corridor',
    excerpt: 'To stop the mass migration of laborers, LKP plans to incentivize 10,000 SMEs in North Bihar to create local wealth.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    featured: false,
  },
  {
    id: 4, category: 'Environment', date: 'April 12, 2026',
    title: 'Harit Bihar Mission: 25 Million Trees to be Planted on Ganga Banks',
    excerpt: 'A massive environmental drive to clean Mother Ganga and create green buffers across major Bihar cities starting this monsoon.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    featured: false,
  },
  {
    id: 5, category: 'Employment', date: 'April 10, 2026',
    title: "Bihar Skill Hubs: Empoweing 5 Lakh Rural Youths in First 100 Days",
    excerpt: 'Vocational training centers in Muzaffarpur and Bhagalpur to be scaled nationwide to improve global job prospects.',
    img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
    featured: false,
  },
  {
    id: 6, category: 'Education', date: 'April 05, 2026',
    title: 'Digital University Bihar: Bringing World-Class Learning to Remote Villages',
    excerpt: 'LKP promises 100% scholarship for high-tech courses through Bihar’s first decentralized Digital University.',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    featured: false,
  },
]

const categories = ['All', 'Education', 'Employment', 'Environment', 'Migration Fix']

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
                <Link to={`/news/${n.id}`} className="relative overflow-hidden h-44 block">
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
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="font-body text-gray-400 text-[10px] uppercase mb-2">{n.date}</p>
                  <Link to={`/news/${n.id}`} className="hover:text-gold transition-colors">
                    <h3 className="font-heading font-bold text-maroon-700 text-base leading-tight mb-3 line-clamp-2">
                      {n.title}
                    </h3>
                  </Link>
                  <p className="font-body text-gray-500 text-xs leading-relaxed mb-5 line-clamp-2">{n.excerpt}</p>
                  <Link to={`/news/${n.id}`} className="mt-auto font-heading font-bold text-gold text-xs inline-flex items-center gap-1 hover:gap-2 transition-all">
                    READ MORE <FaArrowRight className="text-[10px]" />
                  </Link>
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

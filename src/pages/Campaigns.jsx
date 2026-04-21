import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

const campaigns = [
  {
    emoji: '💧', title: 'Har Ghar Nal Jal', tag: 'Ongoing',
    desc: 'Ensuring clean drinking water to every rural household. Partnering with state governments to complete piped water networks in 10,000 villages across 15 states.',
    progress: 72, impact: '7.2M families', start: 'Jan 2023',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
  },
  {
    emoji: '📱', title: 'Digital Bharat Abhiyan', tag: 'Active',
    desc: 'Free internet, digital literacy training, and device access for 50 million rural citizens. Partnering with tech enterprises for subsidized devices.',
    progress: 58, impact: '4.1M trained', start: 'Mar 2023',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  },
  {
    emoji: '🌾', title: 'Ujjwal Kisan Yojana', tag: 'Flagship',
    desc: 'Modern tools, subsidized seeds, guaranteed MSP, crop insurance and direct bank transfer of support funds to 20 million farmers across India.',
    progress: 84, impact: '8.4M farmers', start: 'Jun 2022',
    img: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80',
  },
  {
    emoji: '🏥', title: 'Sabka Swasthya', tag: 'Active',
    desc: 'Mobile health clinics in 5,000 villages, free medicine for BPL families, telemedicine in tribal areas, and new district hospitals in 8 states.',
    progress: 45, impact: '2.3M beneficiaries', start: 'Apr 2024',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
  },
  {
    emoji: '📚', title: 'Shiksha Mitra', tag: 'Active',
    desc: 'Scholarships for 50,000 students, upgrade of 2,000 government schools with smart classrooms, mid-day meal improvements and teacher training.',
    progress: 61, impact: '50K+ scholars', start: 'Jul 2023',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
  },
  {
    emoji: '💪', title: 'Mahila Shakti Abhiyan', tag: 'New',
    desc: "500 women skill centers, legal aid cells, self-help group microfinance, leadership training and zero-tolerance policy on domestic violence.",
    progress: 33, impact: '180K women', start: 'Jan 2025',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
  },
]

export default function Campaigns() {
  return (
    <main>
      <PageHero
        title="Campaigns & Initiatives"
        subtitle="Real actions. Real impact. Transforming lives across India through relentless on-ground work."
        breadcrumb={[{ label: 'Campaigns' }]}
      />

      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-body text-gold font-semibold tracking-widest uppercase text-xs">On the Ground</span>
            <h2 className="section-title mt-2 gold-underline">Active Campaigns</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaigns.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 to-transparent" />
                  <span className="absolute top-3 right-3 text-[10px] font-heading font-bold px-2 py-1 rounded-sm bg-maroon-700 text-white uppercase shadow-lg">
                    {c.tag}
                  </span>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-2xl">{c.emoji}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading font-bold text-maroon-700 text-lg">{c.title}</h3>
                    <span className="font-body text-[10px] text-gray-400 mt-1 uppercase">Since {c.start}</span>
                  </div>
                  <p className="font-body text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{c.desc}</p>

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-bold text-maroon-700 text-xs tracking-wide">Impact: <span className="text-gold uppercase">{c.impact}</span></span>
                    <span className="font-heading font-bold text-gold text-xs">{c.progress}%</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-sm overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-maroon-600 to-gold rounded-sm"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Join Campaign CTA */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold text-maroon-700 mb-4">Want to Volunteer?</h2>
          <p className="font-body text-gray-600 mb-8">Join thousands of volunteers working on the ground to make our campaigns successful.</p>
          <Link to="/join-us" className="btn-primary gap-2 !px-8 !py-3">
            🙌 Become a Volunteer
          </Link>
        </div>
      </section>
    </main>
  )
}

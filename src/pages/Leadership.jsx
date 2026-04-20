import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTwitter, FaFacebookF, FaInstagram, FaTimes } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

import l1 from '../assets/abhimanyu-kumar-singh.png'
import l2 from '../assets/Sachin Singh.jpeg'
import l3 from '../assets/Mukesh Kr Dubey.jpeg'
import l4 from '../assets/Kunal Kumar Singh.jpeg'

const leaders = [
  {
    name: 'Abhimanyu Kumar Singh',
    role: 'National President',
    state: 'Bihar',
    years: '15+ years in public leadership',
    img: l1,
    bio: 'Abhimanyu Kumar Singh is the visionary founder and National President of Lok Kalyan Party. With deep roots in the administrative and social fabric of Bihar, he has pioneered movements for agricultural reform and rural development. His leadership is defined by a commitment to restoring Bihar\'s historical dignity.',
    achievements: ['Founded LKP with Jan-Seva Vision', 'Led farmers\' rights movements', 'Youth empowerment icon of Bihar', 'Special Economic Reform Strategist'],
    social: { twitter: '#', fb: '#', ig: '#' },
  },
  {
    name: 'Sachin Singh',
    role: 'State President',
    state: 'Bihar',
    years: '12+ years in grassroots politics',
    img: l2,
    bio: 'Sachin Singh leads the party\'s mission across the 38 districts of Bihar. A native of Rohtas, he has been at the forefront of educational infrastructure reform and has successfully established LKP as the primary voice of the common man in the state.',
    achievements: ['Organized 38 district party units', 'State-wide education awareness drive', 'Grassroots mobilizer award', 'Pioneer of village-level governance'],
    social: { twitter: '#', fb: '#', ig: '#' },
  },
  {
    name: 'Mukesh Kr Dubey',
    role: 'State Vice President',
    state: 'Bihar',
    years: '10+ years in social welfare',
    img: l3,
    bio: 'Mukesh Kr Dubey is a dedicated social worker and strategist who specializes in community organization. His work has been instrumental in bridging the gap between policy making and ground-level implementation in rural Bihar.',
    achievements: ['Led rural healthcare campaigns', 'Policy draughtsman for state reforms', 'Key community organizer', 'Champion of Bihar rural industries'],
    social: { twitter: '#', fb: '#', ig: '#' },
  },
  {
    name: 'Kunal Kumar Singh',
    role: 'State General Secretary',
    state: 'Bihar',
    years: '8+ years in youth leadership',
    img: l4,
    bio: 'Kunal Kumar Singh represents the young and dynamic face of LKP. He manages the party\'s organizational operations and serves as the strategic link between the central leadership and the youth wings across Bihar.',
    achievements: ['LKP Youth Wing Architect', 'Strategic organizational manager', 'Social media outreach lead', 'Young leader of Mithila region'],
    social: { twitter: '#', fb: '#', ig: '#' },
  },
]

export default function Leadership() {
  const [selected, setSelected] = useState(null)

  return (
    <main>
      <PageHero
        title="Our Leadership"
        subtitle="The experienced, dedicated individuals who guide and shape Lok Kalyan Party."
        breadcrumb={[{ label: 'Leadership' }]}
      />

      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="font-body text-gold font-semibold tracking-widest uppercase text-xs">The People We Trust</span>
            <h2 className="section-title mt-2 gold-underline">National Leadership</h2>
            <p className="section-subtitle">Click on any leader to know more about their journey and achievements.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                onClick={() => setSelected(leader)}
                className="cursor-pointer group bg-white rounded-lg shadow-md overflow-hidden border border-transparent hover:border-gold/30 transition-all hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-maroon-700 text-lg mb-1">{leader.name}</h3>
                  <p className="font-body text-gold font-semibold text-xs mb-2">{leader.role} • {leader.state}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Leader Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-maroon-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-xl overflow-hidden max-w-xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="relative h-60">
                <img src={selected.img} alt={selected.name} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 to-transparent" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white hover:text-maroon-900 transition-colors">
                  <FaTimes className="text-sm" />
                </button>
                <div className="absolute bottom-5 left-6">
                  <h2 className="font-heading font-bold text-white text-xl">{selected.name}</h2>
                  <p className="font-body text-gold text-xs">{selected.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="font-body text-gray-600 leading-relaxed mb-6 text-sm">{selected.bio}</p>
                <h4 className="font-heading font-bold text-maroon-700 text-base mb-3">Achievements</h4>
                <ul className="space-y-2">
                  {selected.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2 font-body text-gray-600 text-xs">
                      <span className="text-gold">•</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

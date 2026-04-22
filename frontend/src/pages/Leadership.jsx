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
    name: 'Kunal Kumar (Bittu Singh)',
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
    <main className="bg-slate-50">
      <PageHero
        title="Our Leadership"
        subtitle="The visionaries leading the Lok Kalyan Party towards a prosperous Bihar and India."
        breadcrumb={[{ label: 'Leadership' }]}
      />

      <SectionWrapper className="bg-slate-50 relative pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="font-body text-gold font-bold tracking-[4px] uppercase text-xs">The Pillars of LKP</span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-maroon-800 mt-2">National & State Leadership</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded" />
            <p className="mt-6 text-slate-500 font-body max-w-2xl mx-auto text-sm md:text-base italic leading-relaxed">
              "True leadership is not about power; it's about the responsibility to empower others for the welfare of the soil."
            </p>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid grid-cols-4 gap-6 mb-20">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onClick={() => setSelected(leader)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-gold hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative h-80 overflow-hidden bg-slate-100">
                  <img src={leader.img} alt={leader.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 text-center flex-grow flex flex-col items-center">
                  <h3 className="font-heading font-extrabold text-maroon-800 text-lg mb-1">{leader.name}</h3>
                  <p className="font-body text-gold text-xs font-bold uppercase tracking-widest">{leader.role}</p>
                  <div className="w-8 h-0.5 bg-gold/30 mx-auto my-3 group-hover:w-16 transition-all duration-500" />
                  <p className="text-sm text-slate-500 font-body italic leading-relaxed line-clamp-2 px-2">
                    {leader.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Stacking View - Sticky Full Screen */}
          <div className="lg:hidden flex flex-col -mx-4">
            {leaders.map((leader, i) => (
              <div key={leader.name} className="sticky top-0 h-screen w-full bg-slate-50 overflow-hidden">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white relative h-full w-full"
                  onClick={() => setSelected(leader)}
                >
                  {/* Full Screen Photo */}
                  <img src={leader.img} alt={leader.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                  
                  {/* Bottom Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-maroon-950 via-maroon-950/80 to-transparent flex flex-col justify-end p-8 pb-32">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <h3 className="font-heading font-black text-white text-3xl mb-1">{leader.name}</h3>
                      <p className="font-body text-gold text-sm font-black uppercase tracking-[4px] mb-4">{leader.role}</p>
                      <p className="text-white/60 font-body text-xs mb-6 font-medium italic leading-relaxed">"{leader.bio.substring(0, 120)}..."</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Leader Modal - Unified for both desktop/mobile details */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-maroon-950/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 relative h-64 md:h-auto">
                <img src={selected.img} alt={selected.name} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 md:hidden" />
                <div className="absolute bottom-6 left-6 md:hidden">
                  <h2 className="font-heading font-bold text-white text-2xl">{selected.name}</h2>
                  <p className="font-body text-gold text-xs font-bold uppercase tracking-widest">{selected.role}</p>
                </div>
              </div>
              
              <div className="md:w-3/5 p-8 md:p-12 overflow-y-auto relative">
                <button 
                  onClick={() => setSelected(null)} 
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-maroon-100 hover:text-maroon-700 transition-all z-10"
                >
                  <FaTimes />
                </button>

                <div className="hidden md:block mb-8">
                  <span className="font-body text-gold font-bold tracking-[3px] uppercase text-xs mb-2 block">{selected.name} • Profile</span>
                  <h2 className="font-heading font-black text-maroon-900 text-3xl mb-1">{selected.name}</h2>
                  <p className="font-body text-maroon-600/70 text-sm font-bold uppercase tracking-widest">{selected.role}</p>
                  <div className="w-12 h-1 bg-gold mt-4 rounded" />
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-heading font-black text-maroon-800 text-xs uppercase tracking-[2px] mb-4 flex items-center gap-2">
                       Biography
                    </h4>
                    <p className="font-body text-slate-600 leading-relaxed text-sm md:text-base">
                      {selected.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-black text-maroon-800 text-xs uppercase tracking-[2px] mb-4">
                      Key Contributions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selected.achievements.map((a, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          <span className="font-body text-slate-700 text-xs font-semibold">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex gap-4">
                      <a href={selected.social.twitter} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-500 transition-all"><FaTwitter /></a>
                      <a href={selected.social.fb} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-800 transition-all"><FaFacebookF /></a>
                      <a href={selected.social.ig} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-pink-50 hover:text-pink-600 transition-all"><FaInstagram /></a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import {
  FaGraduationCap, FaHeartbeat, FaBriefcase, FaSeedling, FaFemale, FaShieldAlt,
  FaArrowRight, FaQuoteLeft, FaPlay, FaUsers, FaFlag, FaMapMarkedAlt, FaAward,
  FaTimes, FaTwitter, FaFacebookF, FaInstagram
} from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
import logo from '../assets/logo.png'

import HeroSlider from '../components/HeroSlider'
import SectionWrapper from '../components/SectionWrapper'
import SankalpCarousel from '../components/SankalpCarousel'

import l1 from '../assets/abhimanyu-kumar-singh.png'
import l2 from '../assets/Sachin Singh.jpeg'
import l3 from '../assets/Mukesh Kr Dubey.jpeg'
import l4 from '../assets/Kunal Kumar Singh.jpeg'
import aboutImg from '../assets/about.png'
import vidhanSabha from '../assets/vidhan-sabha.png'

// Data
const values = [
  { icon: <FaGraduationCap />, title: 'Education for All', desc: 'Quality education accessible to every child, regardless of background or economic status.' },
  { icon: <FaHeartbeat />, title: 'Universal Healthcare', desc: 'Affordable and quality healthcare as a fundamental right for every Indian citizen.' },
  { icon: <FaBriefcase />, title: 'Employment Growth', desc: 'Creating 10 million jobs annually through skill development and industry partnerships.' },
  { icon: <FaSeedling />, title: 'Farmers Welfare', desc: 'Doubling farmer income through fair pricing, insurance and modern agricultural tools.' },
  { icon: <FaFemale />, title: 'Women Empowerment', desc: 'Equal rights, equal pay, and leadership opportunities for the women of India.' },
  { icon: <FaShieldAlt />, title: 'National Security', desc: 'A strong, sovereign India with robust security and global diplomatic presence.' },
]

const stats = [
  { icon: <FaUsers />, value: 50, suffix: '+', label: 'Party Units' },
  { icon: <FaFlag />, value: 12, suffix: '+', label: 'Districts Reached' },
  { icon: <FaMapMarkedAlt />, value: 5, suffix: '', label: 'Major Regions' },
  { icon: <FaAward />, value: 4, suffix: '', label: 'Seva Awards' },
]

const leaders = [
  {
    name: 'Abhimanyu Kumar Singh',
    role: 'National President',
    state: 'Bihar',
    years: '15+ years in public leadership',
    img: l1,
    quote: 'Our goal is a Bihar where every hand has work and every heart has hope.',
    bio: 'Abhimanyu Kumar Singh is the visionary founder and National President of Lok Kalyan Party. With deep roots in the administrative and social fabric of Bihar, he has pioneered movements for agricultural reform and rural development. His leadership is defined by a commitment to restoring Bihar\'s historical dignity.',
    achievements: ['Founded LKP with Jan-Seva Vision', 'Led farmers\' rights movements', 'Youth empowerment icon of Bihar', 'Special Economic Reform Strategist'],
    social: { twitter: '#', fb: '#', ig: '#' },
  },
  {
    name: 'Sachin Singh',
    role: 'State President, Bihar',
    state: 'Bihar',
    years: '12+ years in grassroots politics',
    img: l2,
    quote: 'True development starts from the villages. We are the voice of the voiceless.',
    bio: 'Sachin Singh leads the party\'s mission across the 38 districts of Bihar. A native of Rohtas, he has been at the forefront of educational infrastructure reform and has successfully established LKP as the primary voice of the common man in the state.',
    achievements: ['Organized 38 district party units', 'State-wide education awareness drive', 'Grassroots mobilizer award', 'Pioneer of village-level governance'],
    social: { twitter: '#', fb: '#', ig: '#' },
  },
  {
    name: 'Mukesh Kr Dubey',
    role: 'General Secretary',
    state: 'Bihar',
    years: '10+ years in social welfare',
    img: l3,
    quote: 'Transparency in governance is the only way to earn people\'s trust.',
    bio: 'Mukesh Kr Dubey is a dedicated social worker and strategist who specializes in community organization. His work has been instrumental in bridging the gap between policy making and ground-level implementation in rural Bihar.',
    achievements: ['Led rural healthcare campaigns', 'Policy draughtsman for state reforms', 'Key community organizer', 'Champion of Bihar rural industries'],
    social: { twitter: '#', fb: '#', ig: '#' },
  },
  {
    name: 'Kunal Kumar (Bittu Singh)',
    role: 'Chief Coordinator',
    state: 'Bihar',
    years: '8+ years in youth leadership',
    img: l4,
    quote: 'Empowering the youth and protecting our culture is our primary mission.',
    bio: 'Kunal Kumar Singh represents the young and dynamic face of LKP. He manages the party\'s organizational operations and serves as the strategic link between the central leadership and the youth wings across Bihar.',
    achievements: ['LKP Youth Wing Architect', 'Strategic organizational manager', 'Social media outreach lead', 'Young leader of Mithila region'],
    social: { twitter: '#', fb: '#', ig: '#' },
  },
]

const news = [
  {
    id: 1,
    tag: 'Employment',
    date: 'April 20, 2026',
    title: "LKP's 10 Lakh Jobs Blueprint: Reviving Bihar's Industrial Hubs",
    excerpt: 'LKP leadership unveils a massive plan to re-open closed sugar mills and set up IT parks to provide local employment.',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
  },
  {
    id: 2,
    tag: 'Education',
    date: 'April 18, 2026',
    title: "Transforming বিহার's Classrooms: 500 Smart Model Schools",
    excerpt: 'Under the "Nalanda Revival" initiative, every block in Bihar will feature a world-class digital learning center by 2027.',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  },
  {
    id: 3,
    tag: 'Migration Fix',
    date: 'April 15, 2026',
    title: '"Bihar se Palayan Rokna" — LKP Pledges Economic Corridor',
    excerpt: 'To stop the mass migration of laborers, LKP plans to incentivize 10,000 SMEs in North Bihar to create local wealth and jobs.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
  },
]

// Card animation helper
function AnimCard({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [selectedLeader, setSelectedLeader] = useState(null)

  return (
    <main>
      <HeroSlider />
      <SankalpCarousel />

      <section className="relative w-full overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 z-0">
          <img
            src={vidhanSabha}
            alt="Bihar Vidhan Sabha BG"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-gray-50/90" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimCard className="relative overflow-hidden rounded shadow-2xl">
              <img
                src={vidhanSabha}
                alt="Bihar Vidhan Sabha"
                className="w-full h-auto object-cover min-h-[300px] md:min-h-[400px]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded border border-white/20 p-2 shadow-2xl">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
            </AnimCard>

            <AnimCard delay={0.2} className="flex flex-col justify-center">
              <div className="relative">
                <span className="font-body text-gold font-bold tracking-[5px] uppercase text-[10px]">The Vision for Bihar</span>
                <h2 className="section-title mt-3 leading-tight uppercase">
                  Resolve for Bihar's Soil <br className="hidden md:block" /> and Development
                </h2>
                <div className="w-16 h-1 bg-gold mt-6 mb-8 rounded" />
                <div className="font-body text-gray-700 leading-relaxed text-sm md:text-base space-y-4">
                  <p className="text-base font-medium text-maroon-900/80 italic border-l-4 border-maroon-100 pl-4 py-1">
                    "Lok Kalyan Party was born from the sacred soil of Bihar. Our mission is to serve every citizen."
                  </p>
                  <p className="text-sm md:text-base">
                    We are not here for the politics of Delhi, but to transform the <span className="text-maroon-700 font-bold">remotest villages of Bihar</span>. Our aim is to ensure fundamental rights for all.
                  </p>
                </div>
                <div className="mt-8 flex gap-4 flex-wrap">
                  <Link to="/about" className="btn-primary text-xs group uppercase font-heading font-black tracking-widest">
                    Read More
                    <FaArrowRight className="inline-block ml-3 transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              </div>
            </AnimCard>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-body text-gold font-semibold tracking-widest uppercase text-xs">What We Stand For</span>
            <h2 className="section-title mt-2 gold-underline">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimCard key={v.title} delay={i * 0.1}>
                <div className="value-card rounded-lg">
                  <div className="w-14 h-14 rounded-lg bg-maroon-gradient text-gold text-xl flex items-center justify-center mx-auto mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-heading font-bold text-maroon-700 text-xl mb-2">{v.title}</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimCard>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-maroon-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 text-white">
            <span className="font-body text-gold font-semibold tracking-widest uppercase text-xs">Our Purpose</span>
            <h2 className="section-title mt-2 gold-underline text-white">Vision & Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Our Vision', icon: '🎯', content: "A prosperous, united, and self-reliant India where every citizen has equal access to opportunities, rights, and dignity." },
              { title: 'Our Mission', icon: '🚀', content: "To serve the people of India through responsible governance, grassroots engagement, and policy reforms." },
            ].map((item, i) => (
              <AnimCard key={item.title} delay={i * 0.2}>
                <div className="glass-card p-8 h-full rounded-lg">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-heading text-xl font-bold text-gold mb-3">{item.title}</h3>
                  <p className="font-body text-white/80 text-sm leading-relaxed">{item.content}</p>
                </div>
              </AnimCard>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <section className="bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="font-body text-gold font-bold tracking-[4px] uppercase text-xs">The Pillars of LKP</span>
            <h2 className="section-title mt-2">Our Dedicated Leadership</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="hidden lg:grid grid-cols-4 gap-6">
            {leaders.map((l, i) => (
              <div 
                key={l.name} 
                onClick={() => setSelectedLeader(l)}
                className="group cursor-pointer bg-white rounded overflow-hidden border border-slate-200 hover:border-gold hover:shadow-xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img src={l.img} alt={l.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5 text-center flex-grow flex flex-col items-center">
                  <h3 className="font-heading font-black text-maroon-800 text-[15px] xl:text-base mb-1 whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    {l.name}
                  </h3>
                  <p className="font-body text-gold text-[10px] font-bold uppercase tracking-widest h-8 flex items-center">
                    {l.role}
                  </p>
                  <div className="w-8 h-0.5 bg-gold/30 mx-auto mt-2 group-hover:w-full transition-all duration-500" />
                  <div className="mt-4 min-h-[70px] flex items-center justify-center">
                    <p className="font-body text-slate-500 text-xs leading-relaxed italic line-clamp-3">
                      "{l.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:hidden flex flex-col">
            {leaders.map((l, i) => (
              <div 
                key={l.name} 
                className="sticky top-0 h-[90vh] w-full bg-slate-200 overflow-hidden border-b border-white/20"
                onClick={() => setSelectedLeader(l)}
              >
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative h-full w-full">
                  <div className="absolute inset-0 bg-slate-900">
                    <img src={l.img} alt={l.name} className="w-full h-full object-cover object-[center_top]" />
                  </div>
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-10" />
                  <div className="absolute inset-x-0 bottom-0 z-20">
                    <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }} className="bg-white p-5 md:p-6 border-t-4 border-gold shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
                      <h3 className="font-heading font-black text-maroon-900 text-lg md:text-xl leading-tight">{l.name}</h3>
                      <p className="font-body text-gold text-[9px] font-black uppercase tracking-[2px] mt-1 mb-3">{l.role}</p>
                      <div className="relative">
                        <FaQuoteLeft className="absolute -top-1 -left-1 text-gold/15 text-2xl" />
                        <p className="font-body text-gray-700 text-[11px] md:text-xs leading-relaxed italic relative z-10 pl-5 border-l border-gold/20">{l.quote}</p>
                      </div>
                    </motion.div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent z-10" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-[#fdf3f3] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center p-6 bg-white rounded-2xl border border-maroon-100 shadow-sm">
                <div className="text-2xl mb-4 text-maroon-600 flex justify-center">{s.icon}</div>
                <div className="font-heading text-3xl md:text-4xl font-bold text-maroon-800 mb-1 tabular-nums">
                  <CountUp end={s.value} duration={2.5} separator="," suffix={s.suffix} enableScrollSpy />
                </div>
                <p className="font-body text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title gold-underline text-center mb-10">News & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <AnimCard key={n.id} delay={i * 0.1}>
                <div onClick={() => navigate(`/news/${n.id}`)} className="news-card rounded-lg block group cursor-pointer border border-transparent hover:border-gold/20 transition-all duration-300 shadow-sm hover:shadow-xl">
                  <div className="overflow-hidden h-44">
                    <img src={n.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={n.title} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-maroon-700 text-sm mb-2 leading-tight group-hover:text-gold transition-colors">{n.title}</h3>
                    <p className="font-body text-gray-500 text-xs line-clamp-2">{n.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-gold font-bold text-xs uppercase tracking-wider">Read Details <FaArrowRight className="text-[10px]" /></div>
                  </div>
                </div>
              </AnimCard>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/news" className="btn-primary">View All News</Link>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-maroon-900 relative overflow-hidden py-12">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-12 items-center text-white">
          <div className="lg:w-1/2">
            <span className="font-body text-gold font-bold tracking-[4px] uppercase text-xs">Join the Movement</span>
            <h2 className="section-title mt-4 leading-tight text-white whitespace-nowrap">Become a Karyakarta</h2>
            <p className="font-body text-white/80 text-base mt-6 leading-relaxed max-w-xl">Your time, skills and voice can change a street, a village, or the entire state of Bihar. Sign up to volunteer and serve alongside thousands.</p>
            <ul className="mt-8 space-y-3">
              {['Invitations to local Seva drives', 'Direct policy briefings & party updates', 'Training for organizers & volunteers', "Be a part of Bihar's transformation"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/90 font-body text-xs font-medium"><div className="w-1 h-1 rounded-full bg-gold" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full bg-white rounded p-8 md:p-10 shadow-2xl text-gray-900">
            <div className="mb-6"><span className="font-body text-maroon-600 font-bold tracking-widest uppercase text-xs">Volunteer Sign-up</span><h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold mt-1 whitespace-nowrap">Make a difference today.</h3></div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block font-body text-[10px] font-bold uppercase text-gray-400 mb-1 tracking-widest">Full Name</label><input type="text" placeholder="Your name" className="w-full bg-white border border-gray-200 rounded px-4 py-2 text-sm font-body focus:ring-2 focus:ring-gold transition-all outline-none" /></div>
                <div><label className="block font-body text-[10px] font-bold uppercase text-gray-400 mb-1 tracking-widest">Phone</label><input type="tel" placeholder="+91 98xx" className="w-full bg-white border border-gray-200 rounded px-4 py-2 text-sm font-body focus:ring-2 focus:ring-gold transition-all outline-none" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block font-body text-[10px] font-bold uppercase text-gray-400 mb-1 tracking-widest">Email</label><input type="email" placeholder="you@email.com" className="w-full bg-white border border-gray-200 rounded px-4 py-2 text-sm font-body focus:ring-2 focus:ring-gold transition-all outline-none" /></div>
                <div><label className="block font-body text-[10px] font-bold uppercase text-gray-400 mb-1 tracking-widest">City</label><input type="text" placeholder="e.g. Patna" className="w-full bg-white border border-gray-200 rounded px-4 py-2 text-sm font-body focus:ring-2 focus:ring-gold transition-all outline-none" /></div>
              </div>
              <button className="w-full bg-maroon-800 text-white font-heading font-black text-xs uppercase tracking-[3px] py-3 rounded hover:bg-maroon-700 transition-all shadow-xl flex items-center justify-center gap-3 mt-4 h-12">Join the Movement <FaArrowRight className="text-[9px]" /></button>
              <p className="text-[8px] text-gray-400 text-center font-body mt-6 leading-relaxed">By signing up you agree to receive communications from Lok Kalyan Party. We never share your information with third parties.</p>
            </form>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gold/20">
            {[
              { tag: 'Primary Goal', title: 'Bihar-Centric Governance', desc: 'Every policy we draft is born from the soil of Bihar, focusing on local agrarian and industrial needs.', icon: '01' },
              { tag: 'Our Promise', title: 'Total Transparency', desc: 'Digital monitoring of all public funds to ensure every paisa spent reaches the common citizen.', icon: '02' },
              { tag: 'The Future', title: 'Youth In-State Jobs', desc: 'Ending the migration crisis by building manufacturing and IT hubs across Bihar\'s major districts.', icon: '03' }
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="px-8 py-10 md:py-0 text-center md:text-left group">
                <div className="font-heading text-6xl font-black text-gold/10 mb-4 group-hover:text-gold/20 transition-all duration-700 leading-none">{p.icon}</div>
                <span className="font-body text-gold font-bold tracking-[3px] uppercase text-xs mb-2 block">{p.tag}</span>
                <h3 className="font-heading font-black text-maroon-900 text-xl mb-4 group-hover:text-maroon-600 transition-colors">{p.title}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed max-w-xs">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Leader Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-maroon-950/90 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedLeader(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 relative h-64 md:h-auto">
                <img src={selectedLeader.img} alt={selectedLeader.name} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 md:hidden" />
                <div className="absolute bottom-6 left-6 md:hidden">
                  <h2 className="font-heading font-bold text-white text-2xl">{selectedLeader.name}</h2>
                  <p className="font-body text-gold text-xs font-bold uppercase tracking-widest">{selectedLeader.role}</p>
                </div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 overflow-y-auto relative text-left">
                <button 
                  onClick={() => setSelectedLeader(null)} 
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-maroon-100 hover:text-maroon-700 transition-all z-10"
                >
                  <FaTimes />
                </button>
                <div className="hidden md:block mb-8">
                  <span className="font-body text-gold font-bold tracking-[3px] uppercase text-xs mb-2 block">{selectedLeader.name} • Profile</span>
                  <h2 className="section-title mt-2 !mb-1">{selectedLeader.name}</h2>
                  <p className="font-body text-maroon-600/70 text-sm font-bold uppercase tracking-widest">{selectedLeader.role}</p>
                  <div className="w-12 h-1 bg-gold mt-4 rounded" />
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-heading font-black text-maroon-800 text-xs uppercase tracking-[2px] mb-4">Biography</h4>
                    <p className="font-body text-slate-600 leading-relaxed text-sm md:text-base">{selectedLeader.bio}</p>
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-maroon-800 text-xs uppercase tracking-[2px] mb-4">Key Contributions</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedLeader.achievements.map((a, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          <span className="font-body text-slate-700 text-xs font-semibold">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                    <a href={selectedLeader.social.twitter} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-500 transition-all"><FaTwitter /></a>
                    <a href={selectedLeader.social.fb} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-800 transition-all"><FaFacebookF /></a>
                    <a href={selectedLeader.social.ig} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-pink-50 hover:text-pink-600 transition-all"><FaInstagram /></a>
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

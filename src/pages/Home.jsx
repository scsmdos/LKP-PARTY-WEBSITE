import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import {
  FaGraduationCap, FaHeartbeat, FaBriefcase, FaSeedling, FaFemale, FaShieldAlt,
  FaArrowRight, FaQuoteLeft, FaPlay, FaUsers, FaFlag, FaMapMarkedAlt, FaAward
} from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
import logo from '../assets/logo.png'

import HeroSlider from '../components/HeroSlider'
import SectionWrapper from '../components/SectionWrapper'
import SankalpCarousel from '../components/SankalpCarousel'

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

import l1 from '../assets/abhimanyu-kumar-singh.png'
import l2 from '../assets/Sachin Singh.jpeg'
import l3 from '../assets/Mukesh Kr Dubey.jpeg'
import l4 from '../assets/Kunal Kumar Singh.jpeg'

const leaders = [
  {
    name: 'Abhimanyu Kumar Singh',
    role: 'National President',
    quote: 'Our goal is a Bihar where every hand has work and every heart has hope.',
    img: l1,
  },
  {
    name: 'Sachin Singh',
    role: 'State President, Bihar',
    quote: 'True development starts from the villages. We are the voice of the voiceless.',
    img: l2,
  },
  {
    name: 'Mukesh Kr Dubey',
    role: 'General Secretary',
    quote: 'Transparency in governance is the only way to earn people\'s trust.',
    img: l3,
  },
  {
    name: 'Kunal Kumar Singh',
    role: 'Chief Coordinator',
    quote: 'Empowering the youth and protecting our culture is our primary mission.',
    img: l4,
  },
]

const news = [
  {
    tag: 'National',
    date: 'April 18, 2026',
    title: 'Lok Kalyan Party launches nationwide healthcare initiative for rural India',
    excerpt: 'A groundbreaking program to bring mobile clinics and telemedicine to over 10,000 villages across 20 states.',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
  },
  {
    tag: 'Youth',
    date: 'April 15, 2026',
    title: 'LKP announces 50,000 scholarship scheme for meritorious students from rural backgrounds',
    excerpt: 'Full funding for higher education including engineering, medical and management degrees.',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
  },
  {
    tag: 'Farmers',
    date: 'April 12, 2026',
    title: 'Massive farmer rally in New Delhi draws thousands from 15 states',
    excerpt: 'Party president unveils new agricultural policy with MSP guarantees and crop insurance reforms.',
    img: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600&q=80',
  },
]

const campaigns = [
  { title: 'Har Ghar Nal Jal', icon: '💧', desc: 'Clean drinking water to every household by 2027.', progress: 72 },
  { title: 'Digital Bharat Abhiyan', icon: '📱', desc: 'Free internet and digital literacy to rural India.', progress: 58 },
  { title: 'Ujjwal Kisan Yojana', icon: '🌾', desc: 'Modern tools and subsidies for 20M farmers.', progress: 84 },
  { title: 'Sabka Swasthya', icon: '🏥', desc: 'Universal health coverage for all citizens.', progress: 45 },
]

const gallery = [
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80',
  'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
  'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=600&q=80',
  'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80',
  'https://images.unsplash.com/photo-1620293023640-0e56fd0e62e5?w=600&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
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

// Stats counter
function StatCard({ stat, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="text-5xl mb-4 flex justify-center text-gold">{stat.icon}</div>
      <div className="font-heading text-4xl font-black text-white">
        {inView ? (
          <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} />
        ) : '0'}
      </div>
      <p className="font-body text-white/80 mt-2">{stat.label}</p>
    </motion.div>
  )
}

export default function Home() {
  return (
    <main>
      {/* Hero Slider */}
      <HeroSlider />

      {/* ─── Marquee Strip ─── */}
      <div className="bg-gold py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(4).fill([
            '🪷 Jan Seva, Desh Vikas',
            '🗳️ Join Lok Kalyan Party',
            '🌾 Farmers First Policy',
            '💪 Youth Empowerment',
            '🏥 Universal Healthcare',
            '📚 Education for All',
          ]).flat().map((text, i) => (
            <span key={i} className="font-heading font-bold text-maroon-800 mx-8 text-sm tracking-wide">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* ─── LKP Sankalp 2026 Carousel (Reference Match) ─── */}
      <SankalpCarousel />

      {/* ─── About Preview ─── */}
      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimCard>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-maroon-gradient rounded-lg flex items-center justify-center shadow-maroon z-10 p-2">
                <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-110 contrast-125" />
              </div>
              <img
                src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80"
                alt="Bihar Development Rally"
                className="w-full h-80 object-cover rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-gold p-4 rounded-lg shadow-gold text-maroon-900 border border-white/20">
                <p className="font-heading font-black text-2xl">Bihar</p>
                <p className="font-body text-xs font-semibold uppercase tracking-widest">First Strategy</p>
              </div>
            </div>
          </AnimCard>

          <AnimCard delay={0.2}>
            <span className="font-body text-gold font-bold tracking-[3px] uppercase text-[10px]">The Voice of Bihar</span>
            <h2 className="section-title mt-3 gold-underline-left !text-3xl lg:!text-4xl text-maroon-800">
              Resolve for Bihar's Soil and <span className="text-maroon-600">Development</span>
            </h2>
            <div className="font-body text-gray-700 leading-relaxed mt-6 mb-8 text-base space-y-4">
              <p>
                Lok Kalyan Party was born from the <span className="text-maroon-700 font-bold underline decoration-gold/50">sacred soil of Bihar</span>. Our singular mission is to serve <span className="text-maroon-800 font-black">every citizen of Bihar</span>, from the heart of Magadh to the lands of Mithilanchal and Seemanchal.
              </p>
              <p>
                We are not here for the politics of Delhi, but to transform the <span className="text-maroon-700 font-bold italic">remotest villages of Bihar</span>. For us, education, health, and employment are not just electoral promises, but the <span className="text-maroon-800 font-extrabold uppercase text-shadow-sm">Fundamental Rights of Bihar</span>.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link to="/about" className="btn-primary inline-flex items-center gap-3 !px-10 !py-4 shadow-2xl">
                Read More <FaArrowRight />
              </Link>
            </div>
          </AnimCard>
        </div>
      </SectionWrapper>

      {/* ─── Core Values ─── */}
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
                  <h3 className="font-heading font-bold text-maroon-700 text-lg mb-2">{v.title}</h3>
                  <p className="font-body text-gray-500 text-xs leading-relaxed">{v.desc}</p>
                </div>
              </AnimCard>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Vision & Mission ─── */}
      <SectionWrapper className="bg-maroon-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 text-white">
            <span className="font-body text-gold font-semibold tracking-widest uppercase text-xs">Our Purpose</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mt-2 gold-underline">Vision & Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Our Vision',
                icon: '🎯',
                content: "A prosperous, united, and self-reliant India where every citizen has equal access to opportunities, rights, and dignity.",
              },
              {
                title: 'Our Mission',
                icon: '🚀',
                content: "To serve the people of India through responsible governance, grassroots engagement, and policy reforms.",
              },
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

      {/* ─── Leadership Preview: Premium Stacking Cards ─── */}
      <section className="bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="font-body text-gold font-bold tracking-[4px] uppercase text-[11px]">The Pillars of LKP</span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-maroon-800 mt-2">Our Dedicated Leadership</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full" />
          </div>

          {/* Desktop Grid / Mobile Stacking Wrapper */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {leaders.map((l, i) => (
              <div key={l.name} className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-gold hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  <img src={l.img} alt={l.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 text-center flex-grow flex flex-col justify-center">
                  <h3 className="font-heading font-extrabold text-maroon-800 text-lg mb-1">{l.name}</h3>
                  <p className="font-body text-gold text-[10px] font-bold uppercase tracking-widest">{l.role}</p>
                  <div className="w-8 h-0.5 bg-gold/30 mx-auto mt-4 group-hover:w-full transition-all duration-500" />
                  <p className="mt-4 font-body text-slate-500 text-[11px] leading-relaxed line-clamp-3 italic">"{l.quote}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Stacking View - FULL SCREEN EDGE TO EDGE */}
          <div className="lg:hidden flex flex-col">
            {leaders.map((l, i) => (
              <div key={l.name} className="sticky top-0 h-screen w-full bg-slate-50 overflow-hidden">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white relative h-full w-full"
                >
                  {/* Full Screen Photo - Edge to Edge */}
                  <img src={l.img} alt={l.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                  
                  {/* Bottom White Shadow/Gradient Content - Extended for better readability */}
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-white via-white/80 to-transparent flex flex-col justify-end p-8 pb-16">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="max-w-md mx-auto w-full"
                    >
                      <h3 className="font-heading font-black text-maroon-950 text-3xl mb-1">{l.name}</h3>
                      <p className="font-body text-gold text-sm font-black uppercase tracking-[4px] mb-6">{l.role}</p>
                      
                      <div className="w-16 h-1.5 bg-gold/40 mb-8 rounded-full" />
                      
                      <div className="relative">
                        <FaQuoteLeft className="absolute -top-4 -left-4 text-gold/20 text-5xl" />
                        <p className="font-body text-gray-700 text-base leading-relaxed italic relative z-10 pl-4">
                          {l.quote}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Impact Statistics: Professional & Clean ─── */}
      <SectionWrapper className="bg-[#fdf3f3] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl border border-maroon-100 shadow-sm"
              >
                <div className="text-2xl mb-4 text-maroon-600 flex justify-center">
                  {s.icon}
                </div>
                
                <div className="font-heading text-3xl md:text-4xl font-bold text-maroon-800 mb-1 tabular-nums">
                  <CountUp end={s.value} duration={2.5} separator="," suffix={s.suffix} enableScrollSpy />
                </div>
                
                <p className="font-body text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── News Preview ─── */}
      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title gold-underline text-center mb-10">News & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <AnimCard key={n.title} delay={i * 0.1}>
                <div className="news-card rounded-lg">
                  <img src={n.img} className="w-full h-44 object-cover" alt={n.title} />
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-maroon-700 text-sm mb-2 leading-tight">{n.title}</h3>
                    <p className="font-body text-gray-500 text-xs line-clamp-2">{n.excerpt}</p>
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

      {/* ─── Join the Movement: Become a Karyakarta ─── */}
      <SectionWrapper className="bg-maroon-900 relative overflow-hidden py-12">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 skew-x-12 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Content */}
            <div className="text-left text-white">
              <span className="font-body text-gold font-bold tracking-[4px] uppercase text-[10px]">Join the Movement</span>
              <h2 className="font-heading text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
                Become a <span className="text-gold">Karyakarta.</span>
              </h2>
              <p className="font-body text-white/80 text-base mt-6 leading-relaxed max-w-xl">
                Your time, skills and voice can change a street, a village, or the entire state of Bihar. Sign up to volunteer and serve alongside thousands.
              </p>
              
              <ul className="mt-8 space-y-3">
                {[
                  'Invitations to local Seva drives',
                  'Direct policy briefings & party updates',
                  'Training for organizers & volunteers',
                  'Be a part of Bihar\'s transformation'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white/90 font-body text-xs font-medium">
                    <div className="w-1 h-1 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Form Card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              <div className="mb-6">
                <span className="font-body text-maroon-600 font-bold tracking-widest uppercase text-[9px]">Volunteer Sign-up</span>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mt-1">Make a difference today.</h3>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[9px] font-bold uppercase text-gray-400 mb-1.5 tracking-widest">Full Name</label>
                    <input type="text" placeholder="Your name" className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 text-sm font-body focus:ring-2 focus:ring-gold transition-all outline-none" />
                  </div>
                  <div>
                    <label className="block font-body text-[9px] font-bold uppercase text-gray-400 mb-1.5 tracking-widest">Phone</label>
                    <input type="tel" placeholder="+91 98xx" className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 text-sm font-body focus:ring-2 focus:ring-gold transition-all outline-none" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[9px] font-bold uppercase text-gray-400 mb-1.5 tracking-widest">Email</label>
                    <input type="email" placeholder="you@email.com" className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 text-sm font-body focus:ring-2 focus:ring-gold transition-all outline-none" />
                  </div>
                  <div>
                    <label className="block font-body text-[9px] font-bold uppercase text-gray-400 mb-1.5 tracking-widest">City</label>
                    <input type="text" placeholder="e.g. Patna" className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 text-sm font-body focus:ring-2 focus:ring-gold transition-all outline-none" />
                  </div>
                </div>

                <button className="w-full bg-maroon-800 text-white font-heading font-bold text-xs uppercase tracking-[3px] py-4.5 rounded-xl hover:bg-maroon-700 transition-all shadow-xl flex items-center justify-center gap-3 mt-4 h-14">
                  Join the Movement <FaArrowRight className="text-[9px]" />
                </button>

                <p className="text-[8px] text-gray-400 text-center font-body mt-6 leading-relaxed">
                  By signing up you agree to receive communications from Lok Kalyan Party. We never share your information with third parties.
                </p>
              </form>
            </div>

          </div>
        </div>
      </SectionWrapper>

      {/* ─── Premium Light Section: Our Vision (Repositioned Below Karyakarta) ─── */}
      <SectionWrapper className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gold/20">
            {[
              { 
                tag: 'Primary Goal',
                title: 'Bihar-Centric Governance', 
                desc: 'Every policy we draft is born from the soil of Bihar, focusing on local agrarian and industrial needs.',
                icon: '01'
              },
              { 
                tag: 'Our Promise',
                title: 'Total Transparency', 
                desc: 'Digital monitoring of all public funds to ensure every paisa spent reaches the common citizen.',
                icon: '02'
              },
              { 
                tag: 'The Future',
                title: 'Youth In-State Jobs', 
                desc: 'Ending the migration crisis by building manufacturing and IT hubs across Bihar\'s major districts.',
                icon: '03'
              }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="px-8 py-10 md:py-0 text-center md:text-left group"
              >
                <div className="font-heading text-6xl font-black text-gold/10 mb-4 group-hover:text-gold/20 transition-all duration-700 leading-none">
                  {p.icon}
                </div>
                <span className="font-body text-gold font-bold tracking-[3px] uppercase text-[9px] mb-2 block">{p.tag}</span>
                <h3 className="font-heading font-black text-maroon-900 text-xl mb-4 group-hover:text-maroon-600 transition-colors">{p.title}</h3>
                <p className="font-body text-gray-500 text-xs leading-relaxed max-w-xs">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}

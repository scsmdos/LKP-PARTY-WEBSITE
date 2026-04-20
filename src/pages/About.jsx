import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'
import aboutImg from '../assets/about.png'
import logo from '../assets/logo.png'

const milestones = [
  { year: '2010', title: 'Party Founded', desc: 'Lok Kalyan Party was established in New Delhi with the vision of inclusive governance for every Indian.' },
  { year: '2012', title: 'State Expansion', desc: 'Party expanded to 12 states with mass membership drives and grassroots campaigns.' },
  { year: '2015', title: 'First Victory', desc: 'Won 45 assembly seats across 4 states in landmark elections, a historic achievement.' },
  { year: '2018', title: 'National Recognition', desc: 'Recognized as a national party by the Election Commission of India.' },
  { year: '2022', title: 'Coalition Power', desc: 'Led a historic coalition government in 2 states with record development milestones.' },
  { year: '2026', title: 'New Era Begins', desc: 'Gearing up for general elections with 5 million members and a comprehensive national agenda.' },
]

const ideology = [
  'Democratic Socialism',
  'Secular Governance',
  'Inclusive Development',
  'Social Justice',
  'Environmental Sustainability',
  'Digital Empowerment',
  'Rural First Policy',
  'Zero Corruption Tolerance',
]

export default function About() {
  return (
    <main>
      <PageHero
        title="About Lok Kalyan Party"
        subtitle="Born from the soil of India, built for its people — our story, our values, our commitment."
        breadcrumb={[{ label: 'About Us' }]}
      />

      {/* ─── Our Story: Compact & Impactful ─── */}
      <SectionWrapper className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col justify-center"
          >
            <span className="font-body text-maroon-600 font-bold tracking-[3px] uppercase text-[11px]">The LKP Journey</span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-maroon-950 mt-3 leading-tight">
              Rooted in the Soil of <span className="text-gold">Bihar.</span>
            </h2>
            <div className="w-16 h-1 bg-gold mt-4 mb-6 rounded-full" />
            
            <div className="font-body text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
              <p>
                Lok Kalyan Party was established with a singular mission: to bring a systemic transformation to Bihar. We stand as a lighthouse of hope, dedicated to rebuilding the state from its core—the villages.
              </p>
              <p>
                Our leadership is committed to a <span className="text-maroon-900 font-bold">Bihar-First</span> strategy. From reforming education to ensuring fair prices for farmers, we are here to deliver results.
              </p>
              <p className="border-l-4 border-gold pl-5 font-semibold py-2 italic text-maroon-800 bg-slate-50/80 rounded-r-lg">
                "We build a Bihar where every citizen walks with pride."
              </p>
              <p>
                Join us as we write a new chapter of industrial growth, economic stability, and social justice for all.
              </p>
            </div>
            
            <div className="mt-8">
              <Link to="/vision" className="inline-flex items-center justify-center bg-maroon-800 text-white font-heading font-bold text-xs uppercase tracking-[2px] px-10 py-4 rounded-xl hover:bg-maroon-700 transition-all shadow-xl">
                Our Vision <FaArrowRight className="ml-3 text-[10px]" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative order-first lg:order-last"
          >
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-maroon-900 rounded-2xl flex items-center justify-center shadow-xl z-10 p-4 border-2 border-white">
              <img src={logo} alt="LKP Logo" className="w-full h-full object-contain" />
            </div>
            <div className="aspect-[4/3] lg:h-[450px] overflow-hidden rounded-[2rem] shadow-2xl border-4 md:border-8 border-white">
              <img
                src={aboutImg}
                alt="Leadership"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Core Ideology: Clean & Authoritative */}
      <SectionWrapper className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-body text-maroon-600 font-bold tracking-[3px] uppercase text-[10px]">Our Pillars</span>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-maroon-950 mt-2">Our Ideology</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ideology.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 bg-white p-5 rounded-xl shadow-sm border border-transparent hover:border-gold/30 transition-all"
              >
                <FaCheckCircle className="text-gold text-base flex-shrink-0" />
                <span className="font-heading font-bold text-maroon-800 text-xs leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-body text-maroon-600 font-bold tracking-[3px] uppercase text-[10px]">History</span>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-maroon-950 mt-2">Milestones</h2>
          </div>
          <div className="relative border-l-4 border-gold/10 ml-4 py-2">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-10 mb-6 last:mb-0"
              >
                <div className="absolute left-[-14px] top-4 w-6 h-6 rounded-full bg-white border-4 border-gold z-10" />
                <div className="bg-slate-50 rounded-xl p-6 border border-transparent hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-heading font-black text-2xl text-gold">{m.year}</span>
                    <h3 className="font-heading font-bold text-maroon-800 text-base">{m.title}</h3>
                  </div>
                  <p className="font-body text-gray-500 text-xs leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <section className="bg-maroon-gradient py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-white mb-4">Be a Part of Our Story</h2>
          <p className="font-body text-white/80 mb-8">Join millions of Indians who are building a better tomorrow.</p>
          <Link to="/join-us" className="btn-gold text-lg px-10 py-4">Join the Party</Link>
        </div>
      </section>
    </main>
  )
}

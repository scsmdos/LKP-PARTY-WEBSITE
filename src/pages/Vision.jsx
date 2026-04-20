import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

const visionPoints = [
  { icon: '🏛️', title: 'Democratic Excellence', desc: 'Strengthen democratic institutions, ensure free and fair elections, and uphold constitutional values at every level of governance.' },
  { icon: '📈', title: 'Economic Growth for All', desc: 'Build an economy that works for 100% of India — from the smallest farmer to the largest entrepreneur.' },
  { icon: '🌿', title: 'Green Future', desc: 'Achieve net-zero carbon emissions by 2050, invest in renewable energy and protect India\'s rivers, forests and wildlife.' },
  { icon: '🤝', title: 'Social Harmony', desc: 'Celebrate India\'s unity in diversity, eliminate caste discrimination and build an equitable society.' },
  { icon: '🔬', title: 'Innovation & Research', desc: 'Make India a global leader in science, technology and innovation through world-class research institutions.' },
  { icon: '🌐', title: 'Global Leadership', desc: 'Assert India\'s rightful place on the world stage through diplomacy, trade and cultural exchange.' },
]

const missionPillars = [
  { no: '01', title: 'Transparent Governance', desc: 'Every rupee of public money will be accounted for. RTI will be strengthened. Corruption will have zero tolerance.' },
  { no: '02', title: 'Grassroots Democracy', desc: 'Empowering panchayats, local bodies and citizens to directly participate in decision-making.' },
  { no: '03', title: 'Policy by Data', desc: 'All our policies will be evidence-based, data-driven and regularly audited for impact.' },
  { no: '04', title: 'Inclusive Development', desc: 'No marginalized community — SC, ST, OBC, minorities, women, disabled — will be left behind.' },
]

export default function Vision() {
  return (
    <main>
      <PageHero
        title="Vision & Mission"
        subtitle="Our blueprint for a prosperous, united and self-reliant India."
        breadcrumb={[{ label: 'Vision & Mission' }]}
      />

      {/* Vision Statement */}
      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="font-body text-gold font-semibold tracking-widest uppercase text-xs">The Big Picture</span>
            <h2 className="section-title mt-2 gold-underline">Our Vision for India</h2>
            <div className="mt-8 p-8 rounded-lg bg-maroon-gradient text-white relative overflow-hidden">
              <p className="font-heading text-xl md:text-2xl font-light leading-relaxed italic relative z-10">
                "A prosperous, united, and self-reliant India where every citizen has equal access to opportunities, dignity and justice."
              </p>
              <p className="mt-4 font-heading font-bold text-gold text-sm relative z-10">— Lok Kalyan Party Manifesto 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visionPoints.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-6 bg-gray-50 rounded-lg border border-transparent hover:border-gold/30 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-heading font-bold text-maroon-700 text-lg mb-2">{v.title}</h3>
                <p className="font-body text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Mission Pillars */}
      <SectionWrapper className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title gold-underline">Our Mission Pillars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionPillars.map((p, i) => (
              <motion.div
                key={p.no}
                className="flex gap-5 bg-white p-6 rounded-lg shadow-sm border border-transparent hover:border-gold/20 transition-all"
              >
                <span className="font-heading font-black text-4xl text-gold/30 flex-shrink-0">{p.no}</span>
                <div>
                  <h3 className="font-heading font-bold text-maroon-700 text-base mb-2">{p.title}</h3>
                  <p className="font-body text-gray-600 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* 100-Day Plan CTA */}
      <SectionWrapper className="bg-maroon-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="font-heading text-4xl font-bold mb-6">Our 100-Day Action Plan</h2>
          <p className="font-body text-white/80 text-lg mb-10 leading-relaxed">
            Upon election, we commit to immediate action on healthcare, education, farmer welfare, and economic reform — within the first 100 days of governance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {['50K Jobs', '100 Schools', '500 Clinics', '1K Roads'].map((item) => (
              <div key={item} className="glass-card p-5 text-center">
                <p className="font-heading font-black text-gold text-2xl">{item}</p>
              </div>
            ))}
          </div>
          <Link to="/campaigns" className="btn-gold text-lg px-10 py-4">
            View Full Agenda
          </Link>
        </div>
      </SectionWrapper>
    </main>
  )
}

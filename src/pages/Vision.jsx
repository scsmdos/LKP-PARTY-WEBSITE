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
            <span className="font-body text-gold font-bold tracking-[3px] uppercase text-[10px]">The Big Picture</span>
            <h2 className="font-heading text-2xl md:text-3xl font-black text-maroon-900 mt-2">Our Vision for India</h2>
            <div className="mt-8 p-10 rounded-2xl bg-maroon-50 border border-maroon-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-maroon-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <p className="font-heading text-lg md:text-xl font-medium leading-relaxed italic text-maroon-900 relative z-10">
                "A prosperous, united, and self-reliant India where every citizen has equal access to opportunities, dignity and justice."
              </p>
              <div className="w-12 h-0.5 bg-gold mx-auto my-4 rounded-full opacity-50" />
              <p className="font-body font-bold text-gold text-[10px] uppercase tracking-[2px] relative z-10">— Lok Kalyan Party Manifesto 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visionPoints.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-8 bg-slate-50/50 rounded-lg border border-slate-100 hover:border-gold/30 hover:shadow-xl transition-all"
              >
                <div className="text-3xl mb-4 opacity-80">{v.icon}</div>
                <h3 className="font-heading font-black text-maroon-800 text-sm uppercase tracking-wider mb-2">{v.title}</h3>
                <p className="font-body text-slate-500 text-[11px] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Mission Pillars */}
      <SectionWrapper className="bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="font-body text-gold font-bold tracking-[3px] uppercase text-[10px]">Strategic Foundations</span>
            <h2 className="font-heading text-2xl md:text-3xl font-black text-maroon-900 mt-2">Our Mission Pillars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionPillars.map((p, i) => (
              <motion.div
                key={p.no}
                className="flex gap-6 bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-gold/20 transition-all"
              >
                <span className="font-heading font-black text-4xl text-gold/20 flex-shrink-0">{p.no}</span>
                <div>
                  <h3 className="font-heading font-black text-maroon-800 text-base mb-2 uppercase tracking-tight">{p.title}</h3>
                  <p className="font-body text-slate-500 text-[11px] leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* 100-Day Plan CTA */}
      <SectionWrapper className="bg-maroon-50 border-t border-maroon-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="font-body text-gold font-bold tracking-[4px] uppercase text-[10px]">Immediate Impact</span>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-maroon-900 mt-2 mb-4">Our 100-Day Action Plan</h2>
          <p className="font-body text-slate-600 text-xs md:text-sm mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            Upon election, we commit to immediate action on healthcare, education, farmer welfare, and economic reform — within the first 100 days of governance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {['50K Jobs', '100 Schools', '500 Clinics', '1K Roads'].map((item) => (
              <div key={item} className="bg-white p-6 rounded-md border border-maroon-100 shadow-sm flex items-center justify-center min-h-[100px]">
                <p className="font-heading font-black text-maroon-800 text-base md:text-lg uppercase tracking-wider">{item}</p>
              </div>
            ))}
          </div>
          <Link to="/campaigns" className="inline-flex items-center justify-center bg-maroon-800 text-white font-heading font-bold text-[10px] uppercase tracking-[2px] px-10 py-4 rounded-md hover:bg-maroon-700 transition-all shadow-xl">
            View Full Agenda
          </Link>
        </div>
      </SectionWrapper>
    </main>
  )
}

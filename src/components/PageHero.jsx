import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronRight, FaHome } from 'react-icons/fa'

export default function PageHero({ title, subtitle, breadcrumb = [] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FFEEEE] via-white to-[#FFF3CC] pt-10 pb-8 border-b border-maroon-100/50">
      {/* Subtle light accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-700/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/15 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-3 text-[10.5px] font-heading font-bold uppercase tracking-wider text-slate-400">
          <Link to="/" className="flex items-center gap-1.5 hover:text-maroon-700 transition-colors">
            <FaHome className="text-maroon-700/50" />
            <span>Home</span>
          </Link>
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              <FaChevronRight className="text-slate-300 text-[8px]" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-maroon-700 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-maroon-700/70">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="max-w-4xl">
          <motion.h1
            className="font-heading text-xl md:text-[26px] font-black text-slate-800 mb-1 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="font-body text-slate-500 text-[13px] md:text-sm leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}

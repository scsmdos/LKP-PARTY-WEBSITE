import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronRight, FaHome } from 'react-icons/fa'

export default function PageHero({ title, breadcrumb = [] }) {
  const NAVBAR_HEIGHT = '64px'
  const HERO_HEIGHT = '110px' // Reduced height to remove unnecessary space

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(to right, #FFEEEE, #ffffff, #FFF3CC)',
        borderBottom: '1px solid rgba(159,18,57,0.08)',
        marginTop: NAVBAR_HEIGHT,                 // clear the fixed navbar
        height: HERO_HEIGHT,                       // now 110px total
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',                  // center vertically
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-700/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/15 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl pointer-events-none" />

      <div
        style={{
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          padding: '0 1.5rem',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',                   // horizontally center everything
          textAlign: 'center'                     // center text
        }}
      >
        {/* Breadcrumb - Slightly tighter */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#94a3b8',
            marginBottom: '2px', // Tighter space
          }}
        >
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8', textDecoration: 'none' }}
          >
            <FaHome style={{ color: 'rgba(159,18,57,0.5)', fontSize: '10px' }} />
            <span>Home</span>
          </Link>
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              <FaChevronRight style={{ color: '#cbd5e1', fontSize: '7px' }} />
              <span style={{ color: 'rgba(159,18,57,0.7)' }}>{crumb.label}</span>
            </React.Fragment>
          ))}
        </nav>

        {/* Title - Bigger font size as requested */}
        <motion.h1
          style={{
            fontWeight: 900,
            color: '#7A0000',
            lineHeight: 1.1,
            margin: 0,
            fontSize: 'clamp(20px, 3.5vw, 26px)', // Responsive size
            fontFamily: 'inherit',
          }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h1>
      </div>
    </section>
  )
}

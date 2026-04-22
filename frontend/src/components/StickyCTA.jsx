import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUserPlus } from 'react-icons/fa'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="fixed bottom-8 left-8 z-50"
        >
          <Link
            to="/join-us"
            className="flex items-center gap-2 bg-gradient-to-r from-gold-dark to-gold text-maroon-900 font-heading font-bold px-5 py-3 rounded-full shadow-gold hover:scale-105 transition-transform duration-300 text-sm animate-pulse-gold"
          >
            <FaUserPlus />
            Join Party
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

export default function Preloader() {
  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="text-center">
        {/* Spinning ring with Logo */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-gold/30 shadow-gold/20 shadow-2xl"
            style={{ borderTopColor: '#D4AF37' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-3 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm overflow-hidden">
            <motion.img
              src={logo}
              alt="Logo"
              className="w-16 h-16 object-contain"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <motion.h1
          className="font-heading text-3xl font-black text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          LOK KALYAN <span className="text-gold">PARTY</span>
        </motion.h1>

        <motion.p
          className="font-body text-gold/80 tracking-[6px] uppercase text-[11px] mt-2 font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Jan Seva · Desh Vikas
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="mt-10 h-[2px] w-56 mx-auto bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gold shadow-gold shadow-xl"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

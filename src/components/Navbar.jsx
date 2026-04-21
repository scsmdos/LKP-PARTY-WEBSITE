import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../assets/logo.png'
import logotext from '../assets/logotext.png'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Vision & Mission', path: '/vision' },
  { label: 'Leadership', path: '/leadership' },
  { label: 'News', path: '/news' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const activeLinkClass = "relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2.5px] after:bg-maroon-700 text-maroon-800"

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-1.5' : 'bg-slate-50/95 backdrop-blur-sm shadow-sm py-2'
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Lok Kalyan Party Logo"
            className="w-12 h-12 object-contain"
          />
          <img
            src={logotext}
            alt="Lok Kalyan Party Text"
            className="h-10 md:h-12 object-contain relative -top-[4px]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center flex-1 justify-center gap-9">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-heading text-[13px] font-bold tracking-tight transition-colors hover:text-maroon-700 ${isActive ? activeLinkClass : 'text-[#4A5568]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden xl:flex items-center gap-2">
          <Link
            to="/donate"
            className="bg-[#D4af37] hover:bg-[#c4a02e] text-slate-900 font-heading font-bold text-[11px] px-6 py-2 rounded-[4px] transition-all shadow-sm"
          >
            Donate
          </Link>
          <Link
            to="/join-us"
            className="bg-[#7A0000] hover:bg-[#600000] text-white font-heading font-bold text-[11px] px-6 py-2 rounded-[4px] transition-all shadow-md"
          >
            Join LKP
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden text-maroon-900 text-2xl p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-heading text-sm font-bold py-1 ${isActive ? 'text-maroon-700 border-l-4 border-maroon-700 pl-3' : 'text-slate-600 pl-3'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-50">
                <Link to="/donate" className="w-full bg-[#D4af37] text-center py-3 rounded font-heading font-bold text-slate-900">
                  Donate
                </Link>
                <Link to="/join-us" className="w-full bg-[#7a0000] text-center py-3 rounded font-heading font-bold text-white">
                  Join LKP
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

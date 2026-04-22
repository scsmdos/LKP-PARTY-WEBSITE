import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'
import logo from '../assets/logo.png'
import footerTextLogo from '../assets/footer-text-logo.png'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Vision & Mission', path: '/vision' },
  { label: 'Leadership', path: '/leadership' },
  { label: 'Campaigns', path: '/campaigns' },
  { label: 'News & Blog', path: '/news' },
]

const connectLinks = [
  { label: 'Gallery', path: '/gallery' },
  { label: 'Media', path: '/media' },
  { label: 'Join Us', path: '/member/login' },
  { label: 'Donate', path: '/donate' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
]

const socials = [
  { icon: <FaFacebookF />, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: <FaTwitter />, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
  { icon: <FaInstagram />, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: <FaYoutube />, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  { icon: <FaWhatsapp />, href: '#', label: 'WhatsApp', color: 'hover:bg-green-600' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-maroon-800 text-white">
      {/* Newsletter Strip */}
      <div className="bg-gold py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-bold text-maroon-900 text-lg">Stay Updated with Lok Kalyan Party</h3>
            <p className="font-body text-maroon-700 text-xs mt-1">Subscribe to receive party news, updates and campaigns.</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full md:w-72 px-6 py-3 rounded text-gray-800 font-body text-xs focus:outline-none focus:ring-2 focus:ring-maroon-500 shadow-inner border-transparent"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-maroon-800 text-white font-heading font-black text-xs px-8 py-3 rounded shadow-xl hover:bg-maroon-900 transition-all active:scale-95 whitespace-nowrap uppercase tracking-widest"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Column */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-white rounded-full p-1.5 shadow-lg flex items-center justify-center shrink-0">
              <img 
                src={logo} 
                alt="Lok Kalyan Party" 
                className="w-12 h-12 object-contain" 
              />
            </div>
            <div className="flex items-center h-16 -mt-1">
              <img 
                src={footerTextLogo} 
                alt="Lok Kalyan Party" 
                className="h-10 md:h-14 object-contain" 
              />
            </div>
          </div>
          <p className="font-body text-white/80 text-sm font-semibold leading-relaxed mb-6">
            Dedicated to the welfare of Bihar — Jan Seva, Desh Vikas. Building a stronger, united, and prosperous Bihar through inclusive governance.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs transition-all duration-300 ${s.color} hover:scale-110`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-gold text-base mb-5">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="font-body text-white/80 text-sm font-semibold hover:text-gold transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect Links */}
        <div>
          <h4 className="font-heading font-bold text-gold text-base mb-5">Connect</h4>
          <ul className="space-y-2">
            {connectLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="font-body text-white/80 text-sm font-semibold hover:text-gold transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-heading font-bold text-gold text-base mb-5">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-gold mt-1.5 flex-shrink-0 text-base" />
              <span className="font-body text-white/80 text-sm font-semibold leading-relaxed">
                Rajputana Mauhla, Dehri-on-Sone,<br />
                Rohtas, Bihar - 821307
              </span>
            </li>
            <li className="flex items-center gap-4">
              <FaPhone className="text-gold flex-shrink-0 text-base" />
              <a href="tel:+918804757309" className="font-body text-white/80 text-sm font-semibold hover:text-gold transition-colors">
                +91 88047 57309
              </a>
            </li>
            <li className="flex items-center gap-4">
              <FaEnvelope className="text-gold flex-shrink-0 text-base" />
              <a href="mailto:info@lokkalyanparty.in" className="font-body text-white/80 text-sm font-semibold hover:text-gold transition-colors">
                info@lokkalyanparty.in
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 mx-4">
        <div className="max-w-7xl mx-auto py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <p className="font-body text-white/40 text-xs text-center md:text-left">
            © {year} Lok Kalyan Party. All rights reserved.
          </p>
          <div className="flex gap-6 justify-center md:justify-end">
            <a href="#" className="font-body text-white/40 text-xs hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="font-body text-white/40 text-xs hover:text-gold transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

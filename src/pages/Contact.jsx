import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaUser, FaCommentDots } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

const offices = [
  { 
    city: 'Party Head Office (Bihar)', 
    address: 'Rajputana Mauhla, Dehri-on-Sone, Rohtas, Bihar - 821307', 
    phone: '+91 88047 57309', 
    email: 'info@lokkalyanparty.in', 
    hours: 'Mon–Sat: 10 AM – 7 PM' 
  },
  { 
    city: 'State Coordination Center', 
    address: 'Patna, Bihar', 
    phone: '+91 88047 57309', 
    email: 'contact@lokkalyanparty.in', 
    hours: 'Mon–Sat: 10 AM – 6 PM' 
  },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    setSubmitted(true)
  }

  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="We're here to listen. Reach out to us anytime."
        breadcrumb={[{ label: 'Contact' }]}
      />

      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Info */}
          <div>
            <span className="font-body text-gold font-semibold tracking-widest uppercase text-xs">Get in Touch</span>
            <h2 className="section-title mt-2 gold-underline-left">Reach Out to Us</h2>
            <p className="font-body text-gray-600 leading-relaxed mt-4 mb-8 text-sm">
              Whether you have a question or want to join the movement — our team is ready to help.
            </p>

            {/* Offices */}
            <div className="space-y-4">
              {offices.map((office, i) => (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="p-5 bg-gray-50 rounded-lg hover:shadow-md border border-transparent hover:border-gold/30 transition-all"
                >
                  <h3 className="font-heading font-bold text-maroon-700 text-base mb-3 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gold" /> {office.city}
                  </h3>
                  <div className="space-y-2">
                    <p className="font-body text-gray-600 text-xs flex items-start gap-3">
                      <FaMapMarkerAlt className="text-gray-400 mt-0.5 flex-shrink-0" /> {office.address}
                    </p>
                    <p className="font-body text-gray-600 text-xs flex items-center gap-3">
                      <FaPhone className="text-gray-400 flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:text-maroon-600 transition-colors">{office.phone}</a>
                    </p>
                    <p className="font-body text-gray-600 text-xs flex items-center gap-3">
                      <FaEnvelope className="text-gray-400 flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-maroon-600 transition-colors">{office.email}</a>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-100 self-start">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                <h3 className="font-heading font-bold text-maroon-700 text-xl mb-2">Message Sent!</h3>
                <p className="font-body text-gray-600 text-xs">Our team will respond within 24–48 hours.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-heading font-bold text-maroon-700 text-xl mb-5 text-center">Send Us a Message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <div>
                    <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">Your Name *</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                      <input {...register('name', { required: 'Name is required' })} className="form-input pl-9" placeholder="Full name" />
                    </div>
                  </div>

                  <div>
                    <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">Email Address *</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                      <input
                        {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                        className="form-input pl-9"
                        type="email"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">Subject *</label>
                    <select {...register('subject', { required: 'Select subject' })} className="form-input py-2">
                      <option value="">Select a topic</option>
                      {['General Enquiry', 'Membership', 'Media', 'Other'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">Message *</label>
                    <textarea
                      {...register('message', { required: 'Message required' })}
                      rows={4}
                      className="form-input py-2 resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full py-3 text-sm font-heading font-bold shadow-maroon">
                    📨 Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}

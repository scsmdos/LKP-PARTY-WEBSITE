import React from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'
import { useState } from 'react'

const benefits = [
  { icon: '🗳️', text: 'Participate in party elections and policy decisions' },
  { icon: '📢', text: 'Access to exclusive party events, rallies and meetings' },
  { icon: '📚', text: 'Free training and leadership development programs' },
  { icon: '🤝', text: 'Network with like-minded citizens across India' },
  { icon: '🏅', text: 'Recognition and awards for outstanding service' },
  { icon: '📱', text: 'Digital tools for grassroots campaign management' },
]

export default function JoinUs() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    setSubmitted(true)
  }

  return (
    <main>
      <PageHero
        title="Join Lok Kalyan Party"
        subtitle="Become part of the change. Together, we build a stronger India."
        breadcrumb={[{ label: 'Join Us' }]}
      />

      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Benefits */}
          <div>
            <span className="font-body text-gold font-semibold tracking-widest uppercase text-xs">Why Join?</span>
            <h2 className="section-title mt-2 gold-underline-left">Be Part of the Movement</h2>
            <p className="font-body text-gray-600 leading-relaxed mt-4 mb-6 text-sm">
              Joining Lok Kalyan Party means joining millions of Indians who believe in a transparent and inclusive democracy.
            </p>
            <div className="space-y-3">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-maroon-50 transition-colors"
                >
                  <span className="text-xl">{b.icon}</span>
                  <span className="font-body text-gray-700 text-xs">{b.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-5 rounded-lg bg-maroon-gradient text-white">
              <p className="font-heading font-bold text-lg text-gold mb-1">🙌 5 Million+ Members</p>
              <p className="font-body text-white/80 text-xs">Join the fastest growing political movement in India.</p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-100">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                <h3 className="font-heading font-bold text-maroon-700 text-xl mb-2">Welcome to LKP!</h3>
                <p className="font-body text-gray-600 text-xs">Your request has been received. Our team will contact you soon.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-heading font-bold text-maroon-700 text-xl mb-5 text-center">Membership Application</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">Full Name *</label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                        <input
                          {...register('name', { required: 'Name is required' })}
                          className="form-input pl-9"
                          placeholder="Your name"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">Mobile Number *</label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                        <input
                          {...register('phone', {
                            required: 'Phone is required',
                            pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid number' }
                          })}
                          className="form-input pl-9"
                          placeholder="10-digit mobile"
                          type="tel"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">Email Address *</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                        })}
                        className="form-input pl-9"
                        placeholder="your@email.com"
                        type="email"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">State *</label>
                      <select {...register('state', { required: 'Select state' })} className="form-input py-2">
                        <option value="">Select state</option>
                        {['Uttar Pradesh', 'Maharashtra', 'Delhi', 'Karnataka', 'Other'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">City *</label>
                      <input {...register('city', { required: 'City is required' })} className="form-input" placeholder="City" />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full py-3 text-sm font-heading font-bold shadow-maroon">
                    🙌 Submit Application
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

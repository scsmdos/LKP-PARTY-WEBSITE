import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

export default function JoinUs() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    setSubmitted(true)
  }

  return (
    <main className="bg-slate-50">
      <PageHero
        title="Join Lok Kalyan Party"
        subtitle="Become part of the change. Together, we build a stronger Bihar and India."
        breadcrumb={[{ label: 'Join Us' }]}
      />

      <SectionWrapper className="bg-slate-50">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded shadow-2xl p-8 md:p-12 border border-gray-100 relative">
            {/* Design Element */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gold rounded-l" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
                <h3 className="font-heading font-black text-maroon-900 text-3xl mb-4">Aabhar!</h3>
                <p className="font-body text-gray-600 text-base leading-relaxed">
                  Your registration as a Karyakarta has been received. Our team will contact you soon to guide you through the next steps.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-gold font-bold hover:underline"
                >
                  Apply for another member
                </button>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <span className="font-body text-gold font-bold tracking-[4px] uppercase text-[10px]">Membership Form</span>
                  <h3 className="font-heading font-black text-maroon-900 text-3xl mt-2 leading-tight">Become a Karyakarta</h3>
                  <p className="font-body text-gray-500 text-xs mt-3">Please fill out your correct details to join the movement.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div>
                    <label className="font-heading font-bold text-gray-700 text-[11px] mb-2 block uppercase tracking-widest">Full Name *</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-sm" />
                      <input
                        {...register('name', { required: 'Full name is required' })}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 pl-12 font-body text-gray-700 focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                        placeholder="e.g. Rahul Kumar"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold italic tracking-wide">{errors.name.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-heading font-bold text-gray-700 text-[11px] mb-2 block uppercase tracking-widest">Mobile Number *</label>
                      <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-sm" />
                        <input
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid 10-digit number' }
                          })}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 pl-12 font-body text-gray-700 focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                          placeholder="98765 43210"
                          type="tel"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold italic tracking-wide">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="font-heading font-bold text-gray-700 text-[11px] mb-2 block uppercase tracking-widest">State *</label>
                      <select 
                        {...register('state', { required: 'State is required' })} 
                        className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 font-body text-gray-700 focus:ring-2 focus:ring-gold outline-none transition-all text-sm h-[46px]"
                      >
                        <option value="">Select State</option>
                        {['Bihar', 'Uttar Pradesh', 'Jharkhand', 'Delhi', 'Other'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-500 text-[10px] mt-1 font-bold italic tracking-wide">{errors.state.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="font-heading font-bold text-gray-700 text-[11px] mb-2 block uppercase tracking-widest">Email Address *</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-sm" />
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email format' }
                        })}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 pl-12 font-body text-gray-700 focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                        placeholder="name@email.com"
                        type="email"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold italic tracking-wide">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="font-heading font-bold text-gray-700 text-[11px] mb-2 block uppercase tracking-widest">City / District *</label>
                    <input 
                      {...register('city', { required: 'City/District is required' })} 
                      className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 font-body text-gray-700 focus:ring-2 focus:ring-gold outline-none transition-all text-sm" 
                      placeholder="e.g. Patna / Rohtas" 
                    />
                    {errors.city && <p className="text-red-500 text-[10px] mt-1 font-bold italic tracking-wide">{errors.city.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-maroon-gradient text-gold font-heading font-black text-xs uppercase tracking-[4px] py-4 rounded hover:brightness-110 transition-all shadow-xl h-14 mt-6"
                  >
                    Join the Movement
                  </button>

                  <p className="text-[9px] text-gray-400 text-center font-body mt-8 leading-relaxed italic">
                    By submitting this form, you pledge to uphold the values and constitution of Lok Kalyan Party. We respect your privacy.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaLock, FaCheckCircle, FaHeart } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

const amounts = [500, 1000, 2500, 5000, 10000, 25000]
const causes = ['General Party Fund', 'Election Campaign', 'Rural Development', 'Youth Programs', 'Women Empowerment', 'Farmer Welfare']

export default function Donate() {
  const [selectedAmt, setSelectedAmt] = useState(1000)
  const [customAmt, setCustomAmt] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const finalAmt = customAmt || selectedAmt

  const onSubmit = (data) => {
    console.log({ ...data, amount: finalAmt })
    setSubmitted(true)
  }

  return (
    <main>
      <PageHero
        title="Donate to the Cause"
        subtitle="Every contribution, big or small, powers the movement for a better India."
        breadcrumb={[{ label: 'Donate' }]}
      />

      <SectionWrapper className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl p-12 text-center"
            >
              <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-5" />
              <h2 className="font-heading font-bold text-maroon-700 text-2xl mb-3">Thank You!</h2>
              <p className="font-body text-gray-600 text-sm mb-1">Your donation of <strong className="text-gold">₹{Number(finalAmt).toLocaleString()}</strong> has been received.</p>
              <p className="font-body text-gray-500 text-xs text-center mx-auto max-w-xs">A confirmation receipt will be sent shortly. Your contribution is 80G tax deductible.</p>
              <div className="mt-6 p-4 bg-maroon-50 rounded-lg inline-block">
                <p className="font-body text-maroon-700 text-[10px] uppercase font-bold tracking-widest">ID: LKP-{Date.now().toString().slice(-8)}</p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-maroon-gradient p-6 text-center text-white">
                <h2 className="font-heading font-bold text-xl mb-1">Support LKP</h2>
                <p className="font-body text-white/80 text-[10px] uppercase tracking-wide flex items-center justify-center gap-2">
                  <FaShieldAlt className="text-gold" /> Secure & Encrypted
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6" noValidate>
                {/* Amount Selection */}
                <div>
                  <label className="font-heading font-bold text-maroon-700 text-sm mb-3 block">Donation Amount (₹)</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
                    {amounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => { setSelectedAmt(amt); setCustomAmt('') }}
                        className={`py-2 rounded-md font-heading font-bold text-xs border-2 transition-all ${
                          selectedAmt === amt && !customAmt
                            ? 'bg-maroon-600 text-white border-maroon-600 shadow-maroon scale-105'
                            : 'border-gray-100 text-gray-500 hover:border-maroon-400 hover:text-maroon-600'
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-heading font-bold text-maroon-600 text-sm">₹</span>
                    <input
                      type="number"
                      value={customAmt}
                      onChange={(e) => { setCustomAmt(e.target.value); setSelectedAmt(null) }}
                      className="form-input pl-8 py-2"
                      placeholder="Enter other amount"
                    />
                  </div>
                </div>

                {/* Donor Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">Full Name *</label>
                    <input {...register('name', { required: 'Name required' })} className="form-input py-2" placeholder="As per PAN" />
                  </div>
                  <div>
                    <label className="font-heading font-semibold text-gray-700 text-[11px] mb-1.5 block uppercase tracking-wide">PAN Number *</label>
                    <input
                      {...register('pan', { required: 'PAN required' })}
                      className="form-input uppercase py-2"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-maroon-800 text-sm">Total:</span>
                    <span className="font-heading font-black text-gold text-xl">₹{finalAmt ? Number(finalAmt).toLocaleString() : '—'}</span>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full py-3 text-sm font-heading font-bold flex items-center justify-center gap-2">
                  <FaLock className="text-xs" /> Secure Payment
                </button>
              </form>
            </div>
          )}
        </div>
      </SectionWrapper>
    </main>
  )
}

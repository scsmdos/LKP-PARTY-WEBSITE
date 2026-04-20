import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaSearch } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import SectionWrapper from '../components/SectionWrapper'

const faqData = [
  {
    category: 'Membership',
    items: [
      { q: 'How do I join Lok Kalyan Party?', a: 'You can join by filling out the membership application form on our "Join Us" page. After submission, our team will verify your details and confirm your membership within 48 hours.' },
      { q: 'Is there a membership fee?', a: 'Basic membership is completely free. However, premium membership with additional privileges is available for a nominal annual fee of ₹250.' },
      { q: 'Who is eligible to join the party?', a: 'Any Indian citizen aged 18 years or above who believes in our values of democracy, secularism, and inclusive development can join the party.' },
      { q: 'Can NRIs or overseas Indians join?', a: 'At this time, membership is open to Indian citizens residing in India. We are working on an overseas supporters program that will launch soon.' },
    ],
  },
  {
    category: 'Donation',
    items: [
      { q: 'Is my donation tax deductible?', a: 'Yes! All donations to Lok Kalyan Party are eligible for 80G tax exemption under the Income Tax Act. You will receive an official receipt within 24 hours of donation.' },
      { q: 'What is the minimum donation amount?', a: 'The minimum donation is ₹100. There is no maximum limit, though amounts above ₹2,000 are automatically reported to the Election Commission as per regulations.' },
      { q: 'How can I track where my donation goes?', a: 'We publish quarterly financial reports on our website. Every donation is accounted for and used strictly for party activities and campaigns.' },
      { q: 'Are international payments accepted?', a: 'Due to FCRA regulations, we cannot accept international payments. All donations must be made from Indian bank accounts in Indian Rupees.' },
    ],
  },
  {
    category: 'Campaigns',
    items: [
      { q: 'How can I volunteer for a campaign?', a: 'You can sign up as a volunteer on the Join Us page. Select "Social Work" or "Politics" as your interest area and our campaign coordinators will contact you.' },
      { q: 'How are LKP campaigns funded?', a: 'Campaigns are funded through member contributions, public donations, and party funds. All funding is fully transparent and disclosed per ECI guidelines.' },
      { q: 'Can I start a local campaign chapter?', a: 'Yes! After becoming a verified party member, you can apply to start a district-level chapter. Contact your state office for guidance.' },
    ],
  },
  {
    category: 'General',
    items: [
      { q: 'What is the party\'s stance on religious minorities?', a: 'LKP firmly believes in secularism and equality for all — regardless of religion, caste, or creed. We oppose communal politics and stand for unity.' },
      { q: 'How do I report a grievance or complaint?', a: 'You can submit grievances via the Contact page or call our helpline at 1800-LKP-SEVA. All complaints are addressed within 7 working days.' },
      { q: 'Is LKP present in all states of India?', a: 'LKP has active units in all 28 states and 8 Union Territories. Our state offices handle local issues and coordinate national campaigns.' },
      { q: 'Where can I find the party manifesto?', a: 'The full party manifesto is available for download in the Media section of this website. It is also available at all our state offices free of charge.' },
    ],
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'border-gold/50 shadow-gold/10 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className={`font-heading font-semibold text-base transition-colors duration-300 ${open ? 'text-maroon-700' : 'text-gray-800'}`}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${open ? 'bg-gold text-maroon-900' : 'bg-gray-100 text-gray-500'}`}
        >
          <FaChevronDown className="text-xs" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-gray-100">
              <p className="font-body text-gray-600 text-sm leading-relaxed pt-4">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...faqData.map((f) => f.category)]

  const filteredCategories = faqData
    .filter((cat) => activeCategory === 'All' || cat.category === activeCategory)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0)

  return (
    <main>
      <PageHero
        title="FAQ & Support"
        subtitle="Find quick answers to the most common questions about Lok Kalyan Party."
        breadcrumb={[{ label: 'FAQ & Support' }]}
      />

      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Search */}
          <div className="relative mb-8">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="form-input pl-10 py-2.5 text-sm rounded-md shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-heading font-semibold text-xs px-5 py-2 rounded-md border-2 transition-all ${
                  activeCategory === cat
                    ? 'bg-maroon-600 text-white border-maroon-600 shadow-maroon'
                    : 'border-gray-100 text-gray-500 hover:border-maroon-400 hover:text-maroon-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          {filteredCategories.length > 0 ? (
            <div className="space-y-6">
              {filteredCategories.map((cat) => (
                <div key={cat.category}>
                  <h2 className="font-heading font-bold text-maroon-700 text-base mb-3 flex items-center gap-3">
                    {cat.category}
                    <span className="h-px flex-1 bg-gold/20" />
                  </h2>
                  <div className="space-y-2">
                    {cat.items.map((item, i) => (
                      <FAQItem key={i} q={item.q} a={item.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-body text-gray-400 text-sm">No results found.</p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center border border-gray-100">
            <h3 className="font-heading font-bold text-maroon-700 text-lg mb-2">Still have questions?</h3>
            <p className="font-body text-gray-600 text-xs mb-6">Our team is ready to help you.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="tel:+911234567890" className="btn-primary py-2 px-5 text-xs">📞 Helpline</a>
              <a href="mailto:support@lokkalyanparty.in" className="btn-outline py-2 px-5 text-xs">
                ✉️ Email Support
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}

import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaCalendar, FaTag, FaArrowLeft, FaShareAlt, FaFacebookF, 
  FaTwitter, FaWhatsapp, FaRegClock, FaRegUser 
} from 'react-icons/fa'
import { HiOutlineMicrophone } from 'react-icons/hi'
import SectionWrapper from '../components/SectionWrapper'

// Data (Simulated Article Database)
const allNews = [
  {
    id: 1, category: 'Employment', date: 'April 20, 2026', time: '10:30 AM IST', author: 'LKP Media Cell',
    title: "LKP's 10 Lakh Jobs Blueprint: Reviving Bihar's Industrial Hubs",
    excerpt: 'LKP leadership unveils a massive plan to re-open closed sugar mills and set up IT parks to provide local employment.',
    content: `
      Patna: Lok Kalyan Party (LKP) today announced a comprehensive industrial blueprint aimed at creating 10 lakh jobs within Bihar over the next five years. The plan, titled 'Rojgar Bharat', focuses on reopening defunct sugar mills in North Bihar and establishing new IT parks in Patna and Muzaffarpur.

      "Bihar has been a source of labor for the entire country. It is time we bring the work to Bihar," said the National President during a press conference in Patna. The policy includes significant tax incentives for MSMEs and a single-window clearance system for new industrial setups.

      The party also proposed a "Job Security Act" which would ensure that local youths are prioritized for 75% of openings in state-funded industrial projects. This move is seen as a game-changer for the state's economy which has historically struggled with high unemployment rates.

      Industry experts suggest that if successfully implemented, this could decrease the state's migration rate by nearly 40% within the first three years of governance.
    `,
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80',
  },
  {
    id: 2, category: 'Education', date: 'April 18, 2026', time: '02:15 PM IST', author: 'Dr. Ritesh Singh',
    title: "Transforming Bihar's Classrooms: 500 Smart Model Schools",
    content: `
      In a major push for educational reform, LKP has pledged to transform 500 government schools into 'Smart Model Schools' across Bihar. These schools will be equipped with high-speed internet, digital whiteboards, and personal tablets for students.

      The initiative, named 'Nalanda Revival', aims to bring world-class education to the remotest villages of the state. "We want the son of a farmer to have the same digital tools as someone in New Delhi," stated the State President.

      The program also includes special training for teachers to adapt to digital pedagogy. Furthermore, the curriculum will be updated to include coding and sustainable agriculture as elective subjects from Grade 6 onwards.

      Local communities have welcomed the move, noting that many children currently have to travel long distances for quality education.
    `,
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
  },
  {
    id: 3, category: 'Migration Fix', date: 'April 15, 2026', time: '09:00 AM IST', author: 'LKP Statistics Bureau',
    title: '"Bihar se Palayan Rokna" — LKP Pledges North Bihar Economic Corridor',
    content: `
      Stopping the mass migration of people from Bihar has been a long-standing challenge. LKP has proposed the 'North Bihar Economic Corridor' (NBEC) as a solution. The corridor will connect major agricultural hubs with new manufacturing zones.

      "Migration (Palayan) is not just an economic issue; it is a social tragedy for Bihar," the party manifesto states. By building infrastructure directly in the heart of rural Bihar, LKP aims to provide dignified livelihoods at home.

      The project includes the construction of four-lane highways and logistics parks along the proposed route. Current estimates suggest that over 20,000 households will benefit from direct employment during the construction phase alone.

      Long-term goals include the setup of food processing units every 50 kilometers along the highway to support local farmers.
    `,
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
  },
]

export default function NewsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = allNews.find(n => n.id === parseInt(id))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!article) {
    return (
      <div className="h-screen flex items-center justify-center bg-white font-body">
        <div className="text-center">
          <HiOutlineMicrophone className="text-6xl text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Headline Unavailable</h2>
          <button 
            onClick={() => navigate('/news')}
            className="text-maroon-600 font-bold hover:underline mt-4 text-sm uppercase tracking-widest"
          >
            Back to Newsroom
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-white min-h-screen pt-12">
      {/* ─── Breadcrumb Navigation ─── */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-maroon-700">Home</Link>
          <span>/</span>
          <Link to="/news" className="hover:text-maroon-700">Newsroom</Link>
          <span>/</span>
          <span className="text-maroon-700">{article.category}</span>
        </div>
      </div>

      {/* ─── TOP SECTION: Professional News Headline (NO HERO IMAGE) ─── */}
      <section className="max-w-6xl mx-auto px-4 border-b border-gray-100 pb-12">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl"
        >
          <div className="inline-block bg-maroon-700 text-white text-[10px] font-black px-3 py-1 mb-6 rounded-sm uppercase tracking-widest">
             {article.category}
          </div>
          
          <h1 className="font-heading text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 font-body text-xs py-4 border-y border-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-maroon-700">
                <FaRegUser />
              </div>
              <span className="font-bold text-gray-900">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-gold" /> {article.date}
            </div>
            <div className="flex items-center gap-2">
              <FaRegClock className="text-gold" /> {article.time}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Article Body (Standard News Layout) */}
          <article className="lg:col-span-8">
            
            {/* The image comes AFTER the headline in professional news */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-video rounded-xl overflow-hidden mb-10 shadow-2xl"
            >
              <img 
                src={article.img} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/60 text-white text-[9px] font-bold px-2 py-1 rounded backdrop-blur-md">
                Photo: Lok Kalyan Party Media
              </div>
            </motion.div>

            <div className="prose prose-lg prose-slate max-w-none">
              {article.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="font-body text-gray-700 text-lg md:text-xl leading-relaxed mb-8 first-letter:text-5xl first-letter:font-bold first-letter:text-maroon-700 first-letter:mr-3 first-letter:float-left">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Social Share Bar */}
            <div className="mt-16 bg-slate-50 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
              <div className="font-heading font-bold text-gray-900">Share Bihar's Transformation</div>
              <div className="flex items-center gap-3">
                <button className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                  <FaFacebookF />
                </button>
                <button className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-sky-400 hover:bg-sky-400 hover:text-white transition-all">
                  <FaTwitter />
                </button>
                <button className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all">
                  <FaWhatsapp />
                </button>
                <button className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:bg-maroon-700 hover:text-white transition-all">
                  <FaShareAlt />
                </button>
              </div>
            </div>
          </article>

          {/* Right Column: Sidebar (Trending News Room) */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Newsletter / Join Box */}
            <div className="bg-maroon-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                 <h4 className="font-heading font-black text-2xl text-gold mb-2">Join the Movement</h4>
                 <p className="font-body text-sm text-white/70 mb-6 leading-relaxed">Be the first to hear about the progress of Bihar and our 100-day action plan.</p>
                 <Link to="/join-us" className="block w-full text-center py-4 bg-gold text-maroon-950 font-black text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all">
                    GET UPDATES
                 </Link>
               </div>
               <div className="absolute -bottom-6 -right-6 text-9xl text-white/5 font-black leading-none select-none">LKP</div>
            </div>

            {/* More from Bihar Section */}
            <div>
              <h4 className="font-heading font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full" /> More News
              </h4>
              <div className="space-y-6">
                {allNews.filter(n => n.id !== article.id).map(n => (
                  <Link key={n.id} to={`/news/${n.id}`} className="flex gap-4 group">
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative">
                      <img src={n.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-maroon-700 uppercase tracking-widest mb-1 block">{n.category}</span>
                      <h5 className="font-heading font-bold text-gray-800 text-sm group-hover:text-maroon-600 transition-colors line-clamp-2 leading-snug">
                        {n.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Political Tag Cloud */}
            <div className="pt-8 border-t border-gray-100">
               <h4 className="font-heading font-bold text-gray-900 text-xs uppercase tracking-[3px] mb-6">Hot Topics</h4>
               <div className="flex flex-wrap gap-2">
                  {['Education', 'Employment', 'Bihar Strategy', 'Migration Fix', 'Panchayat Seva', 'IT Hubs'].map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gold hover:text-white transition-all cursor-pointer">
                      #{tag.replace(' ', '')}
                    </span>
                  ))}
               </div>
            </div>

          </aside>
        </div>
      </div>

    </main>
  )
}

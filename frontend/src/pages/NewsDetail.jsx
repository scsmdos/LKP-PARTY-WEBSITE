import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaCalendar, FaArrowLeft, FaShareAlt, FaFacebookF, 
  FaTwitter, FaWhatsapp, FaRegClock, FaRegUser 
} from 'react-icons/fa'
import { HiOutlineMicrophone } from 'react-icons/hi'

// Data (Simulated Article Database)
const allNews = [
  {
    id: 1, category: 'Employment', date: 'April 20, 2026', time: '10:30 AM IST', author: 'LKP Media Cell',
    title: "LKP's 10 Lakh Jobs Blueprint: Reviving Bihar's Industrial Hubs",
    excerpt: 'LKP leadership unveils a massive plan to re-open closed sugar mills and set up IT parks to provide local employment.',
    content: `Patna: Lok Kalyan Party (LKP) today announced a comprehensive industrial blueprint aimed at creating 10 lakh jobs within Bihar over the next five years. The plan, titled 'Rojgar Bharat', focuses on reopening defunct sugar mills in North Bihar and establishing new IT parks in Patna and Muzaffarpur.

"Bihar has been a source of labor for the entire country. It is time we bring the work to Bihar," said the National President during a press conference in Patna. The policy includes significant tax incentives for MSMEs and a single-window clearance system for new industrial setups.

The party also proposed a "Job Security Act" which would ensure that local youths are prioritized for 75% of openings in state-funded industrial projects. This move is seen as a game-changer for the state's economy which has historically struggled with high unemployment rates.

Industry experts suggest that if successfully implemented, this could decrease the state's migration rate by nearly 40% within the first three years of governance.`,
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80',
  },
  {
    id: 2, category: 'Education', date: 'April 18, 2026', time: '02:15 PM IST', author: 'Dr. Ritesh Singh',
    title: "Transforming Bihar's Classrooms: 500 Smart Model Schools",
    content: `In a major push for educational reform, LKP has pledged to transform 500 government schools into 'Smart Model Schools' across Bihar. These schools will be equipped with high-speed internet, digital whiteboards, and personal tablets for students.

The initiative, named 'Nalanda Revival', aims to bring world-class education to the remotest villages of the state. "We want the son of a farmer to have the same digital tools as someone in New Delhi," stated the State President.

The program also includes special training for teachers to adapt to digital pedagogy. Furthermore, the curriculum will be updated to include coding and sustainable agriculture as elective subjects from Grade 6 onwards.

Local communities have welcomed the move, noting that many children currently have to travel long distances for quality education.`,
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
  },
  {
    id: 3, category: 'Migration Fix', date: 'April 15, 2026', time: '09:00 AM IST', author: 'LKP Statistics Bureau',
    title: '"Bihar se Palayan Rokna" — LKP Pledges North Bihar Economic Corridor',
    content: `Stopping the mass migration of people from Bihar has been a long-standing challenge. LKP has proposed the 'North Bihar Economic Corridor' (NBEC) as a solution. The corridor will connect major agricultural hubs with new manufacturing zones.

"Migration (Palayan) is not just an economic issue; it is a social tragedy for Bihar," the party manifesto states. By building infrastructure directly in the heart of rural Bihar, LKP aims to provide dignified livelihoods at home.

The project includes the construction of four-lane highways and logistics parks along the proposed route. Current estimates suggest that over 20,000 households will benefit from direct employment during the construction phase alone.

Long-term goals include the setup of food processing units every 50 kilometers along the highway to support local farmers.`,
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
  },
  {
    id: 4, category: 'Environment', date: 'April 12, 2026', time: '11:00 AM IST', author: 'Priya Verma',
    title: "Harit Bihar Mission: 25 Million Trees to be Planted on Ganga Banks",
    content: `Patna: In a massive environmental drive, Lok Kalyan Party (LKP) today launched the 'Harit Bihar Mission'. The party has committed to planting 25 million native trees along the banks of the River Ganga across its entire stretch in Bihar.

"The Ganga is our lifeblood. Protecting its banks and increasing Bihar's green cover is not just a policy, it is our duty," Priya Verma, LKP's Environment Wing Head, stated. The mission involves local panchayats and youth volunteers who will be designated as 'Ganga Mitras'.

The project also aims to create green buffers in major cities like Patna, Bhagalpur, and Munger to combat rising temperatures and air pollution. Seedlings will be distributed free of cost to farmers for agro-forestry initiatives.

Experts believe this drive will significantly improve the biodiversity of the region and help in groundwater recharging.`,
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
  },
  {
    id: 5, category: 'Employment', date: 'April 10, 2026', time: '04:30 PM IST', author: 'Arjun Mandal',
    title: "Bihar Skill Hubs: Empowering 5 Lakh Rural Youths in First 100 Days",
    content: `Muzaffarpur: LKP leadership has unveiled plans to establish 'Bihar Skill Hubs' in every district. The immediate goal is to empower 5 lakh rural youths with market-relevant skills within the first 100 days of governance.

The hubs will provide vocational training in sectors like mobile manufacturing, apparel design, and digital marketing. "Our youth are talented; they just need the right platform to shine," said Arjun Mandal during the inauguration of a pilot center.

LKP's policy also includes tie-ups with major industrial houses to ensure almost 100% placement for certified trainees. Special low-interest startup loans will also be provided to those who wish to become entrepreneurs in their villages.

The initiative is designed to turn Bihar's demographic dividend into a powerhouse of economic growth.`,
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80',
  },
  {
    id: 6, category: 'Education', date: 'April 05, 2026', time: '01:00 PM IST', author: 'Prof. Amarendra Kumar',
    title: "Digital University Bihar: Bringing World-Class Learning to Remote Villages",
    content: `Bhagalpur: Breaking the barriers of traditional education, LKP has proposed the establishment of the 'Digital University of Bihar'. This first-of-its-kind decentralized university will bring world-class learning directly to remote villages through a network of high-tech digital study centers.

"Geography should not dictate the quality of education a student receives," Prof. Amarendra Kumar explained. The university will offer degrees in partnership with top global institutions, focusing on future-ready subjects.

Every student enrolled will be provided with high-speed internet access and a subsidized learning device. The platform will support multiple local languages to ensure inclusivity.

This move is expected to revolutionize higher education in the state and significantly increase the Gross Enrolment Ratio (GER) in rural Bihar.`,
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
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
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <HiOutlineMicrophone className="text-5xl text-gray-200 mx-auto mb-4" />
          <h2 className="text-lg font-heading font-bold text-gray-800">Article Not Found</h2>
          <button 
            onClick={() => navigate('/news')}
            className="text-maroon-700 font-bold hover:underline mt-4 text-xs uppercase tracking-widest"
          >
            Back to Newsroom
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-white min-h-screen pt-24 md:pt-32">
      {/* ─── Breadcrumb ─── */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-[2px]">
          <Link to="/" className="hover:text-maroon-700">Home</Link>
          <span>/</span>
          <Link to="/news" className="hover:text-maroon-700">News</Link>
          <span>/</span>
          <span className="text-maroon-700">{article.category}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article */}
          <article className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-block bg-maroon-800 text-white text-[9px] font-bold px-2 py-1 mb-4 rounded-sm uppercase tracking-wider">
                {article.category}
              </div>
              <h1 className="font-heading text-lg md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-6 line-clamp-2">
                {article.title}
              </h1>

              <div className="flex flex-nowrap items-center gap-3 text-gray-500 font-body text-[10px] pb-6 border-b border-gray-100 mb-8 mt-2 overflow-x-auto no-scrollbar whitespace-nowrap">
                <div className="flex items-center gap-2 pr-3 border-r border-gray-100 flex-shrink-0">
                  <div className="w-6 h-6 bg-slate-50 rounded-full flex items-center justify-center text-maroon-700">
                    <FaRegUser className="text-[9px]" />
                  </div>
                  <span className="font-bold text-gray-900">{article.author}</span>
                </div>
                <div className="flex items-center gap-1.5 pr-3 border-r border-gray-100 flex-shrink-0">
                  <FaCalendar className="text-gold text-[9px]" /> {article.date}
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <FaRegClock className="text-gold text-[9px]" /> {article.time}
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-video rounded-md overflow-hidden mb-8 shadow-sm">
                <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[8px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                  Bihar Media Hub
                </div>
              </div>

              {/* Content */}
              <div className="font-body text-gray-700 text-sm md:text-base leading-relaxed space-y-6">
                {article.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Share */}
              <div className="mt-12 py-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="font-heading font-black text-gray-900 text-xs uppercase tracking-widest italic">Share this update</div>
                <div className="flex items-center gap-2">
                  {[
                    { icon: <FaFacebookF />, color: 'text-blue-600' },
                    { icon: <FaTwitter />, color: 'text-sky-400' },
                    { icon: <FaWhatsapp />, color: 'text-green-500' },
                    { icon: <FaShareAlt />, color: 'text-gray-400' },
                  ].map((s, i) => (
                    <button key={i} className={`w-9 h-9 rounded-md bg-slate-50 flex items-center justify-center ${s.color} hover:bg-maroon-50 transition-all text-xs`}>
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="p-1">
              <h4 className="font-heading font-bold text-gray-900 text-xs uppercase tracking-[2px] mb-5 pb-2 border-b border-gold/30 inline-block">
                Recent Updates
              </h4>
              <div className="space-y-5">
                {allNews.filter(n => n.id !== article.id).map(n => (
                  <Link key={n.id} to={`/news/${n.id}`} className="flex gap-3 group items-start">
                    <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-slate-100">
                      <img src={n.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-maroon-700 uppercase tracking-wide mb-1 block">{n.category}</span>
                      <h5 className="font-heading font-bold text-gray-800 text-[12px] group-hover:text-maroon-700 transition-colors leading-tight">
                        {n.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-maroon-900 p-6 rounded-lg text-white shadow-lg relative overflow-hidden">
               <h4 className="font-heading font-black text-lg text-gold mb-2">Join LKP</h4>
               <p className="font-body text-[11px] text-white/70 mb-5 leading-relaxed">Join the movement to transform Bihar's villages into centers of industrial growth.</p>
               <Link to="/join-us" className="block w-full text-center py-3 bg-gold text-maroon-950 font-black text-[10px] uppercase tracking-widest rounded hover:brightness-110 transition-all">
                  Sign Up Today
               </Link>
            </div>

            <div className="pt-4">
              <Link 
                to="/news" 
                className="flex items-center gap-2 text-maroon-700 font-bold text-[11px] uppercase tracking-widest hover:gap-4 transition-all"
              >
                <FaArrowLeft className="text-[9px]" /> Back to all News
              </Link>
            </div>
          </aside>

        </div>
      </div>
      <div className="h-10 md:h-16" /> {/* Extra spacing at bottom */}
    </main>
  )
}

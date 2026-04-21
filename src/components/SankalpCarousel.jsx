import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const items = [
  {
    title: 'Krishi Kalyan',
    subtitle: 'Bihar Farmers Growth',
    img: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'Shiksha Mission',
    subtitle: 'Nalanda Legacy Revived',
    img: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'Infrastructure',
    subtitle: 'Connecting Every Village',
    img: 'https://images.pexels.com/photos/258447/pexels-photo-258447.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'Public Health',
    subtitle: 'Healthcare at Doorstep',
    img: 'https://images.pexels.com/photos/1271897/pexels-photo-1271897.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'Nari Shakti',
    subtitle: 'Women-Led Governance',
    img: 'https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'Industrial Bihar',
    subtitle: 'Manufacturing Hub Focus',
    img: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'Youth Employment',
    subtitle: 'Jobs for Every Hand',
    img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'Gram Vikas',
    subtitle: 'Empowering Panchayats',
    img: 'https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?auto=compress&cs=tinysrgb&w=1000',
  }
];

export default function SankalpCarousel() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden group">
      
      {/* Brand Overlay - Centered Typography scaled down */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-white text-2xl sm:text-3xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,1)] whitespace-nowrap"
        >
          LKP <span className="text-gold">SANKALP</span> 2026
        </motion.h2>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: '.sankalp-prev',
          nextEl: '.sankalp-next',
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="relative overflow-hidden border-r border-white/5 last:border-0">
            {/* Background Image Container */}
            <div className="absolute inset-0 transition-transform duration-1000">
              <img 
                src={item.img} 
                className="w-full h-full object-cover" 
                alt={item.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-black/40 to-transparent" />
            </div>

            {/* Content Overlay - Font sizes reduced */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-center z-10">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-white font-heading font-black text-2xl md:text-3xl mb-2 drop-shadow-lg">
                  {item.title}
                </h3>
                <p className="text-gold font-body text-xs md:text-sm font-black uppercase tracking-[4px] mb-6">
                  {item.subtitle}
                </p>
                <button className="px-8 py-3 border border-white/60 text-white font-heading font-black text-xs uppercase tracking-widest hover:bg-gold hover:border-gold hover:text-maroon-900 transition-all duration-500 rounded">
                  Read More
                </button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        {/* 
           ARROWS
        */}
        <button className="sankalp-prev absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-14 bg-black/40 backdrop-blur-md flex items-center justify-center text-white border-y border-r border-white/20 hover:bg-gold hover:text-maroon-900 transition-all">
          <FaChevronLeft className="text-sm" />
        </button>
        <button className="sankalp-next absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-14 bg-black/40 backdrop-blur-md flex items-center justify-center text-white border-y border-l border-white/20 hover:bg-gold hover:text-maroon-900 transition-all">
          <FaChevronRight className="text-sm" />
        </button>
      </Swiper>
    </section>
  );
}

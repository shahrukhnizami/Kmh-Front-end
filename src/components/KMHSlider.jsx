import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Add this CSS for animations (can be placed in your global CSS file)
const styles = `
  @keyframes slideInLeft {
    from { transform: translateX(-100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideInRight {
    from { transform: translateX(100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideInUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-slideInLeft {
    animation: slideInLeft 0.8s ease-out forwards;
  }
  .animate-slideInRight {
    animation: slideInRight 0.8s ease-out 0.3s forwards;
  }
  .animate-slideInUp {
    animation: slideInUp 0.8s ease-out 0.6s forwards;
  }
`;

const slides = [
  {
    image: 'https://www.kmh.org.pk/img/1.jpg',
    title: '24/7 Emergency Services',
    subtitle: '(A PROJECT OF KUTIYANA MEMON ASSOCIATION)',
    button: 'Get Help Now',
    buttonLink: '/emergency',
  },
  {
    image: 'https://www.kmh.org.pk/img/3.jpg',
    title: 'World-Class Medical Facilities',
    subtitle: 'Serving with compassion and excellence.',
    button: 'Learn More',
    buttonLink: '/services',
  },
  {
    image: 'https://www.kmh.org.pk/img/4.jpg',
    title: 'Support a Life Today',
    subtitle: 'Your donation makes a difference.',
    button: 'Donate Now',
    buttonLink: '/donate',
  },
  {
    image: 'https://www.kmh.org.pk/img/10.jpg',
    title: 'Advanced Medical Technology',
    subtitle: 'State-of-the-art equipment for better care.',
    button: 'View Facilities',
    buttonLink: '/technology',
  },
  {
    image: 'https://www.kmh.org.pk/img/11.jpg',
    title: 'Expert Medical Professionals',
    subtitle: 'Dedicated team of doctors and specialists.',
    button: 'Meet Our Team',
    buttonLink: '/doctors',
  },
];

const KMHSlider = () => {
  return (
    <>
      <style>{styles}</style>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false 
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination',
          type: 'bullets',
        }}
        className="relative w-6xl h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="container mx-auto  w-full h-full bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0    bg-opacity-10"></div>
              
              {/* Content with staggered animations */}
              
              <div className="relative z-10 max-w-4xl px-4  mt-40 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white opacity-0 animate-slideInLeft">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-8 text-gray-100 opacity-0 animate-slideInRight">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.buttonLink}
                  className="inline-block bg-[#053e69] hover:bg-[#005b9f] text-white font-semibold py-3 px-8 rounded-lg transition duration-300 opacity-0 animate-slideInUp"
                >
                  {slide.button}
                </a>
              </div>
              </div>
          </SwiperSlide>
        ))}

        {/* Custom navigation arrows */}
        <div className="swiper-button-next text-white after:text-2xl"></div>
        <div className="swiper-button-prev text-white after:text-2xl"></div>
        
        {/* Custom pagination */}
        <div className="swiper-pagination !bottom-6"></div>
      </Swiper>
    </>
  );
};

export default KMHSlider;
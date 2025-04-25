import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    <div className="relative">
      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
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
        
        /* Responsive height adjustments */
        .swiper-container {
          height: 70vh;
          min-height: 400px;
          max-height: 800px;
        }
        
        @media (max-width: 768px) {
          .swiper-container {
            height: 60vh;
            min-height: 350px;
          }
        }
        
        @media (max-width: 480px) {
          .swiper-container {
            height: 50vh;
            min-height: 300px;
          }
        }
      `}</style>

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
        className="swiper-container container mx-auto w-6xl h-full object-fill"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full  bg-cover bg-center flex items-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark overlay with responsive opacity */}
              <div className="absolute inset-0  bg-opacity-30 md:bg-opacity-20"></div>
              
              <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-white opacity-0 animate-slideInLeft">
                    {slide.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 text-gray-100 opacity-0 animate-slideInRight">
                    {slide.subtitle}
                  </p>
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-[#053e69] hover:bg-[#005b9f] text-white font-medium sm:font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg transition duration-300 opacity-0 animate-slideInUp text-sm sm:text-base"
                  >
                    {slide.button}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom navigation arrows - hidden on mobile */}
        <div className="swiper-button-next hidden sm:flex !text-white after:text-xl md:after:text-2xl"></div>
        <div className="swiper-button-prev hidden sm:flex !text-white after:text-xl md:after:text-2xl"></div>
        
        {/* Custom pagination - smaller on mobile */}
        <div className="swiper-pagination !bottom-4 sm:!bottom-6"></div>
      </Swiper>
    </div>
  );
};

export default KMHSlider;
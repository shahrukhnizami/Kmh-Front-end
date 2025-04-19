import React, { useState } from "react";

const images = [
  "https://www.kmh.org.pk/img/D.jpg",
  "https://www.kmh.org.pk/img/3.jpg",
  "https://www.kmh.org.pk/img/11.jpg",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden  shadow-lg ">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Slide ${index}`} className="w-full flex-shrink-0" />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2"
      >
        ◀
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full ${current === i ? "bg-blue-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

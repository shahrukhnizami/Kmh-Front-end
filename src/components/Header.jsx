import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "News/Events", path: "/news" },
    { name: "Departments", path: "/departments" },
    { name: "Pharmacy", path: "/pharmacy" },
    { name: "Photo Gallery", path: "/gallery" },
    { name: "Online Reports", path: "/reports" },
    { name: "Find A Doctor", path: "/doctors" },
    { name: "Medical Board", path: "/medical-board" }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <div className="bg-white shadow-md">
      {/* Top Links */}
      <div className="hidden md:flex py-2 justify-end items-center px-4 text-sm text-blue-600 ">
        <div className="container mx-auto w-full max-w-6xl flex justify-end">
          <div className="flex space-x-4">
            <button onClick={() => handleNavigation("/welfare")} className="hover:underline ">
              Welfare/Donation
            </button>
            <span className="text-gray-300">|</span>
            <button onClick={() => handleNavigation("/careers")} className="hover:underline ">
              Careers
            </button>
            <span className="text-gray-300">|</span>
            <button onClick={() => handleNavigation("/contact")} className="hover:underline ">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="container mx-auto flex justify-center items-center py-4  max-w-6xl">
      <div className="container mx-auto flex justify-center items-center py-4 max-w-6xl">
  <div className="text-center w-full md:w-auto">
    <button onClick={() => handleNavigation("/")}>
      <img 
        src="https://www.kmh.org.pk/images/KMHLOGO.png" 
        alt="KMH Logo" 
        className="h-[100px] mx-auto md:mx-0 cursor-pointer" 
      />
    </button>
  </div>
</div>

        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden text-[#053e69] focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="bg-[#053e69]">
        <div className="container mx-auto max-w-6xl">
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex flex-wrap justify-between text-white text-sm font-medium py-3 px-2 space-x-1">
            <li>
              <button 
                onClick={() => handleNavigation("/")}
                className="px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#0088cc] hover:text-white block"
              >
                Home
              </button>
            </li>
            {navLinks.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => handleNavigation(link.path)}
                  className="px-1 py-2 rounded-md transition-all duration-200 hover:bg-[#0088cc] hover:text-white block"
                >
                  {link.name}
                </button>
              </li>
            ))}
            <li>
              <button 
                onClick={() => handleNavigation("/donation")}
                className="px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#0088cc] hover:text-white block"
              >
                Donation
              </button>
            </li>
          </ul>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <ul className="lg:hidden flex flex-col text-white text-sm font-medium py-2 px-4">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="w-full text-left px-3 py-3 rounded-md transition-all duration-200 hover:bg-[#0088cc] hover:text-white block border-b border-[#2a5a83]"
                >
                  Home
                </button>
              </li>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="w-full text-left px-3 py-3 rounded-md transition-all duration-200 hover:bg-[#0088cc] hover:text-white block border-b border-[#2a5a83]"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNavigation("/donation")}
                  className="w-full text-left px-3 py-3 rounded-md transition-all duration-200 hover:bg-[#0088cc] hover:text-white block border-b border-[#2a5a83]"
                >
                  Donation
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* Marquee */}
      <div className="py-2">
        <marquee 
          direction="left" 
          scrollamount="4" 
          className="font-bold text-[#5689bc] text-sm md:text-lg"
        >
          Mission Thalassemia by Kutiyana Memon Hospital - Donate Blood - Save Life
        </marquee>
      </div>
    </div>
  );
};

export default Header;
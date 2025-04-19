import { Mail, Phone, MapPin } from "lucide-react";

const Footer1 = () => {
  return (
    <footer className="bg-[#5689bc] text-white text-sm border-t-4 border-black relative pb-16 md:pb-0">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Information */}
          <div className="lg:w-1/3">
            <h4 className="font-bold mb-4 text-black text-lg flex items-center">
              <MapPin className="mr-2" size={18} />
              Contact Information
            </h4>
            <hr className="border-t-2 border-black mb-4 w-20" />
            
            <div className="space-y-3">
              <p className="mb-2">Aga Khan/Challana Road, Kharadar, Karachi-74000</p>
              
              <div className="flex items-start gap-3">
                <Phone size={16} strokeWidth={1.75} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p>(92-21) 32315376-7</p>
                  <p>(92-21) 32313836-7</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail size={16} strokeWidth={1.75} />
                <p>info@kmh.org.pk</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:w-1/3">
            <h4 className="font-bold mb-4 text-black text-lg">Quick Links</h4>
            <hr className="border-t-2 border-black mb-4 w-20" />
            
            <ul className="grid grid-cols-2 gap-2">
              {['Home', 'About Us', 'Services', 'Departments', 'Find a Doctor', 'Pharmacy', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline hover:text-blue-100 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div className="lg:w-1/3">
            <h4 className="font-bold mb-4 text-black text-lg">Our Location</h4>
            <hr className="border-t-2 border-black mb-4 w-20" />
            
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=KMA%20Hospital&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="250"
                loading="lazy"
                title="Google Maps"
                className="border-0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#333333] text-white py-3 w-full fixed bottom-0 z-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-center md:text-left mb-2 md:mb-0">
              Copyright © {new Date().getFullYear()} Kutiyana Memon Hospital. All Rights Reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-xs hover:underline">Privacy Policy</a>
              <a href="#" className="text-xs hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
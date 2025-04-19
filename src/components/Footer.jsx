import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#5689bc] text-white text-sm border-t-4 border-black">
      {/* Top Section */}
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between py-6">
        <div className="md:w-1/3">
          <h4 className="font-sans mb-2 text-black">Address <hr className="border-t-2 border-black mb-4 w-20" /></h4>
          
          <p className="mb-2">Aga Khan/Challana Road, Kharadar, Karachi-74000</p>
          <p className="flex items-center gap-2 mb-1">
            <Phone size={13} strokeWidth={1.75}  /> Phone: 
          </p>
          <p>(92-21) 32315376-7</p>
          <p>(92-21) 32313836-7</p>
          <p className="flex items-center gap-2 mb-1"><Mail size={13} strokeWidth={1.75} />info@kmh.org.pk</p>
        </div>

        <div className="md:w-1/3 mt-6 md:mt-0 ">
          <iframe
            src="https://maps.google.com/maps?q=KMA%20Hospital&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="350"
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#333333] text-white py-3 fixed bottom-0 w-full">
        <div  className="container mx-auto max-w-6xl flex justify-between ">
        <hr className="border-neutral-600 mb-2" />
        <p className="text-xs  text-right">
          Copyright © 2020, <a href="#" className="underline">Kutiyana Memon Hospital</a>
        </p>
            </div>
        
      </div>
    </footer>
  );
};

export default Footer;

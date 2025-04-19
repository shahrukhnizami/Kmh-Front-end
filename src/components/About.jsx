const About = () => {
    let marqueeRef = null;
  
    return (
      <section className="container mx-auto w-full max-w-6xl flex flex-col md:flex-row justify-center gap-6 py-6 ">
        <div className="md:w-3/4">
          <h2 className="text-xl font-bold text-[#053e69] mb-4">About KMH</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            KUTIYANA MEMON HOSPITAL was established in the year 1993 with the aim to provide quality services and compassionate care at affordable levels. With the core objective to promote excellence in the field of health with an uncompromising attitude, KMH is equipped with modern equipment, harnessed by professionals with a proven track record. With a commitment to provide quality care, we believe that a caring and serene environment is vital and serves as a catalyst in the healing and recovery process of the patient.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            The modern architecture of the building reflects a passion and commitment to this caring endeavour. The aesthetically pleasing architecture with special emphasis on the horticultural scheme allows for a soothing environment, resulting in a sensory experience that aids recovery.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            The team of professionals at KMH shares the same vision and passion that led to the establishment of this facility. It is the responsibility and willingness to help mankind and provide comfort and relief that drives this team and connects us all. This team spirit is radiated through our actions and deeds, as we all believe in striving for a positive change.
          </p>
        </div>
  
        {/* News Column */}
        <div className="md:w-1/4">
          <h3 className="font-semibold text-sm mb-2 text-[#053e69]">Latest News</h3>
          <div className="bg-[#f9f9f9] border border-gray-200  p-4 shadow-sm h-[250px] overflow-hidden">
            <marquee
              direction="up"
              scrollAmount="3"
              height="100%"
              ref={(el) => (marqueeRef = el)}
              onMouseOver={() => marqueeRef?.stop()}
              onMouseOut={() => marqueeRef?.start()}
            >
              <p className="mb-2 italic font-medium text-sm text-[#053e69]">Important Announcement!</p>
              <p className="text-sm text-gray-600">
                All KMH applicants of certificate courses of Sindh Medical Faculty can collect their Admit Card on 9th &amp; 10th October, 2023 between 11:00 am to 01:00 pm from KMH Administration Department.
              </p>
              <hr className="my-4" />
              <p className="font-bold text-sm text-[#053e69] italic">KMH SCHOOL OF ALLIED HEALTH</p>
              <p className="text-sm text-gray-600">
                Please be informed that the submission deadline for certificate and diploma course of Sindh Medical Faculty form has been extended from September 25, 2023, to September 27, 2023.
                <br />
                Don't miss out on this opportunity! Hurry and complete your applications.
                <br />
                Contact: <br />
                0213-2200010, 0213-2315376
              </p>
            </marquee>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  
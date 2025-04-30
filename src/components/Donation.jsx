import React, { useState } from 'react';
import config from '../config';
import { ArrowBigLeft, Heart, Shield, HandCoins, Calendar, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const Donation = () => {
  const [submitted, setSubmitted] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setSubmitted(false);
    setError(null);

    try {
      const formData = new FormData(e.target);
      const fullName = formData.get('full_name');
      const [name_first, name_last] = fullName.includes(' ')
        ? fullName.split(' ')
        : [fullName, ''];

      if (!selectedType) {
        throw new Error("Please select a donation type.");
      }

      const referenceNumber = Number(Date.now());

      const paymentData = {
        merchant_id: import.meta.env.VITE_PAYFAST_MERCHANT_ID,
        merchant_key: import.meta.env.VITE_PAYFAST_MERCHANT_KEY,
        return_url: `${window.location.origin}/donation/success`,
        cancel_url: `${window.location.origin}/donation/cancel`,
        notify_url: `${config.API_BASE_URL}/api/v1/payfast/webhook`,
        name_first,
        name_last,
        email_address: formData.get('email'),
        amount: parseFloat(donationAmount).toFixed(2),
        item_name: `${selectedType} Donation`,
        item_description: formData.get('message') || `Donation to Kutiyana Memon Hospital`,
        m_payment_id: `donation-${referenceNumber}`,
        custom_str1: selectedType,
        custom_str2: 'Kutiyana-Memon-Hospital',
        currency: 'ZAR',
      };

      const donationRes = await fetch(`${config.API_BASE_URL}/api/v1/donation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donationType: selectedType,
          email: formData.get('email'),
          amount: parseFloat(donationAmount),
          message: formData.get('message'),
          payment: {
            method: "payfast",
            status: "pending",
            merchantPaymentId: paymentData.m_payment_id,
            pfPaymentId: ""
          }
        }),
      });

      const donationData = await donationRes.json();

      if (!donationRes.ok || !donationData.success) {
        throw new Error(donationData.message || "Failed to create donation record");
      }

      // Attach donation record ID
      paymentData.custom_int1 = Number(Date.now());

      // Save PayFast & donation details in localStorage
      localStorage.setItem('donationAmount', paymentData.amount);
      localStorage.setItem('donationType', selectedType);
      localStorage.setItem('donationMessage', paymentData.item_description);
      localStorage.setItem('donationDate', new Date().toISOString());
      localStorage.setItem('donationId', donationData?.data?._id || `donation-${referenceNumber}`);
      localStorage.setItem('donationMerchantPaymentId', paymentData.m_payment_id);
      localStorage.setItem('donationPfPaymentId', "");
      redirectToPayFast(paymentData);
    } catch (err) {
      console.error("Donation error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
      setSubmitted(true);
      setIsProcessing(false);

    }
     
  };

  const redirectToPayFast = (paymentData) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = config.PAYFAST_URL;

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    
    document.body.appendChild(form);
    form.submit();

  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-16 overflow-hidden">
      
      {/* Decorative elements */}
    

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
   

        {/* <div className="text-center mb-12 mt-8">
         
          <h1 className="text-4xl md:text-5xl font-bold text-[#053e69] mb-4">
            Support <Link
  to="https://www.kmh.org.pk/" 
  className="text-blue-600 hover:text-blue-800 hover:cursor-pointer transition-colors duration-200"
>
  Kutiyana Memon Hospital
</Link>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your generosity helps us provide life-saving healthcare to thousands every year.
            <span className="block mt-2 text-blue-600 font-medium">100% of donations go directly to patient care.</span>
          </p>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Donation Form Card */}
          <div className="w-full lg:w-2/3 bg-white p-8 rounded-2xl shadow-xl border border-blue-100 transform hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-[#053e69] to-blue-600 p-3 rounded-full mr-4 shadow-md">
                <Heart className="h-8 w-8 text-white" fill="currentColor" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#053e69]">Make a Donation</h2>
                <p className="text-sm text-gray-500">Complete the form below to contribute</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="full_name">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#053e69] focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#053e69] focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1  sm:grid-cols-2 gap-3">
                  {[
                    { 
                      type: 'Sadaqah', 
                      icon: <Shield className="text-blue-950 h-5 w-5" />,
                      desc: 'Voluntary charity with no restrictions',
                      color: 'bg-gradient-to-r from-[#053e69] to-blue-600'
                    },
                    { 
                      type: 'Zakat', 
                      icon: <HandCoins className="text-blue-950 h-5 w-5" />,
                      desc: 'Obligatory almsgiving for eligible Muslims',
                      color: 'bg-gradient-to-r from-[#053e69] to-blue-600'
                    }
                  ].map((item) => (
                    <div
                      key={item.type}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedType === item.type 
                        ? `border-transparent bg-gradient-to-r ${item.color} text-white shadow-md` 
                        : 'border-gray-300 hover:border-[#053e69] hover:shadow-md'}`}
                      onClick={() => setSelectedType(item.type)}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full mr-3 ${selectedType === item.type 
                          ? 'bg-white bg-opacity-20 text-white' 
                          : 'bg-gray-100 text-gray-600'}`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <input
                              id={item.type}
                              name="donationtype"
                              type="radio"
                              value={item.type}
                              className="h-4 w-4 text-[#053e69] focus:ring-[#053e69] border-gray-300"
                              checked={selectedType === item.type}
                              onChange={() => setSelectedType(item.type)}
                              required
                            />
                            <label htmlFor={item.type} className={`ml-2 block text-sm font-medium ${selectedType === item.type ? 'text-white' : 'text-gray-700'}`}>
                              {item.type}
                            </label>
                          </div>
                          <p className={`mt-1 text-xs ${selectedType === item.type ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Amount (PKR) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {[1000, 5000, 10000, 25000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 ${donationAmount === amount.toString()
                        ? 'bg-gradient-to-r from-[#053e69] to-blue-600 text-white border-transparent shadow-md'
                        : 'bg-white border-gray-300 hover:border-[#053e69] hover:text-[#053e69] hover:shadow-md'}`}
                      onClick={() => setDonationAmount(amount.toString())}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">PKR</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full pl-16 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#053e69] focus:border-transparent transition-all duration-200"
                    placeholder="Enter custom amount"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                  Message (Optional)
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#053e69] focus:border-transparent transition-all duration-200"
                    rows="4"
                    placeholder="Would you like to dedicate this donation or add special instructions?"
                    maxLength="200"
                  ></textarea>
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    Max 200 characters
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full bg-gradient-to-r from-[#053e69] to-blue-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:opacity-90'}`}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 mr-2" fill="currentColor" />
                      Donate Now
                    </div>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-gray-500">
                  Your donation is secure and tax-deductible. By donating, you agree to our <a href="terms-condition" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="terms-condition" className="text-blue-600 hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </form>
          </div>

          {/* Impact Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 transform hover:scale-[1.01] transition-transform duration-300">
              <h3 className="text-xl font-bold text-[#053e69] mb-4 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-[#053e69]" fill="#053e69" />
                Your Impact
              </h3>
              <ul className="space-y-4">
                {[
                  { amount: "PKR 1,000", impact: "provide medicines for 5 patients" },
                  { amount: "PKR 5,000", impact: "cover a day's treatment for a child" },
                  { amount: "PKR 10,000", impact: "support emergency care for 2 patients" },
                  { amount: "PKR 25,000", impact: "fund a life-saving surgery" }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="h-5 w-5 text-[#053e69]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      <span className="font-semibold">{item.amount}</span> can {item.impact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="bg-gradient-to-r from-[#053e69] to-blue-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-[1.01] transition-transform duration-300">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="h-6 w-6 mr-2" />
                Monthly Giving
              </h3>
              <p className="mb-4">Consider becoming a monthly donor to provide sustained support for our healthcare services.</p>
              <button className="w-full bg-white text-[#053e69] font-semibold py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center">
                <Calendar className="h-5 w-5 mr-2" />
                Set Up Monthly Donation
              </button>
            </div> */}

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 transform hover:scale-[1.01] transition-transform duration-300">
              <h3 className="text-xl font-bold text-[#053e69] mb-4 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-[#053e69]" />
                Testimonials
              </h3>
              <div className="space-y-4">
                {[
                  // { 
                  //   quote: "This is a pic of the hospital's OPD. It's usually crowded and you can hardly find a place to sit. The reason for that, in my view, is the number of family members accompanying a patient. Otherwise, the staff at the OPD is efficient, especially that at the counter. The other staff ensures that those on stretchers are given passage in the congested space.",
                  //   author: "Bilal Farooqi, Karachi"
                  // },
                  { 
                    quote: "Kutiyana Hospital is the best in Kharadhar. It's situated opposite Aga Khan Jamaitkhana and Sabzwari Garden beside Bukhari Baba mausoleum. As compared to luxury hospital, it's charges are reasonable. They also help the poor patients from Zakat funds. Fadoo Tower of British era is also visible at entrance gate. There is also a Masjid inside. There is heart check up ward for Rs:300/- to 500/- only",
                    author: "Ahmed Sunghaar, Karachi"
                  }
                ].map((testimonial, index) => (
                  <blockquote key={index} className="border-l-4 border-[#053e69] pl-4 italic text-gray-700 relative">
                    <div className="absolute top-0 left-0 text-5xl text-[#053e69] opacity-20 font-serif">"</div>
                    <p className="relative z-10 pl-4">{testimonial.quote}</p>
                    <footer className="mt-2 text-sm font-medium text-gray-600">— {testimonial.author}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Donation;
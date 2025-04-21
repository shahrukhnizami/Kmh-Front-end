import React, { useState } from 'react';
import config from '../config';

const Donation = () => {
  const [submitted, setSubmitted] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);


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
  
      const  donationRes = await fetch(`${config.API_BASE_URL}api/v1/donation`, {
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
  
      // ✅ Save PayFast & donation details in localStorage
      localStorage.setItem('donationAmount', paymentData.amount);
      localStorage.setItem('donationType', selectedType);
      localStorage.setItem('donationMessage', paymentData.item_description);
      localStorage.setItem('donationDate', new Date().toISOString());
      localStorage.setItem('donationId', donationData?.data?._id || `donation-${referenceNumber}`);
      localStorage.setItem('donationMerchantPaymentId', paymentData.m_payment_id);
      localStorage.setItem('donationPfPaymentId', ""); // This will be updated later via webhook (optional)
  
      redirectToPayFast(paymentData);
    } catch (err) {
      console.error("Donation error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
      setSubmitted(true);
    } finally {
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

  const suggestedAmounts = [500, 1000, 2000, 5000, 10000];

  return (
    <section className="relative bg-gradient-to-br py-16 overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10">
    <div className="absolute top-20 left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"></div>
    <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl"></div>
  </div>
  
  <div className="container mx-auto max-w-6xl px-4 relative z-10">
    <div className="text-center mb-12">
      <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
        Making a Difference Together
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-[#053e69] mb-4">
        Support <span className="text-blue-600">Kutiyana Memon Hospital</span>
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Your generosity helps us provide life-saving healthcare to thousands every year. 
        <span className="block mt-2 text-blue-600 font-medium">100% of donations go directly to patient care.</span>
      </p>
    </div>

    <div className="flex flex-col lg:flex-row gap-10 items-start">
      {/* Donation Form Card */}
      <div className="w-full lg:w-2/3 bg-white p-8 rounded-2xl shadow-xl border border-blue-200 transform hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full mr-4 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
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
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { type: 'Sadaqah', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', desc: 'Voluntary charity with no restrictions' },
                { type: 'Zakat', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', desc: 'Obligatory almsgiving for eligible Muslims' }
              ].map((item) => (
                <div 
                  key={item.type} 
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedType === item.type ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                  onClick={() => setSelectedType(item.type)}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${selectedType === item.type ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <input
                          id={item.type}
                          name="donationtype"
                          type="radio"
                          value={item.type}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          checked={selectedType === item.type}
                          onChange={() => setSelectedType(item.type)}
                          required
                        />
                        <label htmlFor={item.type} className="ml-2 block text-sm font-medium text-gray-700">
                          {item.type}
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
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
                  className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${donationAmount === amount.toString() 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                    : 'bg-white border-gray-300 hover:border-blue-400 hover:text-blue-600'}`}
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
                className="w-full pl-16 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Would you like to dedicate this donation or add special instructions?"
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
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Your Donation...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Donate Now
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-gray-500">
              Your donation is secure and tax-deductible. By donating, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </form>
      </div>

      {/* Impact Sidebar */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
          <h3 className="text-xl font-bold text-[#053e69] mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Your Impact
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700"><span className="font-semibold">PKR 1,000</span> can provide medicines for 5 patients</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700"><span className="font-semibold">PKR 5,000</span> can cover a day's treatment for a child</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700"><span className="font-semibold">PKR 10,000</span> can support emergency care for 2 patients</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-600 p-6 rounded-2xl shadow-lg text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Monthly Giving
          </h3>
          <p className="mb-4">Consider becoming a monthly donor to provide sustained support for our healthcare services.</p>
          <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
            Set Up Monthly Donation
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
          <h3 className="text-xl font-bold text-[#053e69] mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            Testimonials
          </h3>
          <div className="space-y-4">
            <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-700">
              "The hospital provided excellent care for my mother when we couldn't afford treatment elsewhere. Donations truly make a difference."
              <footer className="mt-2 text-sm font-medium text-gray-600">- Ahmed R., Karachi</footer>
            </blockquote>
            <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-700">
              "As a regular donor, I've seen firsthand how my contributions help save lives in our community."
              <footer className="mt-2 text-sm font-medium text-gray-600">- Fatima S., Donor since 2018</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default Donation;
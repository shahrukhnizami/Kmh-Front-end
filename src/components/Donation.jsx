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
  
      const  donationRes = await fetch(`${config.API_BASE_URL}/api/v1/donation`, {
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
    <section className="from-blue-50 to-white py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#053e69] mb-4">Support Kutiyana Memon Hospital</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your generous donation helps us provide quality healthcare services to those in need.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:w-2/3 bg-white p-8 rounded-xl shadow-lg border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#053e69]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#053e69]">Make a Donation</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>




            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="full_name">Full Name*</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#053e69] focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#053e69] focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donation Type*</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Sadaqah', 'Zakat'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={type}
                         name="donationtype"
                        type="radio"
                        value={type}
                        className="h-4 w-4 text-[#053e69] focus:ring-[#053e69] border-gray-300"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                        required
                      />
                      <label htmlFor={type} className="ml-2 block text-sm text-gray-700">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donation Amount (PKR)*</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-3">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`py-2 px-3 rounded-lg border ${donationAmount === amount.toString() ? 'bg-[#053e69] text-white border-[#053e69]' : 'bg-white border-gray-300 hover:border-[#053e69]'}`}
                      onClick={() => setDonationAmount(amount.toString())}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#053e69] focus:border-transparent"
                  placeholder="Or enter custom amount"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#053e69] focus:border-transparent"
                  rows="4"
                  placeholder="Any special instructions or dedication..."
                ></textarea>
              </div>
<form method="POST" action="https://sandbox.payfast.co.za/eng/process">
      <input type="hidden" name="merchant_id" value="10038381" />
      <input type="hidden" name="merchant_key" value="77b7ymosd26te" />

      <input type="hidden" name="return_url" value="http://localhost:5173/donation/success" />
      <input type="hidden" name="cancel_url" value="http://localhost:5173/donation/cancel" />
      <input type="hidden" name="notify_url" value="http://localhost:8000/api/v1/payfast/webhook" />

      <input type="hidden" name="amount" value="10000.00" />
      <input type="hidden" name="item_name" value="Zakat Donation" />
      <input type="hidden" name="item_description" value="Some Description" />
      <input type="hidden" name="m_payment_id" value={`donation-${Date.now()}`} />

      <input type="hidden" name="custom_str1" value="Zakat" />
      <input type="hidden" name="custom_str2" value="Kutiyana-Memon-Hospital" />
      <input type="hidden" name="custom_int1" value="6801eb17f469ab4eb2d86c4f" />
      <input type="hidden" name="currency" value="ZAR" />

      <input type="hidden" name="email_address" value="admin@gmail.com" />


    </form>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-[#053e69] to-[#005b9f] text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
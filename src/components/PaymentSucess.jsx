import React from 'react';
import { CheckCircle, Heart, Share2, Home, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Today';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get all donation details from localStorage
  const donationAmount = localStorage.getItem('donationAmount');
  const donationType = localStorage.getItem('donationType');
  const donationMessage = localStorage.getItem('donationMessage');
  const donationDate = formatDate(localStorage.getItem('donationDate'));
  const donationId = localStorage.getItem('donationId');
  const donationMerchantPaymentId = localStorage.getItem('donationMerchantPaymentId');
  const donationPfPaymentId = localStorage.getItem('donationPfPaymentId');
  
  // Format amount with 2 decimal places
  const donationAmountFormatted = donationAmount 
    ? parseFloat(donationAmount).toLocaleString('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 2
      })
    : 'PKR 0.00';

  // Clean up localStorage after use
  React.useEffect(() => {
    return () => {
      localStorage.removeItem('donationAmount');
      localStorage.removeItem('donationType');
      localStorage.removeItem('donationMessage');
      localStorage.removeItem('donationDate');
      localStorage.removeItem('donationId');
      localStorage.removeItem('donationMerchantPaymentId');
      localStorage.removeItem('donationPfPaymentId');
    };
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I just donated to Kutiyana Memon Hospital',
        text: `I donated ${donationAmountFormatted} to support healthcare services. Join me in making a difference!`,
        url: window.location.href,
      })
      .catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      {/* Confirmation Card */}
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center transform transition-all hover:shadow-2xl">
        {/* Animated Checkmark */}
        <div className="relative mx-auto mb-6">
          <div className="absolute inset-0 bg-green-100 rounded-full opacity-0 animate-ping-slow"></div>
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Donation Successful!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your <span className="font-semibold text-blue-600">{donationType || 'generous donation'}</span> to Kutiyana Memon Hospital.
        </p>
        
        {/* Impact Illustration */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 flex items-center justify-center">
          <Heart className="h-6 w-6 text-red-500 mr-2" fill="red" />
          <span className="text-blue-800 font-medium">
            Your donation will help provide healthcare to those in need.
          </span>
        </div>
        
        {/* Transaction Details */}
        <div className="border border-gray-200 rounded-xl p-5 mb-6 text-left space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Transaction Summary
          </h3>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium text-blue-600">{donationAmountFormatted}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment ID:</span>
            <span className="font-medium text-gray-800">
              {donationPfPaymentId || donationMerchantPaymentId || 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium text-gray-800">{donationDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium text-gray-800">PayFast</span>
          </div>
        </div>
        
        {/* Personal Message (if any) */}
        {donationMessage && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left border-l-4 border-blue-400">
            <p className="text-sm text-gray-500 mb-1">Your dedication message:</p>
            <p className="font-medium italic text-gray-800">"{donationMessage}"</p>
          </div>
        )}
        
        {/* Receipt Info */}
        <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-6 text-sm text-green-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          A detailed receipt has been sent to your email. Please check your inbox.
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center px-6 py-3 bg-[#053e69] text-white rounded-lg hover:bg-[#005b9f] transition-colors shadow-md hover:shadow-lg"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          <button
            onClick={() => navigate('/donation')}
            className="flex items-center justify-center px-6 py-3 border border-[#053e69] text-[#053e69] rounded-lg hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Donate Again
          </button>
          {/* <button
            onClick={handleShare}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </button> */}
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="mt-8 text-center max-w-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Donation Makes a Difference</h3>
        <p className="text-gray-600 mb-4">
          Every contribution helps us provide essential healthcare services to those who need it most. 
          Here's what your donation can do:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { amount: 'PKR 1,000', desc: 'Medicines for 5 patients' },
            { amount: 'PKR 5,000', desc: 'Day treatment for a child' },
            { amount: 'PKR 10,000', desc: 'Emergency care for 2 patients' }
          ].map((item, index) => (
            <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-blue-600 font-medium mb-1">{item.amount}</div>
              <div className="text-sm text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
        
        <p className="text-gray-500 text-sm">
          Questions about your donation? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
import React, { useEffect } from 'react';
import { XCircle, RotateCw, Home, Phone, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: log or store cancellation info
    const cancelDetails = {
      donationAmount: localStorage.getItem('donationAmount'),
      donationType: localStorage.getItem('donationType'),
      merchantPaymentId: localStorage.getItem('donationMerchantPaymentId'),
      cancelledAt: new Date().toISOString()
    };
    console.warn("Donation cancelled:", cancelDetails);

    // Clear localStorage
    localStorage.removeItem('donationAmount');
    localStorage.removeItem('donationType');
    localStorage.removeItem('donationMessage');
    localStorage.removeItem('donationDate');
    localStorage.removeItem('donationId');
    localStorage.removeItem('donationMerchantPaymentId');
    localStorage.removeItem('donationPfPaymentId');
  }, []);

  // Format amount if it exists
  const donationAmount = localStorage.getItem('donationAmount');
  const formattedAmount = donationAmount 
    ? parseFloat(donationAmount).toLocaleString('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 2
      })
    : null;

  return (
    <div className="min-h-screen  from-red-50 to-white flex flex-col items-center justify-center p-4">
      {/* Error Card */}
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center transform transition-all hover:shadow-2xl">
        {/* Animated Error Icon */}
        <div className="relative mx-auto mb-6">
          <div className="absolute inset-0  rounded-full opacity-0 animate-ping-slow"></div>
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
            <XCircle className="h-12 w-12 text-red-600" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Payment Not Completed</h1>
        <p className="text-lg text-gray-600 mb-6">
          We couldn't process your {formattedAmount ? `${formattedAmount} ` : ''}donation to Kutiyana Memon Hospital.
        </p>
        
        {/* Error Details */}
        <div className="border border-red-200 rounded-xl p-5 mb-6 text-left bg-red-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Transaction Details
          </h3>
          
          <div className="space-y-3">
            {formattedAmount && (
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">{formattedAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-red-600">Payment Declined</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium text-gray-800">
                {new Date().toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium text-gray-800">PayFast</span>
            </div>
          </div>
        </div>
        
        {/* Assurance Message */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 text-sm text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          No amount has been deducted from your account. If you see a pending charge, it will be reversed within 3-5 business days.
        </div>
        
        {/* Common Solutions */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left border-l-4 border-gray-400">
          <h4 className="font-medium text-gray-700 mb-2">Possible Solutions:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Check your card details and try again</li>
            <li>Ensure sufficient funds are available</li>
            <li>Try a different payment method</li>
            <li>Contact your bank if issues persist</li>
          </ul>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/donation')}
            className="flex items-center justify-center px-6 py-3 bg-[#053e69] text-white rounded-lg hover:bg-[#005b9f] transition-colors shadow-md hover:shadow-lg"
          >
            <RotateCw className="h-5 w-5 mr-2" />
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
      
      {/* Support Section */}
      <div className="mt-8 text-center max-w-lg">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center">
            <Phone className="h-5 w-5 mr-2 text-[#053e69]" />
            Need Immediate Help?
          </h3>
          <p className="text-gray-600 mb-3">
            Our support team is available to assist you with your donation.
          </p>
          <div className="space-y-2">
            <a 
              href="tel:+922132315376" 
              className="inline-block px-4 py-2 bg-[#053e69] text-white rounded-lg hover:bg-[#053e69] transition-colors"
            >
              Call: +92 21 32315376
            </a>
            <a 
              href="/contact" 
              className="inline-block px-4 py-2 border border-[#053e69] text-[#053e69] rounded-lg hover:bg-blue-50 transition-colors ml-2"
            >
              Contact Form
            </a>
          </div>
        </div>
        
        <p className="mt-6 text-gray-500 text-sm">
          Thank you for your support of Kutiyana Memon Hospital. We appreciate your willingness to contribute.
        </p>
      </div>
    </div>
  );
};

export default PaymentFailure;
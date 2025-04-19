import React from 'react';
import { CheckCircle } from 'lucide-react';
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
      day: 'numeric'
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
    ? parseFloat(donationAmount).toFixed(2)
    : '0.00';

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" strokeWidth={2} />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your {donationType || 'donation'} to Kutiyana Memon Hospital. 
          Your transaction has been completed successfully.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-medium">{donationPfPaymentId || donationMerchantPaymentId || 'N/A'}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">PKR {donationAmountFormatted}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{donationDate}</span>
          </div>
        </div>
        
        {donationMessage && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-gray-600">Your message:</p>
            <p className="font-medium">"{donationMessage}"</p>
          </div>
        )}
        
        <p className="text-gray-500 text-sm mb-6">
          A receipt has been sent to your email address. Please check your inbox.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[#053e69] text-white rounded-lg hover:bg-[#005b9f] transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/donation')}
            className="px-6 py-2 border border-[#053e69] text-[#053e69] rounded-lg hover:bg-blue-50 transition-colors"
          >
            Make Another Donation
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
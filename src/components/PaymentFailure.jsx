import React, { useEffect } from 'react';
import { XCircle } from 'lucide-react';
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

    // Optional: clear localStorage
    localStorage.removeItem('donationAmount');
    localStorage.removeItem('donationType');
    localStorage.removeItem('donationMessage');
    localStorage.removeItem('donationDate');
    localStorage.removeItem('donationId');
    localStorage.removeItem('donationMerchantPaymentId');
    localStorage.removeItem('donationPfPaymentId');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <XCircle className="h-10 w-10 text-red-600" strokeWidth={2} />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
        <p className="text-gray-600 mb-6">
          We couldn't process your donation to Kutiyana Memon Hospital. Please try again or use a different payment method.
        </p>

        <div className="bg-red-50 rounded-lg p-4 mb-6 text-left border border-red-100">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Error Code:</span>
            <span className="font-medium text-red-600">PAYMENT_DECLINED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{new Date().toLocaleString()}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          No amount has been deducted from your account. If the problem persists, please contact your bank.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/donation')}
            className="px-6 py-2 bg-[#053e69] text-white rounded-lg hover:bg-[#005b9f] transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Need immediate assistance? <a href="/contact" className="text-blue-600 hover:underline">Contact our support</a> or call +92 21 32315376
        </p>
      </div>
    </div>
  );
};

export default PaymentFailure;

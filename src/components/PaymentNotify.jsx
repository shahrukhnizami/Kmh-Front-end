import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentNotify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    // Extract payment status from URL query params or location state
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status') || location.state?.status || 'processing';
    const details = location.state?.details || null;

    setPaymentStatus(status);
    setPaymentDetails(details);

    // Auto-redirect for processing status after 5 seconds
    if (status === 'processing') {
      const timer = setTimeout(() => {
        navigate('/donation/complete', { 
          state: { 
            status: 'success', 
            details: details || generateMockDetails() 
          } 
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const generateMockDetails = () => ({
    id: `KMH-${Date.now().toString().slice(-6)}`,
    amount: (Math.random() * 5000 + 1000).toFixed(2),
    date: new Date().toLocaleDateString(),
    method: 'Credit Card'
  });

  const renderStatusIcon = () => {
    switch (paymentStatus) {
      case 'success':
        return <CheckCircle className="h-12 w-12 text-green-500" strokeWidth={1.5} />;
      case 'failed':
        return <XCircle className="h-12 w-12 text-red-500" strokeWidth={1.5} />;
      case 'pending':
        return <Clock className="h-12 w-12 text-amber-500" strokeWidth={1.5} />;
      default:
        return <AlertCircle className="h-12 w-12 text-blue-500" strokeWidth={1.5} />;
    }
  };

  const renderStatusMessage = () => {
    switch (paymentStatus) {
      case 'success':
        return {
          title: 'Payment Successful!',
          message: 'Thank you for your donation to Kutiyana Memon Hospital.',
          note: 'A receipt has been sent to your email address.',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700'
        };
      case 'failed':
        return {
          title: 'Payment Failed',
          message: 'We couldn\'t process your donation. Please try again.',
          note: 'No amount has been deducted from your account.',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700'
        };
      case 'pending':
        return {
          title: 'Payment Processing',
          message: 'Your donation is being processed. This may take a few moments.',
          note: 'Please do not refresh or close this page.',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700'
        };
      default:
        return {
          title: 'Payment Status Unknown',
          message: 'We\'re checking your payment status. Please wait...',
          note: 'Contact support if this takes too long.',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700'
        };
    }
  };

  const { title, message, note, bgColor, textColor } = renderStatusMessage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="mx-auto flex items-center justify-center mb-6">
          {renderStatusIcon()}
        </div>
        
        <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        {paymentDetails && (
          <div className={`${bgColor} rounded-lg p-4 mb-6 text-left border ${textColor.replace('text', 'border')}`}>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="font-medium">{paymentDetails.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">PKR {paymentDetails.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{paymentDetails.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Method</p>
                <p className="font-medium">{paymentDetails.method}</p>
              </div>
            </div>
          </div>
        )}

        <p className="text-gray-500 text-sm mb-6">{note}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {paymentStatus === 'success' && (
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-[#053e69] text-white rounded-lg hover:bg-[#005b9f] transition-colors"
            >
              Back to Home
            </button>
          )}
          {paymentStatus === 'failed' && (
            <button
              onClick={() => navigate('/donation')}
              className="px-6 py-2 bg-[#053e69] text-white rounded-lg hover:bg-[#005b9f] transition-colors"
            >
              Try Again
            </button>
          )}
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Need help? Call our support team at <span className="font-medium">+92 21 32315376</span>
        </p>
      </div>

      {paymentStatus === 'processing' && (
        <div className="mt-6 w-full max-w-md">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full animate-pulse" 
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentNotify;
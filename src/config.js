
const config = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    PAYFAST_URL: import.meta.env.VITE_PAYFAST_SANDBOX === 'true'
      ? 'https://sandbox.payfast.co.za/eng/process'
      : 'https://www.payfast.co.za/eng/process'
  };
  
  export default config;
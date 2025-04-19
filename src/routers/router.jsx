import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import DonationPage from '../pages/DonationPage.jsx';
import Demo from '../pages/Demo.jsx';
import PaymentSuccess from '../components/PaymentSucess.jsx';
import PaymentFailure from '../components/PaymentFailure.jsx';
import PaymentNotify from '../components/PaymentNotify.jsx';



const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/donation/success" element={<PaymentSuccess />} />
        <Route path="/donation/cancel" element={<PaymentFailure />} />        
      <Route path="/payment-notify" element={<PaymentNotify  />}  />
      
    


      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

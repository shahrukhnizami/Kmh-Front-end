import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndPrivacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#053e69] mb-4">Terms of Service & Privacy Policy</h1>
        <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b">
          <button 
            className="px-6 py-4 font-medium text-[#053e69] border-b-2 border-[#053e69]"
          >
            Terms of Service
          </button>
          <Link 
            to="/privacy-policy" 
            className="px-6 py-4 font-medium text-gray-500 hover:text-[#053e69]"
          >
            Privacy Policy
          </Link>
        </div>

        <div className="p-8">
          {/* Terms of Service Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#053e69] mb-6">Terms of Service</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#053e69] mb-3">1. Acceptance of Terms</h3>
                <p className="text-gray-700">
                  By accessing and using the donation services provided by Kutiyana Memon Hospital ("KMH"), 
                  you accept and agree to be bound by these Terms of Service. If you do not agree, please 
                  refrain from using our donation platform.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#053e69] mb-3">2. Donation Policy</h3>
                <p className="text-gray-700 mb-3">
                  All donations made through this platform are voluntary and non-refundable. KMH reserves 
                  the right to use donated funds at its discretion for the furtherance of its charitable 
                  objectives.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Donations are processed in Pakistani Rupees (PKR)</li>
                  <li>Donors will receive an electronic receipt for tax purposes</li>
                  <li>Recurring donations can be canceled at any time</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#053e69] mb-3">3. Payment Processing</h3>
                <p className="text-gray-700">
                  All payments are processed through secure third-party payment gateways. KMH does not store 
                  your credit card or bank account details. By making a donation, you agree to the terms of 
                  service of our payment processors.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#053e69] mb-3">4. Donor Responsibilities</h3>
                <p className="text-gray-700 mb-3">
                  You agree to provide accurate and complete information when making a donation, including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Correct personal details</li>
                  <li>Valid email address for receipt delivery</li>
                  <li>Authorization to use the payment method provided</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#053e69] mb-3">5. Changes to Terms</h3>
                <p className="text-gray-700">
                  KMH reserves the right to modify these Terms of Service at any time. Continued use of 
                  the donation platform after changes constitutes acceptance of the modified terms.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Policy Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#053e69] mb-6">Privacy Policy</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#053e69] mb-3">1. Information Collection</h3>
                <p className="text-gray-700">
                  We collect personal information you provide when making a donation, including name, email 
                  address, and payment details. We do not store sensitive payment information after the 
                  transaction is complete.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#053e69] mb-3">2. Use of Information</h3>
                <p className="text-gray-700 mb-3">
                  Your information is used to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Process your donation and provide receipts</li>
                  <li>Communicate about your donation and our activities</li>
                  <li>Improve our services and donor experience</li>
                  <li>Comply with legal requirements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#053e69] mb-3">3. Data Security</h3>
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your personal information. However, 
                  no internet transmission is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#053e69] mb-3">4. Third-Party Services</h3>
                <p className="text-gray-700">
                  We use trusted third-party services for payment processing and analytics. These services 
                  have their own privacy policies governing their use of your information.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#053e69] mb-3">5. Your Rights</h3>
                <p className="text-gray-700 mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request deletion of your personal data, subject to legal requirements</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#053e69] mb-2">Contact Us</h3>
                <p className="text-gray-700">
                  For questions about these terms or our privacy practices, please contact us at:
                  <br />
                  <a href="mailto:info@kmh.org.pk" className="text-blue-600 hover:underline">info@kmh.org.pk</a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Kutiyana Memon Hospital. All rights reserved.</p>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
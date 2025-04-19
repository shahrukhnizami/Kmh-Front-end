import React, { useState } from 'react';

const SimpleDonationForm = () => {
  const [form, setForm] = useState({
    donationType: '',
    email: '',
    amount: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      const merchantPaymentId = `donation-${Date.now()}`;

      const donationData = {
        donationType: form.donationType,
        email: form.email,
        amount: parseFloat(form.amount),
        message: form.message,
        payment: {
          method: "payfast",
          status: "pending",
          pfPaymentId: "",
          merchantPaymentId
        }
      };

      const res = await fetch('http://localhost:8000/api/v1/donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationData)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Donation failed');
      }

      setSuccessMsg('Donation submitted successfully!');
      setForm({ donationType: '', email: '', amount: '', message: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Make a Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {successMsg && <p className="text-green-600">{successMsg}</p>}

        <div>
          <label className="block font-medium mb-1">Donation Type*</label>
          <select
            name="donationType"
            value={form.donationType}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Type --</option>
            <option value="Zakat">Zakat</option>
            <option value="Sadaqah">Sadaqah</option>
            <option value="Fitrana">Fitrana</option>
            <option value="General Donation">General Donation</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Email*</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Amount (PKR)*</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            min="1"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 1000"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Message (optional)</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="3"
            className="w-full border px-3 py-2 rounded"
            placeholder="Write a message (optional)"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? 'Submitting...' : 'Donate Now'}
        </button>
      </form>
    </div>
  );
};

export default SimpleDonationForm;

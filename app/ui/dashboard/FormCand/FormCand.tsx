'use client'
// FormCand.js
import React, { useState } from 'react';
import SelectLoc from './SelectLoc';

const FormCand = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', location: '' });
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetching API endpoint
    let res = await fetch('/api/candidate', {
      method: 'POST',
      body: JSON.stringify(formState),
    });
    let data = await res.json();

    // Displaying success/failure message
    setMessage(data.message);
    setActive(true);
    setTimeout(() => {
      setActive(false);
      setMessage('');
    }, 3000);
  };

  const handleLocationChange = (selectedLocation) => {
    setFormState((prev) => ({
      ...prev,
      location: selectedLocation,
    }));
  };

  return (
    <div className="relative">
      {/* Notification for successful form submission */}
      <div className="fixed bottom-5 duration-200 px-4 py-2 font-semibold rounded bg-sky-200 text-black">
        <p>Sent successfully</p>
      </div>
      <h1 className="text-4xl mb-8 font-bold">How can we help today?</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="flex flex-col mb-3">
          <label htmlFor="name">Name</label>
          <input
            placeholder="Your Name"
            onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
            id="name"
            type="text"
            required
            className="border rounded py-2 px-2 mt-1 outline-none focus:border-sky-800"
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="phone">Phone</label>
          <input
            placeholder="+373694560354"
            onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))}
            id="phone"
            type="text"
            required
            className="border rounded py-2 px-2 mt-1 outline-none focus:border-sky-800"
          />
        </div>

        {/* Server-side select component */}
        <SelectLoc onSelectLocation={handleLocationChange}  />

        {/* Submit button */}
        <button className="mt-6 w-full py-3 bg-sky-800 rounded text-white font-semibold uppercase">Send</button>
      </form>
    </div>
  );
};

export default FormCand;

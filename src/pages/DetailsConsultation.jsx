import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function DetailsConsultation() {
  const [selectedTier, setSelectedTier] = useState("30min");
  const tierPrices = {
    "30min": 25,
    "60min": 50,
  };

  const handleTierChange = (event) => {
    setSelectedTier(event.target.value);
  };

  const selectedPrice = tierPrices[selectedTier];

  return (
    <div className="container mx-auto my-8 p-6 border rounded shadow-lg">
      <div className="pt-40"></div>
      <h1 className="text-2xl font-bold mb-4">Development & IT Consultation with Waleed Z.</h1>
      <div className="flex justify-between">
        <div className="w-3/5">
          <p className="text-green-600 text-lg">⭐ 4.9 · 1,366 reviews</p>
          <p className="my-4">A brief discussion about your idea and project.</p>
          {/* ... more content ... */}
          <ul className="list-disc ml-5">
            <li>Mobile-Friendly</li>
            <li>I offer comprehensive consultations in the selection of the right platform or software for email campaigns, automation, and workflows, as well as the repair of errors in email templates.</li>
            <li>My consultation includes:
              <ul>
                <li>Selection of the Optimal Email Platform: During consultations, I will assist you in choosing the appropriate email platform or software, taking into account your level of expertise and specific needs. Whether you are a beginner or an advanced user, I will tailor the solution to your level of knowledge.</li>
                <li>Customization to Your Knowledge: My proposal will consider your knowledge of HTML/CSS, which will help avoid future issues, such as choosing an email platform that doesn't meet your expectations, is too complex, or doesn't integrate well with your website.</li>
                <li>Litmus Testing: If you have a coded email and want to ensure that it displays correctly on popular email clients, I will conduct tests using Litmus. I will identify any errors and provide guidance on how to correct them, with a particular focus on proper display on Outlook, iPhone, Android, and Dark Mode</li>
                {/* ... more list items ... */}
              </ul>
            </li>
            {/* ... more content ... */}
          </ul>
        </div>

        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Pricing</h5>
          <div className="flex items-center justify-between my-2">
            <label htmlFor="30min" className="flex items-center">
              <input type="radio" id="30min" name="duration" value="30min" checked={selectedTier === "30min"} onChange={handleTierChange} className="w-4 h-4 accent-orange-500" />
              <span className="ml-2">30 minutes</span>
            </label>
            <span className="font-bold text-lg">$25</span>
          </div>
          <div className="flex items-center justify-between my-2">
            <label htmlFor="60min" className="flex items-center">
              <input type="radio" id="60min" name="duration" value="60min" checked={selectedTier === "60min"} onChange={handleTierChange} className="w-4 h-4 accent-orange-500" />
              <span className="ml-2">60 minutes</span>
            </label>
            <span className="font-bold text-lg">$50</span>
          </div>
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Scheduling</h5>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-blue-500 animate-spin mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V7Zm2 9.4 4.7 1.5A1 1 0 0 0 22 17V7a1 1 0 0 0-1.3-1L16 7.7v8.8Z" clipRule="evenodd" />
            </svg>
            <a href="#votre-url" className="text-blue-500 border-b border-gray-200 text-sm pr-2 hover:text-blue-600">Meet Now</a>
          </div>
          <div className="flex items-center text-base font-normal leading-tight text-gray-500 dark:text-gray-100 ms-3">
            <i className="fas fa-envelope text-lg mr-2"></i>
            <span className="line-clamp-1">You can share details with Mariusz </span>
          </div>
          <button type="button" className="mt-4 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
            Continue (${selectedPrice})
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsConsultation;

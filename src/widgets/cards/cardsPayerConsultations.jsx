import React from "react";

export function CardsPayerConsultations({ selectedTier, handleTierChange, selectedPrice }) {
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Pricing</h5>
      <div className="flex items-center justify-between my-2">
        <label htmlFor="30min" className="flex items-center">
          <input type="radio" id="30min" name="duration" value="30min" checked={selectedTier === "30min"} onChange={handleTierChange} className="w-4 h-4" /> {/* Removed the accent-orange-500 class */}
          <span className="ml-2">30 minutes</span>
        </label>
        <span className="font-bold text-lg">$25</span>
      </div>
      <div className="flex items-center justify-between my-2">
        <label htmlFor="60min" className="flex items-center">
          <input type="radio" id="60min" name="duration" value="60min" checked={selectedTier === "60min"} onChange={handleTierChange} className="w-4 h-4" /> {/* Removed the accent-orange-500 class */}
          <span className="ml-2">60 minutes</span>
        </label>
        <span className="font-bold text-lg">$50</span>
      </div>
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Scheduling</h5>
   
      <div className="mt-4">
        <input type="radio" id="meetLater" name="schedulingOption" value="meetLater" className="w-4 h-4 mr-2" />
        <label htmlFor="meetLater" className="text-black-500 dark:text-black-400 mr-4">Meet Later</label>
        <br></br>
        <span className="text-gray-500 dark:text-gray-400">Next available date Sun, Feb 11 at 11:30</span>
      </div>
      <br />
      <div>
        <a href="#moreTimes" className="text-orange-500 underline">See more times</a>
      </div>
      <div className="flex items-center text-base font-normal leading-tight text-gray-500 dark:text-gray-100 ms-3">
        <i className="fas fa-envelope text-lg mr-2"></i>
        <span className="line-clamp-1">You can share details with Mariusz </span>
      </div>
      <button type="button" className="mt-4 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
        Continue (${selectedPrice})
      </button>
      <button type="button" className="mt-4 text-orange-500 border border-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
        Message User
      </button>
    </div>
  );
}

export default CardsPayerConsultations;

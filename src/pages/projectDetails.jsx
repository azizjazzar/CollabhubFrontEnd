import React, { useState } from "react";

const ProjectDetails = () => {
  const [selectedTier, setSelectedTier] = useState("starter");
  const tierPrices = {
    starter: 129,
    standard: 199,
    advanced: 349,
  };

  const handleTierChange = (event) => {
    setSelectedTier(event.target.id);
  };

  return (
    <div className="container mx-auto my-8 p-6 border rounded shadow-lg">
      <div className="pt-40"></div>
      <div className="max-w-sm p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Select service tier</h3>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="starter"
                name="tier"
                className="w-4 h-4 text-green-600"
                checked={selectedTier === "starter"}
                onChange={handleTierChange}
              />
              <label htmlFor="starter" className="ml-2 text-sm font-medium text-gray-700">
                Starter ${tierPrices["starter"]}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="standard"
                name="tier"
                className="w-4 h-4 text-green-600"
                checked={selectedTier === "standard"}
                onChange={handleTierChange}
              />
              <label htmlFor="standard" className="ml-2 text-sm font-medium text-gray-700">
                Standard ${tierPrices["standard"]}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="advanced"
                name="tier"
                className="w-4 h-4 text-green-600"
                checked={selectedTier === "advanced"}
                onChange={handleTierChange}
              />
              <label htmlFor="advanced" className="ml-2 text-sm font-medium text-gray-700">
                Advanced ${tierPrices["advanced"]}
              </label>
            </div>
          </div>
        </div>

        <div class="text-sm text-gray-600">
        <div class="flex justify-between my-2">
          <span>Delivery Time</span>
          <span>2 days</span>
        </div>
        <div class="flex justify-between my-2">
          <span>Number of Pages</span>
          <span>1</span>
        </div>
        <div class="flex justify-between my-2">
          <span>Number of Revisions</span>
          <span>4</span>
        </div>
        <div class="flex justify-between my-2">
          <span>Source Files</span>
          <i class="fas fa-check text-green-500"></i>
        </div>
        <div class="flex justify-between my-2">
          <span>Commercial Use</span>
          <i class="fas fa-check text-green-500"></i>
        </div>
      </div>
    
      <div class="my-2 text-sm text-gray-500">
        <i class="fas fa-info-circle text-xs mr-1"></i> 2 days delivery — Jan 31, 2024
    
        Revisions may occur after this date.
      </div>

        <button
          type="button"
          className="w-full bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600"
          onClick={() => {
            alert(`Continue ($${tierPrices[selectedTier]})`);
          }}
        >
          Continue (${tierPrices[selectedTier]})
        </button>
        <button
          type="button"
          className="w-full bg-transparent text-green-500 py-2 px-4 rounded mt-2 hover:bg-green-100"
        >
          Message Haroon
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;

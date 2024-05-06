import React from "react";

export function SideBarConsultations({ setPriceFilter }) {
  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <aside className="w-1/4 p-4 space-y-4">
      <img
        src="/img/image4.PNG" // Replace with your image path
        alt="Image description"
        style={{
          width: "100%", // Width is 100% of the parent width
          height: "250px", // Fixed height of 400 pixels
        }}
      />

      {/* side bar price 30min */}
      <div className="bg-white p-4 rounded shadow">
      <p className="font-bold text-lg mb-2 text-gray-800">Price per 30 min</p>
  <label className="block">
    <input type="radio" name="price30min" className="form-radio text-blue-500" style={{ transform: 'scale(1.5)' }} value="<30" onChange={handlePriceFilterChange} />
    <span className="text-gray-800 mb-5 text-base ml-2 " style={{ fontFamily: 'Montserrat, sans-serif' }}>$30 and below</span>

  </label>
  <label className="block mt-2">
    <input type="radio" name="price30min" className="form-radio text-blue-500" style={{ transform: 'scale(1.5)' }} value="30-60" onChange={handlePriceFilterChange} />
    <span className="text-gray-800 mb-5 text-base ml-2 " style={{ fontFamily: 'Montserrat, sans-serif' }}>$30 - $60</span>
  </label>
  <label className="block mt-2">
    <input type="radio" name="price30min" className="form-radio text-blue-500" style={{ transform: 'scale(1.5)' }} value=">60" onChange={handlePriceFilterChange} />
    <span className="text-gray-800 mb-5 text-base ml-2 " style={{ fontFamily: 'Montserrat, sans-serif' }}>$60 & above</span>
  </label>
</div>


<div className="bg-white p-4 rounded shadow">
<p className="font-bold text-lg mb-2 text-gray-800">Price per 60 min</p>

  <label className="block">
    <input type="radio" name="price60min" className="form-radio text-blue-500" style={{ transform: 'scale(1.5)' }} value="<60" onChange={handlePriceFilterChange} />
    <span className="text-gray-800 mb-5 text-base ml-2 " style={{ fontFamily: 'Montserrat, sans-serif' }}>$60 and below</span>
  </label>
  <label className="block mt-2">
    <input type="radio" name="price60min" className="form-radio text-blue-500" style={{ transform: 'scale(1.5)' }} value="60-120" onChange={handlePriceFilterChange} />
    <span className="text-gray-800 mb-5 text-base ml-2 " style={{ fontFamily: 'Montserrat, sans-serif' }}>$60 - $120</span>
  </label>
  <label className="block mt-2">
    <input type="radio" name="price60min" className="form-radio text-blue-500" style={{ transform: 'scale(1.5)' }} value=">120" onChange={handlePriceFilterChange} />
    <span className="text-gray-800 mb-5 text-base ml-2 " style={{ fontFamily: 'Montserrat, sans-serif' }}>$120 & above</span>
  </label>
</div>

    </aside>
  );
}

export default SideBarConsultations;

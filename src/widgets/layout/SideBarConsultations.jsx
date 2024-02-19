import React from "react";


export function SideBarConsultations() {
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
  <p className="font-bold text-lg mb-2 text-blue-500">Price per 30 min</p>
  <label className="block">
    <input type="radio" name="price30min" className="form-radio text-blue-500" value="<30" />
    <span className="text-black-600 mb-5 text-sm ml-2">$30 and below</span>
  </label>
  <label className="block mt-2">
    <input type="radio" name="price30min" className="form-radio text-blue-500" value="30-60" />
    <span className="text-black-600 mb-5 text-sm ml-2">$30 - $60</span>
  </label>
  <label className="block mt-2">
    <input type="radio" name="price30min" className="form-radio text-blue-500" value=">60" />
    <span className="text-black-600 mb-5 text-sm ml-2">$60 & above</span>
  </label>
</div>

{/* side bar price 60min */}
<div className="bg-white p-4 rounded shadow">
  <p className="font-bold text-lg mb-2 text-blue-500">Price per 60 min</p>
  <label className="block">
    <input type="radio" name="price60min" className="form-radio text-blue-500" value="<60" />
    <span className="text-black-600 mb-5 text-sm ml-2">$60 and below</span>
  </label>
  <label className="block mt-2">
    <input type="radio" name="price60min" className="form-radio text-blue-500" value="60-120" />
    <span className="text-black-600 mb-5 text-sm ml-2">$60 - $120</span>
  </label>
  <label className="block mt-2">
    <input type="radio" name="price60min" className="form-radio text-blue-500" value=">120" />
    <span className="text-black-600 mb-5 text-sm ml-2">$120 & above</span>
  </label>
</div>






        </aside>

  );
}

export default SideBarConsultations;
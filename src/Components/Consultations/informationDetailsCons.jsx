import React from "react";
import iconOne from '/img/icon1.png'; 
import iconTwo from '/img/icon2.jpg';
import iconThree from '/img/icon3.jpg';
import iconFour from '/img/icon4.jpg'; 

export function InformationDetailsCons() {
  return (
    <div>
    <p className="font-bold text-orange-700 border-b border-orange-200 text-lg pr-2">What to expect:</p>
      <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center gap-2">

  <div>
   
  </div>
</div>

<div className="flex items-center gap-2">
  <img src={iconTwo} alt="Schedule the consultation" style={{ width: '120px', height: '90px' }} />
  <div>
    <span><strong>Get advice for your custom needs</strong></span>
    <br />
    <span>Share details about your project and what you want to talk about. The freelancer will review and reach out if they have questions..</span>
  </div>
</div>

<div className="flex items-center gap-2">
  <img src={iconThree} alt="Schedule the consultation" style={{ width: '90px', height: '90px' }} />
  <div>
    <span><strong>Join the meeting</strong></span>
    <br />
    <span>1-on-1 meeting with the freelancer to discuss your needs and project.</span>
  </div>
</div>


      </div>
    </div>
  );
}

export default InformationDetailsCons;

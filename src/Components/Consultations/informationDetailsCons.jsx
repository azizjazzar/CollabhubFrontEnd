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
  <img src={iconOne} alt="Schedule the consultation" style={{ width: '90px', height: '90px' }} />
  <div>
    <span><strong>Schedule the consultation</strong></span>
    <br />
    <span>Choose from the freelancer’s available days and times.</span>
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
    <span><strong>Join the Zoom meeting</strong></span>
    <br />
    <span>1-on-1 meeting with the freelancer to discuss your needs and project.</span>
  </div>
</div>

<div className="flex items-center gap-2">
  <img src={iconFour} alt="Schedule the consultation" style={{ width: '90px', height: '90px' }} />
  <div>
    <span><strong>Approve the work</strong></span>
    <br />
    <span>The freelancer will finish up the documents you asked for and send them to you for approval:</span>
    <br />
    <li> Meeting summary</li>
  </div>
</div>
      </div>
    </div>
  );
}

export default InformationDetailsCons;

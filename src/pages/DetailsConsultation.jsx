import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CardsConsultations from '@/widgets/cards/cardsPayerConsultations';
import InformationDetailsCons from '@/widgets/cards/InformationDetailsCons'; 
import { Footer } from "@/widgets/layout/footer";

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
    <div>
      <section className="relative block h-[30vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105 animate-fade-in" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <div className="container mx-auto my-8 p-6 border rounded shadow-lg">
        {/* <div className="pt-40"></div> Remove this line */}
        <h1 className="text-2xl font-bold mb-4">
          Development & IT Consultation with <span style={{ color: 'orange', fontSize: '28px' }}>Waleed Z.</span>
        </h1>

        <div className="flex justify-between">
          <div className="w-3/5">
        
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
            <br></br>
           
            <p className="font-bold text-black-700 border-b border-gray-200 text-sm pr-2">Get personalized advice on:</p>
          
            <div className="flex space-x-4">
              <div className="border border-gray-300 text-gray-600 px-2 py-1 rounded-full text-xs">eCommerce Development</div>
              <div className="border border-gray-300 text-gray-600 px-2 py-1 rounded-full text-xs">IT Support & Services</div>
              <div className="border border-gray-300 text-gray-600 px-2 py-1 rounded-full text-xs">Web Programming</div>
              <div className="border border-gray-300 text-gray-600 px-2 py-1 rounded-full text-xs">Website Builders & CMS</div>
              <div className="border border-gray-300 text-gray-600 px-2 py-1 rounded-full text-xs">WordPress</div>
            </div>

            <br></br>
         
            <InformationDetailsCons />

          </div>
          
          {/* Appel du composant CardsConsultations */}
          <CardsConsultations selectedTier={selectedTier} handleTierChange={handleTierChange} selectedPrice={selectedPrice} />
        </div>
      </div>
       {/* Footer */}
       <Footer />
    </div>
  );
}

export default DetailsConsultation;

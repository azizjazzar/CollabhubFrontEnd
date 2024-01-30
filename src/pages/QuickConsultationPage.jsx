import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



function QuickConsultationPage() {


  const freelancers = [
    {
      id: 1,
      name: "Javed I.",
      country: "Pakistan",
      domain: "Shopify, WordPress developer",
      rate: 40,
      reviews: 724,
      image: "/img/user1.jpg",
      description: "As a Full Stack WordPress and Shopify developer, I bring a unique set of skills to every project. With a passion for frontend development and a deep understanding of the backend, I create stunning, functional websites and eCommerce stores that stand out from the competition.",
    },
    {
      id: 1,
      name: "Javed I.",
      country: "Pakistan",
      domain: "Shopify, WordPress developer",
      rate: 40,
      reviews: 724,
      image: "/img/user1.jpg",
      description: "As a Full Stack WordPress and Shopify developer, I bring a unique set of skills to every project. With a passion for frontend development and a deep understanding of the backend, I create stunning, functional websites and eCommerce stores that stand out from the competition.",
    },
    {
      id: 1,
      name: "Javed I.",
      country: "Pakistan",
      domain: "Shopify, WordPress developer",
      rate: 40,
      reviews: 724,
      image: "/img/user1.jpg",
      description: "As a Full Stack WordPress and Shopify developer, I bring a unique set of skills to every project. With a passion for frontend development and a deep understanding of the backend, I create stunning, functional websites and eCommerce stores that stand out from the competition.",
    },
    {
      id: 1,
      name: "Javed I.",
      country: "Pakistan",
      domain: "Shopify, WordPress developer",
      rate: 40,
      reviews: 724,
      image: "/img/user1.jpg",
      description: "As a Full Stack WordPress and Shopify developer, I bring a unique set of skills to every project. With a passion for frontend development and a deep understanding of the backend, I create stunning, functional websites and eCommerce stores that stand out from the competition.",
    },
    {
      id: 1,
      name: "Javed I.",
      country: "Pakistan",
      domain: "Shopify, WordPress developer",
      rate: 40,
      reviews: 724,
      image: "/img/user1.jpg",
      description: "As a Full Stack WordPress and Shopify developer, I bring a unique set of skills to every project. With a passion for frontend development and a deep understanding of the backend, I create stunning, functional websites and eCommerce stores that stand out from the competition.",
    },
    // Add more freelancers here
  ];

  const navigate = useNavigate();
  const handleBookConsultationClick = () => {
    navigate('/details-consultation'); // Utilisez le chemin que vous avez défini pour la page DetailsConsultation
  };

  const handleSearchInput = (e) => {
    // Gérer la recherche ici
    console.log("Recherche : ", e.target.value);
  };

  return (
    
    
    <div className="pt-40">
      <div className="flex mx-auto max-w-7xl">
   {/* side bar */}
        <aside className="w-1/4 p-4 space-y-4">

        <div className="bg-white p-4 rounded shadow">
            <p className="font-bold text-lg mb-2">Talent badge</p>
            <label className="block">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">Top Rated Plus</span>
            </label>
            <label className="block mt-2">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">Top Rated</span>
            </label>
            <label className="block mt-2">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">Rising Talent</span>
            </label>
          </div>

 {/* side bar price 30min */}
          <div className="bg-white p-4 rounded shadow">
            <p className="font-bold text-lg mb-2">Price per 30 min</p>
            <label className="block">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">$30 and below</span>
            </label>
            <label className="block mt-2">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">$30 - $60</span>
            </label>
            <label className="block mt-2">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">$60 & above</span>
            </label>
          </div>
 {/* side bar price 60min */}
          <div className="bg-white p-4 rounded shadow">
            <p className="font-bold text-lg mb-2">Price per 60 min</p>
            <label className="block">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">$60 and below</span>
            </label>
            <label className="block mt-2">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">$60 - $120</span>
            </label>
            <label className="block mt-2">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">$120 & above</span>
            </label>
          </div>

          <div>
  <h5 className="text-orange-500 font-bold mb-1 text-sm">
    <i className="fas fa-question-circle pr-2"></i>How It Works
  </h5>
</div>


<img
  src="/img/image4.PNG" // Replace with your image path
  alt="Image description"
  style={{
    width: "100%", // Width is 100% of the parent width
    height: "250px", // Fixed height of 400 pixels
  }}
/>

<p className="text-gray-900 text-xs" style={{ color: "#616A6B" }}>
  At Collab Hub, we harness the power of Zoom to bring you closer to industry-leading professionals from the comfort of your own space. Our platform is designed to facilitate seamless, interactive sessions that empower you with knowledge, insights, and solutions tailored to your unique challenges. Whether you're seeking guidance on complex IT projects, software development, or digital innovation, our bespoke consultation services are crafted to foster collaboration, learning, and growth. Join us at Collab Hub, where your potential meets our expertise.
</p>

        </aside>
        
       {/* card de freelancer */}
        <main className="w-3/4 p-4 space-y-4">

        <div>
          <hr className="horizontal-line" />
          </div>
      
          {/* Orange search bar */}
<div className="mb-4 relative">
  <input
    type="search"
    placeholder="Search"
    className="w-full pl-4 pr-10 py-2 rounded-full text-black border border-gray-800 focus:outline-none"
    style={{ border: "1px solid #D0D3D4" }}
    onChange={handleSearchInput}
  />

  <button
    type="submit"
    className="absolute right-0 top-0 mt-2 mr-4"
  >
    {/* Icône de recherche en gris */}
    <i className="fas fa-search text-gray-500"></i>
  </button>
</div>


          {freelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              className="bg-white rounded-lg shadow-md p-4 space-y-2 transition duration-300 ease-in-out hover:shadow-lg"
              tabIndex={0}
              onClick={() => console.log(`Booking consultation with ${freelancer.name}`)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  console.log(`Booking consultation with ${freelancer.name}`);
                }
              }}
            >
              <div className="flex items-center">
                <img
                  src={freelancer.image}
                  alt={`Profile of ${freelancer.name}`}
                  className="rounded-full"
                  style={{ width: "60px", height: "60px" }}
                />
                <div className="flex-grow ml-2">
                  <h3 className="text-xl font-bold">{freelancer.name}</h3>
                  <div className="text-gray-600 mb-1 text-sm">{freelancer.domain}</div>
                </div>
                <button
      className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md focus:outline-none"
      type="button"
      onClick={handleBookConsultationClick}
    >
      Book a Consultation
    </button>
              </div>
              <div className="flex items-center text-gray-500">
                <i className="fas fa-video mr-1"></i>
                $40 per 30 min Zoom meeting
                &nbsp;&nbsp;&nbsp;&nbsp; {/* Ajout de plusieurs espaces ici */}
                <div className="flex items-center text-orange-500">
                  <i className="fas fa-star text-orange-400"></i> 4.9 ({freelancer.reviews} reviews)
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <p className="text-blue-500 border-b border-gray-200 text-sm pr-2">Meeting topics:</p>
                <div className="flex space-x-4">
                  <div className="border border-gray-300 text-gray-500 px-2 py-1 rounded-full text-xs">eCommerce Development</div>
                  <div className="border border-gray-300 text-gray-500 px-2 py-1 rounded-full text-xs">IT Support & Services</div>
                  <div className="border border-gray-300 text-gray-500 px-2 py-1 rounded-full text-xs">Web Programming</div>
                  <div className="border border-gray-300 text-gray-500 px-2 py-1 rounded-full text-xs">Website Builders & CMS</div>
                  <div className="border border-gray-300 text-gray-500 px-2 py-1 rounded-full text-xs">WordPress</div>
                </div>
              </div>
              <div className="text-gray-600 mb-1 text-sm">{freelancer.description}</div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default QuickConsultationPage;

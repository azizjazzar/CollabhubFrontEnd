import React from "react";

export function CardsConsultations({ handleSearchInput, handleBookConsultationClick }) {
  const freelancers = [
    {
      id: 1,
      name: "John Doe",
      image: "/img/user1.jpg",
      domain: "Web Development",
      reviews: 10,
      description: "Experienced web developer with expertise in frontend and backend technologies.",
    },
    {
        id: 2,
        name: "John Doe",
        image: "/img/user2.PNG",
        domain: "Web Development",
        reviews: 10,
        description: "Experienced web developer with expertise in frontend and backend technologies.",
      },
      {
        id: 3,
        name: "John Doe",
        image: "/img/user3.PNG",
        domain: "Web Development",
        reviews: 10,
        description: "Experienced web developer with expertise in frontend and backend technologies.",
      },
      {
        id: 4,
        name: "John Doe",
        image: "/img/user4.PNG",
        domain: "Web Development",
        reviews: 10,
        description: "Experienced web developer with expertise in frontend and backend technologies.",
      },
      {
        id: 5,
        name: "John Doe",
        image: "/img/user5.PNG",
        domain: "Web Development",
        reviews: 10,
        description: "Experienced web developer with expertise in frontend and backend technologies.",
      },
      {
        id: 6,
        name: "John Doe",
        image: "/img/user6.PNG",
        domain: "Web Development",
        reviews: 10,
        description: "Experienced web developer with expertise in frontend and backend technologies.",
      },
      {
        id: 7,
        name: "John Doe",
        image: "/img/user7.PNG",
        domain: "Web Development",
        reviews: 10,
        description: "Experienced web developer with expertise in frontend and backend technologies.",
      },
  ];

  return (
    <main className="w-3/4 p-4 space-y-3">
      <div>
      
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
            &nbsp;&nbsp;&nbsp;&nbsp;
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
  );
}

export default CardsConsultations;

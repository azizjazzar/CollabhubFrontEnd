import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "@/pages/authContext";
import axios from "axios"; 

function ServiceCard({ title, image, deliveryTime, price, user, freelancerid }) {
  const staticUser = {
    name: "Joe",
    image: "/img/team-1.jpg",
    position: "Freelancer",
  };

  const { authData } = useAuth();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [userData, setUserData] = useState(null);




  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6 hover:shadow-lg hover:border-orange-500">
      <div className="rounded-t-lg bg-gray-200" style={{ height: '180px' }}>
        {image && (
          <img
            src={image}
            className="rounded-t-lg w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-5">
        <div className="relative">
          <a href="#" className="line-clamp-2" onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            {isTooltipVisible && (
              <div className="absolute z-10 bg-white text-gray-800 text-sm p-2 rounded shadow-md">
                {title}
              </div>
            )}
          </a>
        </div>
        <div className="flex items-center mb-3">
          <p className="mr-4 font-normal text-gray-700 dark:text-gray-400">
            {deliveryTime} days delivery
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            From {price}$
          </p>
        </div>
        <hr className="horizontal-line my-3" />
        <div className="flex items-center">
          {user && user.image && (
            <img
              src={user.image}
              alt={`Profile of ${user.name}`}
              className="rounded-full w-12 h-12"
            />
          )}
          {!user && userData && userData.image && (
            <img
              src={userData.image}
              alt={`Profile of ${userData.name}`}
              className="rounded-full w-12 h-12"
            />
          )}
          {!user && !userData && staticUser.image && (
            <img
              src={staticUser.image}
              alt={`Profile of ${staticUser.name}`}
              className="rounded-full w-12 h-12"
            />
          )}
          <div className="ml-3">
            {user ? (
              <>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <div className="text-gray-600 text-sm">{user.position}</div>
              </>
            ) : userData ? (
              <>
                <h3 className="text-xl font-bold">{userData.name}</h3>
                <div className="text-gray-600 text-sm">{userData.position}</div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold">{authData.user?.nom}</h3>
                <div className="text-gray-600 text-sm">{staticUser.position}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  deliveryTime: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }),
  freelancerid: PropTypes.string.isRequired,
};

export default ServiceCard;

import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar as MTNavbar, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoSrc from "/public/img/logoshih.png";
import { useAuth } from "@/pages/authContext";
import { AnimatePresence, motion } from "framer-motion"; 
import { Button } from "flowbite-react";
import Alan from "../Authentification/Alan";
import axios from 'axios';


function Navbar({ brandName, routes, action }) {
  
  const { authData, setAuthUserData } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(null);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userImage,setUserImage] = useState();
  const logout = () => {
    setAuthUserData({
      user: null,
      accessToken: null,
      refreshToken: null,
    });

    localStorage.setItem('authData', JSON.stringify({
      user: null,
      accessToken: null,
      refreshToken: null,
    }));
  };
  useEffect(() => {
          setUserImage("https://colabhub.onrender.com/images/team-3.jpg");
  }, [authData.user, authData.user?.email]);
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleTabClick = (name) => {
    if (selectedTab === name) {
      setSelectedTab(null);
    } else {
      setSelectedTab(name);
    }
  };

  const navList = (
    <ul className="mb-4 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }) => (
        (authData.user && (name === "sign in" || name === "sign up")) ? null : (
          <Typography
            key={name}
            as="li"
            variant="small"
            color="inherit"
            className="capitalize hover:border-b-2 hover:border-orange-500"
          >
            {href ? (
              <a
                href={href}
                target={target}
                className="flex items-center gap-1 p-1 font-bold"
              >
                {icon &&
                  React.createElement(icon, {
                    className: "w-[18px] h-[18px] opacity-75 mr-1",
                  })}
                {name}
              </a>
            ) : (
              <Link
                to={path}
                target={target}
                className="flex items-center gap-1 p-1"
              >
                {icon &&
                  React.createElement(icon, {
                    className: "w-[18px] h-[18px] opacity-75 mr-1",
                  })}
                {name}
              </Link>
            )}
            
          </Typography>
          
        )
      ))}
                     {/* <div className="fixed bottom-10 left-10">
        <Alan /> */}
      {/* </div> */}

      {/* Utilisation du composant ProfileMenu */}
      
      {authData.user && (
          <div className="profile relative ml-24" onClick={toggleProfileDropdown}>
              <img src={`https://colabhub.onrender.com/images/${authData.user?.picture}`} alt="User Image" className="user-image w-9 h-9 rounded-full" />
            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  className="profile-dropdown absolute bg-blue-gray-50 border border-gray-200 rounded-lg shadow-md p-2 pb top-11 -left-28"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="text-black w-56">
                    <li className="flex items-center ml-9 relative pt-2 pb-2">
                      <img src={`https://colabhub.onrender.com/images/${authData.user?.picture}`} alt="Logo" className="h-10 w-10 mr-3 rounded-full" />
                      <span>{authData.user.nom} {authData.user.prenom}</span>
                    </li>
                    <span className="absolute left-0 w-full h-[1px] bg-black my-1"></span>
                    <li className="flex items-center justify-center pt-3" onClick={() => navigate(`/profile/${authData.user._id}`)}>
                      <Button  className="hover:text-orange-400 text-black focus:ring-0 focus:outline-none">Profile</Button>
                    </li>
                    <li className="flex items-center justify-center" >
                      <Button  className="hover:text-orange-400 text-black focus:ring-0 focus:outline-none">Settings</Button>
                    </li>
                    <li className="flex items-center justify-center" onClick={logout}>
                    <Button className="hover:text-orange-400 text-black focus:ring-0 focus:outline-none">Logout</Button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        )}
        {//Fin
        }
    </ul>
  );

  return (
    <div className="w-full fixed z-50 bg-white top-0">
      <MTNavbar color="transparent">
        <div className="mx-auto flex items-center justify-between text-black">
          <Link to="/">
            <div className="flex items-center">
              <img
                src={logoSrc}
                alt="CollabHub Logo"
                className="h-16 w-25 mr-2 flex items-center"
              />
            </div>
          </Link>
          <div className={`lg:block ${openNav ? 'hidden' : ''}`}>{navList}</div>
          <div className="hidden gap-2 lg:flex">
            {React.cloneElement(action, {
              className: "hidden lg:inline-block",
            })}
          </div>
          <IconButton
            variant="text"
            size="sm"
            color="white"
            className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon strokeWidth={2} className="h-6 w-6" />
            ) : (
              <Bars3Icon strokeWidth={2} className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      </MTNavbar>
      <hr />
    </div>
  );
}

Navbar.defaultProps = {
  brandName: "CollabHub",
  action: <a target="_blank"></a>,
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "Navbar";

export default Navbar;

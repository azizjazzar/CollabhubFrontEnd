import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar as MTNavbar, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoSrc from "/public/img/logoshih.png";
import { useAuth } from "@/pages/authContext";
import { AnimatePresence, motion } from "framer-motion"; 
import { Button } from "flowbite-react";
import axios from 'axios';

function Navbar({ brandName, routes, action }) {
  const { authData, setAuthUserData } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(null);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userImage, setUserImage] = useState('/img/default-avatar.png');

  useEffect(() => {
    if (authData.user && authData.user.email) {
      const fetchUserPicture = async () => {
        try {
          const response = await axios.get(`https://colabhub.onrender.com/api/auth/image/${authData.user.email}`, {
            responseType: 'blob',
          });

          const imageUrl = URL.createObjectURL(response.data);
          setUserImage(imageUrl);
        } catch (error) {
          console.error('Error fetching image:', error);
          setUserImage('/img/default-avatar.png');
        }
      };
      fetchUserPicture();
    }
  }, [authData.user]);

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
    navigate("/");
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

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
          <div className={`lg:block ${openNav ? 'hidden' : ''}`}>{/* navList here */}</div>
          <IconButton
            variant="text"
            size="sm"
            color="white"
            className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <XMarkIcon strokeWidth={2} className="h-6 w-6" /> : <Bars3Icon strokeWidth={2} className="h-6 w-6" />}
          </IconButton>
          {authData.user && (
            <div className="relative ml-24" onClick={toggleProfileDropdown}>
              <img src={userImage} alt="User Image" className="user-image w-9 h-9 rounded-full cursor-pointer" />
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    className="profile-dropdown absolute bg-blue-gray-50 border border-gray-200 rounded-lg shadow-md p-2 top-11 -left-28"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="text-black w-56">
                      <li className="flex items-center ml-9 relative pt-2 pb-2">
                        <img src={userImage} alt="User" className="h-10 w-10 mr-3 rounded-full" />
                        <span>{authData.user.nom} {authData.user.prenom}</span>
                      </li>
                      <span className="absolute left-0 w-full h-[1px] bg-black my-1"></span>
                      <li className="flex items-center justify-center pt-3" onClick={() => navigate("/profile")}>
                        <Button className="hover:text-orange-400 text-black focus:ring-0 focus:outline-none">Profile</Button>
                      </li>
                      <li className="flex items-center justify-center">
                        <Button className="hover:text-orange-400 text-black focus:ring-0 focus:outline-none">Settings</Button>
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
        </div>
      </MTNavbar>
      <hr />
    </div>
  );
}

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

export default Navbar;

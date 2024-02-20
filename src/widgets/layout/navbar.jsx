import React, { useState } from "react";
import PropTypes from "prop-types";
import logoSrc from "/public/img/logoshih.png";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/pages/authContext";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";

export function Navbar({ brandName, routes, action, logoSrc }) {
  const { authData, setAuthUserData } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(null);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const isSignUpinPage = location.pathname === "/sign-up" || location.pathname === "/sign-in";

  const logout = () => {
    // Réinitialiser les données d'authentification
    setAuthUserData({
      user: null,
      accessToken: null,
      refreshToken: null,
    });

    // Stocker les données d'authentification dans le localStorage
    localStorage.setItem('authData', JSON.stringify({
      user: null,
      accessToken: null,
      refreshToken: null,
    }));
  };

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
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }, index) => (
        (authData.user && (name === "Sign In" || name === "Sign Up")) ? null : (
          <Typography
            key={index}
            as="li"
            variant="small"
            color="inherit"
            className={`capitalize ${selectedTab === name ? 'border-b-2 border-orange-500' : ''} ${isSignUpinPage ? 'text-black' : 'text-white'} ${name === "Profile" || name === "Settings" || name === "Logout" ? 'hover:text-orange-400' : ''}`}
            onClick={() => handleTabClick(name)}
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
                className="flex items-center gap-1 p-1 font-bold"
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

        {authData.user && (
          <div className="profile relative" onClick={toggleProfileDropdown}>
            <img src="/img/team-5.png" alt="User Image" className="user-image w-8 h-8 rounded-full" />
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
                      <img src="/img/team-5.png" alt="Logo" className="h-10 w-10 mr-3 rounded-full" />
                      <span>{authData.user.nom} {authData.user.prenom}</span>
                    </li>
                    <span className="absolute left-0 w-full h-[1px] bg-black my-1"></span>
                    <li className="flex items-center justify-center pt-3" onClick={() => navigate("/profile")}>
                      <Button className="hover:text-orange-400 text-black">Profile</Button>
                    </li>
                    <li className="flex items-center justify-center" onClick={logout}>
                      <Button className="hover:text-orange-400 text-black">Settings</Button>
                    </li>
                    <li className="flex items-center justify-center" onClick={logout}>
                      <Button className="hover:text-orange-400 text-black">Logout</Button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

    </ul>
  );

  return (
    <MTNavbar color="transparent" className={`p-3 ${isSignUpinPage ? 'text-black' : 'text-white'}`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center">
            <img
              src={logoSrc}
              alt="CollabHub Logo"
              className="h-16 w-25 mr-2 flex items-center"
            />
          </div>
        </Link>
        <div className="hidden lg:block">{navList}</div>
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
  );
}

Navbar.defaultProps = {
  brandName: "CollabHub",
  action: (
    <a
      href="https://www.creative-tim.com/product/material-tailwind-kit-react"
      target="_blank"
    ></a>
  ),
  logoSrc: logoSrc,
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
  logoSrc: PropTypes.string,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;

import React, { useState } from "react";
import PropTypes from "prop-types";
import logoSrc from "/public/img/logoshih.png";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/pages/authContext";
import { useNavigate } from 'react-router-dom';

import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes, action, logoSrc }) {
  const { authData, setAuthUserData } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(null);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

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
  
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const isSignUpinPage = location.pathname === "/sign-up" || location.pathname === "/sign-in";

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
        // Vérifie si l'utilisateur est connecté et si le nom de l'onglet n'est ni "Sign In" ni "Sign Up"
        (authData.user && (name === "Sign In" || name === "Sign Up")) ? null : (
          <Typography
            key={index} // Utilisation de l'index comme clé
            as="li"
            variant="small"
            color="inherit"
            className={`capitalize ${selectedTab === name ? 'border-b-2 border-orange-500' : ''} ${isSignUpinPage ? 'text-black' : 'text-white'}`}
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
    <img src="/img/back1.jpg" alt="User Image" className="user-image w-8 h-8 rounded-full" />
    {showProfileDropdown && (
      <div className="profile-dropdown absolute bg-white border border-gray-200 rounded-lg shadow-md p-2 top-full mt-2 left-1/2 transform -translate-x-1/2">
        <ul className="text-black w-56">
          <li className="flex items-center pb-4">
            <img src="/img/back1.jpg" alt="Logo" className="h-10 w-10 mr-9 rounded-full" /> {/* Ajoutez votre chemin vers le logo et augmentez la marge droite */}
            <span>{authData.user.nom} {authData.user.prenom}</span>
          </li>
          <li className="flex items-center">
            <img src="/img/back1.jpg" alt="Logo" className="h-6 w-6 mr-4" /> {/* Ajoutez votre chemin vers le logo et augmentez la marge droite */}
            <span>Profile Settings</span>
          </li>
          <li className="flex items-center " onClick={logout}>
            <img src="/img/back1.jpg" alt="Logo" className="h-6 w-6 mr-4" /> {/* Ajoutez votre chemin vers le logo et augmentez la marge droite */}
            <span>Logout</span>
          </li>
        </ul>
      </div>
    )}
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

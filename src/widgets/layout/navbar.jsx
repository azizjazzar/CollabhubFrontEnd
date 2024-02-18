import React, { useState } from "react";
import PropTypes from "prop-types";
import logoSrc from "/public/img/logoshih.png";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/pages/authContext";
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
  const logout = () => {
    // Utilisez setAuthUserData pour réinitialiser les données d'authentification
    setAuthUserData({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
    // Supprimer les données d'authentification de localStorage
    localStorage.removeItem('authData');
    // Redirigez l'utilisateur vers la page de connexion ou la page d'accueil
    navigate('/sign-in');
  };
  const welcomeMessage = authData.user?.nom && authData.user?.prenom ? (
    <Typography
      as="li"
      variant="small"
      color="inherit"
      className="capitalize text-white lg:text-white"
    >
      Welcome {authData.user.nom} {authData.user.prenom}
    </Typography>
  ) : null;
  
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
      {routes.map(({ name, path, icon, href, target }) => (
        // Vérifie si l'utilisateur est connecté et si le nom de l'onglet n'est ni "Sign In" ni "Sign Up"
        (authData.user && (name === "Sign In" || name === "Sign Up")) ? null : (
          <Typography
            key={name}
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
      {welcomeMessage}
      {authData.user && (
        <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize text-white lg:text-white cursor-pointer"
          onClick={logout}
        >
          Déconnexion
        </Typography>
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

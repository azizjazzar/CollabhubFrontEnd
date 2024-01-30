import React, { useState } from "react";
import PropTypes from "prop-types";
import logoSrc from "/public/img/logoshih.png";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes, action, logoSrc }) {
  const [openNav, setOpenNav] = useState(false);
  const [showList, setShowList] = useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleFindTalentClick = () => {
    setShowList(!showList);
  };

  const handleNavClick = () => {
    setOpenNav(!openNav);
    setShowList(false); // Hide the list when clicking on any navbar element
  };

  const handleNavLinkClick = () => {
    setShowList(false); // Close the list when clicking on a different nav item
  };

  const navList = (
    <ul
      className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"
    >
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className={`capitalize hover:border-b-2 hover:border-orange-500 ${
            name === "Find Talent" ? "group" : ""
          }`}
        >
          {name === "Find Talent" ? (
            <div
              onClick={handleFindTalentClick}
              className="group inline-block relative cursor-pointer"
            >
              <div className="flex items-center gap-1 p-1 font-bold">
                {icon &&
                  React.createElement(icon, {
                    className: "w-[18px] h-[18px] opacity-75 mr-1",
                  })}
                {name}
              </div>
              {showList && (
                <div className="absolute left-0 bg-white text-gray-700 border border-gray-300 mt-2 space-x-2 p-4 rounded-md flex">
                  <Link to="/find-a-project" className="text-sm hover:underline">
                    Find a Project
                  </Link>
                  <Link
                    to="/do-a-quick-consultation"
                    className="text-sm hover:underline"
                  >
                    Do a Quick Consultation
                  </Link>
                  <Link to="/buy-a-project" className="text-sm hover:underline">
                    Buy a Project
                  </Link>
                </div>
              )}
            </div>
          ) : href ? (
            <a
              href={href}
              target={target}
              onClick={handleNavLinkClick} // Close the list when clicking on a different nav item
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
              onClick={handleNavLinkClick} // Close the list when clicking on a different nav item
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
      ))}
    </ul>
  );

  return (
    <MTNavbar
      color="transparent"
      className="p-2 w-auto"
      style={{ backgroundColor: "white", color: "gray" }}
    >
      <div className="container mx-auto w-full flex items-center justify-between text-gray">
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
          onClick={handleNavClick}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <MobileNav
        className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
        open={openNav}
      ></MobileNav>
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

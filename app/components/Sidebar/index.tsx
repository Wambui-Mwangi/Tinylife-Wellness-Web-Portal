'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import LogoutModal from "@/app/modals/SignOutPopUp";
import Image from "next/image";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import { CgMenu } from "react-icons/cg";

type MenuItem = {
  id: number;
  link: string;
  icon: JSX.Element;
};

const SideBar = () => {
  const menuItems: MenuItem[] = [
    { id: 1, link: "/dashboard", icon: <DashboardIcon /> },
    { id: 2, link: "/datamanagement", icon: <CloudUploadIcon /> },
    { id: 3, link: '/documentation', icon: <DescriptionIcon /> },
  ];

  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [activeLink, setActiveLink] = useState("/dashboard");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleActiveLink = (link: string) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link); 
  };

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    if (storedActiveLink) {
      handleActiveLink(storedActiveLink); 
    }
  }, []);

  const getNavItemClasses = (menu: MenuItem) => {
    return classNames(
      "flex items-center cursor-pointer rounded w-full overflow-hidden my-1 p-7 transition duration-300",
      {
        "hover:text-green-500": !toggleCollapse && activeLink !== menu.link,
        "mr-2": toggleCollapse,
        "text-green-500": activeLink === menu.link,
        "text-black": activeLink !== menu.link,
      }
    );
  };

  const handleMouseEnter = (link: string) => {
    if (toggleCollapse && link) {
      handleActiveLink(link); 
    }
  };

  const handleMouseLeave = () => {
    if (toggleCollapse) {
    }
  };

  const handleLogoutConfirmation = () => {
  };

  const sidebarClasses = classNames("h-screen w-[130px] mr-[3%] ml-[-1%] pt-20 pb-4 pl-[1%] bg-yellow-400 flex flex-col justify-between transition-all duration-300", {
    "w-80": !toggleCollapse,
    "w-20": toggleCollapse,
    "items-center": toggleCollapse,
  });
  return (
    <div className={sidebarClasses}>
      <div className="flex flex-col pl-3">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-4 flex-col">
            <Image
              src="/LOGO.png"
              alt="Logo"
              width={toggleCollapse ? 40 : 70}
              height={toggleCollapse ? 28 : 56}
              className='mt-10 ml-[-2%]'
            />
            {!toggleCollapse && <div className="w-4" />}
          </div>
        </div>
        <div className="flex flex-col items-start mt-10">
          {menuItems.map(({ id, link, icon }) => (
            <Link key={id} href={link}>
              <div
                className={getNavItemClasses({ id, link, icon })}
                onMouseEnter={() => handleMouseEnter(link)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleActiveLink(link)}
              >
                <div className="mr-5">
                  {React.cloneElement(icon, {
                    className: classNames("w-[30px] h-24 flex-shrink-0", {
                      "text-green-500": activeLink === link,
                    }),
                  })}
                </div>
              </div>
            </Link>
          ))}
          <div
            className={getNavItemClasses({ id: 4, link: "/logOut", icon: <LogoutIcon /> })}
            onClick={() => setShowLogoutPopup(true)}
          >
            <div className="ml-[-8px] mt-[-8px]">
              <div
                className={`group flex items-center gap-5 p-2 hover:bg-hoverblue rounded-md mt-1`}
                onClick={handleLogoutConfirmation}
              >
                <span className={classNames({ "text-green-500": activeLink === "/logOut" })}>
                  {React.cloneElement(<LogoutIcon />, {
                    className: classNames("w-[30px] h-24 flex-shrink-0", {
                      "text-green-500": activeLink === "/logOut",
                    }),
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLogoutPopup && (
        <LogoutModal
          isOpen={showLogoutPopup}
          onClose={() => setShowLogoutPopup(false)}
          onLogout={handleLogoutConfirmation}
          activeLink={activeLink}
        />
      )}
    </div>
  );
};

export default SideBar;

import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import './styles/navbar.css';
import Navbar0 from "./navbar0";
import Navbar1 from "./navbar1";

const Navbar = ({showSign_in,Refresh,open}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <768);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="nav-bdy">
        {isSmallScreen ? (
          <div
            style={{
              padding: "5px",
              backgroundColor: 'white',
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <GiHamburgerMenu
              onClick={() => {
                openSidebar();
                open();
              }}
            />
          </div>
        ) : (
          <Navbar1 showSign_in={showSign_in} refresh={Refresh}/>
        )}
      {isSmallScreen ? (
          <Navbar0 isOpen={sidebarOpen} onClose={closeSidebar} showSign_in={showSign_in} refresh={Refresh} open={open}/>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;

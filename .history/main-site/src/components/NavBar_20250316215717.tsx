import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [open, setOpen] = useState(false);

  // Handle Scroll Behavior
  useEffect(() => {
    const handleScroll = () => {
      let currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll + 10) {
        setHidden(true); // Hide on scroll down
      } else if (currentScroll < lastScroll - 10) {
        setHidden(false); // Show on scroll up
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav
      className={`fixed left-1/2 transform -translate-x-1/2 w-[95%] max-w-screen-xl z-[9999] flex items-center justify-between rounded-md bg-black/90 px-6 py-3 shadow-lg h-16 transition-all duration-300 ease-in-out 
        ${hidden ? "-top-20" : "top-4"}`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <a href="/">
          <img
            src="/navlogo.png"
            alt="Logo"
            className="h-8 md:h-10 w-auto object-contain rounded-md"
          />
        </a>
        <div className="h-6 border-l-2 border-gray-400 mx-3 hidden md:block"></div>
      </div>

      {/* ✅ Mobile Menu Button - Hidden on Desktop */}
      <button
        className="md:hidden z-[9999] text-white focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* ✅ Mobile Dropdown Menu - Only visible when open */}
      <div
        className={`absolute top-16 left-0 w-full bg-black/90 rounded-md shadow-md md:hidden transition-all duration-300 ease-in-out ${open ? "block" : "hidden"
          }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4">
          <li><a href="#method" className="text-white hover:text-gray-300">Method</a></li>
          <li><a href="#services" className="text-white hover:text-gray-300">Services</a></li>
          <li><a href="#pricing" className="text-white hover:text-gray-300">Pricing</a></li>
          <li><a href="#contact" className="text-white hover:text-gray-300">Contact</a></li>
          <li><a href="/blog" className="text-white hover:text-gray-300">Blog</a></li>
        </ul>
      </div>

      {/* ✅ Desktop Navigation - Hidden on Mobile */}
      <ul className="hidden md:flex items-center space-x-6 flex-wrap">
        <li><a href="#method" className="text-white hover:text-gray-300">Method</a></li>
        <li><a href="#services" className="text-white hover:text-gray-300">Services</a></li>
        <li><a href="#pricing" className="text-white hover:text-gray-300">Pricing</a></li>
        <li><a href="#contact" className="text-white hover:text-gray-300">Contact</a></li>
        <li><a href="/blog" className="text-white hover:text-gray-300">Blog</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

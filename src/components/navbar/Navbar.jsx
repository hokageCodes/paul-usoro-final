import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const menuRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false); // Close the menu on link click
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const firstLink = menuRef.current.querySelector('a');
      firstLink && firstLink.focus();
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
    } else {
      // Allow scrolling again
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Clean up the overflow style
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 backdrop-blur-sm z-30 h-[10vh] flex items-center justify-between px-4 pt-2 md:px-8 mb-2">
      <a href="/" className="flex justify-center">
        <img
          src="/assets/img/puc-logo.png"
          className="mr-3"
          alt="codewithfaraz Logo"
          width={100}
          height={100}
        />
      </a>
      <div className="md:hidden z-40">
        <button 
          onClick={handleToggle} 
          className="focus:outline-none" 
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <nav 
        ref={menuRef}
        className={`fixed top-[75px] left-0 h-screen w-full bg-white transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:flex md:translate-x-0 md:h-auto md:w-auto md:bg-transparent md:top-auto md:left-auto md:gap-6 z-40`}
      >
        <div className="flex flex-col md:flex-row md:gap-6 md:items-center p-8 md:p-0">
          {['firm', 'expertise', 'people', 'careers', 'contact'].map((link) => (
            <a 
              key={link}
              href={`${link}`} 
              className={`py-2 text-2xl font-bold ${activeLink === link ? 'text-blue-500' : 'text-[#01553d]'}`} 
              onClick={() => handleLinkClick(link)}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
          {/* <button className="bg-black text-white px-4 py-2 rounded-lg font-medium mt-4 md:mt-0">
            Get for free
          </button> */}
        </div>
      </nav>
    </header>
  );
};

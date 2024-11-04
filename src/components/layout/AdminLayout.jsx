/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { 
  FaHome, FaUser, FaBriefcase, FaChartBar, 
  FaEnvelope, FaBars, FaSignOutAlt 
} from 'react-icons/fa';
import { Outlet, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, signOut } from '../../../firebase'; // Import signOut

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate(); // Initialize navigate for redirection

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out user
      navigate('/admin-login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-[#01553d] text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        <div className="flex p-4">
          <img src="/assets/img/puc-logo.webp" alt="Logo" className="h-20" />
        </div>

        <nav>
          <ul className="space-y-8 mt-12 ml-4 text-lg">
            <li className="group">
              <Link to="/admin" className="flex items-center space-x-2 p-2">
                <FaHome />
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
              <div className="h-1 w-0 bg-white group-hover:w-full transition-all duration-300"></div>
            </li>
            <li className="group">
              <Link to="/admin/people" className="flex items-center space-x-2 p-2">
                <FaUser />
                {isSidebarOpen && <span>People</span>}
              </Link>
              <div className="h-1 w-0 bg-white group-hover:w-full transition-all duration-300"></div>
            </li>
            <li className="group">
              <Link to="/admin/careers" className="flex items-center space-x-2 p-2">
                <FaBriefcase />
                {isSidebarOpen && <span>Job Openings</span>}
              </Link>
              <div className="h-1 w-0 bg-white group-hover:w-full transition-all duration-300"></div>
            </li>
            <li className="group">
              <Link to="/admin/upload/people" className="flex items-center space-x-2 p-2">
                <FaBriefcase />
                {isSidebarOpen && <span>People Upload</span>}
              </Link>
              <div className="h-1 w-0 bg-white group-hover:w-full transition-all duration-300"></div>
            </li>
            <li className="group">
              <Link to="/admin/upload/jobs" className="flex items-center space-x-2 p-2">
                <FaChartBar />
                {isSidebarOpen && <span>Job Upload</span>}
              </Link>
            </li>
            <li className="group">
              <Link to="/admin/messages" className="flex items-center space-x-2 p-2">
                <FaEnvelope />
                {isSidebarOpen && <span>Messages</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 p-4 w-full">
          <button 
            className="flex items-center space-x-2 text-red-500 hover:underline w-full p-2 text-xl"
            onClick={handleLogout} // Attach logout function
          >
            <FaSignOutAlt />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header
          className={`bg-white shadow p-4 flex justify-between items-center ${
            isSidebarOpen ? 'pl-4' : 'pl-16'
          } transition-all duration-300`}
        >
          <button className="md:hidden" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h1 className="text-xl font-semibold">{getTimeOfDay()}, Admin!</h1>
          <div className="flex items-center space-x-2">
            <img
              src="/assets/img/puc-logo.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-contain"
            />
            <span className="hidden md:block">admin@example.com</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

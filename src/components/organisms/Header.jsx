import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HeaderComponent() {
  const [activeMenu, setActiveMenu] = useState('Inicio');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Inicio', route: '/' },
    { name: 'Películas', route: '/movies' },
    { name: 'Novedades', route: '/news' },
  ];

  const handleToNavigate = (route) => {
    setActiveMenu(route);
    navigate(route);
  };

  return (
    <>
      <header className="mb-5 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/70 to-transparent py-4 px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-orange-400 text-2xl font-bold">
            <img className="w-[150px]" src="./log.png" alt="Screamed" />
          </div>

          {/* Navigation Menu */}
          <nav className="flex space-x-6 gap-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={` cursor-pointer
                  text-white text-sm transition-all duration-300
                  ${activeMenu === item.route ? 'font-bold' : 'hover:text-gray-300 opacity-70'}
                `}
                onClick={() => handleToNavigate(item.route)}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="text-white hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Notifications Icon */}
            <button className="text-white hover:text-gray-300 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-2">
              <img
                src="unnamed.jpg"
                alt="Profile"
                className="rounded-md h-8 w-8 object-cover"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeaderComponent;
import React from 'react';
import { Logo } from 'components/Logo';
import { GrSearch } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='h-[10vh] min-h-20 bg-white transition-colors shadow-lg'>
      <div className='h-full container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center'>

        {/* Logo */}
        <div className='flex-shrink-0'>
          <Link to={"/"}>
            <Logo w={120} h={90} className='w-24 sm:w-28 lg:w-36' />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className='hidden lg:flex space-x-8 text-xl font-bold'>
          <Link to="/products" className='relative text-gray-700 transition-all duration-300 ease-in-out px-2 py-1 rounded-xl shadow-none transform hover:scale-105'>
            <span className="group relative cursor-pointer">
              Products
            </span>
          </Link>
          <Link to="/workout" className='relative text-gray-700 transition-all duration-300 ease-in-out px-2 py-1 rounded-xl shadow-none transform hover:scale-105'>
            <span className="group relative cursor-pointer">
              Workouts
            </span>
          </Link>
          <Link to="/exercise" className='relative text-gray-700 transition-all duration-300 ease-in-out px-2 py-1 rounded-xl shadow-none transform hover:scale-105'>
            <span className="group relative cursor-pointer">
              Exercises
            </span>
          </Link>
        </nav>

        {/* Search Bar */}
        <div className='flex-grow max-w-[200px] sm:max-w-[250px]'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search...'
              className='text-sm sm:text-base h-9 sm:h-10 w-full rounded-full shadow-md focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out px-4'
            />
            <button
              className='absolute inset-y-0 right-0 flex items-center justify-center w-10 h-9 sm:w-12 sm:h-10 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all duration-200 ease-in-out'
            >
              <GrSearch />
            </button>
          </div>
        </div>

        {/* Sign Up and Cart Icons */}
        <div className='flex items-center space-x-4 text-md sm:text-lg'>
          <Link to={"/login"}
            className='px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all duration-200 ease-in-out text-center flex items-center justify-center text-xs sm:text-base'
          >
            Login
          </Link>

          <Link to={"/signup"}
            className='px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all duration-200 ease-in-out text-center flex items-center justify-center text-xs sm:text-base whitespace-nowrap'
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

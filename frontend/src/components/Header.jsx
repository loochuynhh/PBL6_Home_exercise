import React from 'react';
import { Logo } from 'components/Logo';
import { GrSearch } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='h-[10vh] min-h-20 bg-white transition-colors shadow-lg'>
      <div className='h-full container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center'>

        <div className='flex-shrink-0'>
          <Link to={"/"}>
            <Logo w={120} h={90} className='w-24 sm:w-28 lg:w-36' />
          </Link>
        </div>

        <div className='flex-grow max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-2 sm:mx-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search product here...'
              className='text-sm sm:text-lg h-10 sm:h-12 w-full rounded-full border border-gray-200 outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out'
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
              <button
                className='absolute inset-y-0 right-0 flex items-center justify-center w-10 sm:w-14 h-10 sm:h-12 bg-blue-500 rounded-r-full text-white hover:bg-blue-600 transition-all duration-200 ease-in-out'
              >
                <GrSearch />
              </button>
            </div>
          </div>
        </div>

        <div className='flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 text-md sm:text-xl'>
          <FaUserAlt className='w-5 h-5 sm:w-6 sm:h-6' />
          <div className='relative'>
            <IoCartOutline className='w-6 h-6 sm:w-7 sm:h-7' />
            {(
              <span className='absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
                1
              </span>
            )}
          </div>
          <Link to={"/login"}
            className='flex items-center text-center justify-center w-20 sm:w-24 h-10 sm:h-12 bg-red-400 rounded-full text-white hover:bg-red-600 transition-all duration-200 ease-in-out pb-1'
          >
            Login
          </Link>
        </div>

      </div>
    </header>
  );
}

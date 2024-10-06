import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white pt-6 pb-2 md:pt-8 md:pb-4'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap justify-between gap-8 ml-10'>
          {/* About Us */}
          <div className='w-full lg:w-1/4 mb-6 lg:mb-0'>
            <h3 className='text-xl font-semibold mb-4'>About Us</h3>
            <p className='text-gray-300'>
              We are your one-stop shop for all things electronics. From the latest gadgets to essential devices, we've got you covered with the best products and deals.
            </p>
          </div>

          {/* Policy Links */}
          <div className='w-full lg:w-1/4 mb-6 lg:mb-0'>
            <h3 className='text-xl font-semibold mb-4'>Policies</h3>
            <ul className='space-y-2'>
              <li><a href='#' className='hover:underline hover:text-gray-300 transition-colors'>Warranty Policy</a></li>
              <li><a href='#' className='hover:underline hover:text-gray-300 transition-colors'>Return Policy</a></li>
              <li><a href='#' className='hover:underline hover:text-gray-300 transition-colors'>Delivery Policy</a></li>
              <li><a href='#' className='hover:underline hover:text-gray-300 transition-colors'>Payment Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className='w-full lg:w-1/4 mb-6 lg:mb-0'>
            <h3 className='text-xl font-semibold mb-4'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-gray-400 hover:text-white transition-colors'>
                <FaFacebookF size={24} />
              </a>
              <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='text-gray-400 hover:text-white transition-colors'>
                <FaTwitter size={24} />
              </a>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='text-gray-400 hover:text-white transition-colors'>
                <FaInstagram size={24} />
              </a>
              <a href='https://youtube.com' target='_blank' rel='noopener noreferrer' className='text-gray-400 hover:text-white transition-colors'>
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className='mt-8 border-t border-gray-600 pt-4 text-center'>
          <p className='text-gray-400'>&copy; 2024 LH Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

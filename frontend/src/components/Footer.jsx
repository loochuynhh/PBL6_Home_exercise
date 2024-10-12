import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white pt-6 pb-2 md:pt-8 md:pb-4'>
      <div className='container mx-8 px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* About Us */}
          <div className='col-span-2 w-full lg:w-1/4 mb-6 lg:mb-0'>
            <h3 className='text-xl font-semibold mb-4'>About Us</h3>
            <p className='text-gray-300'>
            We provide personalized home workout programs and expert fitness guidance tailored to your unique goals and preferences. 
            Whether you're looking to build strength, lose weight, enhance flexibility, or simply adopt a healthier lifestyle, 
            our dedicated team is here to support you every step of the way, ensuring that you stay motivated and achieve your fitness aspirations.
            </p>
          </div>

          {/* Policy Links */}
          <div className='pl-10 lg:pl-12 w-full lg:w-1/4 mb-6 lg:mb-0'>
            <h3 className='text-xl font-semibold mb-4'>Policies</h3>
            <ul className='space-y'>
              <li><a href='/' className='hover:underline hover:text-gray-300 transition-colors'>Warranty Policy</a></li>
              <li><a href='/' className='hover:underline hover:text-gray-300 transition-colors'>Return Policy</a></li>
              <li><a href='/' className='hover:underline hover:text-gray-300 transition-colors'>Delivery Policy</a></li>
              <li><a href='/' className='hover:underline hover:text-gray-300 transition-colors'>Payment Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className='pl-2 lg:pl-4 w-full lg:w-1/4 mb-6 lg:mb-0'>
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
          <p className='text-gray-400'>&copy; 2024 LH Gym Home. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

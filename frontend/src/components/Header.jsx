import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import { Logo } from 'components/Logo';
import userIcon from 'assets/other/userIcon.png';
import { GrSearch } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../pages/account/AuthContext';

export const Header = () => {
  const [accessToken, setAccessToken] = useState();
  const { isLoggedIn, userName, setIsLoggedIn, setUserName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);

    if (accessToken) {
      const checkUserRole = async () => {
        try {
          const response = await axios.get('/api/account', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.data) {
            setIsLoggedIn(true);
            setUserName(response.data.username);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Error checking user role:', error);
          setIsLoggedIn(false);
        }
      };
      checkUserRole();
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, userName, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setUserName('');
    setAccessToken()
    navigate('/');
  };

  return (
    <header className='h-[10vh] min-h-20 bg-white transition-colors shadow-lg'>
      <div className='h-full container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xxl'>
        <div className='flex-shrink-0'>
          <Link to={"/"}>
            <Logo w={120} h={90} className='w-24 sm:w-28 lg:w-36' />
          </Link>
        </div>

        <nav className='lg:flex space-x-8 font-bold'>
          <Link to="/product" className='relative text-gray-700 transition-all duration-300 ease-in-out px-2 py-1 rounded-xl shadow-none transform hover:scale-105'>
            <span className="group relative cursor-pointer">Product</span>
          </Link>
          <Link to="/workouts" className='relative text-gray-700 transition-all duration-300 ease-in-out px-2 py-1 rounded-xl shadow-none transform hover:scale-105'>
            <span className="group relative cursor-pointer">Workouts</span>
          </Link>
          <Link to="/exercises" className='relative text-gray-700 transition-all duration-300 ease-in-out px-2 py-1 rounded-xl shadow-none transform hover:scale-105'>
            <span className="group relative cursor-pointer">Exercises</span>
          </Link>
        </nav>

        <div className='flex-grow max-w-[500px] sm:max-w-[400px]'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search...'
              className='text-md sm:text-base h-9 sm:h-10 w-full rounded-full shadow-md focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out px-4'
            />
            <button
              className='absolute inset-y-0 right-0 flex items-center justify-center w-10 h-9 sm:w-12 sm:h-10 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all duration-200 ease-in-out'
            >
              <GrSearch />
            </button>
          </div>
        </div>

        {isLoggedIn ? (
          <Menu>
            <div className='lg:flex space-x-8 font-bold items-center justify-center'>
              <span className="text-gray-700 pr-2 font-semibold">{userName}</span>
              <MenuButton as={Button} className="pl-2 ml-0 flex items-center">
                <img src={userIcon} alt="User" className="w-12 h-12" />
              </MenuButton>
            </div>
            <MenuList className="w-[40vh] shadow-lg mt-2 rounded-lg bg-white border-none" placement="top-end">
              <div className="mb-0">
                <Text className="pr-5 pt-4 pb-2 border-b border-gray-200 text-sm font-bold">
                  👋&nbsp; Hey, {userName}
                </Text>
              </div>
              <div className="flex flex-col p-2">
                <MenuItem className="py-2 hover:bg-gray-100" onClick={() => navigate('/profile')}>
                  <Text className="text-sm">Profile</Text>
                </MenuItem>
                <MenuItem className="py-2 hover:bg-gray-100">
                  <Text className="text-sm" onClick={handleLogout}>Log out</Text>
                </MenuItem>
              </div>
            </MenuList>
          </Menu>
        ) : (
          <div className='flex items-center space-x-4 text-md'>
            <Link to="/login" className='px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all duration-200 ease-in-out'>
              Login
            </Link>
            <Link to="/signup" className='px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all duration-200 ease-in-out'>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

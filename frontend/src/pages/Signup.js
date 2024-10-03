import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import avaIcon from "assets/other/avaIcon.png";
import { Link, useNavigate } from 'react-router-dom';
import { imageToBase64 } from 'helpers/imageToBase64';
import summaryAPI from 'common';
import { toast } from 'react-toastify';
export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  });
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(data.confirmPassword === data.password){
      const fetchResponse = await fetch(summaryAPI.signup.url, {
        method: summaryAPI.signup.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const dataResponse = await fetchResponse.json()
      if(dataResponse.success){
        toast.success(dataResponse.message)
        navigate("/login")
      }else if(dataResponse.error){
        toast.error(dataResponse.message)
      }
    }else{
      console.log("Confrim password and password have to same")
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic
    }));
  };

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
        <div className='flex flex-col items-center select-none'>
          <form>
            <div className='relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-2 border-gray-300 shadow-lg mb-4 overflow-hidden'>
              <img 
                src={data.profilePic || avaIcon} 
                alt='User Avatar' 
                className='w-full h-full object-cover' 
              />
              <label 
                htmlFor='upload-avatar' 
                className='absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-20 hover:bg-opacity-40 transition-opacity cursor-pointer'
              >
                <span className='text-gray-800 text-xs sm:text-sm font-semibold text-center absolute bottom-[15%]'>Upload Picture</span>
                <input 
                  type='file' 
                  id='upload-avatar' 
                  name='profilePic' 
                  onChange={handleUploadPic} 
                  className='absolute inset-0 opacity-0 cursor-pointer' 
                />
              </label>
            </div>
          </form>

          <h2 className='text-md sm:text-lg md:text-2xl lg:text-3xl font-bold text-blue-800 italic transform transition-transform hover:scale-105'>
            Signup
          </h2>
        </div>

        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name' className='block text-base font-medium text-gray-500 mb-1'>
              Name:
            </label>
            <input
              type='text'
              placeholder='Enter your name'
              name='name'
              value={data.name}
              onChange={handleOnChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-base font-medium text-gray-500 mb-1'>
              Email:
            </label>
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              name='email'
              value={data.email}
              onChange={handleOnChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-base font-medium text-gray-500 mb-1'>
              Password:
            </label>
            <div className='relative'>
              <input
                id='password'
                type={showPassword ? "text" : "password"}
                placeholder='Enter your password'
                name='password'
                value={data.password}
                onChange={handleOnChange}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10' 
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor='confirmPassword' className='block text-base font-medium text-gray-500 mb-1'>
              Confirm Password:
            </label>
            <div className='relative'>
              <input
                id='confirmPassword'
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Enter your password again'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10' 
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full transition-transform transform hover:scale-105'>
            Signup
          </button>
        </form>
        <p className='mt-4 text-sm text-gray-600'>
          Already have an account?
          <Link to="/login" className='text-blue-600 hover:text-blue-700 hover:underline ml-2'>Login</Link>
        </p>
      </div>
    </div>
  )
}


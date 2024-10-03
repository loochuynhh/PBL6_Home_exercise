import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import avaIcon from "assets/other/avaIcon.png"
import { json, Link, useNavigate } from 'react-router-dom';
import summaryAPI from 'common';
import { toast } from 'react-toastify';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const handleOnChange = (e) =>{
    const {name, value} = e.target
    setData((prev) => {
      return{
        ...prev,
        [name] : value
      }
    })
  }
  const navigate = useNavigate()
  const handleSubmit = async(e) =>{
      e.preventDefault()
      const request = await fetch(summaryAPI.login.url,{
        method: summaryAPI.login.method,
        credentials:"include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const dataResponse = await request.json()
      if(dataResponse.success){
        toast.success("Login successfully")
        navigate("/")
      }
      else{
        toast.error(dataResponse.message)
      }
  }
  return (
    <div className='flex flex-col items-center justify-center h-[90vh] p-4'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-h-[85vh] max-w-lg'>
        <div className='flex flex-col items-center select-none'>
          <img src={avaIcon} alt='ava Icon' className='w-20 h-20 rounded-full border-2 border-gray-300 shadow-lg mb-4' />
          <h2 className='text md:text-2xl lg:text-4xl font-bold text-blue-800 italic transform transition-transform hover:scale-105'>
            Login
          </h2>
        </div>
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
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
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' />
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
                className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10' />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <Link to="/forgot-password" className='block text-sm text-blue-500 hover:underline mt-2'>
              Forgot Password?
            </Link>
          </div>
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full transition-transform transform hover:scale-105'>
            Login
          </button>
        </form>
        <p className='mt-4 text-sm text-gray-600'>
          Don't have an account?
          <Link to="/signup" className='text-blue-600 hover:text-blue-700 hover:underline ml-2'>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

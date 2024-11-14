import React from 'react';
import app_demo from 'assets/other/app_demo.png';

const Product = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full bg-cover bg-left-bottom pb-12 bg-gradient-to-b from-gray-900 via-gray-800 to-black'>
      <nav className="mx-auto flex w-full items-center justify-between p-5 lg:px-8 max-w-7xl h-16">
        <div className="flex justify-between items-center w-full">
          <a
            className="text-base text-zinc-950 dark:text-white hover:underline flex-shrink-0"
            href="/"
          >
            <span className="sr-only">LH Inc</span>
          </a>
          <button
            className="py-2.5 px-5 text-lg font-bold border border-transparent bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            type="button"
          >
            Download APK
          </button>
        </div>
      </nav>

      <div className="flex flex-col justify-center items-center h-full w-full bg-cover bg-left-bottom pb-12 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        <div className="flex justify-between relative h-full pt-10 overflow-hidden w-full max-w-[600px] lg:max-w-7xl">
          <div className="p-10 min-w-[400px] flex flex-col">
            <h1 className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text font-extrabold text-5xl lg:text-8xl animate-fade-in">
              LH <br /> WORKOUT <br /> PLANNER
            </h1>
            <p className="mt-4 bg-gradient-to-r from-gray-400 to-gray-600 text-transparent bg-clip-text font-semibold text-2xl lg:text-4xl animate-slide-in">
              All-in-one <br /> workout <br className="lg:hidden" /> tracking
            </p>
          </div>
          <img
            className="mr-18 h-5/6 min-h-[400px] w-auto transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out animate-fade-in-right"
            src={app_demo}
            alt="Phone"
          />
        </div>
      </div>

    </div>
  );
};

export default Product;

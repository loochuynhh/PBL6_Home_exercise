import React from 'react'
import app_demo from 'assets/other/app_demo.png';
export const Home = () => {
  return (
    <div className="mx-auto max-w-7xl py-2 lg:py-8 sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden px-6 pt-4">
        <div className="mx-auto text-center flex flex-col items-center gap-5">
          <h1 className="text-4xl font-semibold text-zinc-950 sm:text-7xl dark:text-white">
            TRACK &amp; PLAN <br /> WORKOUTS
          </h1>
          <p className="text-base/6 text-secondary-gray dark:text-zinc-400 max-w-lg italic !text-lg">
            Plan workouts, access elite plans, discover personalized metrics, and connect with the community.
          </p>
          <div className="flex gap-2">
            <a href="https://apps.apple.com/us/app/jefit-workout-planner-gym-log/id449810000?pt=516380&amp;ct=homepage&amp;mt=8">
              <img
                alt="Apple App store download button"
                className="w-40"
                src="/path/to/app_button.svg" // Thay đổi đường dẫn cho nút tải xuống
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=je.fit&amp;referrer=utm_source%3Dhomepage">
              <img
                alt="Google play store download button"
                className="w-40"
                src="/path/to/play_button.svg" // Thay đổi đường dẫn cho nút tải xuống
              />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-ocean-blue relative py-12 pt-64 md:pt-12 mt-40 lg:mt-48">
        <img
          alt="App screenshot on phone and watch"
          className="absolute rounded-md -top-40 lg:-top-48 max-w-96 lg:max-w-md mx-auto left-1/2 transform -translate-x-1/2"
          src={app_demo}
        />
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col justify-center sm:flex-row sm:justify-around pl-4 pr-4 sm:pr-20 md:justify-between">
            <div className="flex flex-col">
              <div className="flex p-2 justify-center">
                <img className="h-24" src="/home_page/leftbranch.png" alt="Left laurel branch" />
                <div className="flex flex-col justify-center items-center text-center w-40">
                  <div className="flex justify-center gap-2 mb-1">
                    {[...Array(5)].map((_, index) => (
                      <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 text-yellow-200">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-xl font-semibold tracking-tight text-white">42,000+</span>
                  <p className="text-base/6 text-zinc-950 dark:text-white !text-white">Five star Ratings</p>
                </div>
                <img className="h-24" src="/home_page/rightbranch.png" alt="Right laurel branch" />
              </div>
              <div className="flex p-2 justify-center text-center">
                <img className="h-24" src="/home_page/leftbranch.png" alt="Left laurel branch" />
                <div className="flex flex-col justify-center items-center w-40">
                  <p className="text-sm/6 text-secondary-gray dark:text-zinc-400 !text-white">Featured by Men's Health, PC Magazine, USA TODAY, and more</p>
                  <span className="order-first text-xl font-semibold tracking-tight text-white">2023 Best App</span>
                </div>
                <img className="h-24" src="/home_page/rightbranch.png" alt="Right laurel branch" />
              </div>
            </div>
            <div className="flex flex-col gap-8 pt-4">
              <div className="flex flex-col p-2 justify-center items-center">
                <p className="text-sm font-semibold leading-6 text-white">Downloads</p>
                <p className="order-first text-4xl font-semibold tracking-tight text-white">20M+</p>
              </div>
              <div className="flex flex-col p-2 justify-center items-center">
                <p className="text-sm font-semibold leading-6 text-white">Body Builders</p>
                <p className="order-first text-4xl font-semibold tracking-tight text-white">12M+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

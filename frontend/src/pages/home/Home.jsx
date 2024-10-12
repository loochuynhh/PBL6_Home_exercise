import React from 'react';
import app_demo from 'assets/other/app_demo.png';
import apk_icon from 'assets/other/apk_download_icon.png';

export const Home = () => {
  return (
    <div className="flex flex-col items-center my-auto mx-auto max-w-7xl py-8 lg:py-12 sm:px-6 lg:px-8 text-black dark:text-white">
      {/* Phần hero */}
      <div className="relative isolate overflow-hidden px-6 py-4 lg:py-8">
        <div className="mx-auto text-center flex flex-col items-center gap-4">
          <h1 className="text-4xl font-extrabold sm:text-6xl leading-tight transition-colors duration-300 ease-in-out">
            TRACK &amp; PLAN <br /> WORKOUTS
          </h1>
          <p className="text-lg text-secondary-gray dark:text-zinc-400 max-w-xl italic">
            Plan workouts, access elite plans, discover personalized metrics, and connect with the community.
          </p>
        </div>
      </div>

      {/* Phần screenshot ứng dụng với phần tải APK */}
      <div className="bg-ocean-blue relative py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <img
            alt="App screenshot on phone and watch"
            className="rounded-md shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 max-w-96 mx-auto"
            src={app_demo}
          />
          <div className="lg:mt-0 lg:ml-8">
            <a href="/" className="flex items-center bg-green-500 text-white rounded-lg p-3 transition-#ransform duration-300 hover:scale-105 mt-4">
              <span className="mr-2">Download APK</span>
              <img src={apk_icon} alt="APK Download Icon" className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Lý do chọn ứng dụng */}
      <div className="bg-ocean-blue relative py-4 lg:py-8">
        <h2 className="text-3xl font-bold text-center">Why Choose Our Home Gym App?</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {[
            { title: 'Personalized Workout Plans', desc: 'Whether you\'re a beginner or a seasoned athlete, our app tailors your workout plan to your fitness level, goals, and preferences.' },
            { title: 'Progress Tracking', desc: 'Track your progress with detailed metrics, from calories burned to muscle gain, all in one place.' },
            { title: 'Join the Community', desc: 'Connect with fitness enthusiasts worldwide, share tips, motivate each other, and stay committed together.' },
            { title: 'Elite Trainer Access', desc: 'Get access to exclusive workout plans and tips from elite trainers who guide you every step of the way.' },
            { title: 'Stay Motivated', desc: 'Daily reminders, challenges, and achievements keep you motivated to reach your fitness goals.' },
            { title: 'Easy to Use', desc: 'Simple, intuitive design ensures that you can focus on your workouts without any distractions.' }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold text-zinc-950 mb-4">{item.title}</h3>
              <p className="text-base text-secondary-gray">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phần CTA */}
      <div className="bg-gray-100 rounded-lg text-center py-4 lg:py-8">
        <h2 className="text-3xl font-bold">Ready to Transform Your Fitness Journey?</h2>
        <p className="text-lg text-secondary-gray mt-4">Join us today for personalized workouts, expert guidance, and a supportive community!</p>
        <a href="/signup" className="mt-6 inline-block bg-blue-600 text-white rounded-lg py-3 px-6 transition-transform duration-300 hover:scale-105">
          Sign Up Now
        </a>
      </div>
    </div>
  );
};

import React from 'react';
import app_demo from 'assets/other/app_demo.png';
import apk_icon from 'assets/other/apk_download_icon.png';

export const Home = () => {
  return (
    <div className="container flex flex-col items-center text-black dark:text-white">
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
            <a href="#" className="flex items-center bg-green-500 text-white rounded-lg p-3 transition-#ransform duration-300 hover:scale-105 mt-4">
              <span className="mr-2">Download APK</span>
              <img src={apk_icon} alt="APK Download Icon" className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Lý do chọn ứng dụng */}
      <div className="relative py-8 lg:py-12">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center tracking-tight">
          Why Choose Our Home Gym App?
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8">
          {[
            { title: 'Personalized Workout Plans', desc: 'Our app creates customized workout plans that align with your fitness level, goals, and preferences – perfect for both beginners and seasoned athletes.' },
            { title: 'Progress Tracking', desc: 'Monitor your fitness journey with detailed metrics like calories burned, muscle gain, and more – all conveniently located in one place.' },
            { title: 'Join the Community', desc: 'Engage with a global fitness community. Share tips, motivate each other, and stay on track with group challenges.' },
            { title: 'Elite Trainer Access', desc: 'Gain insights and exclusive workout plans from top-tier trainers who guide you with expert tips and advice.' },
            { title: 'Stay Motivated', desc: 'Daily challenges, reminders, and achievements to help you stay focused and motivated towards your fitness goals.' },
            { title: 'Easy to Use', desc: 'Our intuitive design allows you to effortlessly navigate the app and concentrate solely on your workouts.' }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {item.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {item.desc}
              </p>
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

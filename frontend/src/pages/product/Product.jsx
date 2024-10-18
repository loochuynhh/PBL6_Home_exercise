import React from 'react';
import app_demo from 'assets/other/app_demo.png';
import apk_icon from 'assets/other/apk_download_icon.png';

const Product = () => {
  return (
    <div>
      {/* Header */}
      <div className="w-full">
        <nav className="mx-auto flex w-full items-center justify-between p-5 lg:px-8 max-w-7xl h-16">
          <div className="flex justify-between items-center w-full">
            <a
              className="text-base text-zinc-950 dark:text-white hover:underline flex-shrink-0"
              href="/"
            >
              <span className="sr-only">LH Inc</span>
            </a>
            <button
              className="mr-4 py-2.5 px-5 text-lg font-bold border border-transparent bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              type="button"
            >
              Download APK
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center bg-cover h-full w-full bg-left-bottom">
        <div className="flex justify-between relative h-full pt-10 overflow-hidden w-full max-w-[600px] lg:max-w-7xl">
          <div className="p-10 min-w-[400px] flex flex-col">
            <h1 className="bg-gradient-to-r from-white to-[#999999] text-transparent bg-clip-text font-semibold text-4xl lg:text-8xl">
              LH <br /> WORKOUT <br /> PLANNER
            </h1>
            <p className="bg-gradient-to-r from-[#A8A0A5] to-[#2A2C2E] text-transparent bg-clip-text font-semibold text-3xl lg:text-6xl">
              All-in-one <br /> workout <br className="lg:hidden" /> tracking
            </p>
          </div>
          <img className="absolute left-60 w-64 lg:hidden" src={app_demo} alt="Phone" />
          <img className="hidden lg:block mr-20 h-5/6 min-h-[600px] w-auto" src={app_demo} alt="Phone" />
        </div>
      </div>

      {/* Footer */}
      <footer className="lg:hidden flex flex-col gap-4 items-center my-10">
        <div className="flex gap-4 justify-center">
          <a className="text-base text-zinc-950 dark:text-white hover:underline" href="/terms-of-use">
            Terms
          </a>
          <a className="text-base text-zinc-950 dark:text-white hover:underline" href="/privacy-policy">
            Privacy
          </a>
          <a className="text-base text-zinc-950 dark:text-white hover:underline" href="/help-center">
            Contact
          </a>
        </div>
        <p className="text-sm text-secondary-gray dark:text-zinc-400">© 2024 Jefit Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Product;

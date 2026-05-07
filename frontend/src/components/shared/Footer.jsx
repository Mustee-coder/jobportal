import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">Portal</span>
            </h2>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Find global opportunities, connect with top companies, and build your career faster.
            </p>

            <p className="text-xs text-gray-400 mt-4">
              © {new Date().getFullYear()} JobPortal. All rights reserved.
            </p>
          </div>

          {/* NAV LINKS */}
         

           

          {/* SOCIAL + CONTACT */}
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>

            <p className="text-sm text-gray-600 mb-4">
              Stay updated with new job opportunities.
            </p>

            <div className="flex gap-4">

              {/* Facebook */}
              <a href="#" className="hover:scale-110 transition">
                <svg className="w-5 h-5 text-gray-600 hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z"/>
                </svg>
              </a>

              {/* Twitter */}
              <a href="#" className="hover:scale-110 transition">
                <svg className="w-5 h-5 text-gray-600 hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.835 9.835 0 01-2.828.775..." />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" className="hover:scale-110 transition">
                <svg className="w-5 h-5 text-gray-600 hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452H16.85v-5.569..." />
                </svg>
              </a>

            </div>
          </div>

        </div>

        {/* BOTTOM LINE */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">

          <p>Built for global careers 🌍</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <Link className="hover:text-black" to="/">Privacy Policy</Link>
            <Link className="hover:text-black" to="/">Terms</Link>
            <Link className="hover:text-black" to="/">Contact</Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
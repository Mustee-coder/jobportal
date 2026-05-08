import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">Portal</span>
            </h2>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed max-w-sm">
              Find global opportunities, connect with top companies,
              and build your career faster.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-black transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black transition">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black transition">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black transition">
                  Career Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>

            <p className="text-sm text-gray-600 mb-4">
              Stay updated with new job opportunities.
            </p>

            <div className="flex gap-4">
              <a href="#" className="hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-gray-600 hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z"/>
                </svg>
              </a>

              <a href="#" className="hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-gray-600 hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.835 9.835 0 01-2.828.775..." />
                </svg>
              </a>

              <a href="#" className="hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-gray-600 hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452H16.85v-5.569..." />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/" className="hover:text-black transition">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-black transition">
              Terms
            </Link>
            <Link to="/" className="hover:text-black transition">
              Contact
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
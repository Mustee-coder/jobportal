import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover";

import { Menu, X, User2, LogOut, ChevronDown } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const PremiumNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((store) => store?.auth?.user || null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Logout
  const logoutHandler = async () => {
    try {
      await axios.get("/api/user/logout", {
        withCredentials: true,
      });

      localStorage.clear();
      dispatch(setUser(null));
      setMenuOpen(false);

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const profilePic = user?.profile?.profilePhoto || "https://i.pravatar.cc/100";

  // Animation variants
  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  return (
    <nav className="backdrop-blur-xl bg-gradient-to-r from-slate-950/80 via-slate-900/80 to-slate-950/80 border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">

        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          <span className="text-slate-100">Job</span>
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Portal
          </span>
        </motion.div>

        {/* DESKTOP MENU */}
        <motion.ul
          className="hidden md:flex items-center gap-8 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {user?.role === "recruiter" ? (
            <>
              <motion.li
                variants={navLinkVariants}
                className="group relative"
              >
                <Link
                  to="/admin/companies"
                  className="text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  Companies
                  <span className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>

              <motion.li variants={navLinkVariants} className="group relative">
                <Link
                  to="/admin/jobs"
                  className="text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  Jobs
                  <span className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
            </>
          ) : (
            <>
              <motion.li variants={navLinkVariants} className="group relative">
                <Link
                  to="/"
                  className="text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  Home
                  <span className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>

              <motion.li variants={navLinkVariants} className="group relative">
                <Link
                  to="/jobs"
                  className="text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  Jobs
                  <span className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>

              <motion.li variants={navLinkVariants} className="group relative">
                <Link
                  to="/browse"
                  className="text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  Browse
                  <span className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
            </>
          )}
        </motion.ul>

        {/* DESKTOP AUTH */}
        <motion.div
          className="hidden md:flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {!user ? (
            <>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-slate-300 border border-indigo-500/50 hover:border-indigo-400 hover:text-indigo-400 rounded-lg transition-all"
                >
                  Login
                </motion.button>
              </Link>

              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all"
                >
                  Signup
                </motion.button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <Avatar className="w-10 h-10 border border-indigo-500/30 hover:border-indigo-400 transition-colors">
                    <AvatarImage src={profilePic} />
                    <AvatarFallback className="bg-indigo-500/20 text-indigo-400">
                      {user?.fullname?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              </PopoverTrigger>

              <PopoverContent className="w-72 backdrop-blur-xl bg-slate-900/90 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="border border-indigo-500/30">
                    <AvatarImage src={profilePic} />
                    <AvatarFallback className="bg-indigo-500/20 text-indigo-400">
                      {user?.fullname?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-medium text-slate-100">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-slate-400">
                      {user?.role === "recruiter" ? "Recruiter" : "Job Seeker"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 my-4"></div>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-colors py-2 px-2 rounded hover:bg-white/5"
                  >
                    <User2 className="w-4 h-4" />
                    View Profile
                  </Link>

                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors py-2 px-2 rounded"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </motion.div>

        {/* MOBILE TOGGLE */}
        <motion.button
          className="md:hidden text-slate-300 hover:text-indigo-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* MOBILE MENU */}
      <motion.div
        className="md:hidden absolute top-16 left-0 w-full backdrop-blur-xl bg-slate-900/80 border-b border-white/10 overflow-hidden z-40"
        variants={mobileMenuVariants}
        initial="hidden"
        animate={menuOpen ? "visible" : "hidden"}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col p-4 gap-4 font-medium">

          {/* MOBILE LINKS */}
          {user?.role === "recruiter" ? (
            <>
              <Link
                to="/admin/companies"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 transition-colors py-2 px-3 rounded hover:bg-white/5"
              >
                Companies
              </Link>

              <Link
                to="/admin/jobs"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 transition-colors py-2 px-3 rounded hover:bg-white/5"
              >
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 transition-colors py-2 px-3 rounded hover:bg-white/5"
              >
                Home
              </Link>

              <Link
                to="/jobs"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 transition-colors py-2 px-3 rounded hover:bg-white/5"
              >
                Jobs
              </Link>

              <Link
                to="/browse"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 transition-colors py-2 px-3 rounded hover:bg-white/5"
              >
                Browse
              </Link>
            </>
          )}

          <div className="border-t border-white/10 my-2"></div>

          {/* MOBILE AUTH */}
          {!user ? (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-2 text-slate-300 border border-indigo-500/50 hover:border-indigo-400 hover:text-indigo-400 rounded-lg transition-all"
                >
                  Login
                </motion.button>
              </Link>

              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all"
                >
                  Signup
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">

              <div className="flex items-center gap-3 p-3 border border-white/10 rounded-lg bg-white/5">
                <Avatar className="border border-indigo-500/30">
                  <AvatarImage src={profilePic} />
                  <AvatarFallback className="bg-indigo-500/20 text-indigo-400">
                    {user?.fullname?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h4 className="font-medium text-slate-100">
                    {user?.fullname}
                  </h4>

                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={logoutHandler}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors py-2 px-3 rounded"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default PremiumNavbar;

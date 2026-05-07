import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover";

import { Menu, X, User2, LogOut } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
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

  const profilePic =
    user?.profile?.profilePhoto || "https://i.pravatar.cc/100";

  return (
    <nav className="bg-white border-b relative z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">

        {/* LOGO */}
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          {user?.role === "recruiter" ? (
            <>
              <li><Link to="/admin/companies">Companies</Link></li>
              <li><Link to="/admin/jobs">Jobs</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              <li><Link to="/browse">Browse</Link></li>
            </>
          )}
        </ul>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={profilePic} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={profilePic} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">Profile</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 text-gray-600">
                  <Link to="/profile" className="flex items-center gap-2">
                    <User2 className="w-4 h-4" />
                    Profile
                  </Link>

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white border-b overflow-hidden transition-all duration-300 z-40 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-4 gap-4 font-medium">

          {/* LINKS */}
          {user?.role === "recruiter" ? (
            <>
              <Link to="/admin/companies" onClick={() => setMenuOpen(false)}>
                Companies
              </Link>

              <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                Jobs
              </Link>

              <Link to="/browse" onClick={() => setMenuOpen(false)}>
                Browse
              </Link>
            </>
          )}

          <hr />

          {/* AUTH */}
          {!user ? (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>

              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">

              <div className="flex items-center gap-3 p-2 border rounded">
                <Avatar>
                  <AvatarImage src={profilePic} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <div>
                  <h4 className="font-medium">{user?.fullname}</h4>

                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-gray-500"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
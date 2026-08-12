import {  useEffect, useState  } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import Navbar from '../shared/Navbar';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';

const PremiumLogin = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 min-h-[calc(100vh-80px)]">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-slate-100">Welcome Back</span>
            </h1>
            <p className="text-slate-400 mt-2">Continue your job journey</p>
          </motion.div>

          {/* Login Card - Glassmorphism */}
          <motion.div
            variants={itemVariants}
            className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            {/* Gradient border effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <form onSubmit={submitHandler} className="relative z-10 space-y-6">
              {/* Email Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </motion.div>

              {/* Role Selection */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  I am a
                </label>
                <div className="flex gap-4">
                  {[
                    { value: 'student', label: 'Job Seeker' },
                    { value: 'recruiter', label: 'Recruiter' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={input.role === option.value}
                        onChange={changeEventHandler}
                        className="w-4 h-4 text-indigo-500 bg-white/5 border-white/20 focus:ring-indigo-500 cursor-pointer"
                        required
                      />
                      <span className="ml-2 text-slate-300 group-hover:text-indigo-400 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Login Button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group mt-8"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Loader2 size={18} />
                  </motion.div>
                ) : (
                  <>
                    Login to Account
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-400">
                    New to JobPortal?
                  </span>
                </div>
              </div>

              {/* Signup Link */}
              <motion.button
                variants={itemVariants}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/signup')}
                className="w-full border border-indigo-500/50 hover:border-indigo-400 hover:bg-indigo-500/10 text-indigo-400 hover:text-indigo-300 font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Create Free Account
              </motion.button>
            </form>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            variants={itemVariants}
            className="text-center text-slate-500 text-sm mt-8"
          >
            Secure login • No spam • No BS
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumLogin;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const PremiumHeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchJobHandler();
    }
  };

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

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: { scale: 1.05 },
  };

  return (
    <motion.section
      className='relative px-4 py-16 md:py-24 text-center overflow-hidden'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className='relative z-10 flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto'>

        {/* Badge */}
        <motion.div
          variants={badgeVariants}
          whileHover="hover"
          className='mx-auto'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-indigo-500/30 hover:border-indigo-400/50 transition-colors group'>
            <Sparkles size={16} className='text-indigo-400 group-hover:animate-spin' />
            <span className='text-sm font-semibold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'>
              Smarter Way to Get Hired
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          variants={itemVariants}
          className='space-y-4'
        >
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'>
            <span className='text-slate-100'>Search, Apply &</span>
            <br />
            <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Get Your Dream Jobs
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className='text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed'
        >
          Find the best opportunities and apply to top companies easily with our intelligent job matching platform.
        </motion.p>

        {/* Search Box */}
        <motion.div
          variants={itemVariants}
          className='w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto mt-4'
        >
          <div className='relative group'>
            {/* Gradient background on focus */}
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-300'></div>

            {/* Search box */}
            <div className='relative backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 group-focus-within:border-indigo-500/50 rounded-full p-2 flex items-center gap-3 transition-all duration-300'>

              <Search className='h-5 w-5 text-indigo-400 ml-4 flex-shrink-0' />

              <input
                type="text"
                placeholder='Find your dream jobs...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className='outline-none border-none w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm md:text-base py-3 md:py-4'
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={searchJobHandler}
                className="flex-shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 font-semibold transition-all duration-300 flex items-center gap-2 group/btn mr-1"
              >
                <Search className='h-4 w-4' />
                <span className='hidden sm:inline'>Search</span>
              </motion.button>
            </div>
          </div>

          {/* Search suggestions / Quick categories */}
          <motion.div
            variants={itemVariants}
            className='flex flex-wrap justify-center gap-2 sm:gap-3 mt-6'
          >
            <span className='text-sm text-slate-500'>Try: </span>
            {['Frontend Developer', 'Remote Jobs', 'Internship'].map((tag, idx) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setQuery(tag);
                  dispatch(setSearchedQuery(tag));
                  navigate("/browse");
                }}
                className='text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all'
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats / Features */}
        <motion.div
          variants={itemVariants}
          className='grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto'
        >
          {[
            { label: 'Active Jobs', value: '10K+' },
            { label: 'Companies', value: '500+' },
            { label: 'Successful Hires', value: '50K+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className='p-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg hover:border-indigo-500/30 transition-all'
            >
              <p className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'>
                {stat.value}
              </p>
              <p className='text-xs sm:text-sm text-slate-400 mt-1'>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default PremiumHeroSection;

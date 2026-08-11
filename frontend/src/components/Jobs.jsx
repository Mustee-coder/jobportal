import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { Search, Briefcase, Loader } from 'lucide-react'

const PremiumJobs = () => {
    const { allJobs = [], searchedQuery, loading } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) =>
                job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job?.location?.toLowerCase().includes(searchedQuery.toLowerCase())
            )
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

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

    // Loading skeleton
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
                <Navbar />
                <div className='max-w-7xl mx-auto mt-5 px-4'>
                    <div className='flex items-center justify-center h-[60vh]'>
                        <div className='flex flex-col items-center gap-4'>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Briefcase size={48} className="text-indigo-400" />
                            </motion.div>
                            <p className="text-slate-300">Loading jobs...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
            <Navbar />

            <motion.div
                className='max-w-7xl mx-auto mt-8 px-4 pb-12'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Header */}
                <motion.div
                    variants={itemVariants}
                    className='mb-8'
                >
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                            <Briefcase size={24} className='text-indigo-400' />
                        </div>
                        <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'>
                            Browse Jobs
                        </h1>
                    </div>
                    <p className='text-slate-400 ml-13'>
                        {filterJobs.length > 0 
                            ? `Found ${filterJobs.length} job${filterJobs.length !== 1 ? 's' : ''}` 
                            : 'Search for your next opportunity'}
                    </p>
                </motion.div>

                {/* Layout */}
                <div className='flex flex-col lg:flex-row gap-6'>

                    {/* FILTER SIDEBAR */}
                    <motion.div
                        variants={itemVariants}
                        className='w-full lg:w-1/4'
                    >
                        <FilterCard />
                    </motion.div>

                    {/* JOB LIST */}
                    <motion.div
                        variants={itemVariants}
                        className='flex-1'
                    >

                        {
                            filterJobs.length <= 0 ? (
                                // Empty State
                                <motion.div
                                    variants={itemVariants}
                                    className='backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center min-h-[400px]'
                                >
                                    <div className='w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4'>
                                        <Search size={32} className='text-indigo-400' />
                                    </div>

                                    <h2 className='text-2xl font-bold text-slate-100 mb-2 text-center'>
                                        {searchedQuery ? 'No jobs found' : 'No jobs available'}
                                    </h2>

                                    <p className='text-slate-400 text-center max-w-md'>
                                        {searchedQuery 
                                            ? `We couldn't find any jobs matching "${searchedQuery}". Try adjusting your filters or search terms.`
                                            : 'Check back soon for new job opportunities.'}
                                    </p>

                                    {searchedQuery && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => window.location.reload()}
                                            className="mt-6 px-6 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 transition-colors font-semibold"
                                        >
                                            Reset Search
                                        </motion.button>
                                    )}
                                </motion.div>
                            ) : (
                                // Job Grid
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5'
                                >
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                key={job?._id}
                                                variants={itemVariants}
                                                whileHover={{ y: -4 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </motion.div>
                            )
                        }

                    </motion.div>

                </div>

            </motion.div>
        </div>
    )
}

export default PremiumJobs

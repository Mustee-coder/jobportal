import React from 'react'
import { motion } from 'framer-motion'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { Sparkles } from 'lucide-react'

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

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
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const headingVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <motion.section
            className='max-w-7xl mx-auto my-12 md:my-20 px-4'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            {/* Section Header */}
            <motion.div
                variants={headingVariants}
                className='mb-10'
            >
                <div className='flex items-center gap-2 mb-3'>
                    <Sparkles size={20} className='text-indigo-400' />
                    <span className='text-sm font-semibold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'>
                        DISCOVER OPPORTUNITIES
                    </span>
                </div>

                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>
                    <span className='bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'>
                        Latest & Top
                    </span>
                    <span className='text-slate-100'> Job Openings</span>
                </h1>

                <p className='text-slate-400 mt-3 max-w-2xl'>
                    Explore the most recent and top-rated job opportunities from leading companies
                </p>
            </motion.div>

            {/* Grid */}
            <motion.div
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {
                    allJobs?.length <= 0 ? (
                        <motion.div
                            variants={itemVariants}
                            className='col-span-full'
                        >
                            <div className='backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl py-16 text-center'>
                                <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 mb-4'>
                                    <Sparkles className='text-indigo-400' size={24} />
                                </div>
                                <p className='text-slate-400 text-lg font-medium'>
                                    No Jobs Available Right Now
                                </p>
                                <p className='text-slate-500 text-sm mt-2'>
                                    Check back soon for new opportunities
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        allJobs?.slice(0, 6).map((job, index) => (
                            <motion.div
                                key={job._id}
                                variants={itemVariants}
                            >
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))
                    )
                }
            </motion.div>

            {/* View All Button */}
            {allJobs?.length > 6 && (
                <motion.div
                    variants={itemVariants}
                    className='flex justify-center mt-10 md:mt-14'
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300'
                    >
                        View All Opportunities
                    </motion.button>
                </motion.div>
            )}
        </motion.section>
    )
}

export default LatestJobs

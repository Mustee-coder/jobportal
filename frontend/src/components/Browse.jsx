import {  useEffect  } from 'react'
import { motion } from 'framer-motion'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import JobSkeleton from './JobSkeleton'
import { Search } from 'lucide-react'

const Browse = () => {
    useGetAllJobs();

    const { allJobs = [], loading } = useSelector(store => store.job) || {};
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    }, [dispatch])

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

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
            <Navbar />

            <motion.div
                className='max-w-7xl mx-auto my-6 md:my-10 px-4'
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >

                {/* Header */}
                <motion.div
                    variants={headerVariants}
                    className='mb-10'
                >
                    <div className='flex items-center gap-3 mb-3'>
                        <Search size={24} className='text-indigo-400' />
                        <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl'>
                            <span className='text-slate-100'>Browse</span>
                            <span className='bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'> Opportunities</span>
                        </h1>
                    </div>
                    <p className='text-slate-400 mt-2'>
                        Showing <span className='font-semibold text-indigo-400'>{allJobs?.length || 0}</span> job{allJobs?.length !== 1 ? 's' : ''} available
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    >
                        {Array.from({ length: 6 }).map((_, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                            >
                                <JobSkeleton />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && allJobs?.length === 0 && (
                    <motion.div
                        variants={itemVariants}
                        className='text-center py-16'
                    >
                        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 mb-4'>
                            <Search className='text-indigo-400' size={32} />
                        </div>
                        <h3 className='text-xl font-semibold text-slate-100 mb-2'>
                            No Jobs Found
                        </h3>
                        <p className='text-slate-400 max-w-md mx-auto'>
                            We couldn&apos;t find any jobs matching your search.
                        </p>
                    </motion.div>
                )}

                {/* Jobs Grid */}
                {!loading && allJobs?.length > 0 && (
                    <motion.div
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {allJobs.map((job) => (
                            <motion.div
                                key={job._id}
                                variants={itemVariants}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* No results info */}
                {!loading && allJobs?.length > 0 && (
                    <motion.div
                        variants={itemVariants}
                        className='mt-12 text-center'
                    >
                        <p className='text-slate-400'>
                            Showing all {allJobs.length} job{allJobs.length !== 1 ? 's' : ''}
                        </p>
                    </motion.div>
                )}

            </motion.div>
        </div>
    )
}

export default Browse

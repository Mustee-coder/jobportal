import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { Users, Loader } from 'lucide-react'

const PremiumApplicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
                    { withCredentials: true }
                );

                dispatch(setAllApplicants(res.data.job));

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchAllApplicants();

    }, [params.id, dispatch]);

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

    const loadingVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">

            <Navbar />

            <motion.div
                className='max-w-7xl mx-auto px-4 py-8 md:py-12'
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
                        <div className='w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                            <Users size={20} className='text-indigo-400' />
                        </div>
                        <h1 className='text-3xl md:text-4xl font-bold text-slate-100'>
                            Job Applicants
                        </h1>
                    </div>
                    <p className='text-slate-400 mt-2'>
                        Total: <span className='font-semibold text-indigo-400'>{applicants?.applications?.length || 0}</span> applicant{applicants?.applications?.length !== 1 ? 's' : ''}
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <motion.div
                        variants={itemVariants}
                        className='flex flex-col items-center justify-center py-16 gap-4'
                    >
                        <motion.div
                            variants={loadingVariants}
                            animate="animate"
                        >
                            <div className='w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center'>
                                <Loader size={28} className='text-indigo-400' />
                            </div>
                        </motion.div>
                        <div className='text-center'>
                            <p className='text-slate-300 font-medium'>
                                Loading applicants...
                            </p>
                            <p className='text-slate-500 text-sm mt-1'>
                                Please wait while we fetch the data
                            </p>
                        </div>
                    </motion.div>
                ) : applicants?.applications?.length === 0 ? (
                    <motion.div
                        variants={itemVariants}
                        className='backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-12 text-center'
                    >
                        <div className='flex flex-col items-center gap-3'>
                            <div className='w-16 h-16 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                                <Users className='text-indigo-400' size={32} />
                            </div>
                            <div>
                                <p className='text-slate-300 font-medium text-lg'>
                                    No Applicants Yet
                                </p>
                                <p className='text-slate-500 text-sm mt-2'>
                                    Applicants will appear here once people apply for this position
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={itemVariants}
                        className='backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl overflow-hidden'
                    >
                        <ApplicantsTable />
                    </motion.div>
                )}

            </motion.div>
        </div>
    )
}

export default PremiumApplicants

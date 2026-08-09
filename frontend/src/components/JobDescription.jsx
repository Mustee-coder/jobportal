import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { MapPin, Briefcase, DollarSign, Calendar, Users, CheckCircle, ArrowLeft, Share2 } from 'lucide-react'
import Navbar from './shared/Navbar'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const jobId = params.id

    const isInitiallyApplied =
        singleJob?.applications?.some(
            app => app.applicant === user?._id
        ) || false

    const [isApplied, setIsApplied] = useState(isInitiallyApplied)
    const [loading, setLoading] = useState(false)

    const applyJobHandler = async () => {
        try {
            setLoading(true)
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { withCredentials: true }
            )

            if (res.data.success) {
                setIsApplied(true)

                const updated = {
                    ...singleJob,
                    applications: [
                        ...singleJob.applications,
                        { applicant: user?._id }
                    ]
                }

                dispatch(setSingleJob(updated))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error applying for job")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                )

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))

                    setIsApplied(
                        res.data.job.applications.some(
                            app => app.applicant === user?._id
                        )
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

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

            <motion.div
                className="max-w-5xl mx-auto px-4 py-8 md:py-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Back Button */}
                <motion.button
                    variants={itemVariants}
                    whileHover={{ x: -4 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </motion.button>

                {/* HEADER */}
                <motion.div
                    variants={itemVariants}
                    className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-6"
                >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                                {singleJob?.title}
                            </h1>

                            <p className="text-lg text-slate-300 mb-6">
                                {singleJob?.company?.name}
                            </p>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-semibold text-sm"
                                >
                                    {singleJob?.position} Position{singleJob?.position > 1 ? 's' : ''}
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-semibold text-sm"
                                >
                                    {singleJob?.jobType}
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 font-semibold text-sm"
                                >
                                    ${singleJob?.salary}
                                </motion.div>
                            </div>
                        </div>

                        {/* Apply Button - Desktop */}
                        <motion.div
                            variants={itemVariants}
                            className="hidden md:flex flex-col gap-3"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={isApplied ? undefined : applyJobHandler}
                                disabled={isApplied || loading}
                                className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                                    isApplied
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/30 cursor-default'
                                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                                }`}
                            >
                                {isApplied ? (
                                    <>
                                        <CheckCircle size={18} />
                                        Applied
                                    </>
                                ) : (
                                    <>
                                        {loading ? 'Applying...' : 'Apply Now'}
                                    </>
                                )}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-lg font-semibold border border-white/20 text-slate-300 hover:border-indigo-500/50 hover:text-indigo-400 transition-all flex items-center justify-center gap-2"
                            >
                                <Share2 size={18} />
                                Share
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* JOB DETAILS */}
                <motion.div
                    variants={itemVariants}
                    className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-6"
                >
                    <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                            <Briefcase size={18} className="text-indigo-400" />
                        </div>
                        Job Details
                    </h2>

                    <div className="space-y-6">

                        {/* Location */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-b-0"
                        >
                            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <MapPin size={20} className="text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-400 mb-1">Location</p>
                                <p className="text-lg text-slate-100 font-medium">
                                    {singleJob?.location}
                                </p>
                            </div>
                        </motion.div>

                        {/* Job Type */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-b-0"
                        >
                            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                <Briefcase size={20} className="text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-400 mb-1">Job Type</p>
                                <p className="text-lg text-slate-100 font-medium">
                                    {singleJob?.jobType}
                                </p>
                            </div>
                        </motion.div>

                        {/* Salary */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-b-0"
                        >
                            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                <DollarSign size={20} className="text-green-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-400 mb-1">Salary</p>
                                <p className="text-lg text-slate-100 font-medium">
                                    ${singleJob?.salary}
                                </p>
                            </div>
                        </motion.div>

                        {/* Experience */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-b-0"
                        >
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                <Briefcase size={20} className="text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-400 mb-1">Required Experience</p>
                                <p className="text-lg text-slate-100 font-medium">
                                    {singleJob?.experience} years
                                </p>
                            </div>
                        </motion.div>

                        {/* Posted Date */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-b-0"
                        >
                            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                                <Calendar size={20} className="text-orange-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-400 mb-1">Posted Date</p>
                                <p className="text-lg text-slate-100 font-medium">
                                    {singleJob?.createdAt?.split("T")[0]}
                                </p>
                            </div>
                        </motion.div>

                        {/* Applicants */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-b-0"
                        >
                            <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                                <Users size={20} className="text-pink-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-400 mb-1">Total Applicants</p>
                                <p className="text-lg text-slate-100 font-medium">
                                    {singleJob?.applications?.length || 0}
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>

                {/* DESCRIPTION */}
                {singleJob?.description && (
                    <motion.div
                        variants={itemVariants}
                        className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-6"
                    >
                        <h2 className="text-2xl font-bold text-slate-100 mb-4">
                            About This Role
                        </h2>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {singleJob.description}
                        </p>
                    </motion.div>
                )}

                {/* Mobile Apply Button */}
                <motion.div
                    variants={itemVariants}
                    className="md:hidden fixed bottom-0 left-0 w-full bg-slate-950 border-t border-white/10 p-4 z-50 backdrop-blur-xl"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={isApplied ? undefined : applyJobHandler}
                        disabled={isApplied || loading}
                        className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                            isApplied
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30 cursor-default'
                                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                        }`}
                    >
                        {isApplied ? (
                            <>
                                <CheckCircle size={18} />
                                Already Applied
                            </>
                        ) : (
                            <>
                                {loading ? 'Applying...' : 'Apply Now'}
                            </>
                        )}
                    </motion.button>
                </motion.div>

                {/* Mobile bottom spacing */}
                <div className="md:hidden h-20" />

            </motion.div>
        </div>
    )
}

export default JobDescription

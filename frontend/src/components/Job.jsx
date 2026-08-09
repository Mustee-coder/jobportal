import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, Briefcase, DollarSign, Bookmark, Heart, ArrowRight } from 'lucide-react'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
        hover: {
            y: -8,
            transition: { duration: 0.3 },
        },
    };

    const handleJobClick = () => {
        navigate(`/description/${job?._id}`);
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group relative h-full"
        >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

            {/* Card */}
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 rounded-2xl p-6 h-full transition-all duration-300 group-hover:bg-white/10 flex flex-col cursor-pointer">

                {/* Header with save button */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors mb-1 truncate">
                            {job?.title}
                        </h3>
                        <p className="text-sm text-slate-400 truncate">
                            {job?.company?.name}
                        </p>
                    </div>

                    {/* Save button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsSaved(!isSaved)}
                        className={`p-2 rounded-lg transition-all flex-shrink-0 ml-2 ${
                            isSaved
                                ? 'bg-indigo-500/30 text-indigo-400'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-indigo-400'
                        }`}
                    >
                        <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
                    </motion.button>
                </div>

                {/* Job Details Grid */}
                <div className="space-y-2 mb-6">
                    {/* Location */}
                    {job?.location && (
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <MapPin size={16} className="text-indigo-400 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                        </div>
                    )}

                    {/* Job Type */}
                    {job?.jobType && (
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Briefcase size={16} className="text-indigo-400 flex-shrink-0" />
                            <span>{job.jobType}</span>
                        </div>
                    )}

                    {/* Salary */}
                    {job?.salary && (
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <DollarSign size={16} className="text-indigo-400 flex-shrink-0" />
                            <span>{job.salary}</span>
                        </div>
                    )}
                </div>

                {/* Description */}
                {job?.description && (
                    <p className="text-sm text-slate-400 mb-6 line-clamp-2 flex-1">
                        {job.description}
                    </p>
                )}

                {/* Skills tags */}
                {job?.requirements && job.requirements.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {job.requirements.slice(0, 3).map((req, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
                            >
                                {req}
                            </motion.span>
                        ))}
                        {job.requirements.length > 3 && (
                            <span className="text-xs px-2 py-1 text-slate-400">
                                +{job.requirements.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-white/10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                            isLiked
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-red-400'
                        }`}
                        title="Like job"
                    >
                        <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleJobClick}
                        className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all flex items-center justify-center gap-2 group/btn"
                    >
                        View
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default Job

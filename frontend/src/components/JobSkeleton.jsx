import { motion } from 'framer-motion'

const PremiumJobSkeleton = () => {
    const shimmerVariants = {
        animate: {
            backgroundPosition: ['200% 0', '-200% 0'],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group h-full"
        >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

            {/* Card */}
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 group-hover:bg-white/10">

                {/* Company & Icon */}
                <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2 flex-1">
                        <motion.div
                            variants={shimmerVariants}
                            animate="animate"
                            className="h-5 w-32 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg"
                            style={{
                                backgroundSize: '200% 100%',
                            }}
                        ></motion.div>
                        <motion.div
                            variants={shimmerVariants}
                            animate="animate"
                            className="h-4 w-20 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded"
                            style={{
                                backgroundSize: '200% 100%',
                            }}
                        ></motion.div>
                    </div>

                    {/* Save Icon placeholder */}
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-8 w-8 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg flex-shrink-0"
                        style={{
                            backgroundSize: '200% 100%',
                        }}
                    ></motion.div>
                </div>

                {/* Details Grid */}
                <div className="space-y-3 mb-6">
                    {/* Location */}
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-4 w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg"
                        style={{
                            backgroundSize: '200% 100%',
                        }}
                    ></motion.div>

                    {/* Job Type */}
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-4 w-3/4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg"
                        style={{
                            backgroundSize: '200% 100%',
                        }}
                    ></motion.div>

                    {/* Salary */}
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-4 w-1/2 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg"
                        style={{
                            backgroundSize: '200% 100%',
                        }}
                    ></motion.div>
                </div>

                {/* Description Lines */}
                <div className="space-y-2 mb-6">
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-3 w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded"
                        style={{
                            backgroundSize: '200% 100%',
                        }}
                    ></motion.div>
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-3 w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded"
                        style={{
                            backgroundSize: '200% 100%',
                        }}
                    ></motion.div>
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-3 w-2/3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded"
                        style={{
                            backgroundSize: '200% 100%',
                        }}
                    ></motion.div>
                </div>

                {/* Tags/Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            variants={shimmerVariants}
                            animate="animate"
                            className="h-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full px-3"
                            style={{
                                backgroundSize: '200% 100%',
                                width: `${60 + i * 20}px`,
                            }}
                        ></motion.div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-white/10">
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-9 w-10 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg"
                        style={{
                            backgroundSize: '200% 100%',
                        }}
                    ></motion.div>
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-9 flex-1 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg"
                        style={{
                            backgroundSize: '200% 100%',
                        }}
                    ></motion.div>
                </div>

            </div>
        </motion.div>
    )
}

export default PremiumJobSkeleton

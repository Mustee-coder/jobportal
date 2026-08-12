import { motion } from 'framer-motion';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import {Sparkles } from 'lucide-react';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "UI/UX Designer",
    "Data Scientist",
    "DevOps Engineer",
    "Product Manager",
    "QA Engineer",
    "Cloud Architect"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="px-3 sm:px-4 py-8 md:py-12"
        >
            {/* Section Header */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-6xl mx-auto mb-8 md:mb-10"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={20} className="text-indigo-400" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        BROWSE BY CATEGORY
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
                    Explore Jobs by <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Role</span>
                </h2>
            </motion.div>

            {/* Carousel Container */}
            <motion.div
                className="max-w-7xl mx-auto relative group"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <Carousel className="w-full">
                    <CarouselContent className="gap-4">
                        {category.map((cat, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
                            >
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full"
                                >
                                    <button
                                        onClick={() => searchJobHandler(cat)}
                                        aria-label={`Search jobs for ${cat}`}
                                        className="relative group/card w-full overflow-hidden"
                                    >
                                        {/* Gradient background on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover/card:opacity-100 blur-xl transition-opacity duration-300"></div>

                                        {/* Card */}
                                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-indigo-500/50 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 transition-all duration-300 group-hover/card:bg-white/15">
                                            <div className="flex flex-col items-center gap-2">
                                                {/* Icon placeholder - you can add specific icons per category */}
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-indigo-400 group-hover/card:from-indigo-500/50 group-hover/card:to-purple-500/50 transition-all">
                                                    <Sparkles size={18} />
                                                </div>

                                                {/* Category name */}
                                                <span className="text-xs sm:text-sm font-semibold text-slate-100 text-center leading-snug">
                                                    {cat}
                                                </span>

                                                {/* Job count or badge */}
                                                <span className="text-xs text-slate-400 mt-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                                    Browse →
                                                </span>
                                            </div>

                                            {/* Animated border on hover */}
                                            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover/card:border-indigo-500/30 transition-colors duration-300 pointer-events-none"></div>
                                        </div>
                                    </button>
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Custom Navigation Buttons - Hidden on mobile */}
                    <div className="hidden md:block">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute -left-16 top-1/2 -translate-y-1/2 z-10"
                        >
                            <CarouselPrevious className="border-white/20 text-slate-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:text-indigo-400 transition-all" />
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute -right-16 top-1/2 -translate-y-1/2 z-10"
                        >
                            <CarouselNext className="border-white/20 text-slate-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:text-indigo-400 transition-all" />
                        </motion.div>
                    </div>

                    {/* Mobile arrows - Slide under carousel */}
                    <div className="md:hidden flex justify-center gap-4 mt-6">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CarouselPrevious className="relative left-0 top-0 border-white/20 text-slate-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:text-indigo-400 transition-all" />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CarouselNext className="relative left-0 top-0 border-white/20 text-slate-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:text-indigo-400 transition-all" />
                        </motion.div>
                    </div>
                </Carousel>
            </motion.div>

            {/* Bottom text */}
            <motion.p
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center text-slate-400 text-sm mt-8"
            >
                Click on any category to explore jobs in that field
            </motion.p>
        </motion.section>
    );
};

export default CategoryCarousel;

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Briefcase, DollarSign, X } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        icon: MapPin,
        array: [
            "Remote (Global)",
            "United States",
            "United Kingdom",
            "Canada",
            "Germany",
            "UAE",
            "India",
            "Nigeria",
            "Australia"
        ]
    },
    {
        filterType: "Industry",
        icon: Briefcase,
        array: [
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "Mobile Developer",
            "UI/UX Designer",
            "DevOps Engineer",
            "Software Engineer"
        ]
    },
    {
        filterType: "Salary (Yearly)",
        icon: DollarSign,
        array: [
            "$10k - $30k",
            "$30k - $60k",
            "$60k - $100k",
            "$100k - $150k",
            "$150k+"
        ]
    }
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const clearFilter = () => {
        setSelectedValue('');
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    const sectionVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    return (
        <motion.div
            className='w-full backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 p-6 rounded-2xl sticky top-20'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div
                variants={itemVariants}
                className='flex items-center justify-between mb-6'
            >
                <h1 className='font-bold text-xl text-slate-100 flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                        <Briefcase size={18} className='text-indigo-400' />
                    </div>
                    Filter Jobs
                </h1>
                {selectedValue && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearFilter}
                        className='p-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors'
                        title="Clear filter"
                    >
                        <X size={16} />
                    </motion.button>
                )}
            </motion.div>

            <motion.div
                variants={itemVariants}
                className='border-b border-white/10 mb-6'
            />

            {/* Active Filter Display */}
            {selectedValue && (
                <motion.div
                    variants={itemVariants}
                    className='mb-6 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30'
                >
                    <p className='text-xs text-slate-400 mb-1'>Active Filter:</p>
                    <p className='text-sm font-semibold text-indigo-300 truncate'>
                        {selectedValue}
                    </p>
                </motion.div>
            )}

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => {
                        const IconComponent = data.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={sectionVariants}
                                className='mb-6 last:mb-0'
                            >
                                {/* Filter Category Header */}
                                <motion.div
                                    variants={itemVariants}
                                    className='flex items-center gap-3 mb-4 pb-3 border-b border-white/10'
                                >
                                    <div className='w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                                        <IconComponent size={16} className='text-indigo-400' />
                                    </div>
                                    <h2 className='font-semibold text-slate-100'>
                                        {data.filterType}
                                    </h2>
                                </motion.div>

                                {/* Filter Options */}
                                <motion.div
                                    className='space-y-3'
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {
                                        data.array.map((item, idx) => {
                                            const itemId = `id${index}-${idx}`
                                            const isSelected = selectedValue === item;
                                            return (
                                                <motion.div
                                                    key={itemId}
                                                    variants={itemVariants}
                                                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all cursor-pointer group ${
                                                        isSelected
                                                            ? 'bg-indigo-500/20 border border-indigo-500/30'
                                                            : 'bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/10'
                                                    }`}
                                                >
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                        isSelected
                                                            ? 'border-indigo-400 bg-indigo-500/20'
                                                            : 'border-white/20 group-hover:border-indigo-400'
                                                    }`}>
                                                        <RadioGroupItem value={item} id={itemId} className='opacity-0' />
                                                        {isSelected && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className='w-2 h-2 rounded-full bg-indigo-400'
                                                            />
                                                        )}
                                                    </div>
                                                    <Label
                                                        htmlFor={itemId}
                                                        className={`cursor-pointer flex-1 text-sm transition-colors ${
                                                            isSelected
                                                                ? 'text-indigo-300 font-medium'
                                                                : 'text-slate-300 group-hover:text-slate-100'
                                                        }`}
                                                    >
                                                        {item}
                                                    </Label>
                                                </motion.div>
                                            )
                                        })
                                    }
                                </motion.div>
                            </motion.div>
                        )
                    })
                }
            </RadioGroup>

            {/* Footer */}
            <motion.div
                variants={itemVariants}
                className='mt-6 pt-6 border-t border-white/10 text-center'
            >
                <p className='text-xs text-slate-500'>
                    Select a filter to refine your search
                </p>
            </motion.div>
        </motion.div>
    )
}

export default FilterCard

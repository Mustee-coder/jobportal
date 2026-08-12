import {  useEffect, useState  } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Search, Plus, Building2 } from 'lucide-react'

const PremiumCompanies = () => {
    useGetAllCompanies();

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Debounce for better performance
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearchCompanyByText(input))
        }, 300)

        return () => clearTimeout(timer)
    }, [input, dispatch])

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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
            <Navbar />

            <motion.div
                className='max-w-6xl mx-auto px-4 py-8 md:py-12'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Header Section */}
                <motion.div
                    variants={itemVariants}
                    className='mb-8'
                >
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                            <Building2 size={20} className='text-indigo-400' />
                        </div>
                        <h1 className='text-3xl md:text-4xl font-bold text-slate-100'>
                            Companies
                        </h1>
                    </div>
                    <p className='text-slate-400 mt-2'>
                        Manage and register your companies
                    </p>
                </motion.div>

                {/* Header Controls */}
                <motion.div
                    variants={itemVariants}
                    className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'
                >

                    {/* Search Input */}
                    <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className='relative flex-1 sm:max-w-md'
                    >
                        <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                            <Search size={18} className='text-slate-500' />
                        </div>

                        <Input
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 hover:border-indigo-500/30 focus:border-indigo-500/50 text-slate-100 placeholder:text-slate-500 rounded-lg transition-all"
                            placeholder="Filter by company name..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </motion.div>

                    {/* Create Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/admin/companies/create")}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all"
                    >
                        <Plus size={18} />
                        <span>New Company</span>
                    </motion.button>

                </motion.div>

                {/* Table Wrapper */}
                <motion.div
                    variants={itemVariants}
                    className="w-full overflow-x-auto backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl"
                >

                    <CompaniesTable />

                </motion.div>

            </motion.div>
        </div>
    )
}

export default PremiumCompanies

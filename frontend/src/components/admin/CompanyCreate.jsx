import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, Loader2, ArrowLeft } from 'lucide-react'

const PremiumCompanyCreate = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [companyName, setCompanyName] = useState("")
    const [loading, setLoading] = useState(false)

    const registerNewCompany = async () => {

        if (!companyName.trim()) {
            toast.error("Company name is required")
            return
        }

        try {
            setLoading(true)

            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)

                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")

        } finally {
            setLoading(false)
        }
    }

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

    const inputVariants = {
        focus: { scale: 1.02 },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">

            <Navbar />

            <motion.div
                className='max-w-2xl mx-auto px-4 py-8 md:py-12'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Back Button */}
                <motion.button
                    variants={itemVariants}
                    whileHover={{ x: -4 }}
                    onClick={() => navigate("/admin/companies")}
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Companies</span>
                </motion.button>

                {/* Form Card */}
                <motion.div
                    variants={itemVariants}
                    className='backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-8 md:p-10'
                >

                    {/* Header */}
                    <motion.div
                        variants={itemVariants}
                        className='mb-8'
                    >
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                                <Building2 size={24} className='text-indigo-400' />
                            </div>
                            <h1 className='font-bold text-3xl md:text-4xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'>
                                Create Company
                            </h1>
                        </div>

                        <p className='text-slate-400 mt-3 leading-relaxed max-w-xl'>
                            Give your company a name to get started. You can customize all the details later including description, logo, and website information.
                        </p>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        variants={itemVariants}
                        className='border-t border-white/10 mb-8'
                    />

                    {/* Form Input */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-3 mb-8"
                    >

                        <Label className="text-slate-100 font-semibold flex items-center gap-2">
                            <div className="w-5 h-5 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                <Building2 size={14} className="text-indigo-400" />
                            </div>
                            Company Name *
                        </Label>

                        <motion.div
                            variants={inputVariants}
                            whileFocus="focus"
                        >
                            <Input
                                type="text"
                                value={companyName}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 hover:border-indigo-500/30 focus:border-indigo-500/50 text-slate-100 placeholder:text-slate-500 rounded-lg transition-all"
                                placeholder="e.g., Acme Corporation, TechStart Inc."
                                onChange={(e) => setCompanyName(e.target.value)}
                                disabled={loading}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !loading) {
                                        registerNewCompany()
                                    }
                                }}
                            />
                        </motion.div>

                        <p className='text-xs text-slate-500 mt-2'>
                            This is the official name of your company. Make sure it's accurate.
                        </p>

                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        variants={itemVariants}
                        className='border-t border-white/10 mb-8'
                    />

                    {/* Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className='flex flex-col sm:flex-row gap-3 sm:items-center justify-end'
                    >

                        {/* Cancel Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/admin/companies")}
                            disabled={loading}
                            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/20 text-slate-300 hover:border-indigo-500/50 hover:text-slate-100 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </motion.button>

                        {/* Continue Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={registerNewCompany}
                            disabled={loading || !companyName.trim()}
                            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <>
                                    <span>Continue</span>
                                </>
                            )}
                        </motion.button>

                    </motion.div>

                </motion.div>

                {/* Info Card */}
                <motion.div
                    variants={itemVariants}
                    className='mt-8 backdrop-blur-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-6'
                >
                    <h3 className='text-slate-100 font-semibold mb-2'>
                        What happens next?
                    </h3>
                    <ul className='text-slate-300 text-sm space-y-2'>
                        <li className='flex items-start gap-2'>
                            <span className='text-indigo-400 font-bold mt-0.5'>•</span>
                            <span>Your company will be created immediately</span>
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-indigo-400 font-bold mt-0.5'>•</span>
                            <span>You'll be able to edit company details and upload a logo</span>
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-indigo-400 font-bold mt-0.5'>•</span>
                            <span>Start posting jobs once your company is verified</span>
                        </li>
                    </ul>
                </motion.div>

            </motion.div>
        </div>
    )
}

export default PremiumCompanyCreate

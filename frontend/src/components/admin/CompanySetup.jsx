import {  useEffect, useState  } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2, Building2, FileText, Globe, MapPin, Upload } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const PremiumCompanySetup = () => {

    const params = useParams()
    useGetCompanyById(params.id)

    const { singleCompany } = useSelector(store => store.company)

    const [loading, setLoading] = useState(false)
    const [filePreview, setFilePreview] = useState(null)

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })

    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setInput({ ...input, file })
            setFilePreview(file.name)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("name", input.name)
            formData.append("description", input.description)
            formData.append("website", input.website)
            formData.append("location", input.location)

            if (input.file) {
                formData.append("file", input.file)
            }

            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")

        } finally {
            setLoading(false)
        }
    }

    // Safe data sync
    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null
            })
        }
    }, [singleCompany])

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

    const fieldVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4 },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">

            <Navbar />

            <motion.div
                className='max-w-3xl mx-auto px-4 py-8 md:py-12'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Back Button & Header */}
                <motion.div
                    variants={itemVariants}
                    className='mb-8'
                >
                    <motion.button
                        whileHover={{ x: -4 }}
                        onClick={() => navigate("/admin/companies")}
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-6"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Companies</span>
                    </motion.button>

                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                            <Building2 size={24} className='text-indigo-400' />
                        </div>
                        <h1 className='font-bold text-3xl md:text-4xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'>
                            Company Setup
                        </h1>
                    </div>
                    <p className='text-slate-400 mt-3'>
                        Update your company details and branding
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    variants={itemVariants}
                    className='backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-8 md:p-10'
                >

                    <form onSubmit={submitHandler} className="space-y-6">

                        {/* Company Name & Description Row */}
                        <motion.div
                            variants={containerVariants}
                            className='grid grid-cols-1 md:grid-cols-2 gap-6'
                        >

                            {/* Company Name */}
                            <motion.div variants={fieldVariants} className='space-y-2'>
                                <Label className='text-slate-100 font-semibold flex items-center gap-2'>
                                    <div className='w-5 h-5 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                                        <Building2 size={14} className='text-indigo-400' />
                                    </div>
                                    Company Name
                                </Label>
                                <Input
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    placeholder="e.g., Acme Corporation"
                                    className="bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg"
                                />
                            </motion.div>

                            {/* Description */}
                            <motion.div variants={fieldVariants} className='space-y-2'>
                                <Label className='text-slate-100 font-semibold flex items-center gap-2'>
                                    <div className='w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center'>
                                        <FileText size={14} className='text-purple-400' />
                                    </div>
                                    Description
                                </Label>
                                <Input
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="What does your company do?"
                                    className="bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg"
                                />
                            </motion.div>

                        </motion.div>

                        {/* Website & Location Row */}
                        <motion.div
                            variants={containerVariants}
                            className='grid grid-cols-1 md:grid-cols-2 gap-6'
                        >

                            {/* Website */}
                            <motion.div variants={fieldVariants} className='space-y-2'>
                                <Label className='text-slate-100 font-semibold flex items-center gap-2'>
                                    <div className='w-5 h-5 rounded-lg bg-blue-500/20 flex items-center justify-center'>
                                        <Globe size={14} className='text-blue-400' />
                                    </div>
                                    Website
                                </Label>
                                <Input
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    placeholder="https://example.com"
                                    className="bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg"
                                />
                            </motion.div>

                            {/* Location */}
                            <motion.div variants={fieldVariants} className='space-y-2'>
                                <Label className='text-slate-100 font-semibold flex items-center gap-2'>
                                    <div className='w-5 h-5 rounded-lg bg-green-500/20 flex items-center justify-center'>
                                        <MapPin size={14} className='text-green-400' />
                                    </div>
                                    Location
                                </Label>
                                <Input
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="e.g., San Francisco, CA"
                                    className="bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg"
                                />
                            </motion.div>

                        </motion.div>

                        {/* Logo Upload */}
                        <motion.div variants={fieldVariants} className='space-y-2'>
                            <Label className='text-slate-100 font-semibold flex items-center gap-2'>
                                <div className='w-5 h-5 rounded-lg bg-orange-500/20 flex items-center justify-center'>
                                    <Upload size={14} className='text-orange-400' />
                                </div>
                                Company Logo
                            </Label>

                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="sr-only"
                                    id="logo-upload"
                                    disabled={loading}
                                />
                                <label
                                    htmlFor="logo-upload"
                                    className="flex items-center justify-center gap-3 w-full p-6 rounded-lg border-2 border-dashed border-white/20 hover:border-indigo-500/50 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                                        <Upload size={18} className="text-indigo-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-slate-100 font-medium">
                                            {filePreview ? filePreview : "Click to upload or drag and drop"}
                                        </p>
                                        {!filePreview && (
                                            <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </motion.div>

                        {/* Divider */}
                        <motion.div
                            variants={fieldVariants}
                            className='border-t border-white/10'
                        />

                        {/* Submit Button */}
                        <motion.div
                            variants={fieldVariants}
                            className='flex gap-3'
                        >
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/admin/companies")}
                                disabled={loading}
                                className="flex-1 px-6 py-3 rounded-lg border border-white/20 text-slate-300 hover:border-indigo-500/50 hover:text-slate-100 font-semibold transition-all disabled:opacity-50"
                            >
                                Cancel
                            </motion.button>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <span>Update Company</span>
                                )}
                            </motion.button>
                        </motion.div>

                    </form>

                </motion.div>

            </motion.div>
        </div>
    )
}

export default PremiumCompanySetup

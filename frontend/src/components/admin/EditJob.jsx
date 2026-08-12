import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2, Briefcase, FileText, MapPin, DollarSign, Users, Clock, Building2, ArrowLeft } from 'lucide-react'

const EditJob = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  })

  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  const { companies = [] } = useSelector(store => store.company)

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setFetchLoading(true)
        const res = await axios.get(`${JOB_API_END_POINT}/get/${params.id}`, {
          withCredentials: true
        })

        if (res.data.success) {
          const job = res.data.job
          setInput({
            title: job.title || "",
            description: job.description || "",
            requirements: job.requirements || "",
            salary: job.salary || "",
            location: job.location || "",
            jobType: job.jobType || "",
            experience: job.experience || "",
            position: job.position || 0,
            companyId: job.companyId || ""
          })
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load job")
        navigate("/admin/jobs")
      } finally {
        setFetchLoading(false)
      }
    }

    fetchJob()
  }, [params.id])

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const selectChangeHandler = (value) => {
    setInput({ ...input, companyId: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!input.title || !input.companyId) {
      toast.error("Title and Company are required")
      return
    }

    try {
      setLoading(true)

      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        input,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/jobs")
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

  const fieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Briefcase size={48} className="text-indigo-400" />
            </motion.div>
            <p className="text-slate-400">Loading job details...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      <Navbar />

      <motion.div
        className="flex items-center justify-center px-4 py-8 sm:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="w-full max-w-4xl"
        >

          {/* Back Button */}
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => navigate("/admin/jobs")}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Jobs</span>
          </motion.button>

          {/* Header */}
          <motion.div
            variants={itemVariants}
            className='mb-8'
          >
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                <Briefcase size={24} className='text-indigo-400' />
              </div>
              <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'>
                Edit Job
              </h1>
            </div>
            <p className='text-slate-400'>
              Update job details and requirements
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.form
            onSubmit={submitHandler}
            className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            {/* Job Basics Section */}
            <motion.div variants={itemVariants}>
              <h2 className='text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2'>
                <Briefcase size={18} className='text-indigo-400' />
                Job Basics
              </h2>

              <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <PremiumField
                  label="Job Title"
                  icon={Briefcase}
                  name="title"
                  input={input}
                  onChange={changeEventHandler}
                  placeholder="e.g., Senior React Developer"
                  required
                  variants={fieldVariants}
                />

                <PremiumField
                  label="Job Type"
                  icon={Briefcase}
                  name="jobType"
                  input={input}
                  onChange={changeEventHandler}
                  placeholder="e.g., Full-time, Part-time"
                  variants={fieldVariants}
                />
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fieldVariants} className='border-t border-white/10' />

            {/* Job Details Section */}
            <motion.div variants={itemVariants}>
              <h2 className='text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2'>
                <FileText size={18} className='text-purple-400' />
                Job Details
              </h2>

              <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <motion.div variants={fieldVariants} className='md:col-span-2'>
                  <PremiumTextArea
                    label="Description"
                    icon={FileText}
                    name="description"
                    input={input}
                    onChange={changeEventHandler}
                    placeholder="Describe the job responsibilities and requirements..."
                    required
                  />
                </motion.div>

                <motion.div variants={fieldVariants} className='md:col-span-2'>
                  <PremiumTextArea
                    label="Requirements"
                    icon={FileText}
                    name="requirements"
                    input={input}
                    onChange={changeEventHandler}
                    placeholder="List job requirements (comma separated)..."
                    required
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fieldVariants} className='border-t border-white/10' />

            {/* Compensation & Location Section */}
            <motion.div variants={itemVariants}>
              <h2 className='text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2'>
                <MapPin size={18} className='text-green-400' />
                Compensation & Location
              </h2>

              <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <PremiumField
                  label="Salary"
                  icon={DollarSign}
                  name="salary"
                  type="number"
                  input={input}
                  onChange={changeEventHandler}
                  placeholder="e.g., 50000"
                  required
                  variants={fieldVariants}
                  iconColor="green"
                />

                <PremiumField
                  label="Location"
                  icon={MapPin}
                  name="location"
                  input={input}
                  onChange={changeEventHandler}
                  placeholder="e.g., San Francisco, CA"
                  required
                  variants={fieldVariants}
                  iconColor="green"
                />
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fieldVariants} className='border-t border-white/10' />

            {/* Requirements Section */}
            <motion.div variants={itemVariants}>
              <h2 className='text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2'>
                <Clock size={18} className='text-blue-400' />
                Requirements
              </h2>

              <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <PremiumField
                  label="Experience (years)"
                  icon={Clock}
                  name="experience"
                  type="number"
                  input={input}
                  onChange={changeEventHandler}
                  placeholder="e.g., 2"
                  variants={fieldVariants}
                  iconColor="blue"
                />

                <PremiumField
                  label="Number of Positions"
                  icon={Users}
                  name="position"
                  type="number"
                  input={input}
                  onChange={changeEventHandler}
                  placeholder="e.g., 1"
                  required
                  variants={fieldVariants}
                  iconColor="blue"
                />
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fieldVariants} className='border-t border-white/10' />

            {/* Company Section */}
            <motion.div variants={itemVariants}>
              <h2 className='text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2'>
                <Building2 size={18} className='text-orange-400' />
                Company
              </h2>

              <motion.div variants={fieldVariants}>
                <Label className='text-slate-100 font-semibold flex items-center gap-2 mb-3'>
                  <div className='w-5 h-5 rounded-lg bg-orange-500/20 flex items-center justify-center'>
                    <Building2 size={14} className='text-orange-400' />
                  </div>
                  Select Company *
                </Label>

                {companies.length > 0 ? (
                  <div className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 hover:border-indigo-500/30 focus-within:border-indigo-500/50 transition-all'>
                    <Select onValueChange={selectChangeHandler} value={input.companyId}>
                      <SelectTrigger className="w-full bg-transparent border-0 text-slate-100 focus:outline-none focus:ring-0 p-0">
                        <SelectValue placeholder="Select a Company" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border border-white/10">
                        <SelectGroup>
                          {companies.map((company) => (
                            <SelectItem
                              key={company._id}
                              value={company._id}
                              className="text-slate-100 hover:bg-indigo-500/20 focus:bg-indigo-500/20"
                            >
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/30"
                  >
                    <p className="text-sm text-red-400">
                      No companies available
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fieldVariants} className='border-t border-white/10' />

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              className='flex gap-3 pt-4'
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/admin/jobs")}
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
                  <span>Update Job</span>
                )}
              </motion.button>
            </motion.div>

          </motion.form>

        </motion.div>
      </motion.div>
    </div>
  )
}

const PremiumField = ({ label, icon: Icon, name, input, onChange, type = "text", placeholder, required, variants, iconColor = "indigo" }) => {
  const colorMap = {
    indigo: 'bg-indigo-500/20 text-indigo-400',
    green: 'bg-green-500/20 text-green-400',
    blue: 'bg-blue-500/20 text-blue-400',
  };

  return (
    <motion.div variants={variants} className='space-y-2'>
      <Label className='text-slate-100 font-semibold flex items-center gap-2'>
        <div className={`w-5 h-5 rounded-lg ${colorMap[iconColor]} flex items-center justify-center`}>
          <Icon size={14} />
        </div>
        {label} {required && '*'}
      </Label>
      <Input
        type={type}
        name={name}
        value={input[name]}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg"
      />
    </motion.div>
  )
}

const PremiumTextArea = ({ label, icon: Icon, name, input, onChange, placeholder, required }) => {
  return (
    <motion.div className='space-y-2'>
      <Label className='text-slate-100 font-semibold flex items-center gap-2'>
        <div className='w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center'>
          <Icon size={14} className='text-purple-400' />
        </div>
        {label} {required && '*'}
      </Label>
      <textarea
        name={name}
        value={input[name]}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg focus:outline-none focus:ring-0 resize-none"
      />
    </motion.div>
  )
}

export default EditJob

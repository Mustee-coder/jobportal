import {  useState  } from 'react'
import { motion } from 'framer-motion'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, FileText, Sparkles, Edit3 } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    const isResume = user?.profile?.resume ? true : false;

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

    const skillVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4 },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
            <Navbar />

            <motion.div
                className='max-w-4xl mx-auto px-4 py-8 md:py-12'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* PROFILE CARD */}
                <motion.div
                    variants={itemVariants}
                    className='backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8'
                >

                    {/* HEADER */}
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6'>

                        <div className='flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left flex-1'>
                            {/* Avatar */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-lg"></div>
                                <Avatar className="h-20 w-20 md:h-28 md:w-28 relative border-2 border-indigo-500/50">
                                    <AvatarImage 
                                        src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                        alt={user?.fullname}
                                    />
                                </Avatar>
                            </motion.div>

                            <div>
                                <h1 className='font-bold text-2xl md:text-3xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2'>
                                    {user?.fullname}
                                </h1>
                                <p className='text-slate-400 text-sm md:text-base line-clamp-2'>
                                    {user?.profile?.bio || "Welcome to my profile"}
                                </p>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setOpen(true)}
                            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all"
                            aria-label="Edit profile"
                        >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </motion.button>
                    </div>

                    {/* DIVIDER */}
                    <motion.div
                        variants={itemVariants}
                        className='my-6 border-t border-white/10'
                    />

                    {/* CONTACT INFO */}
                    <motion.div
                        variants={itemVariants}
                        className='space-y-4 mb-6'
                    >
                        <h3 className='text-lg font-semibold text-slate-100 flex items-center gap-2'>
                            <div className='w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center'>
                                <Contact size={16} className='text-indigo-400' />
                            </div>
                            Contact Information
                        </h3>

                        <div className='space-y-3 ml-8'>
                            {/* Email */}
                            <div className='flex items-center gap-3'>
                                <Mail size={16} className='text-blue-400 flex-shrink-0' />
                                <span className="text-slate-300 break-all text-sm md:text-base hover:text-slate-100 transition-colors">
                                    {user?.email}
                                </span>
                            </div>

                            {/* Phone */}
                            {user?.phoneNumber && (
                                <div className='flex items-center gap-3'>
                                    <Contact size={16} className='text-green-400 flex-shrink-0' />
                                    <span className='text-slate-300 text-sm md:text-base hover:text-slate-100 transition-colors'>
                                        {user?.phoneNumber}
                                    </span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* SKILLS */}
                    {user?.profile?.skills?.length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            className='mb-6'
                        >
                            <h3 className='text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2'>
                                <div className='w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center'>
                                    <Sparkles size={16} className='text-purple-400' />
                                </div>
                                Skills
                            </h3>

                            <motion.div
                                className='flex flex-wrap gap-3'
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {user?.profile?.skills?.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={skillVariants}
                                        whileHover={{ scale: 1.1 }}
                                        className='inline-block'
                                    >
                                        <Badge className='px-4 py-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-300 border border-indigo-500/50 hover:from-indigo-500/50 hover:to-purple-500/50 transition-all cursor-default'>
                                            {item}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* RESUME */}
                    {isResume && (
                        <motion.div
                            variants={itemVariants}
                            className='pt-6 border-t border-white/10'
                        >
                            <div className='flex items-center gap-2 mb-3'>
                                <div className='w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center'>
                                    <FileText size={16} className='text-green-400' />
                                </div>
                                <Label className="text-base font-semibold text-slate-100">Resume</Label>
                            </div>

                            <motion.a
                                whileHover={{ x: 4 }}
                                target="_blank"
                                rel="noreferrer"
                                href={user?.profile?.resume}
                                className='inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium break-all text-sm'
                            >
                                <FileText size={16} />
                                {user?.profile?.resumeOriginalName || "View Resume"}
                            </motion.a>
                        </motion.div>
                    )}

                </motion.div>

                {/* APPLIED JOBS SECTION */}
                <motion.div
                    variants={itemVariants}
                    className='backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-6 md:p-8'
                >
                    <div className='flex items-center gap-2 mb-6'>
                        <h2 className='font-bold text-2xl text-slate-100'>Applied Jobs</h2>
                        <div className='px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium'>
                            {/* Total will be shown by AppliedJobTable */}
                        </div>
                    </div>
                    
                    <AppliedJobTable />
                </motion.div>

            </motion.div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile

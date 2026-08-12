import {  useState, useEffect  } from 'react'
import { motion } from 'framer-motion'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Loader2, Upload, User, Mail, Phone, FileText, Sparkles } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const PremiumUpdateProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [filePreview, setFilePreview] = useState(null)

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null
    })

    // sync user → form
    useEffect(() => {
        if (user) {
            setInput({
                fullname: user.fullname || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.profile?.bio || "",
                skills: user.profile?.skills?.join(", ") || "",
                file: null
            })
        }
    }, [user])

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setInput({ ...input, file })
            // Show file name preview
            setFilePreview(file.name)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("fullname", input.fullname)
            formData.append("email", input.email)
            formData.append("phoneNumber", input.phoneNumber)
            formData.append("bio", input.bio)
            formData.append("skills", input.skills)

            if (input.file) {
                formData.append("file", input.file)
            }

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false)
                setFilePreview(null)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Update failed")
        } finally {
            setLoading(false)
        }
    }

    // Animation variants
    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                staggerChildren: 0.05,
            },
        },
    };

    const fieldVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 },
        },
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[95%] sm:max-w-lg bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/10 rounded-2xl">
                
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                            <User size={18} className="text-indigo-400" />
                        </div>
                        Update Profile
                    </DialogTitle>
                </DialogHeader>

                <motion.form
                    onSubmit={submitHandler}
                    className="space-y-5 py-4"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >

                    {/* Name Field */}
                    <PremiumField 
                        label="Full Name" 
                        icon={User}
                        variants={fieldVariants}
                    >
                        <Input
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="Your full name"
                            className="bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg"
                        />
                    </PremiumField>

                    {/* Email Field */}
                    <PremiumField
                        label="Email"
                        icon={Mail}
                        variants={fieldVariants}
                    >
                        <Input
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="your@email.com"
                            className="bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg"
                        />
                    </PremiumField>

                    {/* Phone Field */}
                    <PremiumField
                        label="Phone Number"
                        icon={Phone}
                        variants={fieldVariants}
                    >
                        <Input
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="+1234567890"
                            className="bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg"
                        />
                    </PremiumField>

                    {/* Bio Field */}
                    <PremiumField
                        label="Bio"
                        icon={Sparkles}
                        variants={fieldVariants}
                    >
                        <Input
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            placeholder="Tell us about yourself..."
                            className="bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg"
                        />
                    </PremiumField>

                    {/* Skills Field */}
                    <PremiumField
                        label="Skills (comma separated)"
                        icon={Sparkles}
                        variants={fieldVariants}
                    >
                        <Input
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            placeholder="React, Node.js, MongoDB..."
                            className="bg-white/5 border border-white/20 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 rounded-lg"
                        />
                    </PremiumField>

                    {/* Resume Upload Field */}
                    <motion.div variants={fieldVariants}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-5 h-5 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <FileText size={16} className="text-green-400" />
                            </div>
                            <Label className="text-slate-100 font-semibold">Resume (PDF)</Label>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="sr-only"
                                id="resume-upload"
                            />
                            <label
                                htmlFor="resume-upload"
                                className="flex items-center justify-center gap-2 w-full p-4 rounded-lg border-2 border-dashed border-white/20 hover:border-indigo-500/50 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                                    <Upload size={16} className="text-indigo-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm text-slate-100 font-medium">
                                        {filePreview ? filePreview : "Click to upload or drag"}
                                    </p>
                                    {!filePreview && (
                                        <p className="text-xs text-slate-500">PDF files only</p>
                                    )}
                                </div>
                            </label>
                        </div>
                    </motion.div>

                    <DialogFooter className="mt-8">
                        <motion.div
                            className="w-full"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                disabled={loading}
                                type="submit"
                                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                                    loading
                                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <span>Update Profile</span>
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </DialogFooter>

                </motion.form>

            </DialogContent>
        </Dialog>
    )
}

const PremiumField = ({ label, icon: Icon, children, variants }) => (
    <motion.div variants={variants}>
        <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Icon size={16} className="text-indigo-400" />
            </div>
            <Label className="text-slate-100 font-semibold">{label}</Label>
        </div>
        {children}
    </motion.div>
)

export default PremiumUpdateProfileDialog

import {  useEffect, useState  } from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Briefcase } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs?.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    if (!filterJobs || filterJobs.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl"
            >
                <Briefcase size={48} className="text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No Jobs Posted</h3>
                <p className="text-slate-400">Post your first job to get started</p>
            </motion.div>
        );
    }

    const ActionMenu = ({ job }) => (
        <Popover>
            <PopoverTrigger asChild>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <MoreHorizontal size={16} className="text-slate-400 hover:text-slate-300" />
                </motion.button>
            </PopoverTrigger>
            <PopoverContent className="w-40 backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-lg p-2 space-y-1">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-indigo-500/20 text-slate-200 hover:text-indigo-300 cursor-pointer transition-colors"
                >
                    <Edit2 size={14} />
                    <span className="text-sm font-medium">Edit</span>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-500/20 text-slate-200 hover:text-green-300 cursor-pointer transition-colors"
                >
                    <Eye size={14} />
                    <span className="text-sm font-medium">Applicants</span>
                </motion.div>
            </PopoverContent>
        </Popover>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">

            {/* MOBILE: Card layout */}
            <div className="md:hidden space-y-3">
                {filterJobs.map((job, index) => (
                    <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                                <p className="text-slate-100 font-medium truncate">{job?.title}</p>
                                <p className="text-slate-400 text-xs mt-0.5 truncate">{job?.company?.name}</p>
                                <p className="text-slate-500 text-xs mt-1">{job?.createdAt?.split('T')[0]}</p>
                            </div>
                            <ActionMenu job={job} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* DESKTOP: Table layout */}
            <div className="hidden md:block backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10">
                    <div className="col-span-4 text-xs font-semibold text-slate-300 uppercase tracking-wide">Company Name</div>
                    <div className="col-span-4 text-xs font-semibold text-slate-300 uppercase tracking-wide">Role</div>
                    <div className="col-span-2 text-xs font-semibold text-slate-300 uppercase tracking-wide">Date</div>
                    <div className="col-span-2 text-xs font-semibold text-slate-300 uppercase tracking-wide text-right">Action</div>
                </div>

                <div className="divide-y divide-white/5">
                    {filterJobs.map((job, index) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-all items-center"
                        >
                            <div className="col-span-4"><p className="text-slate-100 font-medium truncate">{job?.company?.name}</p></div>
                            <div className="col-span-4"><p className="text-slate-300 truncate">{job?.title}</p></div>
                            <div className="col-span-2"><p className="text-slate-400 text-sm">{job?.createdAt?.split('T')[0]}</p></div>
                            <div className="col-span-2 flex justify-end"><ActionMenu job={job} /></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default AdminJobsTable;

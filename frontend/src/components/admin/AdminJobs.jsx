import {  useEffect, useState  } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Search, Plus, Briefcase } from 'lucide-react';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="p-2.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            <Briefcase size={22} className="text-indigo-400" />
          </div>
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Manage Jobs
          </h1>
        </motion.div>

        {/* Filter + New Job — stacks on mobile, side by side on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6"
        >
          <div className="relative flex-1 sm:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              className="w-full pl-9 bg-white/5 border-white/10 text-slate-200 placeholder:text-slate-500"
              placeholder="Filter by name, role"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/admin/jobs/create")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow"
          >
            <Plus size={18} />
            <span>New Job</span>
          </motion.button>
        </motion.div>

        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;

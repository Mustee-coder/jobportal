import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, CheckCircle2, XCircle, Clock, FileText, Mail, Phone } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const [loading, setLoading] = useState({});

  const statusHandler = async (status, id) => {
    try {
      setLoading(prev => ({ ...prev, [id]: true }));
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(`Application ${status.toLowerCase()}! ✅`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-300', icon: Clock },
      accepted: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-300', icon: CheckCircle2 },
      rejected: { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-300', icon: XCircle }
    };
    const info = statusMap[status] || statusMap.pending;
    const Icon = info.icon;
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${info.bg} border ${info.border}`}>
        <Icon size={14} className={info.text} />
        <span className={`text-xs font-medium ${info.text} capitalize`}>{status}</span>
      </div>
    );
  };

  const ActionMenu = ({ item }) => (
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
      <PopoverContent className="w-48 backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-lg p-2 space-y-1">
        {shortlistingStatus.map((status, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => statusHandler(status, item._id)}
            disabled={loading[item._id]}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
              status === 'Accepted' ? 'hover:bg-green-500/20 text-green-300' : 'hover:bg-red-500/20 text-red-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center gap-2">
              {status === 'Accepted' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
              <span>{loading[item._id] && '⏳ '}{status}</span>
            </div>
          </motion.button>
        ))}
      </PopoverContent>
    </Popover>
  );

  if (!applicants?.applications || applicants.applications.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl"
      >
        <Mail size={48} className="text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-300 mb-2">No Applicants</h3>
        <p className="text-slate-400">No applications yet. Check back soon!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {/* MOBILE: Card layout */}
      <div className="md:hidden space-y-3">
        {applicants.applications.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {item?.applicant?.fullname?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-100 font-medium text-sm truncate">{item?.applicant?.fullname}</p>
                  <p className="text-slate-500 text-xs">{item?.createdAt?.split('T')?.[0]}</p>
                </div>
              </div>
              <ActionMenu item={item} />
            </div>

            <div className="space-y-1.5 mb-3">
              <p className="text-slate-300 text-xs flex items-center gap-1.5 truncate">
                <Mail size={12} className="text-indigo-400 flex-shrink-0" />
                {item?.applicant?.email}
              </p>
              <p className="text-slate-400 text-xs flex items-center gap-1.5">
                <Phone size={12} className="text-purple-400 flex-shrink-0" />
                {item?.applicant?.phoneNumber}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2">
              {item?.applicant?.profile?.resume ? (
                <a
                  href={item.applicant.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-lg"
                >
                  <FileText size={11} className="text-indigo-400" />
                  <span className="text-xs font-medium text-indigo-300 truncate max-w-[90px]">
                    {item.applicant.profile.resumeOriginalName || 'Resume'}
                  </span>
                </a>
              ) : (
                <span className="text-xs text-slate-500">No resume</span>
              )}
              {getStatusBadge(item?.status || 'pending')}
            </div>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP: Table layout */}
      <div className="hidden md:block backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10">
          <div className="col-span-2 text-xs font-semibold text-slate-300 uppercase tracking-wide">Full Name</div>
          <div className="col-span-2 text-xs font-semibold text-slate-300 uppercase tracking-wide">Email</div>
          <div className="col-span-2 text-xs font-semibold text-slate-300 uppercase tracking-wide">Contact</div>
          <div className="col-span-2 text-xs font-semibold text-slate-300 uppercase tracking-wide">Resume</div>
          <div className="col-span-2 text-xs font-semibold text-slate-300 uppercase tracking-wide">Status</div>
          <div className="col-span-2 text-xs font-semibold text-slate-300 uppercase tracking-wide text-right">Action</div>
        </div>

        <div className="divide-y divide-white/5">
          {applicants.applications.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-all items-center"
            >
              <div className="col-span-2 flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {item?.applicant?.fullname?.charAt(0).toUpperCase()}
                </div>
                <span className="text-slate-100 font-medium text-sm truncate">{item?.applicant?.fullname}</span>
              </div>
              <div className="col-span-2 min-w-0">
                <p className="text-slate-300 text-sm flex items-center gap-1.5 truncate">
                  <Mail size={12} className="text-indigo-400 flex-shrink-0" />
                  <span className="truncate">{item?.applicant?.email}</span>
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400 text-sm flex items-center gap-1.5">
                  <Phone size={12} className="text-purple-400 flex-shrink-0" />
                  {item?.applicant?.phoneNumber}
                </p>
              </div>
              <div className="col-span-2">
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/30 transition-colors"
                  >
                    <FileText size={12} className="text-indigo-400" />
                    <span className="text-xs font-medium text-indigo-300 truncate max-w-[120px]">
                      {item.applicant.profile.resumeOriginalName || 'Resume'}
                    </span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">No resume</span>
                )}
              </div>
              <div className="col-span-2">{getStatusBadge(item?.status || 'pending')}</div>
              <div className="col-span-2 flex justify-end"><ActionMenu item={item} /></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicantsTable;

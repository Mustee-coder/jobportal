import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Building2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies?.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    if (!filterCompany || filterCompany.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl"
            >
                <Building2 size={48} className="text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No Companies Found</h3>
                <p className="text-slate-400">Register your first company to get started</p>
            </motion.div>
        );
    }

    const ActionMenu = ({ company }) => (
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
            <PopoverContent className="w-40 backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-lg p-2">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-indigo-500/20 text-slate-200 hover:text-indigo-300 cursor-pointer transition-colors"
                >
                    <Edit2 size={14} />
                    <span className="text-sm font-medium">Edit</span>
                </motion.div>
            </PopoverContent>
        </Popover>
    );

    const Logo = ({ company }) => (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border border-white/10 flex-shrink-0">
            {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
            ) : (
                <span className="text-white font-bold text-sm">
                    {company.name?.charAt(0).toUpperCase()}
                </span>
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
        >
            {/* MOBILE: Card layout (below md) */}
            <div className="md:hidden space-y-3">
                {filterCompany.map((company, index) => (
                    <motion.div
                        key={company._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <Logo company={company} />
                                <div className="min-w-0 flex-1">
                                    <p className="text-slate-100 font-medium truncate">{company.name}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">
                                        {company.createdAt?.split('T')[0]}
                                    </p>
                                </div>
                            </div>
                            <ActionMenu company={company} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* DESKTOP: Table layout (md and up) */}
            <div className="hidden md:block backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10">
                    <div className="col-span-2 text-xs font-semibold text-slate-300 uppercase tracking-wide">Logo</div>
                    <div className="col-span-5 text-xs font-semibold text-slate-300 uppercase tracking-wide">Name</div>
                    <div className="col-span-3 text-xs font-semibold text-slate-300 uppercase tracking-wide">Date</div>
                    <div className="col-span-2 text-xs font-semibold text-slate-300 uppercase tracking-wide text-right">Action</div>
                </div>

                <div className="divide-y divide-white/5">
                    {filterCompany.map((company, index) => (
                        <motion.div
                            key={company._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-all items-center"
                        >
                            <div className="col-span-2"><Logo company={company} /></div>
                            <div className="col-span-5"><p className="text-slate-100 font-medium truncate">{company.name}</p></div>
                            <div className="col-span-3"><p className="text-slate-400 text-sm">{company.createdAt?.split('T')[0]}</p></div>
                            <div className="col-span-2 flex justify-end"><ActionMenu company={company} /></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CompaniesTable;

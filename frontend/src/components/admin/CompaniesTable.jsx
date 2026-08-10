import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Edit, Trash2, Globe } from 'lucide-react'

const PremiumCompaniesTable = () => {
    const navigate = useNavigate();
    const { companies = [], searchCompanyByText } = useSelector(store => store.company);

    // Filter companies based on search
    const filteredCompanies = companies.filter(company =>
        company?.name?.toLowerCase().includes(searchCompanyByText?.toLowerCase())
    );

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
        hover: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transition: { duration: 0.2 },
        },
    };

    return (
        <motion.div
            className="w-full"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >

            <Table>

                <TableCaption className="text-slate-400 py-4">
                    {filteredCompanies?.length === 0
                        ? "No companies yet"
                        : `Showing ${filteredCompanies?.length} compan${filteredCompanies?.length !== 1 ? 'ies' : 'y'}`
                    }
                </TableCaption>

                <TableHeader>
                    <TableRow className="border-b border-white/10 hover:bg-transparent">
                        <TableHead className="text-slate-300 font-semibold py-4">
                            Company Name
                        </TableHead>
                        <TableHead className="text-slate-300 font-semibold py-4">
                            Location
                        </TableHead>
                        <TableHead className="text-slate-300 font-semibold py-4">
                            Website
                        </TableHead>
                        <TableHead className="text-slate-300 font-semibold py-4">
                            Founded
                        </TableHead>
                        <TableHead className="text-right text-slate-300 font-semibold py-4">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {filteredCompanies?.length === 0 ? (
                        <motion.tr
                            variants={rowVariants}
                            className="border-b border-white/10"
                        >
                            <TableCell
                                colSpan={5}
                                className="text-center py-12"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                        <Globe className="text-indigo-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 font-medium">
                                            No Companies Yet
                                        </p>
                                        <p className="text-slate-500 text-sm mt-1">
                                            Register your first company to get started
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                        </motion.tr>
                    ) : (
                        <motion.tbody
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="divide-y divide-white/10"
                        >
                            {filteredCompanies.map((company) => (
                                <motion.tr
                                    key={company._id}
                                    variants={rowVariants}
                                    whileHover="hover"
                                    className="border-b border-white/10 transition-colors duration-300 group"
                                >

                                    {/* Company Name */}
                                    <TableCell className="text-slate-100 py-4 font-medium group-hover:text-indigo-300 transition-colors">
                                        <motion.div
                                            whileHover={{ x: 4 }}
                                            className="inline-block cursor-pointer flex items-center gap-2"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                                <Globe size={14} className="text-indigo-400" />
                                            </div>
                                            {company?.name}
                                        </motion.div>
                                    </TableCell>

                                    {/* Location */}
                                    <TableCell className="text-slate-300 py-4 group-hover:text-slate-100 transition-colors">
                                        {company?.location || "N/A"}
                                    </TableCell>

                                    {/* Website */}
                                    <TableCell className="text-slate-300 py-4 group-hover:text-slate-100 transition-colors">
                                        {company?.website ? (
                                            <motion.a
                                                whileHover={{ x: 2 }}
                                                href={company.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm truncate"
                                            >
                                                {company.website}
                                            </motion.a>
                                        ) : (
                                            <span className="text-slate-500">—</span>
                                        )}
                                    </TableCell>

                                    {/* Created Date */}
                                    <TableCell className="text-slate-400 py-4 text-sm group-hover:text-slate-300 transition-colors">
                                        {company?.createdAt?.split("T")[0]}
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="text-right py-4">
                                        <motion.div
                                            className="flex items-center justify-end gap-2"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                        >
                                            {/* Edit Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                                title="Edit company"
                                            >
                                                <Edit size={16} />
                                            </motion.button>

                                            {/* Delete Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                title="Delete company"
                                            >
                                                <Trash2 size={16} />
                                            </motion.button>
                                        </motion.div>
                                    </TableCell>

                                </motion.tr>
                            ))}
                        </motion.tbody>
                    )}

                </TableBody>

            </Table>

        </motion.div>
    )
}

export default PremiumCompaniesTable

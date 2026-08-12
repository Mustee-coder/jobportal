import { motion } from "framer-motion";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import {
    CheckCircle,
    Clock,
    XCircle,
    Briefcase,
} from "lucide-react";

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector((store) => store.job);

    const getStatusColor = (status) => {
        switch (status) {
            case "rejected":
                return "bg-red-500/20 text-red-300 border border-red-500/30";

            case "pending":
                return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";

            case "accepted":
                return "bg-green-500/20 text-green-300 border border-green-500/30";

            default:
                return "bg-slate-500/20 text-slate-300 border border-slate-500/30";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "rejected":
                return <XCircle size={16} className="text-red-400" />;

            case "pending":
                return <Clock size={16} className="text-yellow-400" />;

            case "accepted":
                return <CheckCircle size={16} className="text-green-400" />;

            default:
                return <Briefcase size={16} className="text-slate-400" />;
        }
    };

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
        hidden: {
            opacity: 0,
            x: -20,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
        hover: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            transition: {
                duration: 0.2,
            },
        },
    };

    const stats = [
        {
            label: "Total Applications",
            value: allAppliedJobs.length,
            className:
                "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
        },
        {
            label: "Accepted",
            value: allAppliedJobs.filter(
                (job) => job?.status === "accepted"
            ).length,
            className:
                "bg-green-500/10 border-green-500/20 text-green-400",
        },
        {
            label: "Pending",
            value: allAppliedJobs.filter(
                (job) => job?.status === "pending"
            ).length,
            className:
                "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
        },
    ];

    return (
        <motion.div
            className="w-full overflow-x-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl overflow-hidden">

                <Table className="w-full">

                    <TableCaption className="text-slate-400 py-4 text-sm">
                        {allAppliedJobs.length === 0
                            ? "You haven't applied to any job yet"
                            : `Showing ${allAppliedJobs.length} application${
                                  allAppliedJobs.length !== 1 ? "s" : ""
                              }`}
                    </TableCaption>

                    <TableHeader>
                        <TableRow className="border-b border-white/10 hover:bg-transparent">
                            <TableHead className="text-slate-300 font-semibold py-4">
                                Date
                            </TableHead>

                            <TableHead className="text-slate-300 font-semibold py-4">
                                Job Role
                            </TableHead>

                            <TableHead className="text-slate-300 font-semibold py-4">
                                Company
                            </TableHead>

                            <TableHead className="text-right text-slate-300 font-semibold py-4">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>

                        {allAppliedJobs.length === 0 ? (
                            <motion.tr
                                variants={rowVariants}
                                className="border-b border-white/10"
                            >
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-12"
                                >
                                    <div className="flex flex-col items-center gap-3">

                                        <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                            <Briefcase
                                                className="text-indigo-400"
                                                size={24}
                                            />
                                        </div>

                                        <div>
                                            <p className="text-slate-300 font-medium">
                                                No Applications Yet
                                            </p>

                                            <p className="text-slate-500 text-sm mt-1">
                                                Start exploring and apply to
                                                jobs to track your
                                                applications here.
                                            </p>
                                        </div>

                                    </div>
                                </TableCell>
                            </motion.tr>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <motion.tr
                                    key={appliedJob?._id}
                                    variants={rowVariants}
                                    whileHover="hover"
                                    className="border-b border-white/10 transition-colors duration-300 group"
                                >

                                    {/* Date */}
                                    <TableCell className="text-sm text-slate-300 py-4 group-hover:text-slate-100 transition-colors">
                                        {appliedJob?.createdAt
                                            ? appliedJob.createdAt.split("T")[0]
                                            : "N/A"}
                                    </TableCell>

                                    {/* Job Role */}
                                    <TableCell className="font-medium text-slate-100 py-4 group-hover:text-indigo-300 transition-colors">
                                        <motion.div
                                            whileHover={{ x: 4 }}
                                            className="inline-block"
                                        >
                                            {appliedJob?.job?.title || "N/A"}
                                        </motion.div>
                                    </TableCell>

                                    {/* Company */}
                                    <TableCell className="text-slate-300 py-4 group-hover:text-slate-100 transition-colors">
                                        {appliedJob?.job?.company?.name ||
                                            "N/A"}
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell className="text-right py-4">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="inline-flex"
                                        >
                                            <Badge
                                                className={`${getStatusColor(
                                                    appliedJob?.status
                                                )} flex items-center gap-2 cursor-default`}
                                            >
                                                {getStatusIcon(
                                                    appliedJob?.status
                                                )}

                                                <span className="font-semibold">
                                                    {appliedJob?.status
                                                        ? appliedJob.status
                                                              .charAt(0)
                                                              .toUpperCase() +
                                                          appliedJob.status.slice(
                                                              1
                                                          )
                                                        : "Unknown"}
                                                </span>
                                            </Badge>
                                        </motion.div>
                                    </TableCell>

                                </motion.tr>
                            ))
                        )}

                    </TableBody>

                </Table>
            </div>

            {/* Summary Stats */}
            {allAppliedJobs.length > 0 && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.3,
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ y: -4 }}
                            className={`backdrop-blur-xl border rounded-lg p-4 text-center ${stat.className}`}
                        >
                            <p className="text-2xl font-bold">
                                {stat.value}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default AppliedJobTable;
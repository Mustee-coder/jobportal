import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState([]);
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

    return (
        <div className="w-full overflow-x-auto">

            <Table>

                <TableCaption>A list of your recent posted jobs</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {filterJobs?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                                No jobs found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>

                                {/* Company */}
                                <TableCell className="font-medium">
                                    {job?.company?.name}
                                </TableCell>

                                {/* Role */}
                                <TableCell>
                                    {job?.title}
                                </TableCell>

                                {/* Date */}
                                <TableCell className="text-sm">
                                    {job?.createdAt?.split("T")?.[0] || "N/A"}
                                </TableCell>

                                {/* Action */}
                                <TableCell className="text-right">

                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-40 space-y-3">

                                            <div
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                                            >
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>

                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 cursor-pointer hover:text-green-600"
                                            >
                                                <Eye className="w-4" />
                                                <span>Applicants</span>
                                            </div>

                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </TableRow>
                        ))
                    )}

                </TableBody>

            </Table>

        </div>
    )
}

export default AdminJobsTable
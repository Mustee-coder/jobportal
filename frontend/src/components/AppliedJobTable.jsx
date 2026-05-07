import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from './ui/table'

import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const getStatusColor = (status) => {
        switch (status) {
            case "rejected":
                return "bg-red-500 text-white"
            case "pending":
                return "bg-gray-400 text-white"
            case "accepted":
                return "bg-green-500 text-white"
            default:
                return "bg-gray-200"
        }
    }

    return (
        <div className="w-full overflow-x-auto">

            <Table>

                <TableCaption>A list of your applied jobs</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {
                        allAppliedJobs?.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center text-gray-500 py-6"
                                >
                                    You haven't applied to any job yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id}>

                                    {/* Date */}
                                    <TableCell className="text-sm">
                                        {appliedJob?.createdAt?.split("T")[0]}
                                    </TableCell>

                                    {/* Job Title */}
                                    <TableCell className="font-medium">
                                        {appliedJob.job?.title}
                                    </TableCell>

                                    {/* Company */}
                                    <TableCell>
                                        {appliedJob.job?.company?.name}
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell className="text-right">
                                        <Badge className={getStatusColor(appliedJob.status)}>
                                            {appliedJob.status?.toUpperCase()}
                                        </Badge>
                                    </TableCell>

                                </TableRow>
                            ))
                        )
                    }

                </TableBody>

            </Table>

        </div>
    )
}

export default AppliedJobTable
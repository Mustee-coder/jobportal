import React from 'react'
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
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const shortlistingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true

            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${id}/update`,
                { status }
            )

            if (res.data.success) {
                toast.success(res.data.message)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="w-full overflow-x-auto">

            <Table>

                <TableCaption>A list of recently applied users</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {applicants?.applications?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                                No applicants found
                            </TableCell>
                        </TableRow>
                    ) : (
                        applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>

                                {/* Name */}
                                <TableCell className="font-medium">
                                    {item?.applicant?.fullname}
                                </TableCell>

                                {/* Email */}
                                <TableCell>
                                    {item?.applicant?.email}
                                </TableCell>

                                {/* Phone */}
                                <TableCell>
                                    {item?.applicant?.phoneNumber}
                                </TableCell>

                                {/* Resume */}
                                <TableCell>
                                    {
                                        item?.applicant?.profile?.resume ? (
                                            <a
                                                className="text-blue-600 hover:underline"
                                                href={item.applicant.profile.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item.applicant.profile.resumeOriginalName}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">NA</span>
                                        )
                                    }
                                </TableCell>

                                {/* Date */}
                                <TableCell className="text-sm">
                                    {item?.createdAt?.split("T")?.[0] || "N/A"}
                                </TableCell>

                                {/* Action */}
                                <TableCell className="text-right">

                                    <Popover>

                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-40 space-y-2">

                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => statusHandler(status, item._id)}
                                                    className="cursor-pointer hover:text-blue-600"
                                                >
                                                    {status}
                                                </div>
                                            ))}

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

export default ApplicantsTable
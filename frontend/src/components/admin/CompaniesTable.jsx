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

import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {

    const { companies, searchCompanyByText } = useSelector(store => store.company)

    const [filterCompany, setFilterCompany] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const filtered = companies?.filter((company) => {
            if (!searchCompanyByText) return true

            return company?.name
                ?.toLowerCase()
                .includes(searchCompanyByText.toLowerCase())
        })

        setFilterCompany(filtered)
    }, [companies, searchCompanyByText])

    return (
        <div className="w-full overflow-x-auto">

            <Table>

                <TableCaption>
                    A list of your recently registered companies
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {filterCompany?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                                No companies found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany?.map((company) => (
                            <TableRow key={company._id}>

                                {/* Logo */}
                                <TableCell>
                                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </TableCell>

                                {/* Name */}
                                <TableCell className="font-medium">
                                    {company.name}
                                </TableCell>

                                {/* Date */}
                                <TableCell className="text-sm">
                                    {company?.createdAt?.split("T")?.[0] || "N/A"}
                                </TableCell>

                                {/* Action */}
                                <TableCell className="text-right">

                                    <Popover>

                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-36">

                                            <div
                                                onClick={() =>
                                                    navigate(`/admin/companies/${company._id}`)
                                                }
                                                className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                                            >
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
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

export default CompaniesTable
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Debounce for better performance
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearchCompanyByText(input))
        }, 300)

        return () => clearTimeout(timer)
    }, [input, dispatch])

    return (
        <div className="bg-gray-50 min-h-screen">

            <Navbar />

            <div className='max-w-6xl mx-auto my-6 md:my-10 px-4'>

                {/* Header Controls */}
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>

                    {/* Search Input */}
                    <Input
                        className="w-full sm:w-72"
                        placeholder="Filter by company name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    {/* Button */}
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="w-full sm:w-auto"
                    >
                        New Company
                    </Button>

                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto bg-white rounded-md shadow-sm">

                    <CompaniesTable />

                </div>

            </div>
        </div>
    )
}

export default Companies
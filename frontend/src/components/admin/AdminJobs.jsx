import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchJobByText(input))
    }, 300)

    return () => clearTimeout(timer)
  }, [input, dispatch])

  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <div className='max-w-6xl mx-auto px-4 my-6 md:my-10'>

        {/* Header Controls */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>

          {/* Search Input */}
          <Input
            className="w-full sm:w-80"
            placeholder="Filter by name, role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Button */}
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto"
          >
            New Job
          </Button>

        </div>

        {/* Table Wrapper (important for mobile scroll) */}
        <div className="w-full overflow-x-auto bg-white rounded-md shadow-sm">

          <AdminJobsTable />

        </div>

      </div>
    </div>
  )
}

export default AdminJobs
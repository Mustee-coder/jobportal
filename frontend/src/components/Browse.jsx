import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import JobSkeleton from './JobSkeleton'

const Browse = () => {
    useGetAllJobs();

    const { allJobs, loading } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    }, [])

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className='max-w-7xl mx-auto my-6 md:my-10 px-4'>

                {/* Header */}
                <h1 className='font-bold text-lg sm:text-xl md:text-2xl my-6 md:my-10'>
                    Search Results ({allJobs.length})
                </h1>

                {/* Grid */}
                {
                    loading ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <JobSkeleton key={i} />
                            ))}
                        </div>
                    ) : allJobs.length === 0 ? (
                        <div className='text-center text-gray-500 py-10'>
                            No jobs found
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {allJobs.map((job) => (
                                <Job key={job._id} job={job} />
                            ))}
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Browse
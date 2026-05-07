import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-4 md:p-5 rounded-lg shadow-md bg-white border border-gray-100 cursor-pointer 
            hover:shadow-xl transition-all duration-200 active:scale-[0.98]'
        >

            {/* Company */}
            <div>
                <h1 className='font-medium text-base md:text-lg'>
                    {job?.company?.name}
                </h1>
                <p className='text-xs md:text-sm text-gray-500'>
                    India
                </p>
            </div>

            {/* Title + Description */}
            <div className='mt-2'>
                <h1 className='font-bold text-base md:text-lg my-1'>
                    {job?.title}
                </h1>

                <p className='text-xs md:text-sm text-gray-600 line-clamp-2'>
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">
                    {job?.position} Positions
                </Badge>

                <Badge className='text-[#F83002] font-bold' variant="ghost">
                    {job?.jobType}
                </Badge>

                <Badge className='text-[#7209b7] font-bold' variant="ghost">
                    ${job?.salary} 
                </Badge>
            </div>

        </div>
    )
}

export default LatestJobCards
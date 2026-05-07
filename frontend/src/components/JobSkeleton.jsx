import React from 'react'

const JobSkeleton = () => {
    return (
        <div className="p-5 rounded-md border border-gray-200 bg-white animate-pulse">

            {/* Company */}
            <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-20 bg-gray-100 rounded"></div>
            </div>

            {/* Title */}
            <div className="mt-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>

            {/* Description */}
            <div className="mt-4 space-y-2">
                <div className="h-3 w-full bg-gray-100 rounded"></div>
                <div className="h-3 w-full bg-gray-100 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mt-4">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
            </div>

        </div>
    )
}

export default JobSkeleton
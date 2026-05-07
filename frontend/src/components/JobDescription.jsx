import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)

    const dispatch = useDispatch()
    const params = useParams()
    const jobId = params.id

    const isInitiallyApplied =
        singleJob?.applications?.some(
            app => app.applicant === user?._id
        ) || false

    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { withCredentials: true }
            )

            if (res.data.success) {
                setIsApplied(true)

                const updated = {
                    ...singleJob,
                    applications: [
                        ...singleJob.applications,
                        { applicant: user?._id }
                    ]
                }

                dispatch(setSingleJob(updated))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error")
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                )

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))

                    setIsApplied(
                        res.data.job.applications.some(
                            app => app.applicant === user?._id
                        )
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-xl md:text-2xl font-bold">
                        {singleJob?.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="ghost" className="text-blue-600 font-semibold">
                            {singleJob?.position} Positions
                        </Badge>

                        <Badge variant="ghost" className="text-red-500 font-semibold">
                            {singleJob?.jobType}
                        </Badge>

                        <Badge variant="ghost" className="text-purple-600 font-semibold">$
                            {singleJob?.salary} 
                        </Badge>
                    </div>
                </div>

                {/* BUTTON */}
                {/* MOBILE STICKY APPLY BUTTON */}
<div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t p-3 z-50">
    <Button
        onClick={isApplied ? undefined : applyJobHandler}
        disabled={isApplied}
        className={`w-full rounded-lg ${
            isApplied
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#7209b7] hover:bg-[#5f32ad]'
        }`}
    >
        {isApplied ? 'Already Applied' : 'Apply Now'}
    </Button>
</div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8 border-t pt-5">

                <h2 className="text-lg font-semibold mb-4">
                    Job Details
                </h2>

                <div className="space-y-3 text-sm md:text-base">

                    <p>
                        <span className="font-semibold">Role:</span>{" "}
                        {singleJob?.title}
                    </p>

                    <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {singleJob?.location}
                    </p>

                    <p>
                        <span className="font-semibold">Description:</span>{" "}
                        {singleJob?.description}
                    </p>

                    <p>
                        <span className="font-semibold">Experience:</span>{" "}
                        {singleJob?.experience} yrs
                    </p>

                    <p>
                        <span className="font-semibold">Salary:</span>{" "}
                     ${singleJob?.salary} 
                   </p>

                    <p>
                        <span className="font-semibold">Applicants:</span>{" "}
                        {singleJob?.applications?.length}
                    </p>

                    <p>
                        <span className="font-semibold">Posted:</span>{" "}
                        {singleJob?.createdAt?.split("T")[0]}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default JobDescription
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
                    { withCredentials: true }
                );

                dispatch(setAllApplicants(res.data.job));

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchAllApplicants();

    }, [params.id, dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen">

            <Navbar />

            <div className='max-w-7xl mx-auto px-4 py-6 md:py-10'>

                {/* Header */}
                <h1 className='font-bold text-lg sm:text-xl md:text-2xl mb-5'>
                    Applicants ({applicants?.applications?.length || 0})
                </h1>

                {/* Loading State */}
                {
                    loading ? (
                        <div className="text-gray-500 text-center py-10">
                            Loading applicants...
                        </div>
                    ) : (
                        <ApplicantsTable />
                    )
                }

            </div>
        </div>
    )
}

export default Applicants
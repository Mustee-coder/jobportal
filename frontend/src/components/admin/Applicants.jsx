import {  useEffect, useState  } from 'react';
import { motion } from 'framer-motion';
import { Users, Loader2 } from 'lucide-react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

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
        };

        fetchAllApplicants();

    }, [params.id, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <div className="p-2.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                        <Users size={22} className="text-indigo-400" />
                    </div>
                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        Applicants ({applicants?.applications?.length || 0})
                    </h1>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 gap-3"
                    >
                        <Loader2 size={32} className="text-indigo-400 animate-spin" />
                        <p className="text-slate-400 text-sm">Loading applicants...</p>
                    </motion.div>
                ) : (
                    <ApplicantsTable />
                )}

            </div>
        </div>
    );
};

export default Applicants;

import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [companyName, setCompanyName] = useState("")
    const [loading, setLoading] = useState(false)

    const registerNewCompany = async () => {

        if (!companyName.trim()) {
            toast.error("Company name is required")
            return
        }

        try {
            setLoading(true)

            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)

                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen">

            <Navbar />

            <div className='max-w-4xl mx-auto px-4 py-6 md:py-10'>

                {/* Header */}
                <div className='my-6 md:my-10'>

                    <h1 className='font-bold text-xl sm:text-2xl'>
                        Your Company Name
                    </h1>

                    <p className='text-gray-500 text-sm sm:text-base mt-2'>
                        What would you like to name your company? You can change this later.
                    </p>

                </div>

                {/* Input */}
                <div className="space-y-2">

                    <Label>Company Name</Label>

                    <Input
                        type="text"
                        value={companyName}
                        className="w-full"
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />

                </div>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row gap-3 sm:items-center my-8'>

                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => navigate("/admin/companies")}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="w-full sm:w-auto"
                        onClick={registerNewCompany}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Continue"}
                    </Button>

                </div>

            </div>
        </div>
    )
}

export default CompanyCreate
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {

    const params = useParams()
    useGetCompanyById(params.id)

    const { singleCompany } = useSelector(store => store.company)

    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })

    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("name", input.name)
            formData.append("description", input.description)
            formData.append("website", input.website)
            formData.append("location", input.location)

            if (input.file) {
                formData.append("file", input.file)
            }

            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")

        } finally {
            setLoading(false)
        }
    }

    // Safe data sync
    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null
            })
        }
    }, [singleCompany])

    return (
        <div className="bg-gray-50 min-h-screen">

            <Navbar />

            <div className='max-w-2xl mx-auto px-4 py-6 md:py-10'>

                {/* Header */}
                <div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-6'>

                    <Button
                        type="button"
                        onClick={() => navigate("/admin/companies")}
                        variant="outline"
                        className="w-full sm:w-auto flex items-center gap-2 text-gray-500"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>

                    <h1 className='font-bold text-lg sm:text-xl'>
                        Company Setup
                    </h1>

                </div>

                {/* Form */}
                <form onSubmit={submitHandler} className="space-y-4">

                    {/* Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

                        <div>
                            <Label>Company Name</Label>
                            <Input name="name" value={input.name} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input name="description" value={input.description} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Website</Label>
                            <Input name="website" value={input.website} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input name="location" value={input.location} onChange={changeEventHandler} />
                        </div>

                        <div className="sm:col-span-2">
                            <Label>Logo</Label>
                            <Input type="file" accept="image/*" onChange={changeFileHandler} />
                        </div>

                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Update Company"
                        )}
                    </Button>

                </form>

            </div>
        </div>
    )
}

export default CompanySetup
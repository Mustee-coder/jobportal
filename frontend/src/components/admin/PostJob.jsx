import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'

import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { companies } = useSelector(store => store.company)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  // safer company selection using _id
  const selectChangeHandler = (value) => {
    setInput({ ...input, companyId: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!input.title || !input.companyId) {
      toast.error("Title and Company are required")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/jobs")
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

      <div className="flex items-center justify-center px-4 py-10 sm:py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl bg-white p-4 sm:p-6 md:p-8 border border-gray-200 shadow-lg rounded-md"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Field label="Title" name="title" input={input} onChange={changeEventHandler} required />
            <Field label="Description" name="description" input={input} onChange={changeEventHandler} required />
            <Field label="Requirements" name="requirements" input={input} onChange={changeEventHandler} required />
            <Field label="Salary" name="salary" type="number" input={input} onChange={changeEventHandler} required />
            <Field label="Location" name="location" input={input} onChange={changeEventHandler} required />
            <Field label="Job Type" name="jobType" input={input} onChange={changeEventHandler} />
            <Field label="Experience (years)" name="experience" type="number" input={input} onChange={changeEventHandler} />

            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                required
              />
            </div>

            {/* Company Select */}
            <div className="sm:col-span-2">
              <Label>Company</Label>

              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company._id}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-500 mt-2">
                  Please register a company first
                </p>
              )}
            </div>

          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full my-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Post New Job"
            )}
          </Button>

        </form>
      </div>
    </div>
  )
}

const Field = ({ label, name, input, onChange, type = "text", required }) => (
  <div>
    <Label>{label}</Label>
    <Input
      type={type}
      name={name}
      value={input[name]}
      onChange={onChange}
      required={required}
    />
  </div>
)

export default PostJob
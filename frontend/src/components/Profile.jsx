import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* PROFILE CARD */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 md:p-8'>

                {/* HEADER */}
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>

                    <div className='flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left'>
                        <Avatar className="h-20 w-20 md:h-24 md:w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
                        </Avatar>

                        <div>
                            <h1 className='font-medium text-lg md:text-xl'>
                                {user?.fullname}
                            </h1>
                            <p className='text-gray-600 text-sm md:text-base'>
                                {user?.profile?.bio}
                            </p>
                        </div>
                    </div>

                 <Button
    onClick={() => setOpen(true)}
    variant="outline"
    className="w-full sm:w-auto flex items-center justify-center gap-2"
    aria-label="Edit profile"
>
    <Pen className="w-4 h-4" />
    <span className="sm:hidden">Edit</span>
</Button>
                </div>

                {/* CONTACT */}
                <div className='my-6 space-y-3'>
                    <div className='flex items-center gap-3 text-sm md:text-base'>
                        <Mail className="w-4 h-4" />
                        <span className="break-all">{user?.email}</span>
                    </div>

                    <div className='flex items-center gap-3 text-sm md:text-base'>
                        <Contact className="w-4 h-4" />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* SKILLS */}
                <div className='my-6'>
                    <h1 className='font-semibold mb-2'>Skills</h1>

                    <div className='flex flex-wrap gap-2'>
                        {
                            user?.profile?.skills?.length !== 0
                                ? user?.profile?.skills?.map((item, index) => (
                                    <Badge key={index}>{item}</Badge>
                                ))
                                : <span className="text-gray-500">NA</span>
                        }
                    </div>
                </div>

                {/* RESUME */}
                <div className='grid w-full max-w-sm gap-2'>
                    <Label className="text-md font-bold">Resume</Label>

                    {
                        isResume ? (
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={user?.profile?.resume}
                                className='text-blue-500 hover:underline break-all text-sm'
                            >
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : (
                            <span className="text-gray-500">NA</span>
                        )
                    }
                </div>
            </div>

            {/* APPLIED JOBS */}
            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-4 md:p-0'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
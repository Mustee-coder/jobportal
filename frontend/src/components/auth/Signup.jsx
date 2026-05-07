import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(input).forEach(key => {
            if (input[key]) formData.append(key, input[key]);
        });

        try {
            dispatch(setLoading(true));

            const res = await axios.post(
                `${USER_API_END_POINT}/register`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Signup failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    return (
        <div>
            <Navbar />

            <div className='flex items-center justify-center px-4'>
                <form className='w-full max-w-lg border rounded-md p-6 my-10' onSubmit={submitHandler}>

                    <h1 className='font-bold text-2xl mb-6'>Sign Up</h1>

                    {/* Full name */}
                    <div className='my-3'>
                        <Label>Full Name</Label>
                        <Input name="fullname" value={input.fullname} onChange={changeEventHandler} />
                    </div>

                    {/* Email */}
                    <div className='my-3'>
                        <Label>Email</Label>
                        <Input name="email" type="email" value={input.email} onChange={changeEventHandler} />
                    </div>

                    {/* Phone */}
                    <div className='my-3'>
                        <Label>Phone Number</Label>
                        <Input name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />
                    </div>

                    {/* Password */}
                    <div className='my-3'>
                        <Label>Password</Label>
                        <Input name="password" type="password" value={input.password} onChange={changeEventHandler} />
                    </div>

                    {/* Role */}
                    <div className='my-4'>
                        <Label>Select Role</Label>

                        <div className='flex gap-6 mt-2'>
                            <label className='flex items-center gap-2'>
                                <input type="radio" name="role" value="student" onChange={changeEventHandler} />
                                Student
                            </label>

                            <label className='flex items-center gap-2'>
                                <input type="radio" name="role" value="recruiter" onChange={changeEventHandler} />
                                Recruiter
                            </label>
                        </div>
                    </div>

                    {/* File */}
                    <div className='my-4'>
                        <Label>Profile Picture</Label>
                        <Input type="file" accept="image/*" onChange={changeFileHandler} />
                    </div>

                    {/* Button */}
                    {
                        loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">
                                Signup
                            </Button>
                        )
                    }

                    <p className='text-sm text-center'>
                        Already have an account?{" "}
                        <Link to="/login" className='text-blue-600'>
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Signup
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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));

            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                { withCredentials: true }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/");
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />

            <div className='flex items-center justify-center px-4'>
                <form
                    onSubmit={submitHandler}
                    className='w-full max-w-md border border-gray-200 rounded-md p-6 my-10'
                >
                    <h1 className='font-bold text-2xl mb-6'>Login</h1>

                    {/* Email */}
                    <div className='my-3'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com"
                        />
                    </div>

                    {/* Password */}
                    <div className='my-3'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                        />
                    </div>

                    {/* Role */}
                    <div className='my-5'>
                        <Label className="mb-2 block">Select Role</Label>

                        <div className='flex gap-6'>
                            <label className='flex items-center gap-2'>
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    onChange={changeEventHandler}
                                />
                                Student
                            </label>

                            <label className='flex items-center gap-2'>
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    onChange={changeEventHandler}
                                />
                                Recruiter
                            </label>
                        </div>
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
                                Login
                            </Button>
                        )
                    }

                    {/* Link */}
                    <p className='text-sm text-center'>
                        Don't have an account?{" "}
                        <Link to="/signup" className='text-blue-600'>
                            Signup
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login
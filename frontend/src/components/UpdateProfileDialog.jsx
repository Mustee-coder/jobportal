import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null
    })

    // sync user → form
    useEffect(() => {
        if (user) {
            setInput({
                fullname: user.fullname || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.profile?.bio || "",
                skills: user.profile?.skills?.join(", ") || "",
                file: null
            })
        }
    }, [user])

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("fullname", input.fullname)
            formData.append("email", input.email)
            formData.append("phoneNumber", input.phoneNumber)
            formData.append("bio", input.bio)
            formData.append("skills", input.skills)

            if (input.file) {
                formData.append("file", input.file)
            }

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Update failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent
                className="w-[95%] sm:max-w-lg"
            >
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-4">

                    <Field label="Name">
                        <Input name="fullname" value={input.fullname} onChange={changeEventHandler} />
                    </Field>

                    <Field label="Email">
                        <Input name="email" value={input.email} onChange={changeEventHandler} />
                    </Field>

                    <Field label="Number">
                        <Input name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />
                    </Field>

                    <Field label="Bio">
                        <Input name="bio" value={input.bio} onChange={changeEventHandler} />
                    </Field>

                    <Field label="Skills">
                        <Input name="skills" value={input.skills} onChange={changeEventHandler} />
                    </Field>

                    <Field label="Resume">
                        <Input type="file" accept="application/pdf" onChange={fileChangeHandler} />
                    </Field>

                    <DialogFooter>
                        <Button className="w-full" disabled={loading} type="submit">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update"
                            )}
                        </Button>
                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>
    )
}

const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1">
        <Label>{label}</Label>
        {children}
    </div>
)

export default UpdateProfileDialog
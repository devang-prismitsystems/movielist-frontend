"use client"
import Apiservices from '@/apiservices/apiServices'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast'

type Inputs = {
    email: string
    password: string
}

const Signup = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        try {
            const result = await Apiservices.signup(data);
            if (result.success) {
                toast.success(result.message);
                router.push('/login')
            } else {
                toast.error(result?.response?.data?.message)
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="main-wrap flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-[48px] leading-[50px] md:text-[64px] md:leading-[80px] font-semibold ">
                    Sign up
                </h2>
            </div>


            <div className="mt-10 w-[300px] max-w-full mx-auto">
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="">
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required", pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${errors.email
                                        ? "border-errorColor bg-errorBg shake"
                                        : "border-inputColor focus:border-foregroundColor focus:bg-inputHover"
                                        }`}
                                    placeholder="Email"
                                />
                            </div>
                            {errors.email && <p className="text-sm mt-2 text-errorColor">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="mt-6">
                                <input
                                    id="password"
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long"
                                        },
                                        validate: {
                                            hasUpperCase: value => /[A-Z]/.test(value) || "Password must have at least one uppercase letter",
                                            hasLowerCase: value => /[a-z]/.test(value) || "Password must have at least one lowercase letter",
                                            hasNumber: value => /[0-9]/.test(value) || "Password must have at least one number",
                                            hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must have at least one special character"
                                        }
                                    })}
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${errors.password
                                        ? "border-errorColor bg-errorBg"
                                        : "border-inputColor focus:border-foregroundColor focus:bg-inputHover"
                                        }`}
                                    placeholder="Password"
                                />
                            </div>
                            {errors.password && <p className="text-sm mt-2 text-errorColor">{errors.password.message}</p>}
                        </div>

                        <div className="mt-6">

                            <button type="submit" className='btn_primary w-full !p-[15px]'>
                                {isLoading ? "Loading..." : "Sign up"}
                            </button>

                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 ">
                        already member?
                        <Link href="/login" className="font-semibold ml-2">Sign in</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Signup
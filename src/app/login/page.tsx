"use client"
import Apiservices from '@/apiservices/apiServices'
import { useAuth } from '@/hooks/authContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast'

type Inputs = {
    email: string;
    password: string;
    rememberMe: boolean;
}

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { login, user, loading } = useAuth();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>();


    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setValue("email", savedEmail);
        }
    }, [setValue]);


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        try {
            const result = await Apiservices.login(data);
            if (result.success) {
                toast.success(result.message);
                router.push('/movies');
                login(result.token);
                if (data.rememberMe) {
                    localStorage.setItem('rememberedEmail', data.email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
            } else {
                toast.error(result?.response?.data?.message)
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }
    if (user) {
        router.push('/movies')
        return null;
    }
    return (
        <div className=" flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 main-wrap">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-[48px] leading-[50px] md:text-[64px] md:leading-[80px] font-semibold ">
                    Sign in
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
                                    autoComplete="email"
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
                                    autoComplete="current-password"
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
                                        ? "border-errorColor bg-errorBg shake"
                                        : "border-inputColor focus:border-foregroundColor focus:bg-inputHover"
                                        }`}
                                    placeholder="Password"
                                />
                            </div>
                            {errors.password && <p className="text-sm mt-2 text-errorColor">{errors.password.message}</p>}
                        </div>


                        <div className="mt-6">
                            <div className="flex justify-center items-center">
                                <label className="ml-2 block text-sm leading-5 flex items-center gap-2 cursor-pointer">
                                    <div className='custom-checkbox'>
                                        <input type="checkbox" className="rounded-md h-4 w-4 transition 
                                   duration-150 ease-in-out" {...register("rememberMe")} />
                                        <span className='checkmark'></span>
                                    </div>
                                    Remember me</label>
                            </div>

                        </div>

                        <div className="mt-6">

                            <button type="submit" className='btn_primary w-full !p-[15px]'>
                                {isLoading ? "Loading..." : "Login"}
                            </button>

                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 ">
                        Not a member?
                        <Link href="/signup" className="font-semibold ml-2">Sign up</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login
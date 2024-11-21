"use client"
import Apiservices from '@/apiservices/apiServices'
import { useAuth } from '@/hooks/authContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast'

type Inputs = {
    email: string
    password: string
}

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { login, user, loading } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        try {
            const result = await Apiservices.login(data);
            if (result.success) {
                toast.success(result.message);
                router.push('/movies')
                login(result.token)
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
        return;
    }
    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold ">
                    Sign in
                </h2>
            </div>


            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="py-8 px-4 sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="mt-6">
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${errors.email
                                        ? "border-errorColor bg-errorBg"
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
                                    {...register("password", { required: "Password is required" })}
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
                            <div className="flex justify-center items-center">
                                <input id="remember_me" type="checkbox" value="1" className="rounded-md h-4 w-4 transition duration-150 ease-in-out" />
                                <label className="ml-2 block text-sm leading-5">Remember me</label>
                            </div>

                        </div>

                        <div className="mt-6">

                            <button type="submit" className='btn_primary w-full'>
                                {isLoading ? "Loading..." : "Sign up"}
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
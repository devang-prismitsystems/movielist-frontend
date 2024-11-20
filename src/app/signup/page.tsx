"use client"
import Apiservices from '@/apiservices/apiServices'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast'

type Inputs = {
    email: string
    password: string
}

const Signup = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const result = await Apiservices.signup(data);
        if (result.success) {
            toast.success(result.message);
            router.push('/login')
        } else {
            toast.error(result?.response?.data?.message)
        }
    }
    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold ">
                    Sign up
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

                            <button type="submit" className='btn_primary w-full'>
                                Sign up
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
"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { movieImgUrl } from "../../config";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Inputs = {
    title: string;
    year: string;
    poster: FileList;
};

interface MovieFormProps {
    onSubmit: SubmitHandler<Inputs>;
    initialValues?: { title: string; year: string };
    movieId?: any;
    existingImage?: string;
    isLoading: boolean;
}

const MovieForm: React.FC<MovieFormProps> = ({ onSubmit, initialValues, movieId, existingImage, isLoading }) => {

    const router = useRouter()
    const [imagePreview, setImagePreview] = useState<string | undefined | null>(existingImage || "");
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: initialValues,
    });
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file: any = event.target.files;
        setValue("poster", file);
        const maxSize = 4 * 1024 * 1024;
        if (file && file.length === 1) {
            if (file[0].size > maxSize) {
                toast.error("Please select files smaller than 4 MB");
                event.target.value = "";
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file[0]);
        } else {
            toast.error("You can upload only one image");
        }
    };

    return (
        <div className="container mx-auto px-6 rounded-md flex flex-col justify-center gap-8">
            <h1 className="text-2xl md:text-4xl font-semibold leading-tight md:leading-10 pt-8">
                {movieId ? "Edit Movie" : "Add a New Movie"}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className=" hidden md:block">
                        <div
                            className={`relative w-full max-w-[473px] h-[300px] md:h-[504px] rounded-md border-2 border-dashed overflow-hidden ${errors.poster
                                ? "border-errorColor"
                                : "border-foregroundColor"
                                }`}
                        >
                            <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 items-center justify-center cursor-pointer z-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <path
                                        d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                                        fill="white"
                                    />
                                </svg>
                                <span>Drop an image here</span>
                            </div>
                            {imagePreview && <img src={imagePreview || ""} className="w-full h-full object-cover relative z-[1]" />}
                            <input
                                id="poster"
                                type="file"
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-[1]"
                                required={movieId ? false : true}
                                // {...register("poster")}
                                onChange={handleFileChange}
                            />
                        </div>
                        {errors.poster && <p className="text-sm mt-2 text-errorColor">{errors.poster.message}</p>}
                    </div>
                    <div className="block ">
                        <div className="my-2 md:max-w-[362px]">
                            <input
                                id="title"
                                placeholder="Title"
                                type="text"
                                {...register("title", { required: "Title is required" })}
                                className={`w-full px-4 py-2.5  border rounded-lg outline-none transition-all ${errors.title
                                    ? "border-errorColor bg-errorBg"
                                    : "border-inputColor focus:border-foregroundColor focus:bg-inputHover"
                                    }`}
                            />
                        </div>
                        {errors.title && <span className="text-sm mt-2 text-errorColor">{errors.title.message}</span>}

                        <div className=" md:max-w-[216px] mt-6">
                            <input
                                id="year"
                                type="number"
                                {...register("year", { required: "Publishing year is required" })}
                                className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${errors.year
                                    ? "border-errorColor bg-errorBg"
                                    : "border-inputColor focus:border-foregroundColor focus:bg-inputHover"
                                    }`}
                                placeholder="Publishing Year"
                            />
                        </div>
                        {errors.year && <p className="text-sm mt-2 text-errorColor">{errors.year.message}</p>}

                        <div
                            className={`relative w-full h-[300px] md:h-[400px] rounded-md border-2 border-dashed overflow-hidden md:hidden mt-6 ${errors.poster
                                ? "border-errorColor"
                                : "border-foregroundColor"
                                }`}
                        >
                            <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 items-center justify-center cursor-pointer z-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <path
                                        d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                                        fill="white"
                                    />
                                </svg>
                                <span>Drop an image here</span>
                            </div>
                            {imagePreview && <Image width={100} height={100} src={imagePreview || ""} className="w-full h-full object-cover relative z-[1]" alt="Movie poster" />}
                            <input
                                id="poster"
                                type="file"
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-[1]"
                                {...register("poster")}
                                onChange={handleFileChange}
                            />
                        </div>
                        {errors.poster && <p className="text-sm mt-2 text-errorColor">{errors.poster.message}</p>}


                        <div className="  items-center gap-4 mt-10 md:mt-16 flex">
                            <button type="button" className="btn_secondary w-full md:w-[168px]" onClick={() => router.push(`/movies`)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn_primary w-full md:w-[179px] flex justify-center items-center ">
                                {isLoading ? 'Loading...' : "Submit"}
                            </button>
                        </div>
                    </div>

                </div>


            </form>
        </div>

    );
};

export default MovieForm;

"use client";

import Apiservices from "@/apiservices/apiServices";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MovieForm from "./MovieForm"; // Import the reusable MovieForm
import { movieImgUrl } from "../../config";

const EditMovie = ({ id }: { id: any }) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [movieDetails, setMovieDetails] = useState<any>({});
    const router = useRouter();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const result = await Apiservices.getMovieDetails(id);
                if (result.success) {
                    setMovieDetails(result.data);
                } else {
                    toast.error(result?.response?.data?.message || "Something went wrong");
                }
            } catch (error: any) {
                console.error("Error fetching movie details: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovieDetails();
    }, [id]);

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true)
            let formData = new FormData();
            formData.append("id", id);
            formData.append("title", data.title);
            formData.append("publish_year", data.year);
            if (data.poster && data.poster[0]) {
                formData.append("poster", data.poster[0]);
            }

            const result = await Apiservices.editMovie(formData);
            if (result.success) {
                toast.success(result.message);
                router.push("/movies");
            } else {
                toast.error(result?.response?.data?.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error updating movie: ", error);
            toast.error("An error occurred while updating the movie.");
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            {
                !isLoading ?
                    <MovieForm
                        onSubmit={onSubmit}
                        initialValues={{
                            title: movieDetails?.title || "",
                            year: movieDetails?.publish_year || "",
                        }}
                        movieId={id}
                        existingImage={`${movieDetails?.poster}`}
                        isLoading={isLoading}
                    />
                    :
                    <div className="flex justify-center items-center h-screen">Loading...</div>
            }
        </>
    );
};

export default EditMovie;

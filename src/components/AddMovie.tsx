"use client";

import Apiservices from '@/apiservices/apiServices';
import MovieForm from '@/components/MovieForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddMovie = () => {
    const router = useRouter();
    const [isLoading, SetIsLoading] = useState(false)
    const onSubmit = async (data: any) => {
        try {
            SetIsLoading(true)
            let formData = new FormData();
            formData.append('title', data.title);
            formData.append('publish_year', data.year);
            if (data.poster[0]) {
                formData.append('poster', data.poster[0]);
            }

            const result = await Apiservices.addMovie(formData);
            if (result.success) {
                toast.success(result.message);
                router.push('/movies');
            } else {
                toast.error(result?.response?.data?.message || 'Something went wrong');
            }
        } catch (error) {
            toast.error('An error occurred while adding the movie.');
        } finally {
            SetIsLoading(false)
        }
    };

    return <MovieForm onSubmit={onSubmit} isLoading={isLoading} />;
};

export default AddMovie;

'use client';
import Apiservices from '@/apiservices/apiServices';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import { useAuth } from '@/hooks/authContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const Movies = () => {
    const router = useRouter();
    const { logout } = useAuth()
    const [movies, setMovies] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMovieList = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await Apiservices.getMoviesList(currentPage);
            if (result.success) {
                setMovies(result.data);
                setTotalPages(result.totalPages);
            } else {
                setError(result?.response?.data?.message || 'Failed to fetch movies');
            }
        } catch (err) {
            setError('An error occurred while fetching movies.');
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchMovieList();
    }, [currentPage, fetchMovieList]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleCardClick = useCallback((id: number) => {
        router.push(`/movies/${id}`);
    }, [router]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        router.push('/login');
    }, [router]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h2 className="text-2xl font-semibold">{error}</h2>
            </div>
        );
    }


    return (
        <div className="container px-6 py-10">
            <div className="flex justify-between pt-8 pb-20">
                <div className="flex items-center gap-4">
                    <h2 className="text-4xl font-semibold leading-10">My movies</h2>
                    <button onClick={() => router.push('movies/add')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" className="max-w-[20px] max-h-[20px]">
                            <path d="M15.3334 7.33332H12.6667V12.6667H7.33342V15.3333H12.6667V20.6667H15.3334V15.3333H20.6667V12.6667H15.3334V7.33332ZM14.0001 0.666656C6.64008 0.666656 0.666748 6.63999 0.666748 14C0.666748 21.36 6.64008 27.3333 14.0001 27.3333C21.3601 27.3333 27.3334 21.36 27.3334 14C27.3334 6.63999 21.3601 0.666656 14.0001 0.666656ZM14.0001 24.6667C8.12008 24.6667 3.33341 19.88 3.33341 14C3.33341 8.11999 8.12008 3.33332 14.0001 3.33332C19.8801 3.33332 24.6667 8.11999 24.6667 14C24.6667 19.88 19.8801 24.6667 14.0001 24.6667Z" fill="white" />
                        </svg>
                    </button>
                </div>
                <button className="flex items-center gap-4" onClick={() => logout()}>
                    <p className="font-bold hidden md:block">Logout</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="max-w-[20px] max-h-[20px]">
                        <path d="M18.6667 6.66667L16.7867 8.54667L18.8933 10.6667H8V13.3333H18.8933L16.7867 15.44L18.6667 17.3333L24 12L18.6667 6.66667ZM2.66667 2.66667H12V0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H12V21.3333H2.66667V2.66667Z" fill="white" />
                    </svg>
                </button>
            </div>

            {movies.length === 0 ? <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
                <h2 className="text-2xl md:text-4xl font-semibold leading-tight md:leading-10">
                    Your movie list is empty
                </h2>
                <button
                    className="btn_primary mt-4 md:mt-6 px-6 py-2 text-sm md:text-base"
                    onClick={() => router.push(`/movies/add`)}
                >
                    Add a new movie
                </button>
            </div> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {movies.map((movie) => (
                    <div key={movie.id} onClick={() => handleCardClick(movie.id)} className="cursor-pointer">
                        <Card title={movie.title} year={movie.publish_year} img={movie.poster} />
                    </div>
                ))}
            </div>}

            <div className="flex justify-center items-center mt-10 md:mt-[100px]">
                <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Movies;

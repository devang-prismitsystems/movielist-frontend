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

    const fetchMovieList = useCallback(async () => {
        setLoading(true);
        try {
            const result = await Apiservices.getMoviesList(currentPage);
            if (result.success) {
                setMovies(result.data);
                setTotalPages(result.totalPages);
            } else {
                toast.error(result?.response?.data?.message || 'Failed to fetch movies');
            }
        } catch (err) {
            toast.error('An error occurred while fetching movies.');
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

    const handleCardClick = (id: number) => {
        router.push(`/movies/${id}`);
    };

    if (loading) {
        return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " >
            <h1 className="font-bold"> Loading...</h1>
        </div>;
    }
    return (
        <div className="container main-wrap !mb-0 flex flex-col px-6">
            <div className="flex justify-between py-20 md:py-[120px]  flex-initial">
                <div className="flex items-center gap-3">
                    <h2 className="text-[32px] md:text-[48px] font-semibold leading-[40px] md:leading-[56px]">My movies</h2>
                    <button onClick={() => router.push('movies/add')} className='mt-2'>
                        <img src="./assets/roundedPlus.svg" alt="" />
                    </button>
                </div>
                <button className="flex items-center gap-3" onClick={() => logout()}>
                    <p className="font-bold hidden md:block">Logout</p>
                    <img src="./assets/logout.svg" alt="" />
                </button>
            </div>

            {movies.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center  px-4 text-center">
                <h2 className=" text-[32px] md:text-[48px] font-semibold leading-[40px] md:leading-[56px] text-white">
                    Your movie list is empty
                </h2>
                <button
                    className="btn_primary mt-10 !py-4 !px-7  text-sm md:text-base !font-bold"
                    onClick={() => router.push(`/movies/add`)}
                >
                    Add a new movie
                </button>
            </div> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-y-6 md:gap-x-6">
                {movies.map((movie) => (
                    <div key={movie.id} onClick={() => handleCardClick(movie.id)} className="cursor-pointer">
                        <Card title={movie.title} year={movie.publish_year} img={movie.poster} />
                    </div>
                ))}
            </div>}

            {movies.length > 0 && <div className="flex justify-center items-center mt-10 mb-10 md:mt-[120px] md:mb-[109px]">
                <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
            </div>}
        </div>
    );
};

export default Movies;

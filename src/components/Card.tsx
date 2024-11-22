import Image from 'next/image';
import React from 'react'

type CardType = {
    title: string;
    year: string;
    img: string;
    onDelete: () => void; // Add the delete function type
};

const Card = ({ title, year, img, onDelete }: CardType) => {
    return (
        <div className='w-full px-[8px] pt-[8px] pb-3 md:pb-[16px] relative rounded-xl overflow-hidden bg-cardColor hover:bg-inputColor'>
            <button className='block w-6 h-6 absolute z-[1] right-3 top-3 rounded-full bg-white'
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
            >
                <img src='./assets/deleteIcon.svg' />
            </button>
            <div className=' -mt-2 -mx-2  md:mt-0 md:mx-0'>
                <img src={`${img}`} alt="Card Image" className='w-full h-[246px] sm:h-[400px] md:rounded-lg object-cover' />
            </div>
            <div className='mt-3 md:mt-4 w-full px-1 md:px-2'>
                <h2 className='mb-2 text-base md:text-xl font-bold md:font-medium leading-6 md:leading-8'>{title}</h2>
                <p className='text-sm  font-normal leading-6'>{year}</p>
            </div>

        </div>
    )
}

export default Card
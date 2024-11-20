import React from 'react'
import { movieImgUrl } from '../../config';

type CardType = {
    title: string;
    year: string;
    img: string;
}
const Card = ({ title, year, img }: CardType) => {
    return (
        <div className='w-full px-[8px] pt-[8px] pb-[16px] rounded-lg bg-cardColor hover:bg-inputColor'>

            <div >
                <img src={`${movieImgUrl}${img}`} alt="Card Image" className='w-full h-[246px] sm:h-[400px] rounded-lg object-cover' />
            </div>
            <div className='mt-4'>
                <h2 className='mb-2 font-semibold'>{title}</h2>
                <p>{year}</p>
            </div>
        </div>
    )
}

export default Card
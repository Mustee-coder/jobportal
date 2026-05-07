import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';

import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "UI/UX Designer",
    "Data Scientist",
    "DevOps Engineer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="px-3 sm:px-4">

            <Carousel className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl mx-auto my-6 sm:my-10">

                <CarouselContent>

                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
                        >
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                aria-label={`Search jobs for ${cat}`}
                                className="
                                    rounded-full
                                    text-xs sm:text-sm
                                    px-3 sm:px-4 py-2
                                    whitespace-nowrap
                                    w-full sm:w-auto
                                    hover:bg-[#6A38C2]
                                    hover:text-white
                                    active:scale-95
                                "
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}

                </CarouselContent>

                {/* Hide arrows on mobile */}
                <div className="hidden sm:block">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>

            </Carousel>

        </div>
    )
}

export default CategoryCarousel
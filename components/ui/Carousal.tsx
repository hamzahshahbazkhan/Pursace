import React, { useState } from "react";
import { MediumButton } from "./Button";

interface CarouselProps {
    items: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === items.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="relative overflow-hidden w-2/3 h-full "
            style={{ zIndex: 9 }}>
            <div
                className=" pt-2 flex transition-transform duration-75 ease-in-out"
                style={{ zIndex: 8, transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="min-w-full flex justify-center items-center h-full"
                    >
                        {item}
                    </div>
                ))}
            </div>

            <div
                className="absolute h-full w-20 top-1/2 left-0 transform -translate-y-1/2 bg-neutral-950 "
                aria-label="Go to previous slide"
                style={{ zIndex: 10 }}
            >
                <div className="h-full pb-12 flex justify-center items-center align-middle">
                    <MediumButton className="h-10 w-10" label={<img className="w-[80%]" src='arrow_back.svg' />} onClick={goToPrevious} />
                </div>

            </div>

            <div
                className="absolute h-full w-20 top-1/2 right-0 transform -translate-y-1/2 bg-neutral-950 "
                aria-label="Go to previous slide"
                style={{ zIndex: 10 }}
            >
                <div className="h-full pb-12 flex justify-center items-center align-middle">
                    <MediumButton className="h-10 w-10" label={<img className="w-[80%]" src='arrow_forward.svg' />} onClick={goToNext} />

                </div>

            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
                style={{ zIndex: 4 }}>
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3  ${index === currentIndex ? "bg-green-600" : "bg-black"} border-2 border-green-600`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;

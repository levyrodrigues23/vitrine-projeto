import { useState } from "react";
import ArrowLeft from "../../../assets/icons/arrow-left.svg?react";
import ArrowRight from "../../../assets/icons/arrow-right.svg?react";
import Icon from "../icon/icon";

interface CarouselProps {
    images?: string[];    
    "aria-label"?: string;
}


export default function Carousel({
    images = [],
    "aria-label": ariaLabel,
}: CarouselProps) {
    const [index, setIndex] = useState(0);

    if (images.length === 0) return null;

    const last = images.length - 1;

    const goPrev = () => {
        setIndex((i) => (i === 0 ? last : i - 1));
    };

    const goNext = () => {
        setIndex((i) => (i === last ? 0 : i + 1));
    };

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={ariaLabel ?? "Carrossel de imagens"}
            className="relative max-w-2xl w-full aspect-video overflow-hidden rounded-xl bg-gray-200"
        >
            <img
                src={images[index]}
                alt={`Slide ${index + 1} de ${images.length}`}
                className="size-full object-cover"
            />

            {images.length > 1 ? (
                <>
                    <button
                        type="button"
                        onClick={goPrev} 
                        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white backdrop-blur-sm hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label="Slide anterior"
                    >
                        <span aria-hidden>
                            <Icon svg={ArrowLeft} />
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white backdrop-blur-sm hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label="Próximo slide"
                    >
                        <span aria-hidden>
                            <Icon svg={ArrowRight}/>

                        </span>
                    </button>
                </>
            ) : null}
        </div>
    );
}

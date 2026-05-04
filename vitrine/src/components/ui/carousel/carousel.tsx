interface CarouselProps {
    images?: string[];
}


export default function Carousel({ images = [] }: CarouselProps) {
    if (images.length === 0) return null;

    return (
        <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-gray-200">
            {images.map((src, index) => (
                <img 
                    key={index}
                    src={src} 
                    alt={`Slide ${index}`} 
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ))}
        </div>
    );
}

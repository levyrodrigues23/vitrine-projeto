import { Text } from "../../ui";
import Carousel from "../../ui/carousel/carousel";


interface HeroProps{
    title:string;
    subtitle:string;
    images: string[];
    className?: string;
}

export default function Hero({
    title, subtitle, images
}: HeroProps){
    return (
        <section className="flex flex-col md:flex-row items-center justify-center p-4" aria-label={title}>
            <Text as="h1" className="" variant="title-1">{title}</Text>
            <Text as="p" variant="body-md">
                {subtitle}
            </Text>
            <Carousel images={images} aria-label={title} />
        </section>
    )
}
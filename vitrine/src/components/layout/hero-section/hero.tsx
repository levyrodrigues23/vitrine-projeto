import Carousel from "../../ui/carousel/carousel";
import Text from "../../ui/text/text";

interface HeroProps{
    title:string;
    subtitle:string;
    images: string[];
}

export default function Hero({
    title, subtitle, images
}: HeroProps){
    return (
        <section>
            <Text as="h1" variant="title-1">{title}</Text>
            <Text as="p" variant="body-md"> {subtitle} </Text>
            <Carousel />
        </section>
    )
}
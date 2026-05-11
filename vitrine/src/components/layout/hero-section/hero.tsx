import { Input, Text } from "../../ui";
import Carousel from "../../ui/carousel/carousel";
import Separator from "../separator/separator";

interface HeroProps {
  title: string;
  subtitle: string;
  images: string[];
  className?: string;
}

export default function Hero({ title, subtitle, images }: HeroProps) {
  return (
    <section className="mb-12">
      <div
        className="flex flex-col md:flex-row items-center justify-center gap-8 p-4"
        aria-label={title}
      >
        <div className="space-y-4 md:m-30">
          <Text as="h1" className="" variant="title-1">
            {title}
          </Text>
          <Text as="p" variant="body-lg" className="md:w-115">
            {subtitle}
          </Text>
          <Input placeholder="Buscar projetos..." className="max-w-lg" />
        </div>
        <Carousel images={images} aria-label={title} />
      </div>

      <div className="mt-6 w-screen relative left-1/2 right-1/2 -translate-x-1/2">
        <Separator/>
      </div>
    </section>
  );
}

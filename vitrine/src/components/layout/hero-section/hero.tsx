import { Icon, Input, Text } from "../../ui";
import Carousel from "../../ui/carousel/carousel";
import Separator from "../separator/separator";
import HomeIcon from "../../../assets/icons/home-icon.svg?react";

interface HeroProps {
  title: string;
  subtitle: string;
  images?: string[];
  className?: string;
  showSearch?: boolean;
  showSeparator?: boolean;
  showIcon?: boolean;
  iconSvg?: React.FC<React.ComponentProps<"svg">>;
  iconSize?: "sm" | "md" | "lg" | "xl" | "xl2" | "xl3";
}

export default function Hero({
  title,
  subtitle,
  images,
  showSearch = false,
  showSeparator = false,
  showIcon = false,
  iconSvg,
  iconSize,
}: HeroProps) {
  const iconComponent = iconSvg ?? HomeIcon;
  const resolvedIconSize = iconSize ?? "xl3";

  return (
    <section className="mb-12">
      <div
        className="flex flex-col md:flex-row items-center justify-center gap-8 p-4"
        aria-label={title}
      >
        <div className="space-y-4 md:m-30">
          
          <div className="flex items-center gap-5">
             <Text as="h1" className="" variant="title-1">
            {title}
          </Text>
          {showIcon ? (
            <Icon svg={iconComponent} size={resolvedIconSize} />
          ) : null}
          </div>
         
          <Text as="p" variant="body-lg" className="md:w-160">
            {subtitle}
          </Text>
          {showSearch ? (
            <Input placeholder="Buscar projetos..." className="max-w-lg" />
          ) : null}
        </div>
        <Carousel images={images} aria-label={title} />
      </div>

      <div className="mt-6 w-full">{showSeparator && <Separator />}</div>
    </section>
  );
}

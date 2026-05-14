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
  className,
  showSearch = false,
  showSeparator = false,
  showIcon = false,
  iconSvg,
  iconSize,
}: HeroProps) {
  const iconComponent = iconSvg ?? HomeIcon;
  const resolvedIconSize = iconSize ?? "xl3";
  const hasImages = Boolean(images?.length);

  return (
    <section
      className={`relative mb-12 overflow-hidden pb-6 md:pb-10 ${className ?? ""}`}
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:items-center"
        aria-label={title}
      >
        <div className="space-y-5 text-left">
          <div className="flex items-center gap-4">
            <Text as="h1" className="tracking-tight" variant="title-1">
              {title}
            </Text>
            {showIcon ? (
              <Icon svg={iconComponent} size={resolvedIconSize} />
            ) : null}
          </div>

          {subtitle ? (
            <Text
              as="p"
              variant="body-lg"
              className="text-gray-base-dark max-w-2xl"
            >
              {subtitle}
            </Text>
          ) : null}
          {showSearch ? (
            <Input
              placeholder="Buscar projetos..."
              className="w-full max-w-md bg-white/90 shadow-sm backdrop-blur border-gray-base/20"
            />
          ) : null}
        </div>
        {hasImages ? (
          <div className="w-full max-w-md md:max-w-lg md:justify-self-end">
            <Carousel images={images} aria-label={title} />
          </div>
        ) : null}
      </div>

      <div className="mt-6 w-full">
        {showSeparator && <Separator spacing="sm" />}
      </div>
    </section>
  );
}

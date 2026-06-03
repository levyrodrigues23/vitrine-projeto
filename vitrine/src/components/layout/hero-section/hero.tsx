import { Icon, Input, Text } from "../../ui";
import Carousel from "../../ui/carousel/carousel";
import Separator from "../separator/separator";
import HomeIcon from "../../../assets/icons/home-icon.svg?react";
import TypeIt from "typeit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { useNavigate } from "react-router";
import type { Project } from "../../../types/project.types";

interface HeroProps {
  title?: string;
  subtitle: string;
  images?: string[];
  className?: string;
  showSearch?: boolean;
  showSeparator?: boolean;
  showIcon?: boolean;
  iconSvg?: React.FC<React.ComponentProps<"svg">>;
  iconSize?: "sm" | "md" | "lg" | "xl" | "xl2" | "xl3";
  animatedWords?: string[];
  staticTitle?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  searchItems?: Project[];
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
  animatedWords = [],
  staticTitle,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  searchItems = [],
}: HeroProps) {
  const iconComponent = iconSvg ?? HomeIcon;
  const resolvedIconSize = iconSize ?? "xl3";
  const hasImages = Boolean(images?.length);

  const navigate = useNavigate();

  // controlled vs uncontrolled input
  const [internalValue, setInternalValue] = useState<string>(searchValue ?? "");
  useEffect(() => {
    if (searchValue !== undefined) setInternalValue(searchValue);
  }, [searchValue]);

  const inputValue = searchValue !== undefined ? searchValue : internalValue;

  // Fuse.js instance
  const fuse = useMemo(() => {
    const options: Fuse.IFuseOptions<Project> = {
      keys: ["title", "description"],
      threshold: 0.4,
    };
    return new Fuse(searchItems, options);
  }, [searchItems]);

  const [suggestions, setSuggestions] = useState<Project[]>([]);
  const debounceRef = useRef<number | null>(null);

  const runSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }
    const results = (
      fuse.search(trimmed, { limit: 6 }) as Fuse.FuseResult<Project>[]
    ).map((r) => r.item);
    setSuggestions(results);
  };

  const handleChange = (v: string) => {
    if (searchValue === undefined) setInternalValue(v);
    onSearchChange?.(v);

    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    // debounce 250ms
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - setTimeout returns number in browser
    debounceRef.current = window.setTimeout(() => runSearch(v), 250);
  };

  const handleSelect = (id: string) => {
    setSuggestions([]);
    navigate(`/projetos/${id}`);
  };

  const shouldAnimate = animatedWords.length > 0;

  return (
    <section
      className={`relative mb-12 overflow-hidden pb-6 md:pb-10 ${className ?? ""}`}
    >
      <div className="absolute inset-0" aria-hidden="true" />

      <div
        className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:items-center"
        aria-label={title}
      >
        <div className="space-y-5 text-left">
          <div className="flex items-start gap-4">
            <div className="flex flex-col">
              {!shouldAnimate ? (
                <Text as="h1" className="tracking-tight" variant="title-1">
                  {title}
                </Text>
              ) : (
                <>
                  <Text
                    as="h1"
                    className="tracking-tight leading-none"
                    variant="title-1"
                  >
                    {staticTitle}
                  </Text>

                  <div className="min-h-[1.2em]">
                    <Text
                      as="span"
                      variant="title-1"
                      className="
                        tracking-tight
                        leading-none
                        text-blue-600
                      "
                    >
                      <TypeIt
                        options={{
                          speed: 70,
                          deleteSpeed: 40,
                          waitUntilVisible: true,
                          loop: true,
                          cursor: true,
                        }}
                        getBeforeInit={(instance) => {
                          animatedWords.forEach((word) => {
                            instance.type(word).pause(2000).delete(word.length);
                          });

                          return instance;
                        }}
                      />
                    </Text>
                  </div>
                </>
              )}
            </div>

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
            <div className="relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearchSubmit?.(
                    inputValue ??
                      (
                        e.currentTarget.elements.namedItem(
                          "search",
                        ) as HTMLInputElement
                      )?.value ??
                      "",
                  );
                }}
              >
                <Input
                  name="search"
                  type="search"
                  value={inputValue}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Buscar projetos..."
                  className="w-full max-w-md bg-white/90 shadow-sm backdrop-blur border-gray-base/20"
                  aria-autocomplete="list"
                  aria-controls="hero-suggestions"
                />
              </form>

              {suggestions.length > 0 && (
                <ul
                  id="hero-suggestions"
                  className="absolute z-50 mt-1 w-full max-w-md rounded-md bg-white shadow-lg ring-1 ring-black/5"
                >
                  {suggestions.map((s) => (
                    <li
                      key={s.id}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onMouseDown={(e) => {
                        // prevent blur before click
                        e.preventDefault();
                        handleSelect(s.id);
                      }}
                    >
                      <div className="text-sm font-semibold text-black">
                        {s.title}
                      </div>
                      {s.description && (
                        <div className="text-xs text-gray-base">
                          {s.description}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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

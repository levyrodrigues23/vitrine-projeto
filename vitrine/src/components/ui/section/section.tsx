import Separator from "../../layout/separator/separator";
import Text from "../text/text";

interface SectionProps extends React.ComponentProps<"section"> {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  SectionWhite?: boolean;
  align?: "left" | "center";
  showSeparator?: boolean;
  separatorSpacing?: "none" | "sm" | "md" | "lg";
}

export default function 
Section({
  title,
  description,
  children,
  align = "left",
  showSeparator = true,
  separatorSpacing = "md",
  SectionWhite = false,
  className,
  ...props
}: SectionProps) {
  const alignmentClass = align === "center" ? "text-center" : "text-left";

  return (
    <section
      data-aos="fade-up"
      className={`mx-auto w-full max-w-6xl px-6 pb-12 space-y-4 ${alignmentClass} ${className ?? ""}`}
      {...props}
    >
      <Text as="h2" variant="title-2" className="my-13">
        {title}
      </Text>
      {description ? (
        <Text
          as="p"
          variant="body-lg"
          className={`text-gray-base ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          
          {description}
        </Text>
      ) : null}
      
      {SectionWhite ? <div className="bg-white rounded-2xl p-4 text-shadow-olive-200 shadow-2xl">{children}</div> : children}
      
      {showSeparator ? <Separator spacing={separatorSpacing}  variant="horizontal" /> : null}
    </section>
  );
}

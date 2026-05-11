import Text from "../text/text";

interface SectionProps extends React.ComponentProps<"section">{
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function Section({ title, description, children, ...props}: SectionProps) {
    return (
        <section className="p-4 md:p-8 gap-5" {...props}>
            <Text as="h1" variant="title-1">
                {title}
            </Text>
            {description ? (
                <Text as="p" variant="body-md">
                    {description}
                </Text>
            ) : null}
            {children}
        </section>
    );
}

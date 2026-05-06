import Text from "../text/text";

interface SectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function Section({ title, description, children }: SectionProps) {
    return (
        <section className="space-y-4">
            <Text as="h2" variant="title-2">
                {title}
            </Text>
            {description ? (
                <Text as="p" variant="body-md">
                    {description}
                </Text>
            ) : null}
            <div>{children}</div>
        </section>
    );
}

import Separator from "../../layout/separator/separator";
import Text from "../text/text";

interface SectionProps extends React.ComponentProps<"section">{
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function Section({ title, description, children, ...props}: SectionProps) {
    return (
        <section className="p-4 md:p-4 gap-5 text-center mt-5 space-y-2" {...props}>
            <Text as="h1" variant="title-2">
                {title}
            </Text>
            {description ? (
                <Text as="p" variant="body-lg">
                    {description}
                </Text>
            ) : null}
            {children}
            <Separator/>
        </section>
        
    );
}

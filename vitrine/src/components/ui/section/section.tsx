import Text from "../text/text";



interface SectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}


export default function Section({
    title,
    description,
    children
}: SectionProps) {


    return (
        <>
            <Text
                as="h2"
                variant="title-2"
            >
                {title}
            </Text>
            // Eu preciso ver isso novamente, pois o description pode ser obrigatorio posteriormente e terei q mudar essa lógica
            {description && (
                <Text
                    as="p"
                    variant="body-md"
                >
                    {description}
                </Text>
            )}

            {children}
        </>

    )
}
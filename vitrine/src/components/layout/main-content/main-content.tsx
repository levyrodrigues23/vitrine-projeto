import Container from "../../ui/container/container";

export interface MainContentProps {
    children: React.ReactNode;
    withContainer?: boolean;
}


export default function MainContent({ children, withContainer = true }: MainContentProps) {
    return (
        <main id="conteudo-principal" className="flex-1 w-full">
            {withContainer ? (
                <Container className="py-6 md:py-8">{children}</Container>
            ) : (
                children
            )}
        </main>
    );
}

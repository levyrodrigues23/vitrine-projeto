import Container from "../../ui/container/container";

export interface MainContentProps {
    children: React.ReactNode;
    withContainer?: boolean;
}


export default function MainContent({ children, withContainer = true }: MainContentProps) {
    return (
        <main id="conteudo-principal" className="flex-1 w-full bg-white-base">
            {withContainer ? (
                <Container className="">{children}</Container>
            ) : (
                children
            )}
        </main>
    );
}

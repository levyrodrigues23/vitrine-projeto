import { Button } from "../../components/ui/button/button";
import Container from "../../components/ui/container/container";
import Text from "../../components/ui/text/text";
import { Badge } from "../../components/ui/badge/badge";
import { Input } from "../../components/ui/input-text/input-text";
import { ProjectCard } from "../../components/features/project-card/project-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card/card";

export default function ComponentsExamplesPage() {
    return (
        <Container className="grid gap-10 ">
            <div className="flex justify-between">
                <Text variant="title-1"> texto 1 </Text>
                <Text variant="title-2"> texto 2 </Text>
                <Text variant="title-3"> texto 3 </Text>
                <Text variant="body-sm-bold"> texto 4 </Text>
                <Text variant="body-md"> texto 5 </Text>
                <Text variant="body-md-bold"> texto 6 </Text>
            </div>

            <div className="space-x-2">
                <Button size="sm" variant="primary"> Saiba Mais</Button>
                <Button size="md" variant="secondary"> Confirmar Solicitação</Button>
                <Button size="lg" variant="tertiary"> Recusar solicitação</Button>
                <Button size="lg" variant="quaternary"> Sobre o Projeto</Button>
                <Button size="lg" variant="primary" disabled > Botao </Button>
                <Button size="lg" variant="secondary" disabled > Botao </Button>
                <Button size="lg" variant="tertiary" disabled > Botao </Button>
                <Button size="lg" variant="quaternary" disabled > Botao </Button>
            </div>

            <div className="flex flex-col gap-4">
                <Text variant="title-2">Badges</Text>
                <div className="flex gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Text variant="title-2">Inputs</Text>
                <div className="max-w-sm space-y-4">
                    <Input placeholder="Input padrão..." />
                    <Input placeholder="Input desabilitado..." disabled />
                    <Input type="email" placeholder="Email..." />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Text variant="title-2">Cards base</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Simples</CardTitle>
                            <CardDescription>Apenas um card básico de demonstração.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Text variant="body-md">Conteúdo do card simples sem interatividade.</Text>
                        </CardContent>
                    </Card>
                    <Card variant="interactive">
                        <CardHeader>
                            <CardTitle>Card Interativo</CardTitle>
                            <CardDescription>Passe o mouse por cima.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Text variant="body-md">Este card tem um efeito de hover.</Text>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex flex-col gap-4 pb-20">
                <Text variant="title-2">Project Card (Feature)</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProjectCard 
                        title="Aplicativo de Gestão Acadêmica"
                        category="Desenvolvimento Web"
                        description="Um sistema completo para ajudar alunos a gerenciarem suas notas, faltas e cronograma de estudos durante o semestre letivo."
                        imageUrl="/images/logo-ufc.png" 
                    />
                    <ProjectCard 
                        title="Sem Imagem"
                        category="Pesquisa"
                        description="Este card demonstra como o componente se comporta quando não há uma imagem fornecida para o projeto."
                    />
                </div>
            </div>
        </Container>
    )
}
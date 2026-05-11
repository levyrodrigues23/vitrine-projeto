FROM node:20-alpine AS build

# Evita baixar navegadores pesados do Playwright
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /app

# Ativa o pnpm no container (seu projeto usa pnpm)
RUN corepack enable pnpm
    
# Copia os arquivos do pacote e o lockfile do pnpm
COPY package.json pnpm-lock.yaml ./

# Instala de forma muito mais rápida usando o pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
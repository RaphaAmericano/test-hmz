# Use a imagem Node.js como base
FROM node:20-alpine

RUN apk add --no-cache openssl libstdc++ postgresql-client

RUN apk add --no-cache bash

# Instalar dockerize

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar dependências
COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY src ./src

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação para o container
COPY . .

RUN npx prisma generate

RUN npm run build

# Expõe a porta onde a aplicação será executada
EXPOSE 3000

# Define o comando para iniciar a aplicação

CMD ["node", "dist/index.js"]

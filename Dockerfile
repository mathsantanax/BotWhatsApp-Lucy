# Use a imagem oficial do Node.js
FROM node:16-slim

# Instalar dependências do Puppeteer
RUN apt-get update && apt-get install -y \
    libgconf-2-4 \
    libnss3 \
    libx11-xcb1 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libxcomposite1 \
    libxdamage1 \
    libxtst6 \
    fonts-liberation \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY . /app

# Instala as dependências do Node.js
RUN npm install

# Expõe a porta
EXPOSE 8080

# Comando para rodar o bot
CMD ["node", "index.js"]

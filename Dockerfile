# Use uma imagem do Node.js com o Puppeteer compatível
FROM node:16-slim

# Instala as dependências do Puppeteer e outras bibliotecas necessárias
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libgbm-dev --no-install-recommends

# Instala o Node.js e Puppeteer
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copia os arquivos do projeto para o container
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando para rodar o bot
CMD ["node", "index.js"]

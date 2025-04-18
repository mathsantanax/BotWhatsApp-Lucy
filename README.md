
# Bot de WhatsApp com IA - Lucy

Este é um bot para WhatsApp que responde automaticamente a mensagens quando a palavra-chave **"lucy"** é mencionada. O bot integra com um agente de IA para responder perguntas de forma direta e sarcástica. Ele também funciona em grupos de WhatsApp, proporcionando uma experiência interativa e divertida.

## Funcionalidades

- Responde automaticamente a perguntas feitas após mencionar a palavra-chave "lucy".
- Integra com a IA do **Gemini** para responder perguntas.
- Funciona tanto em mensagens individuais quanto em grupos do WhatsApp.
- Respostas com estilo direto, sarcástico e com um toque de acidez.
- Comando de ajuda para fornecer instruções sobre o uso do bot.

## Como Usar

### Pré-requisitos

- **Node.js** (versão recomendada: 16 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- Conta no **WhatsApp** com o aplicativo instalado no seu celular.
- Acesso à **API do Gemini** (obtenha a chave da API no [Google Gemini](https://cloud.google.com/generative-ai)).

### Passos para Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/bot-whatsapp.git
   cd bot-whatsapp
   ```

2. **Instale as dependências:**

   Execute o seguinte comando para instalar as dependências necessárias:

   ```bash
   npm install
   ```

3. **Configure sua chave de API do Gemini:**

   Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API do Gemini:

   ```bash
   GEMINI_API_KEY=SuaChaveDeAPI
   ```

4. **Inicie o bot:**

   Execute o seguinte comando para iniciar o bot:

   ```bash
   node index.js
   ```

   O bot gerará um QR Code. Escaneie o QR Code com seu aplicativo WhatsApp para autenticar o bot.

5. **Use o bot no WhatsApp:**

   - Envie uma mensagem com a palavra "lucy" para ativar o bot.
   - O bot irá responder com um toque de sarcasmo.
   - Use o comando `!ajuda` para saber como usar o bot.

### Comandos Disponíveis

- **`lucy [pergunta]`**: Ativa o bot e permite que o usuário faça uma pergunta ao bot. Exemplo: `lucy que dia é hoje?`
- **`!ajuda`**: Exibe uma mensagem explicando como usar o bot.

## Como Funciona

- O bot está configurado para escanear as mensagens recebidas.
- Quando o bot detecta a palavra "lucy" em uma mensagem, ele ativa a resposta e envia a pergunta para o **Gemini**.
- O bot responde com o conteúdo gerado pela IA de forma direta e sarcástica.
- No caso de mensagens em grupo, ele também irá responder normalmente, contanto que o comando "lucy" seja mencionado.

## Estrutura do Projeto

- **`index.js`**: Arquivo principal onde o bot é configurado e executado.
- **`agent.js`**: Contém a lógica para fazer as requisições à API do Gemini e processar as respostas.
- **`.env`**: Arquivo de configuração para armazenar variáveis sensíveis como a chave da API.

## Contribuições

Contribuições são bem-vindas! Se você quiser contribuir com melhorias, correções de bugs ou novos recursos, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma nova branch para suas modificações.
3. Envie um Pull Request com uma descrição detalhada das suas mudanças.

## Licença

Este projeto é licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

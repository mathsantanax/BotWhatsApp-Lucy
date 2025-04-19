const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode');
const { perguntarGemini } = require("./agent");

// Cria uma nova instância do cliente WhatsApp com autenticação local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

const dir = path.join(__dirname, 'public');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Gera o QR Code para escanear no WhatsApp
client.on('qr', async (qr) => {
    try {
        await qrcode.toFile('./public/qr.png', qr); // Gera imagem
        console.log('QR code salvo como ./public/qr.png');
    } catch (err) {
        console.error('Erro ao gerar QR Code:', err);
    }
});

// Quando o cliente estiver pronto, ele irá te informar
client.on('ready', () => {
    console.log('Bot iniciado e pronto para usar!');
});

// Quando uma mensagem for recebida
client.on('message', async (message) => {
    console.log(`Mensagem recebida: ${message.body}`);
    
     // Verifica se a mensagem é de grupo ou individual
    if (message.from.includes('@g.us')) {
        console.log('Mensagem de grupo detectada.');
    } else {
        console.log('Mensagem individual detectada.');
    }

    // Responder a uma mensagem
    if (message.body.toLowerCase().includes('lucy')) {
        console.log('Palavra-chave "lucy" encontrada! Ativando bot...');

        // Extrai a pergunta após a palavra "lucy"
        const pergunta = message.body.toLowerCase().replace('lucy', '').trim();

        // Se houver uma pergunta após "lucy", responda com uma mensagem genérica
        if (pergunta.length > 0) {
            console.log(`Pergunta recebida: ${pergunta}`);
            // Aqui você pode integrar um modelo de IA para responder perguntas ou apenas responder algo simples
            const resposta = await perguntarGemini(pergunta);

            // Aqui você manda de volta no WhatsApp
            client.sendMessage(message.from, resposta);
        } else {
            // Caso "lucy" seja detectada mas não haja pergunta após
            await message.reply('Oi! Como posso te ajudar?');
        }
    }
    else if(message.hasQuotedMsg){
        // Verifica se a mensagem original foi enviada pelo bot
        const quotedMsg = await message.getQuotedMessage();
    if (quotedMsg.fromMe) {
        console.log('Usuário respondeu a uma mensagem do bot.');

        const respostaUsuario = message.body.trim().toLowerCase();
            console.log('Usuário respondeu uma mensagem do bot:', respostaUsuario);

            // Toca pra IA se quiser
            const resposta = await perguntarGemini(respostaUsuario);
            await message.reply(resposta || 'Tô sem paciência agora, pergunta outra coisa.');
        }
    }
    else if (message.body.toLowerCase() === "!ajuda") {
        await message.reply('Sou uma Assistente, Para Auxiliar vocês no que puder, diga Lucy em seguida a pergunta.');
    }
    
});

// Inicia o cliente
client.initialize();

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Cria uma nova instância do cliente WhatsApp com autenticação local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }  // Defina para false se quiser ver o navegador
});

// Gera o QR Code para escanear no WhatsApp
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code para conectar...');
});

// Quando o cliente estiver pronto, ele irá te informar
client.on('ready', () => {
    console.log('Bot iniciado e pronto para usar!');
});

// Quando uma mensagem for recebida
client.on('message', async (message) => {
    console.log(`Mensagem recebida: ${message.body}`);
    
     // Verifica se a mensagem é de grupo ou individual
    if (message.isGroupMsg) {
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
            const { perguntarGemini } = require("./agent");
            // Aqui você pode integrar um modelo de IA para responder perguntas ou apenas responder algo simples
            const resposta = await perguntarGemini(pergunta);

            // Aqui você manda de volta no WhatsApp
            client.sendMessage(message.from, resposta);
        } else {
            // Caso "lucy" seja detectada mas não haja pergunta após
            await message.reply('Oi! Como posso te ajudar?');
        }
    }
    else if (message.body.toLowerCase() === "!ajuda") {
        await message.reply('Sou uma Assistente, Para Auxiliar vocês no que puder, diga Lucy em seguida a pergunta.');
    }
    
});

// Inicia o cliente
client.initialize();

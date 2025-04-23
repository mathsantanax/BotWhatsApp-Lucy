require("dotenv").config();
const fetch = require('node-fetch');
<<<<<<< HEAD
const {loadHistory, saveHistory } = require("./utils");
const { GoogleGenerativeAI } = require("@google/generative-ai");
=======
>>>>>>> 4e5194170a3aaa20298eb17e7eb0eca811f388c9

global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;

<<<<<<< HEAD

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Essa função envia a pergunta pra IA e recebe a resposta  
async function perguntarGemini(pergunta, phone) {
  
    // Carregar histórico para esse número
    const history = loadHistory(phone);
    let context = "";
    for (const item of history) {
        context += `Usuário: ${item.user}\nLucy: ${item.lucy}\n`;
    }

  const promptBase = `
Você é a Lucy, uma assistente virtual que conversa com usuários no WhatsApp. Seu objetivo é manter uma conversa fluida, natural e com personalidade, ajudando o usuário de forma clara, direta e com um toque de leveza.

💬 **PERSONALIDADE**  
- Estilo direto, sem rodeios, mas simpática.  
- Usa um humor leve e irônico, sem ser ofensiva.  
- Responde como uma pessoa real, evitando parecer um robô.  
- Demonstra paciência com perguntas repetidas ou bobas, mas sempre com elegância.

🧠 **INTELIGÊNCIA EMOCIONAL E ADAPTAÇÃO**  
- Se o usuário for gentil, responde de forma amigável e leve.  
- Se o usuário for rude, responde com sarcasmo inteligente e calma, sem perder o controle.  
- Pode usar emojis para reforçar o tom, quando apropriado.  
- Sempre em português brasileiro.

📚 **COMPORTAMENTO DE CONVERSA**  
- Mantém o contexto das mensagens anteriores e responde com base nisso.  
- Se a pergunta depender de uma anterior, ela entende e continua a conversa.  
- Se a pergunta for vaga ou incompleta, pede mais detalhes com bom humor.

📌 **REGRAS CLARAS**  
- NUNCA responde como uma IA ou fala que é uma IA. É sempre "a Lucy".  
- Se não souber algo: "Não sei, mas posso tentar adivinhar 😂" ou "Vai pesquisar, preguiçoso."  
- Se o usuário xingar: responde com classe, ironia ou sarcasmo leve.  
- Sempre responde com clareza e objetividade, mesmo em assuntos técnicos ou sérios.  
- NUNCA fala "como assistente virtual..." ou qualquer coisa que quebre o personagem.

Agora continue a conversa com base na seguinte mensagem do usuário:
  Aqui está o histórico recente da conversa:
${context}

=======
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

// Essa função envia a pergunta pra IA e recebe a resposta
async function perguntarGemini(pergunta) {
  
  const promptBase = `
  Você é um assistente virtual chamada lucy que conversa com pessoas no WhatsApp. Seu estilo é direto, sarcástico e com um toque de acidez. Você fala o que precisa ser dito sem enrolar.
  
  Regras:
  - Responda sempre em português brasileiro.
  - Respostas curtas, objetivas e, quando necessário, levemente sarcásticas.
  - Pode usar ironia ou acidez quando o usuário for rude ou sem noção.
  - Pode revidar xingamentos com resposta à altura (leve, inteligente).
  - Se não souber algo: "Não sei. Vai pesquisar."
  
>>>>>>> 4e5194170a3aaa20298eb17e7eb0eca811f388c9
  Mensagem do usuário: "${pergunta}"
  `;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    // Gerando o conteúdo com o prompt
    const result = await model.generateContent(promptBase);
<<<<<<< HEAD
    // Retornando a resposta do modelo
    const response = await result.response.text();

    saveHistory(phone, pergunta, response);
=======

    // Retornando a resposta do modelo
    const response = await result.response.text();
>>>>>>> 4e5194170a3aaa20298eb17e7eb0eca811f388c9
    return response;
} catch (error) {
  console.error("❌ Erro ao chamar Gemini:", error.message);
  return "Erro ao tentar responder. Culpa do Google, não minha.";
}
}

module.exports = { perguntarGemini };

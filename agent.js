require("dotenv").config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
global.fetch = fetch;
global.Headers = (await import('node-fetch')).Headers;
global.Request = (await import('node-fetch')).Request;
global.Response = (await import('node-fetch')).Response;

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
  
  Mensagem do usuário: "${pergunta}"
  `;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    // Gerando o conteúdo com o prompt
    const result = await model.generateContent(promptBase);

    // Retornando a resposta do modelo
    const response = result.response.text;
    return response;
} catch (error) {
  console.error("❌ Erro ao chamar Gemini:", error.message);
  return "Erro ao tentar responder. Culpa do Google, não minha.";
}
}

module.exports = { perguntarGemini };

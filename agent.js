require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
console.log(apiKey)

const genAI = new GoogleGenerativeAI(apiKey);

// Essa função envia a pergunta pra IA e recebe a resposta
async function perguntarGemini(pergunta) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
    const result = await model.generateContent(promptBase);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Erro ao chamar Gemini:", error.message);
    return "Erro ao tentar responder. Culpa do Google, não minha.";
  }
}

module.exports = { perguntarGemini };

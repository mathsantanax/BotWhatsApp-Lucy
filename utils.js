// conversationHistory.js
const fs = require('fs');
const path = require('path');

const HISTORY_PATH = path.join(__dirname, 'conversations', 'history.json');

function loadHistory(phone) {
    try {
        const file = fs.readFileSync(HISTORY_PATH, 'utf8');
        const data = JSON.parse(file);
        return data[phone] || [];
    } catch (err) {
        return [];
    }
}

function saveHistory(phone, userMsg, lucyMsg) {
    let data = {};
    try {
        const file = fs.readFileSync(HISTORY_PATH, 'utf8');
        data = JSON.parse(file);
    } catch (err) {}

    if (!data[phone]) {
        data[phone] = [];
    }

    data[phone].push({ user: userMsg, lucy: lucyMsg });

    // Limita o histórico a 10 mensagens
    if (data[phone].length > 10) {
        data[phone] = data[phone].slice(data[phone].length - 10);
    }

    fs.writeFileSync(HISTORY_PATH, JSON.stringify(data, null, 2));
}

module.exports = { loadHistory, saveHistory };

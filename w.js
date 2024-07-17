import TelegramBot from 'node-telegram-bot-api';

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot('7423119108:AAGWHcJkwi6TinUIgYSDNczrjL2fmPBJp5U', { polling: true });

let partialCommand = '';

function handleCommand(command) {
    const parts = command.trim().split(/\s+/);

    if (parts.length < 5 || parts[0] !== '/aos' || (parts[1] !== 'q' && parts[1] !== 'query')) {
        return "Invalid command format";
    }

    const type = parts[2];
    const id = parts[3];
    const fields = parts.slice(4);

    const jsonOutput = {
        [type]: {
            id: id,
            fields: fields
        }
    };

    console.log(JSON.stringify(jsonOutput, null, 2));
    return JSON.stringify(jsonOutput, null, 2);
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text.trim();
    console.log(text);
    if (text.startsWith('/aos')) {
        partialCommand = text;
    } else if (partialCommand) {
        partialCommand += ' ' + text;
    }
    console.log(partialCommand);
    // Assuming that the end of the query is indicated by a closing bracket or newline
    if (partialCommand && (text.endsWith('\n'))) {
        const response = handleCommand(partialCommand);
        console.log(response);
        bot.sendMessage(chatId, response);
        partialCommand = '';
    }
});

// Example usage for a multi-line command entered into Telegram
const multiLineCommand = `
/aos q 
book 
1 
title 
author 
publisher 
year
`.trim().replace(/\n\s*/g, ' ');

// const jsonOutput = handleCommand(multiLineCommand);
// console.log(jsonOutput);

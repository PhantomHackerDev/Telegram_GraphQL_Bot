import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';


// Replace with your actual Telegram bot token
const token = '7423119108:AAGWHcJkwi6TinUIgYSDNczrjL2fmPBJp5U';
// const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const graphqlEndpoint = 'YOUR_GRAPHQL_API_ENDPOINT'; // replace with your GraphQL API endpoint
let partialCommand = '';

// Function to execute GraphQL queries
async function executeGraphQLQuery(command) {

  const parts = command.trim().split(/\s+/);

  if (parts.length < 5 || parts[0] !== '/aos' || (parts[1] !== 'q' && parts[1] !== 'query')) {
      return "Invalid command format";
  }

  const type = parts[2];
  const id = parts[3];
  const fields = parts.slice(4);

  const jsonOutput = `
    {
      ${type}(id: "${id}") {
        ${fields}
      }
    }
  `;

  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jsonOutput }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return JSON.stringify(data, null, 2); // Return the data as a formatted string
}
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! I am your Telegram bot. Send me a message or try a command.');
});

// Listen for /echo command
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  bot.sendMessage(chatId, `You said: ${text}`);
});

// Listen for regular text messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.trim();
  if (text.startsWith('/aos')) {
      partialCommand = text;
  } else if (partialCommand) {
      partialCommand += ' ' + text;
  }
  try {
    const result = await executeGraphQLQuery(partialCommand);
    bot.sendMessage(chatId, result);
    // Respond with the result
    partialCommand = ''; // Reset partialCommand after successful execution
  } catch (error) {
    console.error('Error executing GraphQL query:', error);
    partialCommand = ''; // Reset partialCommand after an error
  }
});

console.log('Bot is running...');

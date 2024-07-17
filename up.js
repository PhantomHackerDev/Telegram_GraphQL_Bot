import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';

// Replace with your actual Telegram bot token
const token = '7423119108:AAGWHcJkwi6TinUIgYSDNczrjL2fmPBJp5U';
const graphqlEndpoint = 'YOUR_GRAPHQL_API_ENDPOINT'; // replace with your GraphQL API endpoint

// Function to execute GraphQL queries
async function executeGraphQLQuery(query) {
  // const response = await fetch(graphqlEndpoint, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ query }),
  // });

  // if (!response.ok) {
  //   throw new Error('Network response was not ok');
  // }

  // const data = await response.json();
  return query;
  // return data;
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

// Listen for /aos gql command
bot.on('message', async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[2];
  console.log(query);
  try {
    // const result = await executeGraphQLQuery(query);
    bot.sendMessage(chatId, JSON.stringify(query, null, 2));
  } catch (error) {
    console.error('Error executing GraphQL query:', error);
    bot.sendMessage(chatId, 'Error executing GraphQL query. Please try again later.');
  }
});

console.log('Bot is running...');

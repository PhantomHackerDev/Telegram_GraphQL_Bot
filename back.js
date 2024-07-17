import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
// Replace with your actual Telegram bot token
const token = '7423119108:AAGWHcJkwi6TinUIgYSDNczrjL2fmPBJp5U';

// Replace with your actual GraphQL endpoint URL
const graphqlEndpoint = 'https://your-graphql-endpoint.com/graphql';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for /aos gql <query> command
bot.onText(/\/aos gql (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];

  try {
    // Send the GraphQL query to your endpoint
    const response = await axios.post(graphqlEndpoint, {
      query
    });

    // Process GraphQL response
    const result = response.data;

    // Example: Extract and format data from GraphQL response
    const formattedResult = formatGraphQLResult(result);

    // Send formatted result back to the user
    bot.sendMessage(chatId, formattedResult);
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
});

// Function to format GraphQL response (example)
function formatGraphQLResult(result) {
  // Example: Extract data from GraphQL response
  const data = result.data;

  // Example: Format data into a readable message
  let formattedMessage = 'GraphQL Response:\n';
  formattedMessage += JSON.stringify(data, null, 2);

  return formattedMessage;
}

console.log('Bot is running...');

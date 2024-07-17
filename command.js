import fetch from 'node-fetch';
import { Telegraf } from 'telegraf';

const bot = new Telegraf('7423119108:AAGWHcJkwi6TinUIgYSDNczrjL2fmPBJp5U'); // replace with your bot token
const graphqlEndpoint = 'YOUR_GRAPHQL_API_ENDPOINT'; // replace with your GraphQL API endpoint

// Function to execute GraphQL queries
async function executeGraphQLQuery(query) {
  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}

// Command handler for /query
bot.command('query', async (ctx) => {
  const query = ctx.message.text.split(' ').slice(1).join(' ');
  console.log(query);
  // if (!query) {
  //   ctx.reply('Usage: /query <graphql_query>');
  //   return;
  // }

  // try {
  //   const result = await executeGraphQLQuery(query);

  //   // Respond with the result
  //   ctx.reply(JSON.stringify(result, null, 2));
  // } catch (error) {
  //   console.error('Error executing GraphQL query:', error);
  //   ctx.reply('An error occurred while executing the GraphQL query');
  // }
});

// Start the bot
bot.launch();
console.log('Bot is running...');

import fetch from 'node-fetch';
import { Telegraf } from 'telegraf';

const bot = new Telegraf('7423119108:AAGWHcJkwi6TinUIgYSDNczrjL2fmPBJp5U'); // replace with your bot token
const graphqlEndpoint = 'YOUR_GRAPHQL_API_ENDPOINT'; // replace with your GraphQL API endpoint
// Function to query the GraphQL API
async function fetchBookData(bookId) {
  const query = `
    query {
      book(id: "${bookId}") {
        title
        author {
          name
        }
      }
    }
  `;

  const response = await fetch('t.me/sample_graphql_bot', { // replace with your GraphQL API endpoint
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

// Command to fetch book data
bot.command('book', async (ctx) => {
  const bookId = ctx.message.text.split(' ')[1];

  if (!bookId) {
    ctx.reply('Please provide a book ID. Usage: /book <id>');
    return;
  }

  // try {
  //   const data = await fetchBookData(bookId);
  //   const book = data.data.book;

  //   if (book) {
  //     ctx.reply(`Title: ${book.title}\nAuthor: ${book.author.name}`);
  //   } else {
  //     ctx.reply('Book not found');
  //   }
  // } catch (error) {
  //   console.error(error);
  //   ctx.reply('An error occurred while fetching book data');
  // }
});

// Start the bot
bot.launch();
console.log('Bot is running...');

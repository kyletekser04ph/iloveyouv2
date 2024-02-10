const axios = require('axios');

module.exports = {
  config: {
    name: 'fun',
    aliases: ['f'],
    version: '3.0',
    author: 'Subash',
    countDown: 5,
    role: 0,
    shortDescription: {
      en: 'Fun',
    },
    longDescription: {
      en: 'Fun',
    },
    category: 'fun',
    guide: {
      en: '{pn} fact\n{pn} joke\n{pn} lines\n{pn} poem\n{pn} quote',
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      if (!args[0]) {
        api.sendMessage(
          {
            body: '⚠ Usage guide -‎                              \n\n/fun fact\n/fun joke\n/fun lines\n/fun poem\n/fun quote',
            attachment: null,
          },
          event.threadID,
          event.messageID
        );
        return;
      }

      const option = args[0].toLowerCase();

            if (option === 'joke') {
        
const response = await axios.get('https://v2.jokeapi.dev/joke/Any');

        if (response.status === 200) {
          const jokeData = response.data;

          let joke = '';
          if (jokeData.type === 'twopart') {
            joke = `${jokeData.setup}\n\n- ${jokeData.delivery}`;
          } else {
            joke = jokeData.joke;
          }
        
          api.sendMessage({ body: joke, attachment: null }, event.threadID, event.messageID);
        } else {
          api.sendMessage({ body: 'Sorry, I couldn\'t fetch a joke at the moment.', attachment: null }, event.threadID, event.messageID);
        }
      } else if (option === 'quote') {
        const response = await axios.get('https://api.quotable.io/random');
        const quoteData = response.data;

        if (quoteData && quoteData.content && quoteData.author) {
          const messageToSend = `"${quoteData.content}"\n\n- ${quoteData.author}`;
          api.sendMessage({ body: messageToSend, attachment: null }, event.threadID, event.messageID);
        } else {
          api.sendMessage({ body: 'Failed to retrieve a quote.', attachment: null }, event.threadID, event.messageID);
        }
      } else if (option === 'fact') {
        const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        const factData = response.data;

        if (factData && factData.text) {
          const factText = `📌 - ${factData.text}`;
          api.sendMessage({ body: factText, attachment: null }, event.threadID, event.messageID);
        } else {
          api.sendMessage({ body: 'Failed to retrieve a fact.', attachment: null }, event.threadID, event.messageID);
        }
      } else if (option === 'poem') {
        const response = await axios.get('https://poetrydb.org/random');
        const poemData = response.data[0];

        if (poemData && poemData.title && poemData.author && poemData.lines) {
          const poemTitle = poemData.title;
          const poemAuthor = poemData.author;
          const poemLines = poemData.lines.join('\n');
          const messageToSend = `📜 ${poemTitle}\n🖋 ${poemAuthor}\n\n${poemLines}`;
          api.sendMessage({ body: messageToSend, attachment: null }, event.threadID, event.messageID);
        } else {
          api.sendMessage({ body: 'Failed to retrieve a poem.', attachment: null }, event.threadID, event.messageID);
        }
      } else if (option === 'lines') {
        const apiUrl = 'https://ace.abc00xyz.repl.co/pickup-line';
        const response = await axios.get(apiUrl);

        const pickupLine = response.data.pickupLine;

        const username = (await api.getUserInfo(event.senderID))[event.senderID]?.name || 'User';
        const message = `${username}, ${pickupLine}`;

        api.sendMessage(
          {
            body: message,
            mentions: [{ tag: username, id: event.senderID }],
          },
          event.threadID,
          event.messageID
        )
      } else {
        api.sendMessage(
          {
            body: '⚠ Usage guide -‎                              \n\n/fun fact\n/fun joke\n/fun lines\n/fun poem\n/fun quote',
            attachment: null,
          },
          event.threadID,
          event.messageID
        );
        return;
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(
        { body: 'An error occurred while processing your request.', attachment: null },
        event.threadID,
        event.messageID
      );
    }
  },
};
 const axios = require('axios');

module.exports = {
  config: {
    name: "textpro",
    aliases: ["tp"],
    version: "1.0",
    author: "Rishad",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'Generate text-based image'
    },
    longDescription: {
      en: "Generate image from text using a specific model"
    },
    category: "image",
    guide: {
      en: '{pn} your text | Model ID (optional)' +
        '\n example:   {pn} hello | 1' +
        '\n' +
        'Available models:' +
        '\n 181 models available'
    }
  },

  onStart: async function({ message, args }) {
    const input = args.join(" ");
    if (!input) {
      return message.reply("Please provide some text.");
    }

    let text, model;
    if (input.includes("|")) {
      const [textInput, modelInput] = input.split("|").map((str) => str.trim());
      text = textInput;
      model = modelInput;
    } else {
      text = input;
      model = 34; 
    }

    message.reply("✅ Generating image...").then((info) => { id = info.messageID });
    try {
      const API = `https://rishadapi.rishad100.repl.co/textpro?text=${encodeURIComponent(text)}&model=${model}`;
      const imageStream = await global.utils.getStreamFromURL(API);

      return message.reply({
        attachment: imageStream
      });
    } catch (error) {
      console.log(error);
      message.reply("Failed to generate image.").then(() => {
        message.delete(id);
      });
    }
  }
};
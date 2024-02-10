 const axios = require("axios");

module.exports = {
  config: {
    name: "lyrics",
    version: "1.0",
    author: "OtinXSandip",
    countDown: 10,
    role: 0,
    shortDescription: {
      
      en: "lyrics"
    },
    category: "media",
    guide: {
      en: "{pn} <title>"
    }
  },
  
  onStart: async function ({ api, event, args, message }) {
    try {
      const lyrics = args.join(' ');
      if (!lyrics) {
        return api.sendMessage("Please provide a song title🫂", event.threadID, event.messageID);
      }
      api.setMessageReaction("💀", event.messageID, () => { }, true);
      const { data } = await axios.get(`https://nemobot.otinxshiva10.repl.co/lyrics`, {
        params: {
          query: lyrics 
        }
      });
      api.setMessageReaction("🎶", event.messageID, () => { }, true);
      const messageData = {
        body: `Title: ${data.title || ''}\n\n❏ Artist: ${data.artist || ''}\n\n❏Lyrics:\n\n ${data.lyrics || ''}`,
        attachment: await global.utils.getStreamFromURL(data.image)
      };
      return api.sendMessage(messageData, event.threadID);
    } catch (error) {
      console.error(error);
      return api.sendMessage("An error occurred while fetching lyrics!", event.threadID, event.messageID);
    }
  }
};
const fs = require("fs-extra");
const axios = require("axios");

module.exports = {

  config: {
    name: 'anime',
    aliases: ['animerecommendation'],
    version: '1.0',
    author: 'Kshitiz', 
    countDown: 30,
    role: 0,
    shortDescription: 'Anime recommendation',
    longDescription: '',
    category: 'media',
    guide: {
      en: '{p}{n}',
    }
  },

  onStart: async function ({ api, event }) {
    try {
    
      api.setMessageReaction("🕐", event.messageID, (err) => {}, true);

      const apiUrl = "https://kshitiz-anime.onrender.com/anime";
      const response = await axios.get(apiUrl);

      if (response.data.animeName && response.data.video) {
        const animeName = response.data.animeName;
        const videoUrl = response.data.video;

        console.log(`Anime Name: ${animeName}`);
        console.log(`Video URL: ${videoUrl}`);

        const cacheFilePath = __dirname + `/cache/${Date.now()}.mp4`;
        await this.downloadVideo(videoUrl, cacheFilePath);

        if (fs.existsSync(cacheFilePath)) {
          await api.sendMessage({
            body: `𝗥𝗘𝗖𝗢𝗠𝗠𝗘𝗡𝗗𝗘𝗗 𝗔𝗡𝗜𝗠𝗘:\n${animeName}`,
            attachment: fs.createReadStream(cacheFilePath),
          }, event.threadID, event.messageID);

          fs.unlinkSync(cacheFilePath);
        } else {
          api.sendMessage("Error downloading the video.", event.threadID);
        }
      } else {
        api.sendMessage("Error fetching data from external API.", event.threadID);
      }
    } catch (err) {
      console.error(err);
      api.sendMessage("An error occurred while processing the anime command.", event.threadID);
    }
  },

  downloadVideo: async function (url, cacheFilePath) {
    try {
      const response = await axios({
        method: "GET",
        url: url,
        responseType: "arraybuffer"
      });

      fs.writeFileSync(cacheFilePath, Buffer.from(response.data, "utf-8"));
    } catch (err) {
      console.error(err);
    }
  },
};

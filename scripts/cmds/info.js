 const fs = require('fs');
const moment = require('moment-timezone');
const NepaliDate = require('nepali-date');

module.exports = {
  config: {
    name: "info",
    version: "1.4",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    category: "utility",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ api, message }) {
    const botName = "Yua";
    const botPrefix = ".";
    const authorName = "Isami";
    const authorFB = "https://m.me/maybeisami";
    const authorInsta="i_sold_10_kidneys";
    const status = "in a relationship";
    const urls = [
      'https://i.imgur.com/Av1gC42.jpg'
    ];

    const link = urls[Math.floor(Math.random() * urls.length)];

    const now = moment().tz('Asia/Kathmandu');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    const nepaliDate = new NepaliDate(now.toDate());
    const bsDateStr = nepaliDate.format("dddd, DD MMMM");

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const timeStart = Date.now();
    await api.sendMessage("Calling Ping");
    const ping = Date.now() - timeStart;

    message.reply({
      body: `===「 Bot & Owner Info 」===\n❐Bot Name: ${botName}\n❐Bot Prefix: ${botPrefix}\n❐Author Name: ${authorName}\n❐FB: ${authorFB}\n❐Insta: ${authorInsta}\n❐Status: ${status}\n❐Date: ${date}\n❐BS Date: ${bsDateStr}\n❐Time: ${time}\n❐Bot Uptime: ${uptimeString}\n❐Ping: ${ping}ms\n=======================`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  },

  onChat: async function({ event, api, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "info") {
      await this.onStart({ api, message });
    }
  }
};
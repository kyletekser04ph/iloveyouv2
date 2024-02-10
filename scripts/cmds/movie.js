const axios = require("axios");

module.exports = {
  config: {
    name: "movie",
    version: "1.1",
    author: "NIB",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "media",
    guide: ""
  },

  onStart: async function ({ event, message, getLang, usersData, api, args }) {
    let query = args.join(" ");
    if (!query) return message.reply("Give a movie name baka");

    try {
      let response = await axios.get(
        `https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`
      );

      let res = response.data;
      let title = res.title;
      let date = res.year;
      let time = res.runtime;
      let genres = res.genres;
      let director = res.director;
      let actors = res.actors;
      let plot = res.plot;
      let poster = res.poster;

      message.reply({
        body: `Title: ${title}\n\nActors: ${actors}\n\nRelease Date: ${date}\n\nGenres: ${genres}\n\nDirector: ${director}\n\nPlot: ${plot}`,
        attachment: await global.utils.getStreamFromURL(poster)
      });
    } catch (error) {
      console.error(error);
      message.reply("Could not be found.");
    }
  }
};
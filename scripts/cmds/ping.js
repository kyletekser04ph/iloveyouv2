module.exports = {
  config: {
    name: "ping",
    Author: "",
    version: "1.0",
    countDown: 1,
    role: 0,
    shortDescription: {
      en: "Ping!"
    },
    longDescription: {
      en: "🏓 check my ping!"
    },
    category: "info",
    guide: {
      en: "{p}ping"
    }
  },
  onStart: async function ({ api, event, args }) {
    const timeStart = Date.now();
    await api.sendMessage("Ping!", event.threadID);
    const ping = Date.now() - timeStart;
    api.sendMessage(`[ ${ping}ms ]`, event.threadID);
  }
};
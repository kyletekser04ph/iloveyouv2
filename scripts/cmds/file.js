const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "Kyle",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["100052395031835","61561428180031"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("⛔ 𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗘𝗡𝗜𝗘𝗗\n\n𝖸𝖮𝖴 𝖣𝖮𝖭'𝖳 𝖧𝖠𝖵𝖤 𝖤𝖭𝖮𝖴𝖦𝖧 𝖯𝖤𝖱𝖬𝖨𝖲𝖲𝖨𝖮𝖭 𝖳𝖮 𝖴𝖲𝖤𝖣 𝖳𝖧𝖨𝖲 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲, 𝖮𝖭𝖫𝖸 𝖬𝖸 𝖡𝖮𝖲𝖲 Kyle敦. ဗီူ  𝖢𝖠𝖭 𝖣𝖮 𝖨𝖳(⋋▂⋌)", event.threadID, event.messageID);
    }

    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("put the file name there bit*h(⋋▂⋌)🖕", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`🚫 𝗡𝗼𝘁 𝗙𝗼𝘂𝗻𝗱 [✖]: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};

const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "outall",
    aliases: ["leave", "l"],
    version: "1.5.0",
    author: "cliff x Kylepogi",//recode and fix by Kylepogiv2 don't change the author nigga🙏🏻😁
    countDown: 0,
    role: 0,
    category: "Admin",
    shortDescription: {
      en: "Leave all groups or a specific group"
    },
    guide: {
      vi: "{pn} [tid,blank]",
      en: "{pn} [tid,blank]"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const currentUserId = api.getCurrentUserID();

      if (args.length) {
        // Leave a specific group
        const id = parseInt(args.join(" "), 10);
        if (isNaN(id)) {
          return api.sendMessage('Invalid group ID provided.', event.threadID);
        }
        await api.sendMessage('🫡 𝗭𝗘𝗣𝗛 𝗡𝗢𝗧𝗜𝗙 \n▬▬▬▬▬▬▬▬▬▬▬▬\n ⚠️ This is an auto leave message.', id);
        await api.removeUserFromGroup(currentUserId, id);
      } else {
        // Leave all groups
        const list = await new Promise((resolve, reject) => {
          api.getThreadList(100, null, ["INBOX"], (err, list) => {
            if (err) return reject(err);
            resolve(list);
          });
        });

        // Send a message to each group before leaving
        const leavePromises = list
          .filter(item => item.isGroup && item.threadID !== event.threadID)
          .map(async (item) => {
            await api.sendMessage('🫡 𝗭𝗘𝗣𝗛 𝗡𝗢𝗧𝗜𝗙 \n▬▬▬▬▬▬▬▬▬▬▬▬\n ⚠️ The bot is leaving this group.', item.threadID);
            await api.removeUserFromGroup(currentUserId, item.threadID);
          });

        await Promise.all(leavePromises);

        // Optionally, send a message to the current thread as well
        await api.sendMessage('🫡 𝗭𝗘𝗣𝗛 𝗡𝗢𝗧𝗜𝗙 \n▬▬▬▬▬▬▬▬▬▬▬▬\n ⚠️ The bot has left all groups.', event.threadID);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
};

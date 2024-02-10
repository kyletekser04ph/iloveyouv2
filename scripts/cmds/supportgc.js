const { config } = global.GoatBot;

module.exports = {
  config: {
    name: "supportgc",
    version: "1.3",
    author: "Shikaki",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Join the bot's support group chat"
    },
    longDescription: {
      en: "Join the bot's support group chat and interact with the bot's admins and other members."
    },
    category: "general",
    guide: {
      en: "{pn} -> join the support GC of bot.\n\n(This is only for the bot's admins)\n{pn} [tid] -> change the tid of support GC of bot"
    }
  },

  onStart: async function ({ api, event, threadsData, message, args }) {
    if (args.length === 0) {
      try {
        const { members } = await threadsData.get(supportGcId);
        const userAlreadyInGroup = members.some(
          member => member.userID === event.senderID && member.inGroup
        );

        if (userAlreadyInGroup) {
          const alreadyInGroupMessage = `
      🚫 You are already a member of the bot's support group. 🚫`;
          return message.reply(alreadyInGroupMessage);
        }

        await api.addUserToGroup(event.senderID, supportGcId);

        const successMessage = `
      ✅ You have been added to the bot's support group successfully. ✅`;
        return message.reply(successMessage);
      } catch (error) {
        const failedMessage = `
      ❌ Failed to add you to the bot's support group.\nTry befriending this account / Unlock profile and try again ❌ `;
        console.error("Error adding user to the bot's support group:", error);
        return message.reply(failedMessage);
      }
    }

    let tid = 0;

    if (args[0].toLowerCase() === "tid") {
      try {
        const isAdmin = config.adminBot.includes(event.senderID);
        if (!isAdmin) {
          return message.reply("❌ You need to be an admin of the bot.");
        }

        tid = args[1];

        if (!tid) {
          return message.reply("🥲 Please provide the thread ID of your bot's support group.");
        }

        supportGcId = tid;

        return message.reply(`✅ Successfully changed the bot's support GC's thread to ${tid}.`);
      } catch (error) {
        const failedMessage = `
      ❌ Failed to change the support group thread ID.\nError: ${error}\nTry again ❌`;
        console.error("Error changing support group thread ID:", error);
        return message.reply(failedMessage);
      }
    }
  }
};
 module.exports = {
	config: {
		name: "botsay",
		version: "1.0",
		author: "Samir",
		role: 0,
		category: "fun",
		guide: {
			vi: "Not Available",
			en: "botsays + (Message You Want To Get)"
		} 
	},

	onStart: async function ({ api, args, event }) {
	var say = args.join(" ")
	if (!say) api.sendMessage("Please enter a message", event.threadID, event.messageID)
	else api.sendMessage(`${say}`, event.threadID, event.messageID);
  }
  
};
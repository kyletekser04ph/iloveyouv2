module.exports = {
	config: {
		name: "profile",
    aliases: ["pfp"],
		version: "1.1",
		author: "OtinXSandip",
		countDown: 5,
		role: 0,
		shortDescription: "get avt",
		longDescription: "get avt",
		category: "image",
	},

	onStart: async function ({ event, message, usersData, args, getLang }) {
    let avt;
		const uid1 = event.senderID;
		const uid2 = Object.keys(event.mentions)[0];
		if(event.type == "message_reply"){
      avt = await usersData.getAvatarUrl(event.messageReply.senderID)
    } else{
      if (!uid2){avt =  await usersData.getAvatarUrl(uid1)
              } else{avt = await usersData.getAvatarUrl(uid2)}}


		message.reply({
			body:"Here is your profile",
			attachment: await global.utils.getStreamFromURL(avt)
	})
  }
};
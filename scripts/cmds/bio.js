 module.exports.config = {
	name: "bio",
	version: "1.0",
countdown: 5,
	role: 2,
	author: "OtinXShiva",
	description: "Change bot's bio",
	category: "owner", 
}
  
  module.exports.onStart = async ({ api, event, global, args, permssion, utils, client, Users }) => {
    api.changeBio(args.join(" "), (e) => {
      if(e) api.sendMessage("an error occurred" + e, event.threadID); return api.sendMessage("Has changed the biography of the bot into: \n"+args.join(" "), event.threadID, event.messgaeID)
    }
    )
  }
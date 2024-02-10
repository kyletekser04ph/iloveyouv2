const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "ccmd",
    aliases: ["c"],
    author: "Xemon",
    version: "1.7",
    countDown: 5,
    category: "owner",
		role: 2,
    description: "Creates a new file in the cmds folder and writes the provided text to the file",
    usage: "fs creat <filename> <text>",
    example: "fs create hi.js hhhhhhhhhhhh"
  },

  onStart: async function ({ args, message }) {
    const fileName = args[0];
    const text = args.slice(1).join(" ");

    
    if (!fileName || !text) {
      return message.reply("use:fs hi.js hhhhhhh for example and your bot will create a file at commands with name hi.js and he put inside hhhhhhhhhh (example) recommended to create commands from caht -MADE BY XEMON");
    }

    
    const filePath = path.join(__dirname, '..', 'cmds', fileName);

    
    fs.writeFile(filePath, text, (err) => {
      if (err) throw err;
      message.reply(`✅| created ${fileName} file 📜 restart 🌀 the bot`);
    });
  }
}
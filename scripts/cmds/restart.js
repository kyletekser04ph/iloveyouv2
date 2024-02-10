module.exports = {
	config: {
		name: "restart",
		version: "1.0",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		longDescription: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		vi: {
			restartting: "🔄 | Đang khởi động lại bot..."
		},
		en: {
			restartting: "🔄 | Restarting bot..."
		}
	},

  onStart: async function ({ message }) {

await message.reply("🔄 | Restarting bot...");
    var t = ["1.20s", "2.33s", "7.11s", "5.47s"];
    var r = Math.floor(Math.random() * t.length);

    const d = parseInt(t[r]) * 1000; 
    await new Promise(resolve => setTimeout(resolve, d));

    await message.reply(`✅ | Bot restarted\n⏰ | Time: ${t[r]}`);
  }
};
const axios = require('axios');
const { getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: "avatar",
		author: "NTKhang",
		version: "1.5",
		cooldowns: 5,
		role: 0,
		shortDescription: {
			vi: "tạo avatar anime",
			en: "create anime avatar"
		},
		longDescription: {
			vi: "tạo avatar anime với chữ ký",
			en: "create anime avatar with signature"
		},
		category: "avt & banners",
		guide: {
			vi: "   {p}{n} <mã số nhân vật hoặc tên nhân vật> | <chữ nền> | <chữ ký> | <tên màu tiếng anh hoặc mã màu nền (hex color)>"
				+ "\  {p}{n} help: xem cách dùng lệnh",
			en: "   {p}{n} <character id or character name> | <background text> | <signature> | <background color name or hex color>"
				+ "\  {p}{n} help: view how to use this command"
		}
	},

	langs: {
		vi: {
			initImage: "Đang khởi tạo hình ảnh, vui lòng chờ đợi...",
			invalidCharacter: "Hiện tại chỉ có %1 nhân vật trên hệ thống, vui lòng nhập id nhân vật nhỏ hơn",
			notFoundCharacter: "Không tìm thấy nhân vật mang tên %1 trong danh sách nhân vật",
			errorGetCharacter: "Đã xảy ra lỗi lấy dữ liệu nhân vật:\1: %2",
			success: "✅ Avatar của bạn\hân vật: %1\ã số: %2\hữ nền: %3\hữ ký: %4\àu: %5",
			defaultColor: "mặc định",
			error: "Đã xảy ra lỗi\1: %2"
		},
		en: {
			initImage: "Initializing image, please wait...",
			invalidCharacter: "Currently there are only %1 characters on the system, please enter a character id less than",
			notFoundCharacter: "No character named %1 was found in the character list",
			errorGetCharacter: "An error occurred while getting character data:\1: %2",
			success: "✅ Your avatar\haracter: %1\D: %2\ackground text: %3\ignature: %4\olor: %5",
			defaultColor: "default",
			error: "An error occurred\1: %2"
		}
	},

	onStart: async function ({ args, message, getLang }) {
		const content = args.join(" ").split("|").map(item => item = item.trim());
		let idNhanVat, tenNhanvat;
		const chu_Nen = content[1];
		const chu_Ky = content[2];
		const colorBg = content[3];
		if (!args[0])
			return message.SyntaxError();
		message.reply(getLang("initImage"));
		try {
			const dataChracter = (await axios.get("https://goatbotserver.onrender.com/taoanhdep/listavataranime?apikey=ntkhang")).data.data;
			if (!isNaN(content[0])) {
				idNhanVat = parseInt(content[0]);
				const totalCharacter = dataChracter.length - 1;
				if (idNhanVat > totalCharacter)
					return message.reply(getLang("invalidCharacter", totalCharacter));
				tenNhanvat = dataChracter[idNhanVat].name;
			}
			else {
				const findChracter = dataChracter.find(item => item.name.toLowerCase() == content[0].toLowerCase());
				if (findChracter) {
					idNhanVat = findChracter.stt;
					tenNhanvat = content[0];
				}
				else
					return message.reply(getLang("notFoundCharacter", content[0]));
			}
		}
		catch (error) {
			const err = error.response.data;
			return message.reply(getLang("errorGetCharacter", err.error, err.message));
		}

		const endpoint = `https://goatbotserver.onrender.com/taoanhdep/avataranime`;
		const params = {
			id: idNhanVat,
			chu_Nen,
			chu_Ky,
			apikey: "ntkhangGoatBot"
		};
		if (colorBg)
			params.colorBg = colorBg;

		try {
			const avatarImage = await getStreamFromURL(endpoint, "avatar.png", { params });
			message.reply({
				body: getLang("success", tenNhanvat, idNhanVat, chu_Nen, chu_Ky, colorBg || getLang("defaultColor")),
				attachment: avatarImage
			});
		}
		catch (error) {
			error.response.data.on("data", function (e) {
				const err = JSON.parse(e);
				message.reply(getLang("error", err.error, err.message));
			});
		}
	}
};
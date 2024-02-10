module.exports = {
  config: {
    name: "list",
    version: "1.1",
    author: "",
    category: "utility",
    shortDescription: {
      en: "Viewpeople",
    },
    longDescription: {
      en: "View people",
    },
    guide: {
      en: "{pn} 1\n{pn} 50\n{pn} 100",
    },
    role: 0,
  },

  onStart: async function ({ message, usersData, args }) {
    const allUserData = await usersData.getAll();

    const sortedUsers = allUserData
      .sort((a, b) => a.name.localeCompare(b.name));

    let msg = "----------List of All Users-----------\n";

    const topCount = Math.min(parseInt(args[0]) || 10, sortedUsers.length);
    sortedUsers.slice(0, topCount).forEach((user, index) => {
      msg += `${index + 1}. ${user.name}\n`;
    });

    msg += "----------------------------------";

    message.reply(msg);
  },
};
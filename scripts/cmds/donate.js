const maxReceiverBalance = 1e104;

function formatNumberWithFullForm(number) {
  const fullForms = [
    "",
    "Thousand",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
    "Sextillion",
    "Septillion",
    "Octillion",
    "Nonillion",
    "Decillion",
    "Undecillion",
    "Duodecillion",
    "Tredecillion",
    "Quattuordecillion",
    "Quindecillion",
    "Sexdecillion",
    "Septendecillion",
    "Octodecillion",
    "Novemdecillion",
    "Vigintillion",
    "Unvigintillion",
    "Duovigintillion",
    "Tresvigintillion",
    "Quattuorvigintillion",
    "Quinvigintillion",
    "Sesvigintillion",
    "Septemvigintillion",
    "Octovigintillion",
    "Novemvigintillion",
    "Trigintillion",
    "Untrigintillion",
    "Duotrigintillion",
    "Googol",
  ];

  let fullFormIndex = 0;
  while (number >= 1000 && fullFormIndex < fullForms.length - 1) {
    number /= 1000;
    fullFormIndex++;
  }

  const formattedNumber = number.toFixed(2);

  return `${formattedNumber} ${fullForms[fullFormIndex]}`;
}

module.exports = {
  config: {
    name: "donate",
    version: "1.9.9",
    author: "Shikaki",
    countDown: 20,
    role: 0,
    shortDescription: {
      en: "💸 Transfer money to another user"
    },
    longDescription: {
      en: "💸 Transfer a specified amount of money to another user"
    },
    category: "economy",
    guide: {
      en: "💸 {pn} <recipientID> <amount>"
    }
  },

  onStart: async function ({ api, event, usersData, args, message }) {
    const { threadID, senderID } = event;

    if (args.length < 2) {
      return message.reply("❌ Please provide a valid recipient ID and the amount to transfer.", threadID);
    }

    const recipientID = args[0];
    const amountInput = args[1];
    let amount = parseFloat(amountInput);

    if (isNaN(amount) || amount <= 0) {
      return message.reply("❌ Please enter a valid positive amount to transfer.", threadID);
    }

    if (recipientID === senderID) {
      return message.reply("❌ You cannot donate money to yourself. LOL", threadID);
    }

    const senderData = await usersData.get(senderID);
    const recipientData = await usersData.get(recipientID);

    const maxDonation = 1e104;

    var senderBalanceBefore = senderData.money;
    var recipientBalanceBefore = recipientData.money;

    if (senderBalanceBefore < amount) {
      return message.reply("❌ You do not have enough money to donate this amount.", threadID);
    }

    let availableAmount = maxDonation - recipientBalanceBefore;

    if (availableAmount <= 0) {
      return message.reply(`❌ The recipient has already gained the maximum money: ${formatNumberWithFullForm(maxDonation)}.`, threadID);
    }

    if (amount > availableAmount) {
      amount = availableAmount;
    }

    let senderBalanceAfter = senderBalanceBefore - amount;
    let recipientBalanceAfter = recipientBalanceBefore + amount;

    if (recipientBalanceAfter > maxReceiverBalance) {
      recipientBalanceAfter = maxReceiverBalance;

      amount = recipientBalanceAfter - recipientBalanceBefore;

      senderBalanceAfter = senderBalanceBefore - amount;
    }

    await usersData.set(senderID, {
      money: senderBalanceAfter,
    });

    await usersData.set(recipientID, {
      money: recipientBalanceAfter,
    });

    const senderName = (await api.getUserInfo(senderID))[senderID].name;
    const recipientName = (await api.getUserInfo(recipientID))[recipientID].name;

    const msg = `
      💸 Money Transfer Complete 💸

      From: ${senderName}

      To: ${recipientName}

      Amount: $ ${formatNumberWithFullForm(amount)}

      -----------------------

      ✅ You have successfully transferred $ ${formatNumberWithFullForm(amount)} to ${recipientName}.

      -----------------------

      ${senderName}'s Balance Before: $ ${formatNumberWithFullForm(senderBalanceBefore)}
      ${senderName}'s Balance After: $ ${formatNumberWithFullForm(senderBalanceAfter)}

      -----------------------

      ${recipientName}'s Balance Before: $ ${formatNumberWithFullForm(recipientBalanceBefore)}
      ${recipientName}'s Balance After: $ ${formatNumberWithFullForm(recipientBalanceAfter)}

      -----------------------
    `;

    message.reply(msg, threadID);
  },
};
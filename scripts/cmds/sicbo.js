 module.exports = {
  config: {
    name: "sicbo",
    version: "1.7",
    author: "Asween",
    countDown: 5,
    role: 0,
    category: "game",
    shortDescription: {
      en: "Play Sic Bo Game",
    },
    longDescription: {
      en: "Play Sic Bo Game and Bet",
    },
    guide: {
      en: `
Usage: {pn} <bet amount>\nslot <bet amount\nbet <bet amount>
`,
    },
  },

  onStart: async function ({ message, event, usersData, args }) {
    const { senderID } = event;

    // Interpret and convert bet input
    const betInput = args[0]; // No need for parsing, keep it as a string

    // Check if betInput is a valid number
    if (!/^\d+(\.\d+)?$/.test(betInput)) {
      return message.reply("Invalid bet amount. Please enter a valid bet.");
    }

    let numericBet = parseFloat(betInput);

    // Check if it's a valid numeric bet
    if (isNaN(numericBet) || numericBet <= 0) {
      return message.reply("Invalid bet amount. Please enter a valid bet.");
    }

    // Check if the player's balance is stored as a string
    const userData = await usersData.get(senderID);

    let balance = parseFloat(userData.money || "0"); // Initialize balance to 0 if not present

    if (balance < numericBet) {
      return message.reply("Foolish monkey! Where's da money?\n\nCan't see it in your balance.\n\nLoser!");
    }

    // Simulate a Sic Bo roll (randomly generate three dice values between 1 and 6)
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;

    const total = dice1 + dice2 + dice3;
    const resultMsg = `Dice Roll: ${dice1} + ${dice2} + ${dice3} = ${total}`;

    // Calculate a random number between 0 and 1
    const random = Math.random();

    // Set the win percentage
    const winPercentage = 0.45;

    // Determine if the player wins or loses based on the random number
    const isWin = random <= winPercentage;

    let finalMsg = ''; // Initialize finalMsg

    finalMsg += '----------------------\n';
    finalMsg += '|      🎲 Sic Bo Game      |\n';
    finalMsg += '----------------------\n';
    finalMsg += `| ${resultMsg} |\n`;
    finalMsg += '----------------------\n\n'; 

    // Calculate reward here
    let reward = 0;

    if (isWin) {
      reward = numericBet * 2; // Double the bet

      balance = balance + reward;

      // Update the user's balance
      await usersData.set(senderID, {
        money: balance.toString(), // Convert the balance to a string for storage
        // You can also update other user data if needed
      });

      finalMsg += '🎉 Congratulations, you win!\n';
      finalMsg += '----------------------\n';
      finalMsg += `💰 Reward: $${formatNumberWithCommas(reward)}\n\n`;
      finalMsg += '----------------------\n';
    } else {
      // Player loses, deduct the bet from the user's balance
      balance = balance - numericBet;

      // Update the user's balance
      await usersData.set(senderID, {
        money: balance.toString(), // Convert the balance to a string for storage
        // You can also update other user data if needed
      });

      finalMsg += '❌ Oops, you lost!\n';
      finalMsg += '----------------------\n';
      finalMsg += `💸 Bet: $${formatNumberWithCommas(numericBet)}\n\n`;
      finalMsg += '----------------------\n';
    }

    // Send the final message to the user
    if (message) {
      message.reply(finalMsg, { typing: true });
    }
  },
};

// Define the formatNumberWithCommas function
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
module.exports = {
  config: {
    name: "foodshop",
    aliases: ["fs"],
    version: "1.0",
    author: "GoatAI by Liane", //requested by josh and add foods
    countDown: 2,
    role: 0,
    category: "fun",
    shortDescription: {
      en: "Food Shop - Order your favorite food",
      tl: "Tindahan ng Pagkain - I-order ang iyong paboritong pagkain"
    },
    longDescription: {
      en: "Food Shop - Order your favorite food",
      tl: "Tindahan ng Pagkain - I-order ang iyong paboritong pagkain"
    },
    role: 0,
    guide: {
      en: "{p}foodshop <food number>",
      tl: "{p}tindahangpagkain <numero ng pagkain>"
    }
   },
  onStart: async function ({ event, message, args, threadsData, usersData, api, commandName, role }) {
    const foods = [
      {
        name: "Pizza",
        price: "$10",
        image: "https://i.imgur.com/vRdSNUl.jpg"
      },
      {
        name: "Fries",
        price: "$5",
        image: "https://i.imgur.com/R9whJMl.png"
      },
      {
        name: "Burger",
        price: "$8",
        image: "https://i.imgur.com/VrMxNAL.png"
      },
      {
        name: "Tacos",
        price: "$7",
        image: "https://i.imgur.com/ellFaCx.png"
      },
      {
        name: "Salad",
        price: "$6",
        image: "https://i.imgur.com/tediBd5.jpg"
      },
      {
        name: "Steak",
        price: "$15",
        image: "https://i.imgur.com/Ua7K2VS.jpg"
      },
      {
        name: "Chicken",
        price: "$12",
        image: "https://i.imgur.com/CU2JCkj.png"
      },
      {
        name: "Sushi",
        price: "$14",
        image: "https://i.imgur.com/g24jnsQ.jpg"
      },
      {
        name: "Cake",
        price: "$8",
        image: "https://i.imgur.com/0iYlIOE.png"
      },
      {
        name: "Ice Cream",
        price: "$5",
        image: "https://i.imgur.com/RlSBk4Z.png"
      },
      {
        name: "Water",
        price: "$2",
        image: "https://i.imgur.com/jpndD6M.jpg"
      },
      {
        name: "Coke",
        price: "$3",
        image: "https://i.imgur.com/Kqmtu8b.png"
      },
      {
        name: "Coffee",
        price: "$4",
        image: "https://i.imgur.com/5E0iTLP.jpg"
      }
    ];
    
    const order = parseInt(args[0]);
    
    if (!order || order <= 0 || order > foods.length) {
      message.reply("Invalid food number. Please choose a number from the list.");
      return;
    }
    
    const selectedFood = foods[order - 1];
    
    message.reply(`You ordered ${selectedFood.name} for ${selectedFood.price}`, async (err, info) => {
      if (err) {
        console.error(err);
        return;
      }
      
      await message.reply({
        attachment: await global.utils.getStreamFromURL(selectedFood.image)
      });
    });
  }
}
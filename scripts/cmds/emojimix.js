async function onStart({ message, args, getLang }) {
   
  let [samir, richi] = args.join('').match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g) || [];
  samir = samir ?? '';
  richi = richi ?? '';





  if (!samir || !richi) {
    return message.SyntaxError();
  }

  try {
    const samirEmoji = encodeURIComponent(samir);
    const richiEmoji = encodeURIComponent(richi);
    const url = `https://emojimix.team-vortex-io.repl.co/emojimix?emoji1=${samirEmoji}&emoji2=${richiEmoji}&apikey=I_loveU_richi`;

    const emojimix = await global.utils.getStreamFromUrl(url);

    if (!emojimix) {
      return message.reply(getLang("error", samir, richi, "Couldn't mix emojis"));
    }

    const image = [emojimix];

    message.reply({
      body: getLang("success", samir, richi, image.length),
      attachment: image
    });
  } catch (err) {
    console.log(err);
  }
}

const config = {
  name: "em",
  aliases: ["emojimix"],
  version: "1.3",
  author: "Samir Œ",
  countDown: 5,
  role: 0,
  shortDescription: "Mix 2 emoji",
  longDescription: {
    en: "Mix 2 emoji together"
  },
  guide: {
    en: "   {pn} <emoji1> <emoji2>"
      + "\n   Example:  {pn} 🤣 🥰"
  },
  category: "fun"
};

const langs = {
  en: {
    error: "Sorry, emoji %1 and %2 can't be mixed: %3",
    success: "Emoji %1 and %2 mix %3 images"
  }
};

module.exports = {
  config,
  langs,
  onStart
};

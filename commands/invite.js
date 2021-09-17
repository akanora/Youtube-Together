const { MessageEmbed } = require("discord.js")
const { DiscordTogether } = require('discord-together');
const disbut = require('discord-buttons');

module.exports = new Underline.Command({
  async onCommand(msg, { args, usedPrefix, usedAlias }) {
    let button1 = new disbut.MessageButton()
      .setStyle("url")
      .setURL(
        "https://discord.com/oauth2/authorize?client_id=831408659262472222&scope=bot&permissions=16385"
      )
      .setLabel("Invite!");
    let button2 = new disbut.MessageButton()
      .setStyle("url")
      .setURL("https://top.gg/bot/831408659262472222/vote")
      .setLabel("Vote for me!");
    let row = new disbut.MessageActionRow().addComponents([button1, button2]);
    return msg.channel.send("‎", row);
  },
  other: {
    usage: "{p}{alias} [komut-ismi]"
  },
  coolDown: 2000,
    perms: {
        // Komutun çalışması için bot'a gerekli olan yetkiler.
        bot: [],
        // Komutun çalışması için kullanıcıya gerekli olan yetkiler.
        user: []
    },
  guildOnly: false
})
const { MessageEmbed } = require("discord.js")
const { DiscordTogether } = require('discord-together');
const disbut = require('discord-buttons');
Underline.client.discordTogether = new DiscordTogether(Underline.client);

module.exports = new Underline.Command({
  aliases: ["yttdev", "youtubetogetherdev", "w2gdev"],
  async onCommand(msg, { client, args, usedPrefix, usedAlias }) {
        if (!msg.member.voice.channel) return msg.channel.send("To use this command, you must join a voice channel.")
        Underline.client.discordTogether.createTogetherCode(msg.member.voice.channelID, 'youtubedev').then(async invite => {
            let button1 = new disbut.MessageButton()
                .setStyle('url')
                .setURL(`${invite.code}`)
                .setLabel('Youtube Together Dev!');
            let button2 = new disbut.MessageButton()
                .setStyle('url')
                .setURL('https://top.gg/bot/831408659262472222/vote')
                .setLabel('Vote for me!');
            let row = new disbut.MessageActionRow()
                .addComponents([button1, button2])
            return msg.channel.send('Here is your activity!', row);
        });
  },
  other: {
    usage: "{p}{alias} [komut-ismi]"
  },
  desc: "Youtube Dev Version.",
  coolDown: 2000,
    perms: {
        // Komutun çalışması için bot'a gerekli olan yetkiler.
        bot: ["CREATE_INSTANT_INVITE"],
        // Komutun çalışması için kullanıcıya gerekli olan yetkiler.
        user: []
    },
  guildOnly: false
})
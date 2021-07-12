const { DiscordTogether } = require('discord-together');
const disbut = require('discord-buttons');
client.discordTogether = new DiscordTogether(client);

module.exports = new (require("../types/Command"))({
    desc: "Wanna play among us true discord?",
    async onCommand(msg, { args, usedPrefix, usedAlias }) {
        if (!msg.member.voice.channel) return msg.channel.send("To use this command, you must join a voice channel.")
        client.discordTogether.createTogetherCode(msg.member.voice.channelID, 'betrayal').then(async invite => {
            let button1 = new disbut.MessageButton()
                .setStyle('url')
                .setURL(`${invite.code}`)
                .setLabel('Betrayal!');
            let button2 = new disbut.MessageButton()
                .setStyle('url')
                .setURL('https://top.gg/bot/831408659262472222/vote')
                .setLabel('Vote for me!');
            let row = new disbut.MessageActionRow()
                .addComponents([button1, button2])
            return msg.channel.send('Here is your activity!', row);
        });
    },
    coolDown: 2000,
    perms: {
        // Komutun çalışması için bot'a gerekli olan yetkiler.
        bot: ["CREATE_INSTANT_INVITE"],
        // Komutun çalışması için kullanıcıya gerekli olan yetkiler.
        user: []
    }
})
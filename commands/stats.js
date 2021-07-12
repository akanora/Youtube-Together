const { MessageEmbed } = require("discord.js")

module.exports = new (require("../types/Command"))({
    desc: "View the bot's stats.",
    async onCommand(msg, { args, usedPrefix, usedAlias }) {
        guildcount = client.guilds.cache.size
        membercount = msg.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)
        channelcount = client.channels.cache.size
        const embed = new MessageEmbed();
        embed.setColor('#ffc83d')
        embed.setTitle('Youtube Together')
        embed.setURL('https://github.com/Nooraje/Youtube-Together')
        embed.addFields(
            { name: 'Guilds', value: guildcount, inline: true },
            { name: 'Users', value: membercount, inline: true },
            { name: 'Channels', value: channelcount, inline: true },
        )
        embed.setFooter('YouTube With Friends © 2021 Google LLC', 'https://www.sehertunali.com/wp-content/uploads/2018/12/youtube-logo.png')

        msg.channel.send(embed)
    },
    coolDown: 2000,
    perms: {
        // Komutun çalışması için bot'a gerekli olan yetkiler.
        bot: ["EMBED_LINKS"],
        // Komutun çalışması için kullanıcıya gerekli olan yetkiler.
        user: []
    }
})
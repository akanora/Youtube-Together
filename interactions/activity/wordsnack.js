const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = new Underline.SlashCommand({
    name: ["activity", "wordsnack"],
    subName: "wordsnack",
    description: "Word Snack Crew Stable Version.",
    async onInteraction(interaction, other) {
        if (!interaction.member.voice.channel) return interaction.reply("To use this command, you must join a voice channel.")
            Underline.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'wordsnack').then(async invite => {
                const button1 = new MessageButton()
                    .setLabel("Word Snack!")
                    .setURL(`${invite.code}`)
                    .setStyle("LINK")
                const button2 = new MessageButton()
                    .setLabel('Vote for me!')
                    .setURL('https://top.gg/bot/831408659262472222/vote')
                    .setStyle("LINK")
                const row = new MessageActionRow().addComponents(
                    button1,
                    button2
                )
                await interaction.reply({ content: 'Here is your activity!', components: [row] });
            });
    },
    perms: {
        bot: ["CREATE_INSTANT_INVITE"],
        user: []
    },
    guildOnly: true,
    coolDown: 10000
})

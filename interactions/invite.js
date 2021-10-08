const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = new Underline.SlashCommand({
    name: "invite",
    description: "Add the bot to another server.",
    async onInteraction(interaction, other) {
        const button1 = new MessageButton()
            .setLabel("Invite!")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=831408659262472222&permissions=16385&scope=bot%20applications.commands")
            .setStyle("LINK")
        const button2 = new MessageButton()
            .setLabel('Vote for me!')
            .setURL('https://top.gg/bot/831408659262472222/vote')
            .setStyle("LINK")
        const row = new MessageActionRow().addComponents(
            button1,
            button2
        )
        return interaction.reply({ content: '­', components: [row] });
    },
    guildOnly: true,
    coolDown: 10000
});
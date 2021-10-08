const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = new Underline.SlashCommand({
    name: "help",
    async onInteraction(interaction, other) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Invite!")
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=831408659262472222&permissions=16385&scope=bot%20applications.commands")
                    .setStyle("LINK")
            );

        await interaction.reply({ content: 'Now we use slash commands! If slash commands not working, kick me and invite me again with the button below.', components: [row] });
    },
    guildOnly: true,
    coolDown: 10000
});
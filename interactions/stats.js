module.exports = new Underline.SlashCommand({
    name: "stats",
    async onInteraction(interaction, other) {
        const promises = [
            Underline.client.shard.fetchClientValues('guilds.cache.size'),
            Underline.client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];

        return Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                return interaction.reply(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
            })
            .catch(console.error);
    },
    guildOnly: true,
    coolDown: 10000
});
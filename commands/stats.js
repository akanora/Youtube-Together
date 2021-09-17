const { MessageEmbed } = require("discord.js")

module.exports = new Underline.Command({
  async onCommand(msg, { args, usedPrefix, usedAlias }) {
  const promisess = [
	  Underline.client.shard.fetchClientValues('guilds.cache.size'),
	  Underline.client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
  ];

  Promise.all(promisess)
	  .then(results => {
		  const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
		  const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
		  return msg.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
	  })
	  .catch(console.error);const promises = [
	  Underline.client.shard.fetchClientValues('guilds.cache.size'),
	  Underline.client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
  ];
  },
  coolDown: 2000,
    perms: {
        // Komutun çalışması için bot'a gerekli olan yetkiler.
        bot: ["EMBED_LINKS"],
        // Komutun çalışması için kullanıcıya gerekli olan yetkiler.
        user: []
    },
  guildOnly: false
})
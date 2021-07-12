const { MessageEmbed } = require("discord.js")

module.exports = new (require("../types/Command"))({
  async onCommand(msg, { args, usedPrefix, usedAlias }) {
    const embed = new MessageEmbed();
    embed.setAuthor(global.client.user.tag, global.client.user.avatarURL());
    embed.setTitle("Command List");
    global.commands.forEach((command) => {
      let desc = `> ${command.desc ? command.desc : "*No Description.*"}\n${command.developerOnly ? "\n> - Developer Only." : ""}\n** **`.trim();
      embed.addField(`• ${command.aliases.join(", ")}`, desc);
    });
    embed.setFooter(`YouTube With Friends © 2021 Google LLC | Nora#1768`);
    embed.setTimestamp();
    embed.setColor("#FF0000");
    msg.channel.send(embed);
  },
  coolDown: 2000,
  perms: {
    // Komutun çalışması için bot'a gerekli olan yetkiler.
    bot: ["EMBED_LINKS"],
    // Komutun çalışması için kullanıcıya gerekli olan yetkiler.
    user: []
  }
})
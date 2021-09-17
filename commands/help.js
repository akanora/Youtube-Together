const { MessageEmbed } = require("discord.js")

module.exports = new Underline.Command({
  async onCommand(msg, { args, usedPrefix, usedAlias }) {
    const embed = new MessageEmbed();
    embed.setAuthor(Underline.client.user.tag, Underline.client.user.avatarURL());
    embed.setTitle("Command List");
    Underline.commands.forEach((command) => {
      let desc = `> ${command.desc ? command.desc : "*No Description.*"}\n${command.developerOnly ? "\n> - Developer Only." : ""}\n** **`.trim();
      embed.addField(`• ${command.aliases.join(", ")}`, desc);
    });
    embed.setFooter(`YouTube With Friends © 2021 Google LLC | Nora#1768`);
    embed.setTimestamp();
    embed.setColor("#FF0000");
    msg.channel.send(embed);
  },
  coolDown: 2000,
  guildOnly: false
})
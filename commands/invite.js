const disbut = require('discord-buttons');

module.exports = new (require("../types/Command"))({
    desc: "Add the bot to your own server!",
    async onCommand(msg, { args, usedPrefix, usedAlias }) {
        let button1 = new disbut.MessageButton()
            .setStyle('url')
            .setURL('https://discord.com/oauth2/authorize?client_id=831408659262472222&scope=bot&permissions=16385')
            .setLabel('Invite!');
        let button2 = new disbut.MessageButton()
            .setStyle('url')
            .setURL('https://top.gg/bot/831408659262472222/vote')
            .setLabel('Vote for me!');
        let row = new disbut.MessageActionRow()
            .addComponents([button1, button2])
        return msg.channel.send('‎', row);
    },
    coolDown: 2000
})
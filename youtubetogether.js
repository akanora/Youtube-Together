const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");
const prefix = '-';
const dotenv = require('dotenv').config();

client.on('ready', () => {
    console.log(`Watch2Gether : Logged in as ${client.user.tag}`);
    client.user.setActivity("-w2g", {
        type: "WATCHING"
    });
});

client.on('message', async message => {
    if (message.author.bot) return;

    var args = message.content.match(/[^_\W]+/g);
    args = (args == null) ? "" : args.join(' ').toLowerCase().trim().split(/ +/g);
    var command = (args != "" && message.content.charAt(0) === prefix) ? args.shift() : false;
    if (command === `w2g`) {
        if (!message.member.voice.channel) return message.channel.send("To use this command, you must join a voice channel.")
        fetch(`https://discord.com/api/v8/channels/${message.member.voice.channelID}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913", // youtube together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data => {
            console.log(data)
            message.channel.send(`
			✅ **Party created!**\nℹ️ Use the Referral link to join the party and invite your friends.\n\nReferral Link: https://discord.gg/${data.code}
			`);
        });
    }

    if (command === `poker`) {
        if (!message.member.voice.channel) return message.channel.send("To use this command, you must join a voice channel.")
        fetch(`https://discord.com/api/v8/channels/${message.member.voice.channelID}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755827207812677713", // poker together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data => {
            message.channel.send(`
			✅ **Party created!**\nℹ️ Use the Referral link to join the party and invite your friends.\n\nReferral Link: https://discord.gg/${data.code}
			`);
        });
    }

    if (command === `help`) {
        message.channel.send("Read the bot status!\n\nDeveloper: Nora#1768")
    }

    if (command === `invite`) {
        message.channel.send("https://discord.com/oauth2/authorize?client_id=831408659262472222&scope=bot&permissions=0")
    }
});
client.login(process.env.DISCORD_TOKEN);

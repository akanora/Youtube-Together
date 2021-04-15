const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");
const prefix = '-';
const dotenv = require('dotenv').config();

const embed = new Discord.MessageEmbed()
.setColor('#ffc83d')
.setTitle('Youtube Together')
.setURL('https://github.com/Nooraje/Youtube-Together')
.setAuthor('Youtube Together by Nora')
.setDescription("Here's my list of commands")
.setThumbnail('https://cdn.discordapp.com/avatars/740635911225737256/38363f86299ffdbc6481f689a842c716.png')
.addField("So here's my things", "```Misc```****-help**** *get some help*\n****-invite**** *invite my bot*\n\
```Activities```****-w2g**** *Watch some youtube with your friend!*\n****-poker**** *Play some poker with your friend!*\n****-betrayal**** *Wanna play among us from discord?*\n****-fishing**** *Catch some fish with your friend!*\
", true);

client.on('ready', () => {
    console.log(`Watch2Gether : Logged in as ${client.user.tag}`);
    client.user.setActivity("-help", {
        type: "WATCHING"
    });
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    var args = message.content.match(/[^_\W]+/g);
    args = (args == null) ? "" : args.join(' ').toLowerCase().trim().split(/ +/g);
    var cmd = (args != "" && message.content.charAt(0) === prefix) ? args.shift() : false;
    if (cmd === `w2g`) {
        if (!message.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | Missing permission: `Create Invite`");
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
            message.channel.send(`
			✅ **Party created!**\nℹ️ Use the Referral link to join the party and invite your friends.\n\nReferral Link: https://discord.gg/${data.code}
			`);
        });
    }

    if (cmd === `poker`) {
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

    if (cmd === `betrayal`) {
        if (!message.member.voice.channel) return message.channel.send("To use this command, you must join a voice channel.")
        fetch(`https://discord.com/api/v8/channels/${message.member.voice.channelID}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "773336526917861400", // betrayal together
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

    if (cmd === `fishing`) {
        if (!message.member.voice.channel) return message.channel.send("To use this command, you must join a voice channel.")
        fetch(`https://discord.com/api/v8/channels/${message.member.voice.channelID}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "814288819477020702", // fishing together
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

    if (cmd === `help`) {
        message.channel.send(embed)
    }

    if (cmd === `invite`) {
        message.channel.send("https://discord.com/oauth2/authorize?client_id=831408659262472222&scope=bot&permissions=0")
    }
});
client.login(process.env.DISCORD_TOKEN);

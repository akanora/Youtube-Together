const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");
const prefix = '-';
require('dotenv').config()

const helpembed = new Discord.MessageEmbed()
    .setColor('#ffc83d')
    .setTitle('Youtube Together')
    .setURL('https://github.com/Nooraje/Youtube-Together')
    .setDescription("Watch youtube together, fish with your friends and even play among us!")
    .setThumbnail('https://www.sehertunali.com/wp-content/uploads/2018/12/youtube-logo.png')
    .setImage('https://cdn.discordapp.com/attachments/780490774251962379/833053942648012851/unknown.png')
    .setFooter('YouTube With Friends © 2021 Google LLC', 'https://www.sehertunali.com/wp-content/uploads/2018/12/youtube-logo.png')
    .addField("So here's my things", "```Misc```****-help**** *get some help*\n****-invite**** *invite my bot*\n\
```Activities```****-w2g**** *Watch some youtube with your friend!*\n****-poker**** *Play some poker with your friend!*\n****-betrayal**** *Wanna play among us from discord?*\n****-fishing**** *Catch some fish with your friend!*\
", true);

client.on('ready', () => {
    console.log(`Watch2Gether : Logged in as ${client.user.tag}`);
    client.user.setActivity("-w2g", {
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
	const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!message.member.voice.channel) return message.channel.send("To use this command, you must join a voice channel.")
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | I need `CREATE_INSTANT_INVITE` permission");
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
	    if(data.code == 50035) {
		    return message.channel.send("❌ | Missing permission: `CREATE_INSTANT_INVITE`")
	    } else {
	            return message.channel.send(`✅ **Party created!**\nℹ️ Use the Referral link to join the party and invite your friends.\n\nReferral Link: https://discord.gg/${data.code}`);
	    }
        }).catch(e => {
            message.channel.send("❌ | Could not start **YouTube Together**!");
        })
    }

    if (cmd === `poker`) {
	const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!message.member.voice.channel) return message.channel.send("To use this command, you must join a voice channel.")
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | I need `CREATE_INSTANT_INVITE` permission");
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
	    if(data.code == 50035) {
		    return message.channel.send("❌ | Missing permission: `CREATE_INSTANT_INVITE`")
	    } else {
	            return message.channel.send(`✅ **Party created!**\nℹ️ Use the Referral link to join the party and invite your friends.\n\nReferral Link: https://discord.gg/${data.code}`);
	    }
        }).catch(e => {
            message.channel.send("❌ | Could not start **Poker Night**!");
        })
    }

    if (cmd === `betrayal`) {
	const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!message.member.voice.channel) return message.channel.send("To use this command, you must join a voice channel.")
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | I need `CREATE_INSTANT_INVITE` permission");
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
	    if(data.code == 50035) {
		    return message.channel.send("❌ | Missing permission: `CREATE_INSTANT_INVITE`")
	    } else {
	            return message.channel.send(`✅ **Party created!**\nℹ️ Use the Referral link to join the party and invite your friends.\n\nReferral Link: https://discord.gg/${data.code}`);
	    }
        }).catch(e => {
            message.channel.send("❌ | Could not start **Betrayal.io**!");
        })
    }

    if (cmd === `fishing`) {
	const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!message.member.voice.channel) return message.channel.send("To use this command, you must join a voice channel.")
	if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | I need `CREATE_INSTANT_INVITE` permission");
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
	    if(data.code == 50035) {
		    return message.channel.send("❌ | Missing permission: `CREATE_INSTANT_INVITE`")
	    } else {
	            return message.channel.send(`✅ **Party created!**\nℹ️ Use the Referral link to join the party and invite your friends.\n\nReferral Link: https://discord.gg/${data.code}`);
	    }
        }).catch(e => {
            message.channel.send("❌ | Could not start **Fishington.io**!");
        })
    }

    if (cmd === `help`) {
	const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
	if (!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.send("❌ | I need `EMBED_LINKS` permission");
        message.channel.send(helpembed)
    }

    if (cmd === `invite`) {
        message.channel.send("https://discord.com/oauth2/authorize?client_id=831408659262472222&scope=bot&permissions=16385")
    }

    if (cmd === `stats`) {
        guildcount = client.guilds.cache.size
        membercount = message.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)
        channelcount = client.channels.cache.size
        const statsembed = new Discord.MessageEmbed()
            .setColor('#ffc83d')
            .setTitle('Youtube Together')
            .setURL('https://github.com/Nooraje/Youtube-Together')
            .addFields(
                { name: 'Guilds', value: guildcount, inline: true },
                { name: 'Users', value: membercount, inline: true },
                { name: 'Channels', value: channelcount, inline: true },
            )
            .setFooter('YouTube With Friends © 2021 Google LLC', 'https://www.sehertunali.com/wp-content/uploads/2018/12/youtube-logo.png')

        message.channel.send(statsembed)
    }
});
client.login(process.env.DISCORD_TOKEN);

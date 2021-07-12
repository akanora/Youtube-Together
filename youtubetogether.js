const config = require("./config");
const { plsParseArgs } = require("plsargs");
const Discord = require("discord.js");
const chillout = require("chillout");
const path = require("path");
const readdirRecursive = require("recursive-readdir");
const { makeSureFolderExists } = require("stuffs");
const Command = require("./types/Command");
const client = new Discord.Client(config.clientOptions);

require('discord-buttons')(client);

global.commands = new Discord.Collection();
global.events = new Discord.Collection();
global.config = config;
global.client = client;

console.info("[BİLGİ] Youtube Together - by Nora");
(async () => {
  let commandsPath = path.resolve("./commands");
  await makeSureFolderExists(commandsPath);
  let eventsPath = path.resolve("./events");
  await makeSureFolderExists(eventsPath);

  config.onBeforeLoad(client);

  let loadStart = Date.now();
  let commandFiles = await readdirRecursive(commandsPath);

  await chillout.forEach(commandFiles, (commandFile) => {
    let start = Date.now();
    console.info(`[INFO] "${commandFile}" command is loading.`)
    /** @type {import("./types/Command")} */
    let command = require(commandFile);

    if (typeof command.name != "string") command.name = path.basename(commandFile).slice(0, -3).replace(/ /g, "");
    if (!command.aliases.includes(command.name)) command.aliases.unshift(command.name);

    if (global.commands.has(command.name)) {
      console.warn(`[WARNING] Command named "${command.name}" has already been installed. It's skipping.`)
      return;
    }

    if (typeof command.onCommand != "function") {
      console.error(`[ERROR] Command "${command.name}" does not have a valid onCommand function! It's skipping.`);
      return;
    };

    if (!command.guildOnly && (command.perms.bot.length != 0 || command.perms.user.length != 0)) {
      console.warn(`[WARNING] command "${command.name}" is not server specific but uses custom perm.`);
    }

    global.commands.set(command.name, command);
    command.onLoad(client);
    console.info(`[INFO] The command "${command.name}" has been loaded. (It took ${Date.now() - start}ms.)`);
  });

  if (global.commands.size) {
    console.info(`[INFO] ${global.commands.size} command loaded.`);
  } else {
    console.warn(`[WARNING] No commands loaded, is everything ok?`);
  }

  let eventFiles = await readdirRecursive(eventsPath);
  await chillout.forEach(eventFiles, async (eventFile) => {
    let start = Date.now();
    console.info(`[INFO] Loading event "${eventFile}"..`);

    /** @type {import("./types/Event")} */
    let event = require(eventFile);

    if (typeof event.name != "string") event.name = path.basename(eventFile).slice(0, -3).replace(/ /g, "");

    if (global.events.has(event.name)) {
      console.warn(`[WARNING] Event named "${event.name}" has already been loaded. It's skipping.`);
      return;
    }

    if (typeof event.onEvent != "function") {
      console.error(`[ERROR] Event named "${event.name}" does not have a valid onEvent function! It's skipping.`);
      return;
    };

    global.events.set(event.name, event);
    event.onLoad(client);
    console.info(`[INFO] Event named "${event.name}" has been loaded. (It took ${Date.now() - start}ms.)`);
  })

  if (global.events.size) {
    console.info(`[INFO] ${global.events.size} event loaded.`);
  } else {
    console.warn(`[INFO] No events loaded, is everything ok?`);
  }

  client.on("message", async (message) => {
    if (message.author.id == client.user.id) return;

    let usedPrefix = "";
    let usedAlias = "";
    let content = message.content;

    await chillout.forEach(config.prefixes, (p) => {
      if (content.slice(0, p.length).toLowerCase() == p.toLowerCase()) {
        usedPrefix = p;
        usedAlias = content.slice(p.length).trim().split(" ", 2)[0];
        return chillout.StopIteration;
      }
    });

    if (!usedPrefix || !usedAlias) return;
    let lowerUsedAlias = usedAlias.toLowerCase();
    let args = content.trim().split(" ");
    let plsargs = plsParseArgs(args);

    chillout.forEach(
      global.commands.array(),
      /**
       * @param {Command} command
       */
      (command) => {
        if (!command.aliases.some(i => i.toLowerCase() == lowerUsedAlias)) return;

        if (command.developerOnly && !config.developers.has(message.author.id)) {
          config.messages.developerOnly(message, command);
          return chillout.StopIteration;
        }

        if (config.blockedUsers.has(message.author.id)) {
          config.messages.blocked(message, command);
          return chillout.StopIteration;
        }

        if (command.guildOnly && message.channel.type == "dm") {
          config.messages.guildOnly(message, command);
          return chillout.StopIteration;
        }

        if (command.disabled) {
          config.messages.disabled(message, command);
          return chillout.StopIteration;
        }

        let userCooldown = command.coolDowns.get(message.author.id) || 0;
        if (Date.now() < userCooldown) {
          config.messages.coolDown(message, command, userCooldown - Date.now());
          return chillout.StopIteration;
        }

        function setCoolDown(duration = 0) {
          if (typeof duration == "number" && duration > 0) {
            return command.coolDowns.set(message.author.id, Date.now() + duration);
          } else {
            return command.coolDowns.delete(message.author.id);
          }
        }

        if (command.coolDown > 0) {
          setCoolDown(command.coolDown);
        }

        if (command.guildOnly && command.perms.bot.length != 0 && !command.perms.bot.every(perm => message.guild.me.permissions.has(perm))) {
          config.messages.botPermsRequired(message, command, command.perms.bot);
          return chillout.StopIteration;
        }

        if (command.guildOnly && command.perms.user.length != 0 && !command.perms.user.every(perm => message.member.permissions.has(perm))) {
          config.messages.userPermsRequired(message, command, command.perms.user);
          return chillout.StopIteration;
        }

        command.onCommand(message, {
          args, plsargs, usedPrefix, usedAlias,
          setCoolDown
        })

        return chillout.StopIteration;
      }
    );
  })

  {
    /** @type {Map<string, (import("./types/Event"))[]>} */
    let eventsMapped = global.events.array().reduce((all, cur) => {
      if (!all.has(cur.eventName)) all.set(cur.eventName, []);
      all.get(cur.eventName).push(cur);
      return all;
    }, new Map());

    await chillout.forEach(
      Array.from(eventsMapped.entries()),
      /**
       * @param {[string, (import("./types/Event"))[]>]} param0
       */
      ([eventName, events]) => {
        console.info(`[INFO] ${events.length} listener loaded for event "${eventName}"!`);
        client.on(eventName, (...args) => {
          chillout.forEach(events, (event) => {
            if (!event.disabled) {
              event.onEvent(...args);
            }
          });
        });
      }
    )
  }

  console.info(`[INFO] Everything loaded in ${Date.now() - loadStart}ms!`);

  client.on("guildDelete", guild => {
    var now = new Date();
    client.channels.cache.get(`835899096493195274`).send(`${new Date(now)} | Left a guild: ` + guild.name + " | " + guild.memberCount)
  })

  commandFiles = 0;
  eventFiles = 0;
  loadStart = 0;

  config.onAfterLoad(client);

  await client.login(config.clientToken);
  console.info("[INFO] Connected to Discord!", client.user.tag);
  config.onReady(client);
})();




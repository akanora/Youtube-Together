require("./other/patchConsoleLog");
const config = require("./config");
const Discord = require("discord.js");
const chillout = require("chillout");
const path = require("path");
const readdirRecursive = require("recursive-readdir");
const { makeSureFolderExists } = require("stuffs");
const client = new Discord.Client(config.clientOptions);

const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);

const interactions = new Discord.Collection();
const events = new Discord.Collection();

globalThis.Underline = {
  config,
  client,
  interactions: interactions,
  events: events,
  Interaction: require('./types/Interaction'),
  Event: require('./types/Event'),
  SlashCommand: require("./types/SlashCommand"),
  SlashSubCommand: require("./types/SlashSubCommand"),
  MessageAction: require("./types/MessageAction"),
  UserAction: require("./types/UserAction"),
}

console.info("[INFO] Simple Activity Bot.");
(async () => {
  let interactionsPath = path.resolve("./interactions");
  await makeSureFolderExists(interactionsPath);
  let eventsPath = path.resolve("./events");
  await makeSureFolderExists(eventsPath);

  await config.onBeforeLoad(client);

  let loadStart = Date.now();
  let interactionFiles = await readdirRecursive(interactionsPath);

  interactionFiles = interactionFiles.filter(i => {
    let state = path.basename(i).startsWith("-");
    if (state) console.warn(`[WARNING] The file "${i}" is unlisted because it starts with a hyphen.`);
    return !state;
  });

  await chillout.forEach(interactionFiles, (interactionFile) => {
    let start = Date.now();
    let rltPath = path.relative(__dirname, interactionFile);
    console.info(`[INFO] Loading interaction at "${interactionFile}"..`)
    /** @type {import("./types/Interaction")} */
    let interactionData = require(interactionFile);

    if (interactionData?._type != "interaction") {
      console.warn(`[WARNING] The interaction file "${rltPath}" is empty. Skipping..`);
      return;
    }

    if (!interactionData.type) {
      console.warn(`[WARNING] A type is not specified for your interaction file "${rltPath}". It is skipping.`);
      return;
    }

    if (!interactionData.id) {
      console.warn(`[WARNING] The interaction file "${rltPath}" does not have an id. Skipping..`);
      return;
    }

    if (typeof interactionData.name != "string") {
      console.warn(`[WARNING] The interaction file "${rltPath}" does not have a name. Skipping..`);
      return;
    }
    if (interactionData.actionType == "CHAT_INPUT") interactionData.name = interactionData.name.replace(/ /g, "").toLowerCase();

    if (typeof interactionData.type == "SUB_COMMAND" && !interactionData.subName) {
      console.warn(`[WARNING] The interaction file "${rltPath}" is of type "SUB_COMMAND" but does not contain a subName. Skipping..`);
      return;
    }


    if (Underline.interactions.has(interactionData.id)) {
      console.warn(`[WARNING] An interaction with id "${interactionData.id}" is already installed. It is skipping.`)
      return;
    }

    if (typeof interactionData.onInteraction != "function") {
      console.error(`[ERROR] Interaction file "${rltPath}" does not have a valid onInteraction! It is skipping.`);
      return;
    };

    if (!interactionData.guildOnly && (interactionData.perms.bot.length != 0 || interactionData.perms.user.length != 0)) {
      console.warn(`[WARNING] The interaction file "${rltPath}" is not server specific but uses custom perm.`);
    }


    Underline.interactions.set(interactionData.id, interactionData);
    interactionData.onLoad(client);
    console.info(`[INFO] "/${interactionData.name}${interactionData.subName ? ` ${interactionData.subName}` : ""}" (${interactionData.id}) named interaction loaded. (${Date.now() - start}ms.)`);
  });

  if (Underline.interactions.size) {
    console.info(`[INFO] ${Underline.interactions.size} interaction loaded.`);
  } else {
    console.warn(`[WARNING] No interactions loaded, is everything ok?`);
  }

  let eventFiles = await readdirRecursive(eventsPath);

  eventFiles = eventFiles.filter(i => {
    let state = path.basename(i).startsWith("-");
    if (state) console.warn(`[WARNING] The file "${i}" is unlisted because it starts with a hyphen.`);
    return !state;
  });

  await chillout.forEach(eventFiles, async (eventFile) => {
    let start = Date.now();
    let rltPath = path.relative(__dirname, eventFile);
    console.info(`[INFO] Loading event "${eventFile}"..`);

    /** @type {import("./types/Event")} */
    let event = require(eventFile);

    if (event?._type != "event") {
      console.warn(`[WARNING] The event file "${rltPath}" is empty. Skipping....`);
      return;
    }

    if (typeof event.id != "string") event.id = path.basename(eventFile).slice(0, -3).replace(/ /g, "");

    if (Underline.events.has(event.id)) {
      console.warn(`[WARNING] An event named "${event.id}" has already been loaded. It's skipping.`);
      return;
    }

    if (typeof event.onEvent != "function") {
      console.error(`[ERROR] Event file "${rltPath}" does not have a valid onEvent function! It's skipping.`);
      return;
    };

    Underline.events.set(event.id, event);
    event.onLoad(client);
    console.info(`[INFO] ("${rltPath}") The event "${event.id}" has been loaded. (It took ${Date.now() - start}ms.)`);
  })

  if (Underline.events.size) {
    console.info(`[INFO] The ${Underline.events.size} event has been loaded.`);
  } else {
    console.warn(`[WARNING] No events loaded, is everything ok?`);
  }

  client.on("interactionCreate", async (interaction) => {
    if (!(interaction.isCommand() || interaction.isContextMenu())) return;

    let command = Underline.interactions.find(cmd => {
      if (cmd.type == "SUB_COMMAND") {
        return cmd.name == interaction.commandName && cmd.subName == interaction.options.getSubcommand();
      } else if (cmd.type == "COMMAND") {
        return cmd.name == interaction.commandName;
      }
    });

    if (!command) return;

    if (config.autoDefer) interaction.defer();

    let shouldRun1 = await config.onInteractionBeforeChecks(command, interaction);

    if (!shouldRun1) return;

    if (command.developerOnly && !config.developers.has(interaction.user.id)) {
      config.userErrors.developerOnly(interaction, command);
      return;
    }

    if (command.disabled) {
      config.userErrors.disabled(interaction, command);
      return;
    }

    if (config.blockedUsers.has(interaction.user.id)) {
      config.userErrors.blocked(interaction, command);
      return;
    }

    if (command.guildOnly && interaction.channel.type == "dm") {
      config.userErrors.guildOnly(interaction, command);
      return;
    }


    let other = {};

    let userCooldown = command.coolDowns.get(interaction.user.id) || 0;
    if (Date.now() < userCooldown) {
      config.userErrors.coolDown(interaction, command, userCooldown - Date.now());
      return;
    }

    function setCoolDown(duration = 0) {
      if (typeof duration == "number" && duration > 0) {
        return command.coolDowns.set(interaction.user.id, Date.now() + duration);
      } else {
        return command.coolDowns.delete(interaction.user.id);
      }
    }
    other.setCoolDown = setCoolDown;

    if (command.coolDown > 0) {
      setCoolDown(command.coolDown);
    }

    if (command.guildOnly && command.perms.bot.length != 0 && !command.perms.bot.every(perm => interaction.guild.me.permissions.has(perm))) {
      config.userErrors.botPermsRequired(interaction, command, command.perms.bot);
      return;
    }

    if (command.guildOnly && command.perms.user.length != 0 && !command.perms.user.every(perm => interaction.member.permissions.has(perm))) {
      config.userErrors.userPermsRequired(interaction, command, command.perms.user);
      return;
    }

    (async () => {
      let shouldRun2 = await config.onInteraction(command, interaction, other);
      if (!shouldRun2) return;
      await command.onInteraction(interaction, other);
    })();

    return;
  })

  {
    /** @type {Map<string, (import("./types/Event"))[]>} */
    let eventsMapped = Underline.events.reduce((all, cur) => {
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
          setTimeout(() => {
            chillout.forEach(events, (event) => {
              if (!event.disabled) {
                event.onEvent(...args);
              }
            });
          }, 0)
        });
      }
    )
  }

  console.info(`[INFO] Everything loaded in ${Date.now() - loadStart}ms!`);

  interactionFiles = 0;
  eventFiles = 0;
  loadStart = 0;

  await config.onAfterLoad(client);

  await client.login(config.clientToken);
  console.info("[INFO] Connected to Discord!", client.user.tag);

  config.onReady(client);
})();



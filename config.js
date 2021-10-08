module.exports = new (require("./types/Config"))({
    // E tabi, bot tokeni buraya.
    clientToken: "",
    // Yasaklı kullanıcıların idleri.
    blockedUsers: new Set([]),
    // Geliştiricilerin idleri.
    developers: new Set([
      "544567870776934431"
    ]),
    // Discord.js client ayarları.
    clientOptions: {
      // Okumanızı tavsiye ederim: https://discordjs.guide/popular-topics/intents.html
      intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_WEBHOOKS", "GUILD_VOICE_STATES"]
    },
    // Diğer ayarlar. Bunun içine ne isterseniz koyabilirsiniz.
    // Ulaşmak için "Underline.config.other" objesini kullanabilirsiniz.
    other: {
  
    },
    // Kullanıcı hatalarındaki uyarı mesajları/olayları.
    userErrors: {
      // Arka arkaya interaksiyon kullanma limiti aşıldığında.
      coolDown(interaction, uInteraction, coolDown) {
        interaction.reply(`You can use this interaction again in ${(coolDown / 1000).toFixed(2)} seconds.`)
      },
      // interaksiyon kapalı olduğunda
      disabled(interaction, uInteraction) {
        interaction.reply("This interaction is turned off.");
      },
      // Kullanıcı bottan yasaklı olduğunda.
      blocked(interaction, uInteraction) {
        interaction.reply("You are banned from the bot.");
      },
      // Botun çalışmak için x yertkilerine ihtiyacı olduğunda.
      botPermsRequired(interaction, uInteraction, perms) {
        interaction.reply(`I need ${perms.join(", ")} privileges for this interaction to work.`)
      },
      // Kullanıcının interaksiyonu kullanabilmek için x yetkilerine ihtiyacı olduğunda.
      userPermsRequired(interaction, uInteraction, perms) {
        interaction.reply(`You need ${perms.join(", ")} privileges to use this interaction.`)
      },
      // interaksiyon sadece geliştiricilere özel olduğunda.
      developerOnly(interaction, uInteraction) {
        interaction.reply(`Only bot developers can use this interaction..`)
      },
      guildOnly(interaction, uInteraction) {
        interaction.reply(`This interaction can only be used on servers.`)
      }
    },
    // Her interaksiyonun varsayılan ayarları her anahtarın ne
    // işe yaradığını merak ediyorsanız interactions/ornekInteraksiyon.js'e
    // bakabilirsiniz.
    interactionDefaults: {
      actionType: "CHAT_INPUT",
      description: "...",
      developerOnly: false,
      guildOnly: true,
      disabled: false,
      coolDown: 2,
      other: {},
      perms: {
        bot: [],
        user: []
      },
      options: [],
      defaultPermission: true
    },
    // Bot ilk açıldığında daha hiçbirşey yüklenmeden önce çalışan fonksiyon. Opsiyonel.
    onBeforeLoad(client) {
      console.log("[CONFIG] It worked before I started the install.");
    },
    // Bot interaksiyonları ve olayları yükledikten sonra çalışan fonksiyon. Opsiyonel.
    onAfterLoad(client) {
      console.log("[CONFIG] Worked after installation finished.");
    },
    // Bot açıldıktan sonra kullanıma hazır olduktan sonra çalışan fonksiyon. Opsiyonel.
    async onReady(client) {
      console.log("[CONFIG] Worked after logging into Discord account.");
      client.user.setActivity(`/help | Slash Commands Here!`, { type: "WATCHING" });
      
    },
    // interaksiyon üzerinde hiçbir kontrol yapılmadan önce çalışır.
    // Sadece cevap true ise işleme devam eder.
    async onInteractionBeforeChecks(uInteraction, interaction) {
      return true;
    },
    // interaksiyontaki bütün kontrolleri geçtikten sonra, interaksiyon
    // hemen çalıştırılmadan önce çalışır.
    // Sadece cevap true ise işleme devam eder.
    //
    // Other objesini istediğiniz gibi modifiye edebilirsiniz.
    // Nasılsa altakki fonksiyon her interaksiyon çalışmadan önce çalışır.
    async onInteraction(uInteraction, interaction, other) {
      return true;
    }
  })
module.exports = new (require("../types/Event"))({
    // onEvent belirtiğiniz olay yaşandığında çağrılır.
    // Komut argumentlari normal discord.js'deki gib ideğişkendir.
    // Otomatik tamamlama için JSDoc kullanmanızı tavsiye ederim.
    onEvent(guild) {
        var now = new Date();
        client.channels.cache.get(`835899096493195274`).send(`${new Date(now)} | Joined a new guild: ` + guild.name + " | " + guild.memberCount)
    },
    // Olay çalışmaya hazır olduğunda bot açılırken
    // sadece bir kereliğine çağrılır. Opsiyonel
    onLoad(client) {
        // Normal discord.js client objesi.
        client;
    },
    // Event idsi. Opsiyonel, boş bırakıldığında dosya ismini alır.
    // Boşluk içeremez.
    name: "",
    // Herhangi bir discord.js olay ismi.
    eventName: "guildCreate",
    // Event açıkmı kapalı mı?
    // Opsiyonel. Varsayılan değer false.
    disabled: false
});
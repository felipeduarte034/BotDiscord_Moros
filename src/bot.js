const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const dado = require("./dado.js");

////Link add bot
//// ha

client.on("ready", () => {
    console.log(`--> ready: Bot iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setGame(`Eu sou o Moros, Guardião do Destino de: ${client.guilds.size} servidor/es.`);
});

client.on("guildCreate", (guild) => {
    console.log(`--> guildCreate: O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros`);
    client.user.setActivity(`Eu sou o Moros, Guardião do Destino de: ${client.guilds.size} servidor/es.`);
});

client.on("guildDelete", (guild) => {
    console.log(`--> guildDelete: O bot foi removido do servidor: ${guild.name} (id: ${guild.id}).`);
    client.user.setActivity(`Bye, vc perdeu minha proteção, ${client.guilds.size} servidores.`);
});

client.on("message", async msg => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;
    const prefix = msg.content[0];
    if (prefix != config.prefix && prefix != "d") return;

    const line = msg.content.trim().toLowerCase(); //remove espaços e deixa todas as letras em minusculo
    let resp = dado.roll(line, msg.author.username);
    await msg.channel.send(resp);
});

client.login(config.token);

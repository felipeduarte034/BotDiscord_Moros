const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

////Link add bot
//// discordapp.com/oauth2/authorize?=&client_id=549802513457610753&scope=bot&permissions=2048

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
    console.log("prefix: " + msg.content[0]);
    if (msg.content[0] != config.prefix) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    console.log("args: " + args);
    const cmd = args.shift().toLowerCase();
    console.log("cmd: " + cmd);

    let info = cmd.split("d", 2);
    const dQuant = parseInt(info[0]) || false;
    const dValue = parseInt(info[1]) || false;
    console.log("quant: " + dQuant + " - dado: " + dValue);
    if (dQuant > 100 || dQuant < 0) return;
    if (dValue < 0) return;
    if (dQuant && dValue) {
        let result = 0;
        const uname = msg.author.username;
        let resp = `${uname} \n`;
        for (let i = 0; i < dQuant; i++) {
            result = Math.floor(Math.random() * (dValue - 1 + 1)) + 1;
            resp += `${i+1}º    d${dValue}  = ${result} \n`;
        }
        await msg.channel.send(resp);
    }
    else {
        switch (cmd) {
            case "ping":
                const m = await msg.channel.send("Ping?");
                m.edit(`uummm! A minha latência é ${m.createdTimestamp - msg.createdTimestamp}ms. A latência da API é ${Math.round(client.ping)}ms.`);
                break;
            case "moros":
                const resp1 = `Olá aventureiro/a ${msg.author.username}! Eu sou Moros, Gurdião do Destino! \n Conheço o seu futuro, está no meu... \n Como se sente sendo apenas uma constante na existência?`;
                await msg.channel.send(resp1);
                break;
            case "help":
                const resp2 = "-Parâmetros do comando: \n-Prefixo: ? \n-Valor inteiro positivo: 'QUANTIDADE_DE_DADOS' \n-Indentificador: d \n-Valor inteiro positivo: 'VALOR_DO_DADO' \n\n- Exemplos: \n- ?1d2 \n- ?1d20 \n- ?1d100 \n- e variações desse comando. \n- Quantidade maxima de dados: 100";
                await msg.channel.send(resp2);
                break;
            default:
                const resp3 = `Não posso te responder ${msg.author.username}!!! um ?help pode lhe ajudar.`;
                await msg.channel.send(resp3);
                break;
        }
    }
});

client.login(config.token);
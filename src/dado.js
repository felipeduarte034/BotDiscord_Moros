const config = require("./config.json");

exports.roll = function (cmd, username) {
    let dAcre = 0;
    let dDecr = 0;
    let dMaiorQ;
    let dQuant = 0;
    let dValue = 0;

    let resp = "aqui";
    let prefix = cmd[0];
    let posfix;
    let showTotal = false;
    let total = 0;
    let line;

    //! ?help
    if (cmd == "?help" || cmd == "?h") {
        const help = "```***-PARAMETROS DO COMANDO:*** \n" +
            "-Prefixo: ? - o bot só responde comandos iniciados com este prefixo.\n" +
            "- Quantidade de dados: um valor inteiro positivo (de 1 a 50) \n" +
            "- Indentificador: d \n" +
            "- Valor do dado: um valor inteiro positivo (2,4,6,8,10,12,20,50,100): \n" +
            "- Um valor de acrescimo ou decrescimo: +2 ou -2 \n" +
            "- Um valor maior que outro: >15 Ex:(?1d20>15) se o resultado for maior que 15, terá um OK na frente do mesmo.\n" +
            "- Posfixo: t - Exibirá na ultima linha a soma dos resultados dos dados,ou seja, o valor total.\n\n" +
            "***-EXEMPLOS:*** \n" +
            "- ?1d2 \n" +
            "- ?3d20 \n" +
            "- ?3d20>17 \n" +
            "- ?3d12+2 \n" +
            "- ?3d8+1t \n" +
            "- ?1d100 \n" +
            "- e variações desse comando. \n\n" +
            "***-OBS:*** \n" +
            "- Quantidade maxima de dados: 50 \n" +
            "- Comando reduzido: d20 ou d20-1 ou d8+1 - Rola somente um dado. ```\n";
        return help;
    }

    //! d
    if (!cmd.match(/d/)) return "?help";
    if (prefix == config.prefix) {
        const tam_prefix = config.prefix.length;
        line = cmd.slice(tam_prefix); //retira o prefix '?';
        const prmtD = line.split("d");
        dQuant = parseInt(prmtD[0]) || false; //pega o primeiro valor antes do 'd';
        dValue = parseInt(prmtD[1].match(/\d+/)) || false; //pega o primeiro valor depois do 'd';
    } else if (prefix == "d") {
        line = cmd;
        dQuant = 1;
        dValue = cmd.match(/\d+/) || false;
    }

    //! +
    if (cmd.match(/\+/)) {
        const prmtMais = line.split("+");
        dAcre = parseInt(prmtMais[1].match(/\d+/)) || false; //pega o primeiro valor depois do '+';
    }

    //! -
    if (cmd.match(/-/)) {
        const prmtMenos = line.split("-");
        dDecr = parseInt(prmtMenos[1].match(/\d+/)) || false; //pega o primeiro valor depois do '-';
    }

    //! >
    if (cmd.match(/>/)) {
        const prmtMaiorQ = line.split(">");
        dMaiorQ = parseInt(prmtMaiorQ[1].match(/\d+/)) || false; //pega o primeiro valor depois do '>';
    }

    //! t
    if (cmd.match(/t/)) {
        posfix = cmd[cmd.length - 1]; //pega o ultimo caractere do comando;
        if (posfix == "t") {
            showTotal = true;
        }
    }

    //! resposta
    if (dQuant < 0 || dQuant > 50) return "?help";
    if (dValue < 0) return "?help";
    if (dQuant && dValue) {
        let result = 0;
        resp = `@${username} \n`;
        for (let i = 0; i < dQuant; i++) {
            result = Math.floor(Math.random() * (dValue - 1 + 1)) + 1;
            if (dMaiorQ) {
                if (dAcre) {
                    result += dAcre;
                    total += result;
                    if (result > dMaiorQ)
                        resp += "`" + (i + 1) + "º    d" + dValue + " + " + dAcre + " ⟶ `    **" + result + "**  " + "`OK` \n";
                    else
                        resp += "`" + (i + 1) + "º    d" + dValue + " + " + dAcre + " ⟶ `    **" + result + "** \n";
                } else if (dDecr) {
                    result -= dDecr;
                    total += result;
                    if (result > dMaiorQ)
                        resp += "`" + (i + 1) + "º    d" + dValue + " - " + dDecr + " ⟶ `    **" + result + "**  " + "`OK` \n";
                    else
                        resp += "`" + (i + 1) + "º    d" + dValue + " - " + dDecr + " ⟶ `    **" + result + "** \n";
                } else {
                    total += result;
                    if (result > dMaiorQ)
                        resp += "`" + (i + 1) + "º    d" + dValue + " + " + dAcre + " ⟶ `    **" + result + "**  " + "`OK` \n";
                    else
                        resp += "`" + (i + 1) + "º    d" + dValue + " + " + dAcre + " ⟶ `    **" + result + "** \n";
                }
            } else {
                if (dAcre) {
                    result += dAcre;
                    total += result;
                    resp += "`" + (i + 1) + "º    d" + dValue + " + " + dAcre + " ⟶ `    **" + result + "** \n";
                } else if (dDecr) {
                    result -= dDecr;
                    total += result;
                    resp += "`" + (i + 1) + "º    d" + dValue + " - " + dDecr + " ⟶ `    **" + result + "** \n";
                } else {
                    total += result;
                    resp += "`" + (i + 1) + "º    d" + dValue + " + " + dAcre + " ⟶ `    **" + result + "** \n";
                }
            }
        }
        if (showTotal) {
            resp += "```[Total = " + total + "]```";
        }
    }

    //! logs
    /*
    console.log("prefix: " + prefix);
    console.log("posfix: " + posfix);
    console.log("line: " + line);
    console.log("dQuant: " + dQuant);
    console.log("dValue: " + dValue);
    console.log("dAcre: " + dAcre);
    console.log("dDecr: " + dDecr);
    console.log("dMaiorQ: " + dMaiorQ);
    console.log("showTotal: " + showTotal);
    */

    return resp;
}

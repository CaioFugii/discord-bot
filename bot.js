const { TOKEN } = process.env;

const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, players } = require('./config.json');

const services  = require('./services')

client.once("ready", () => {
    console.log(`Bot foi iniciado!`);
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
	if (message.content === `${prefix}elo`) {
        const userData = await services.getEloOf(message.author.id, 'solo-duo')

        let data = userData.find(ele => ele.queueType == 'RANKED_SOLO_5x5')

        if(data){
            data = {...data, image: services.getImage(data.tier)}
            message.channel.send(`Olá **${data.summonerName}**, seu elo dentro de jogo é **${data.tier}** **${data.rank}**, ${data.leaguePoints} pdl's.
    Atualmente você está com **${data.wins} vitórias** / **${data.losses} derrotas**, Winrate de **${Math.floor(data.wins/(data.wins + data.losses) * 100)} %**.
            `,
            {files: [data.image]});
        }
    }

    if (message.content === `${prefix}rank`) {
        message.channel.send('Montando ranking SOLO-DUO aguarde...')
        let list = []
        for await (const player of players) {
            const userData = await services.getInfoOfUser(player.nick, 'solo-duo')   

            let data = userData.find(ele => ele.queueType == 'RANKED_SOLO_5x5')

            if(data){
                list.push(data)
            }
        }      
        const orderList = services.sortAndSetupRank(list)

        message.channel.send(orderList)
    }

    if(message.content === `${prefix}nick`) {
        const player = players.find(element => element.id === message.author.id)
        message.channel.send(`Seu nick cadastrado no bot é: **${player.nick}**, caso tenha trocado de nick dentro do jogo, peça para o moderador fazer essa alteração aqui no bot.`);
    }

    if(message.content === `${prefix}id`){
        console.log(message.channel.members)
    }
});

const startBot = () => {
    client.login(TOKEN)
}

module.exports = {
    startBot
}

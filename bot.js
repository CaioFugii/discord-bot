const { TOKEN } = process.env;

const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, players, comandos } = require('./config.json');

const services  = require('./services')

client.once("ready", () => {
    console.log(`Bot foi iniciado!`);
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
	if (message.content === `${prefix}elo`) {
        let [userData] = await services.getEloOf(message.author.id)
        if(userData){
            userData = {...userData, image: services.getImage(userData.tier)}
            message.channel.send(`Olá **${userData.summonerName}**, seu elo dentro de jogo é **${userData.tier}** **${userData.rank}**, ${userData.leaguePoints} pdl's.
    Atualmente você está com **${userData.wins} vitórias** / **${userData.losses} derrotas**, Winrate de **${Math.floor(userData.wins/(userData.wins + userData.losses) * 100)} %**.
            `,
            {files: [userData.image]});
        }
    }

    if (message.content === `${prefix}rank`) {
        message.channel.send('Montando ranking aguarde...')
        let list = []
        for await (const player of players) {
            const [data] = await services.getInfoOfUser(player.nick)   
            if(data !== undefined){
                list.push(data)
            }
        }      
        const orderList = services.sortRank(list)
        message.channel.send(`
            1 - **${orderList[0].summonerName}** (**${orderList[0].tier}** **${orderList[0].rank}**, ${orderList[0].leaguePoints} pdl's) :sunglasses: :trophy: ${orderList[0].hotStreak ? ':fire: HotStreak' : ''}
2 - **${orderList[1].summonerName}** (**${orderList[1].tier}** **${orderList[1].rank}**, ${orderList[1].leaguePoints} pdl's) :grin: ${orderList[1].hotStreak ? ':fire: HotStreak' : ''}
3 - **${orderList[2].summonerName}** (**${orderList[2].tier}** **${orderList[2].rank}**, ${orderList[2].leaguePoints} pdl's) :confused: ${orderList[2].hotStreak ? ':fire: HotStreak' : ''}
4 - **${orderList[3].summonerName}** (**${orderList[3].tier}** **${orderList[3].rank}**, ${orderList[3].leaguePoints} pdl's) :disappointed: ${orderList[3].hotStreak ? ':fire: HotStreak' : ''}
5 - **${orderList[4].summonerName}** (**${orderList[4].tier}** **${orderList[4].rank}**, ${orderList[4].leaguePoints} pdl's) :neutral_face: ${orderList[4].hotStreak ? ':fire: HotStreak' : ''}
6 - **${orderList[5].summonerName}** (**${orderList[5].tier}** **${orderList[5].rank}**, ${orderList[5].leaguePoints} pdl's) :disappointed_relieved: ${orderList[5].hotStreak ? ':fire: HotStreak' : ''}
7 - **${orderList[6].summonerName}** (**${orderList[6].tier}** **${orderList[6].rank}**, ${orderList[6].leaguePoints} pdl's) :nauseated_face: ${orderList[6].hotStreak ? ':fire: HotStreak' : ''}
8 - **${orderList[7].summonerName}** (**${orderList[7].tier}** **${orderList[7].rank}**, ${orderList[7].leaguePoints} pdl's) :face_vomiting: ${orderList[7].hotStreak ? ':fire: HotStreak' : ''}
`);
    }
    // 

    if(message.content === `${prefix}nick`) {
        const player = players.find(element => element.id === message.author.id)
        message.channel.send(`Seu nick cadastrado no bot é: **${player.nick}**, caso tenha trocado de nick dentro do jogo, peça para o moderador fazer essa alteração aqui no bot.`);
    }

    if(message.content === `${prefix}comandos`) {
        message.channel.send(`Estes são os comandos que eu reconheço: ${comandos}`);
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

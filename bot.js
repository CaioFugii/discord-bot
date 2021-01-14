const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix, players } = require('./config.json');

const services  = require('./services')

client.once("ready", () => {
    console.log(`Bot foi iniciado!`);
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
	if (message.content === `${prefix}elo`) {
        let [userData] = await services.getEloOf(message.author.id)
        userData = {...userData, image: services.getImage(userData.tier)}
        if(userData){
            message.channel.send(`Olá **${userData.summonerName}**, seu elo dentro de jogo é **${userData.tier}** **${userData.rank}**, ${userData.leaguePoints} pdl's`,
            {files: [userData.image]});
        }
    }

    if (message.content === `${prefix}rank`) {
        message.channel.send('Montando ranking aguarde...')
        let list = []
        for await (const player of players) {
            const [data] = await services.getInfoOfUser(player)   
            if(data !== undefined){
                list.push(data)
            }
        }      
        const orderList = services.sortRank(list)
        message.channel.send(`
            1 - **${orderList[0].summonerName}** (**${orderList[0].tier}** **${orderList[0].rank}**, ${orderList[0].leaguePoints} pdl's) :sunglasses: :trophy:
2 - **${orderList[1].summonerName}** (**${orderList[1].tier}** **${orderList[1].rank}**, ${orderList[1].leaguePoints} pdl's) :grin: 
3 - **${orderList[2].summonerName}** (**${orderList[2].tier}** **${orderList[2].rank}**, ${orderList[2].leaguePoints} pdl's) :confused: 
4 - **${orderList[3].summonerName}** (**${orderList[3].tier}** **${orderList[3].rank}**, ${orderList[3].leaguePoints} pdl's) :disappointed: 
5 - **${orderList[4].summonerName}** (**${orderList[4].tier}** **${orderList[4].rank}**, ${orderList[4].leaguePoints} pdl's) :nauseated_face: 
6 - **${orderList[5].summonerName}** (**${orderList[5].tier}** **${orderList[5].rank}**, ${orderList[5].leaguePoints} pdl's) :face_vomiting:
`);

    }

    if(message.content === `${prefix}id`){
        console.log(message.channel.members)
    }
});

const startBot = () => {
    client.login(token)
}

module.exports = {
    startBot
}

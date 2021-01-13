const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json');

const services  = require('./services')

client.once("ready", () => {
    console.log(`Bot foi iniciado!`);
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
	if (message.content === `${prefix}me`) {
        let [userData] = await services.getEloOf(message.author.id)
        userData = {...userData, image: services.getImage(userData.tier)}
        if(userData){
            message.channel.send(`Olá **${userData.summonerName}**, seu elo dentro de jogo é **${userData.tier}** **${userData.rank}**, ${userData.leaguePoints} pdl's`,
            {files: [userData.image]});
        }
    }
});

const startBot = () => {
    client.login(token)
}

module.exports = {
    startBot
}

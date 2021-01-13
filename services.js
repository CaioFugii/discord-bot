const axios  = require("./axios");
const { getSummonerId } = require("./teemo");

const instance = (url) => axios.createInstance(url);

const getEloById = async (id) => {
    const { data } = await instance('https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner').get(`/${id}`);
    return data
};

const getInfoOfUser = async (userName) => {
    const { id } = await getSummonerId(userName)
    return await getEloById(id)
}

const getImage = (elo) => {
    switch (elo) {
        case 'IRON':
            return './imgs/Emblem_Iron.png'
        case 'BRONZE':
            return './imgs/Emblem_Bronze.png'
        case 'SILVER':
            return './imgs/Emblem_Silver.png'
        case 'GOLD':
            return './imgs/Emblem_Gold.png'
        case 'PLATINUM':
            return './imgs/Emblem_Platinum.png'
        case 'DIAMOND':
            return './imgs/Emblem_Diamond.png'
        case 'MASTER':
            return './imgs/Emblem_Master.png'
        case 'GRANDMASTER':
            return './imgs/Emblem_Grandmaster.png'
        case 'CHALLENGER':
            return './imgs/Emblem_Challenger.png'
        default:
            return ''
      }
}


const getEloOf = async (userId) => {
    switch (userId) {
        case '266995531815845889':
            return getInfoOfUser("Sheep Raider")
        case '260240988671442944':
            return getInfoOfUser("RTZ Snake")
        case '356094664832712705':
            return getInfoOfUser("BRP dinhODELICIA")
        case '485246174937219093':
            return getInfoOfUser("MeI1odas")
        case '446465278960861184':
            return getInfoOfUser("V de Volant")
        default:
            return
      }
}

module.exports = services = {
    getEloOf,
    getImage
}
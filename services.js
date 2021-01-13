const axios  = require("./axios");
const { getSummonerId } = require("./teemo");

const instance = (url) => axios.createInstance(url);

const getEloById = async (id) => {
    const { data } = await instance('https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner').get(`/${id}`);
    return data
};

const getAllInformation = async (userName) => {
    const { id } = await getSummonerId(userName)
    return await getEloById(id)
}

const getRankingOf = async (userId) => {
    switch (userId) {
        case '266995531815845889':
            return getAllInformation("Sheep Raider")
        case '260240988671442944':
            return getAllInformation("RTZ Snake")
        case '356094664832712705':
            return getAllInformation("BRP dinhODELICIA")
        case '485246174937219093':
            return getAllInformation("MeI1odas")
        case '446465278960861184':
            return getAllInformation("V de Volant")
      }
}

module.exports = services = {
    getRankingOf
}
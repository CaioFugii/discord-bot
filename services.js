const axios  = require("./axios");
const config = require("./config.json");

const instance = (url) => axios.createInstance(url);

const getSummonerId = async (userName) => {
    const { data } = await instance('https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name').get(`/${userName}`);
    return data
}

const getEloSoloDuo = async (id) => {
    const { data } = await instance('https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner').get(`/${id}`);
    return data
};

const getEloTFT = async (id) => {
    const { data } = await instance('https://br1.api.riotgames.com/tft/league/v1/entries/by-summoner').get(`/${id}`);
    return data
};

const getInfoOfUser = async (userName, type) => {
    const result = await getSummonerId(userName)
    
    if(!result) return []

    const { id } = result

    return  type === 'solo-duo' ? await getEloSoloDuo(id) : await getEloTFT(id)
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

const getEloOf = async (userId, type) => {
    const player = config.players.find(player => player.id === userId)
    if(!player) return
    return await getInfoOfUser(player.nick, type)
}

const elo = (elo) => {
    switch (elo) {
        case 'IRON':
            return 0
        case 'BRONZE':
            return 1
        case 'SILVER':
            return 2
        case 'GOLD':
            return 3
        case 'PLATINUM':
            return 4
        case 'DIAMOND':
            return 5
        case 'MASTER':
            return 6
        case 'GRANDMASTER':
            return 7
        case 'CHALLENGER':
            return 8
      }
}

const tier = (tier) => {
    switch (tier) {
        case 'I':
            return 4
        case 'II':
            return 3
        case 'III':
            return 2
        case 'IV':
            return 1
    }
} 
                     
const setUpRank = (list) => {
  return list.map((userData, index) => {
        const { summonerName, tier, rank, leaguePoints, hotStreak } = userData
        
        return `${index + 1} - **${summonerName}**  (**${tier} ${rank}** , ${leaguePoints} pdl's)${hotStreak ? ' :fire: **HotStreak**': ''} ${summonerName === "BRP dinhODELICIA" ? ':door: :man_police_officer:' : ''}`
    })
}

const sortAndSetupRank = (list) => {
    function sort( a, b ) {
        if ( elo(a.tier) > elo(b.tier) ){
          return -1;
        }
        if ( elo(a.tier) < elo(b.tier) ){
          return 1;
        }
        if ( elo(a.tier) === elo(b.tier) ){
            if ( tier(a.rank) > tier(b.rank) ){
                return -1;
            }
            if ( tier(a.rank) < tier(b.rank) ){
                return 1;
            }
            if ( elo(a.rank) === elo(b.rank) ){
                if ( a.leaguePoints > b.leaguePoints ){
                    return -1;
                }
                if ( a.leaguePoints < b.leaguePoints ){
                    return 1;
                }
                return 0
            }
        }
    }
      
    const orderList = list.sort( sort );

    return setUpRank(orderList)
}

module.exports = services = {
    getEloOf,
    getImage,
    getInfoOfUser,
    sortAndSetupRank,
}
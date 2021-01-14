const { API_LEAGUE } = process.env;
const TeemoJS = require('teemojs');

let api = TeemoJS(API_LEAGUE);

const getSummonerId = async (userName) => {
    return await api.get('br1', 'summoner.getBySummonerName', userName)
};

module.exports = {
    getSummonerId
}
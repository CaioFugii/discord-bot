const TeemoJS = require('teemojs');
const { api_league } = require('../config.json');

let api = TeemoJS(api_league);

const getSummonerId = async (userName) => {
    return await api.get('br1', 'summoner.getBySummonerName', userName)
};

module.exports = {
    getSummonerId
}
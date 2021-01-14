const axios = require('axios')
const cron = require('node-cron');

const createInstance = (url) => {
    let headers = {
      "X-Riot-Token": api_league,
    };
    
    return axios.create({
      baseURL: url,
      headers,
    });
  };

const instance = (url) => createInstance(url);

const cronRoutine = () => {
    cron.schedule('*/25 9-23 * * *', async () => {
      return await instance('https://brp-discordbot.herokuapp.com').get(`/`)
    },{
      timezone: "America/Sao_Paulo"
    });
}

module.exports = { cronRoutine }
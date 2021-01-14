const axios = require('axios')
const cron = require('node-cron');

const createInstance = (url) => {  
    return axios.create({
      baseURL: url
    });
  };

const instance = (url) => createInstance(url);

const cronRoutine = () => {
    cron.schedule('*/25 9-23 * * *', async () => {
      const { data } = await instance('https://brp-discordbot.herokuapp.com').get('/')
      return data
    },{
      timezone: "America/Sao_Paulo"
    });
}

module.exports = { cronRoutine }
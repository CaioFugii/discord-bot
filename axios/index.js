const axios = require('axios')
const { api_league } = require('../config.json');

const createInstance = (url) => {
  let headers = {
    "X-Riot-Token": api_league,
  };
  
  return axios.create({
    baseURL: url,
    headers,
  });
};

module.exports={
    createInstance,
  };
  
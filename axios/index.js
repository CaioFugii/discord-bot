const { API_LEAGUE } = process.env;
const axios = require('axios')

const createInstance = (url) => {
  let headers = {
    "X-Riot-Token": API_LEAGUE,
  };
  
  return axios.create({
    baseURL: url,
    headers,
  });
};

module.exports={
    createInstance,
  };
  
const axios = require("axios");
const issues = require("./issues");
const util = require("util");

const BB_API_URL = "https://api.bitbucket.org/2.0/repositories/%s/%s/";

module.exports = (credentials, workspace, repository) => {
  const axiosInstance = axios.create({
    baseURL: util.format(BB_API_URL, workspace, repository),
    auth: credentials
  });

  return {
    issues: issues(axiosInstance)
  };
};

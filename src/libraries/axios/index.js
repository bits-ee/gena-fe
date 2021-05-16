const axios = require("axios");
window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json'
let sessionKey = sessionStorage.getItem('sessionKey');
if(sessionKey) axios.defaults.headers.common.Authorization = 'Bearer '+sessionKey
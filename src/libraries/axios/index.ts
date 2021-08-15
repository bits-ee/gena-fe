const axios = require("axios");
//don't know why but lodash import shows error when i move it in another file
const _ = require("lodash")
(window as any)._ = _;
(window as any).axios = axios
axios.defaults.baseURL = process.env.VUE_APP_DATA_SERVICE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json'
let sessionKey = sessionStorage.getItem('sessionKey');
if(sessionKey) axios.defaults.headers.common.Authorization = 'Bearer '+sessionKey
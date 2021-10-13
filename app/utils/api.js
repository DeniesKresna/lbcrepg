import axios from "axios";

const serverBaseUrl = leadbookAPIUrl;
//const serverBaseUrl = leadbookAPIUrl;
/*
 let token = localStorage.getItem("token");
 if (token) {
    token = "Bearer " + token;
 }else{
    token = "xxx";
 }*/

 const api = axios.create({
     baseURL: serverBaseUrl,
 });

 api.interceptors.request.use(function (config) {
  const token = "token caadae99a4c68fdc4612774484ce33d523f9973d";
  if(token != null)
    config.headers.Authorization = token;

  return config;
});
 /**
* Request Wrapper with default success/error actions
 *
 * @param  {string} method
 *
 * @param  {string} route
 *
 * @param  {object} body
 *
 * @return {object} Response data
 */
export default function request (method, route, body = null) {
  const onSuccess = function (response) {
      //console.debug('Request Successful!', response);
      return response.data;
  }

  const onError = function (error) {
      console.error('Request Failed:', error.config);

      if (error.response) {
          // Request was made but server responded with something
          // other than 2xx
          console.error(error.response);

      }else {
          // Something else happened while setting up the request
          // triggered the error
          console.error('Error Message:', error.message);
      }

      return Promise.reject(error.response.data);
  }

  return api({
      method,
      url: route,
      data: body
  }).then(onSuccess)
      .catch(onError);
}
/*
export function profileJson () {
    return require('./tests/profile.json');
}

export function usageJson () {
    return require('./tests/usage.json');
}

export function expiringJson () {
    return require('./tests/expiring.json');
}

export function transactionsJson () {
    return require('./tests/transactions.json');
}
*/
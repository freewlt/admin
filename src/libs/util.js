import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8891' :
    env === 'production' ?
    'http://localhost:3000' ://后台接口地址
    'https://debug.url.com';

util.ajaxUrl = ajaxUrl;

var ajax = util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.qs = function (obj) {
    var res = "";
    if (!obj) {
        return res;
    }
    for (const key in obj) {
        if (obj[key] instanceof Array) {
            res += (function (arr) {
                var res = '';
                arr.forEach(function (value) {
                    res += ('&' + key + '=' + value);
                });
                return res;
            }(obj[key]))
        } else if (obj[key] instanceof Date) {
            res += ('&' + key + '=' + obj[key].format('yyyy-MM-dd hh:mm:ss'));
        } else {
            res += "&" + key + "=" + obj[key]
        }
    }
    return res.substring(1);
}


// Add a request interceptor
ajax.interceptors.request.use(function (config) {
    config['headers']['Content-Type'] = 'application/x-www-form-urlencoded';
    config['headers']['X-Requested-With'] = 'XMLHttpRequest';
    if (config['data'] && typeof config['data'] === 'object') {
        config['data'] = util.qs(config['data']);
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
 
// Add a response interceptor
ajax.interceptors.response.use(function (res) {
    //return response;
    if(res.state === 200){
        return Promise.resolve(res);
    }
    return res;
  }, function (error) {
    return Promise.reject(error);
  });

export default util;


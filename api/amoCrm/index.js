const axios = require('axios');

const amoCrmUrl = 'https://whitecube2.amocrm.ru';

const fetch = axios.create({
    baseURL: amoCrmUrl + '/api/v4'
});

const tokenFetch = axios.create({
    baseURL: amoCrmUrl
});

exports.fetch = fetch;
exports.tokenFetch = tokenFetch;
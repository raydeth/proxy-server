const axios = require('axios');

const amoCrmUrl = 'https://whitecube2.amocrm.ru/api/v4';

const amoCrmFetch = axios.create({
    baseURL: amoCrmUrl
});

module.exports = amoCrmFetch;
const amoCrmFetches = require('../api/amoCrm/index');
var express = require('express');
var router = express.Router();

const properties = require('../env/properties');
const props = properties();

var accessToken = undefined;
const updateTokens = (refreshToken) => {
    amoCrmFetches.tokenFetch.post('/oauth2/access_token', {
        'client_id': props.get('clientId'),
        'client_secret': props.get('clientSecret'),
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
        'redirect_uri': props.get('redirectUri'),
    }).then(response => {
        accessToken = response.data['access_token'];
        //Отнимает 5 минут от времени истечения токена, и переводим в миллисекунды
        setInterval(updateTokens.bind(null, response.data['refresh_token']), (response.data['expires_in'] - 300) * 1000)
    }).catch(reason => {
        console.log(reason);
    });
};

updateTokens(props.get('refreshToken'));

router.get('/*', function (req, res, next) {
    const amoApiCrmUrl = extractApiFromUrl(req.baseUrl);
    amoCrmFetches.fetch.get(amoApiCrmUrl, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
        params: req.query
    }).then(response => {
        res.send(response.data);
    }).catch(reason => {
        console.log(reason);
        res.send();
    });
});

const extractApiFromUrl = (url) => {
    const baseUrl = props.get("baseUrl");
    if (baseUrl) {
        const indexUrl = url.indexOf(baseUrl);
        if (indexUrl != -1) {
            return url.substr(baseUrl.length);
        }
    }
    return url;
};

module.exports = router;

var express = require('express');
var router = express.Router();

const properties = require('../env/properties');
const props = properties();

const amoCrmFetch = require('../api/amoCrm/index');

router.get('/*', function (req, res, next) {
    const amoApiCrmUrl = extractApiFromUrl(req.baseUrl);
    amoCrmFetch.get(amoApiCrmUrl, {
        headers: {
            Authorization: 'Bearer ' + props.get('token')
        }
    }).then(response => {
        res.send(response.data);
    }).catch(reason => {
        console.log(reason);
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

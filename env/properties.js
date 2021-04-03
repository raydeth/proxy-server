var propertiesReader = require('properties-reader');

module.exports = () => propertiesReader('./env/app.properties');
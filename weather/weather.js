const request = require('request');

const getWeather = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/24bfd36545468709b80e77c54adf07c9/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        });
    } else {
        callback('Unable to fetch weather!');
    }
    
})

}

module.exports.getWeather = getWeather;



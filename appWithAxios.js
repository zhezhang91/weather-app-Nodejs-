    const yargs = require('yargs');
    const axios = require('axios');

    const argv = yargs
        .options({
        a: {
            demand: true,
            alias: 'address',
            descript: 'Address to fetch weather for',
            string: true
        }
    })
        .help()
        .alias('help','h')
        .argv;

    var encodeAddress = encodeURIComponent(argv.address);
    var geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

    axios.get(geoUrl)
    .then( response => {
        if(response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find the address!');
        }

        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/24bfd36545468709b80e77c54adf07c9/${lat},${lng}`;
        console.log(response.data);
        return axios.get(weatherUrl);
    })
    .then( response => {
        const temperature = response.data.currently.temperature;
        const apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}, and feels like ${apparentTemperature}`);
    })
    .catch(error => {
        if(error.code === 'ENOTFOUND') {
            console.log('Unable to connect to API server!');
        } else {
            console.log(error.message);
        }
    })
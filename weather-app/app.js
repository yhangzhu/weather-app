const request = require('request');
const geocode = require('../web-server/src/utils/geocode');
const forecast = require('../web-server/src/utils/forecast');
const address = process.argv[2];
const forecastCallback = (error, response) => {
  if (error) {
    return console.log(error);
  } else {
    console.log(response);
  }
};
const geocodeCallback = (error, data) => {
  if (error) {
    return console.log(error);
  } else {
    forecast(data, forecastCallback);
  }
};
if (!address) {
  console.log('unknow address');
} else {
  geocode(address, geocodeCallback);
}

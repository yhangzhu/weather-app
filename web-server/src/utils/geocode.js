const request = require('request');
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoieXVoYW5nemh1IiwiYSI6ImNreTdqNTlnYzExdjAyd29hZXkzbDFreWgifQ.S6PjnHT8sGyLspTQ_VeoPQ`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to Mapbox`, undefined);
    } else if (body.features.length == 0) {
      callback('Cannot find the location', undefined);
    } else {
      const coors = body.features[0].center;
      const data = { latitude: coors[1], longitude: coors[0] };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;

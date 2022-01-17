const request = require('request');

const forecast = (coords, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=476d756bd3ed0f1f8e7d66f046a3ea94&query=${coords.latitude},${coords.longitude}&units=f`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weatherstack.', undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const data = body;

      callback(undefined, data);
    }
  });
};
module.exports = forecast;

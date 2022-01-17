const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const e = require('express');

const app = express();
// paths
const viewsPath = path.join(__dirname, '../templates/views');
const defaultPath = path.join(__dirname, '../public');
const partitalPath = path.join(__dirname, '../templates/partials');
// hbs set up
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partitalPath);

// static directory
app.use(express.static(defaultPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    message: 'This is Home page.',
    footer: 'Create by colley.',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    message: 'This is about page.',
    footer: 'Create by colley.',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    message: 'This is help page.',
    footer: 'Create by colley.',
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide a location.',
    });
  }
  console.log(req.query);
  const { address } = req.query;
  geocode(address, (error, data) => {
    if (error) {
      res.send({
        error,
      });
    } else {
      forecast(data, (err, data) => {
        if (err) {
          res.send({
            error: err,
          });
        } else {
          console.log(data);
          const { name: location } = data.location;
          const {
            weather_descriptions: weatherDesription,
            temperature,
            feelslike,
          } = data.current;
          res.send({
            location,
            weatherDesription,
            temperature,
            feelslike,
          });
        }
      });
    }
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    message: 'Help article not found!',
    footer: 'Create by colley.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    message: 'Page Not Found!',
    footer: 'Create by colley.',
  });
});
app.listen(3000, () => {
  console.log(`Server is up on port 3000`);
});

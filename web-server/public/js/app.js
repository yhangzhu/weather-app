const form = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = input.value;
  fetch('http://localhost:3000/weather?address=' + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          const { location, temperature, feelslike, weatherDesription } = data;
          const message = `${location} is ${weatherDesription[0]}. It is ${temperature} degree out. It really feels like ${feelslike}`;
          messageOne.textContent = message;
        }
      });
    }
  );
});

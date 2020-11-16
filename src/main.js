import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Temp from './js/temp.js';


$('#weatherLocation').click(function() {
  const city = $('#location').val();
  const zipCode = $('#zip-code').val();
  $('#location').val("");
  $('#zip-code').val("");

  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  const urlZip =`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${process.env.API_KEY}`

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };

  request.open("GET", url, true);
  request.send();
  request.open("GET", urlZip, true)
  request.send();
  
  function getElements(response) {
    let temp = new Temp(response.main.temp);
    $('.showLocation').text(`Weather report for ${response.name}`)
    $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature in Fahrenheit is ${temp.tempF} degrees.`);
    $('.showCloudCover').text(`The current cloud cover in ${city} is ${response.weather[0].description} of ${response.clouds.all}% coverage.`)
  }
});

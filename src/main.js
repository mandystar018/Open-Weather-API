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
  const urlZip =`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${process.env.API_KEY}`;
  
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };
  
  
  let request5D = new XMLHttpRequest();
  const url5Days = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}`;
  
  request5D.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response5D = JSON.parse(this.responseText);
      getElements5D(response5D);
    }
  };

  request.open("GET", url, true);
  request.send();
  request.open("GET", urlZip, true);
  request.send();
  request5D.open("GET", url5Days, true);
  request5D.send();
  
  function getElements(response) {
    let temp = new Temp(response.main.temp);
    $('.showLocation').text(`Weather report for ${response.name}`)
    $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature in Fahrenheit is ${temp.tempF} degrees.`);
    $('.showCloudCover').text(`The current cloud cover in ${city} is ${response.weather[0].description} of ${response.clouds.all}% coverage.`);
  }
  
  function getElements5D(response5D) {
    for (let i=0; i<response5D.list.length; i+=4) {
      let tempFiveDay = new Temp(response5D.list[i].main.temp);
      $('.five-day-temp').text(`The temperature at ${response5D.list[i].dx_txt} will be ${tempFiveDay.tempF} degrees.`)
    }
  }
});

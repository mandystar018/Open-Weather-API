import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// usually when is more things to export import {Triangle} from './triangle.js'

$(document).ready(function() {
  $('#TODO').submit(function(event) {
    event.preventDefault();
  });
});
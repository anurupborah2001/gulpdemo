var $, fill;

$ = require('jquery');

(fill = function(item) {
  return $('.tagline').append("" + item);
})('A most creative Art in Singapore and India.');

fill;

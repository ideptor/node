var Calc = require('./calc03');

var calc = new Calc();
calc.emit('stop');

console.log('"Stop" event has been sent to %s', Calc.title);

/*
$ node .\ch04_test04_use_calc03.js
"Stop" event has reached to clac
"Stop" event has been sent to calculator
*/
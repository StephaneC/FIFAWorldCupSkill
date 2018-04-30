var matchFinder = require('../matchFinder');

let m = matchFinder.nextMatch();
console.log(m)

m = matchFinder.nextMatch('France');
console.log(m)

m = matchFinder.nextMatch('france');
console.log(m)
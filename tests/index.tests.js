const index = require('../index.js');
const nextMatchMock = require('./mock/nextmatch');

var response = index.handler(nextMatchMock);
console.log(response);

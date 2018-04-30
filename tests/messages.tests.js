const messages = require('../messages.js')

console.log()

let msg = messages.nextMatchMessage({
    "date" : "16 06 2018",
    "hour" : "13h00 heure locale (12H à Paris)",
    "location" : "Kazan Arena, Kazan",
    "teams":["France","Australie"],
    "tv":["TF1", "beIN Sports 1"],
    "match" : "5"
});
console.log(msg)


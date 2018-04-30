const moment = require('moment')
const groups = require('./data/groups.json') 

var getAllMatches = function(){
    let matches = []
    Object.keys(groups).forEach(function(key) {
        matches = matches.concat(groups[key].matches);
    });
    return matches;
};

var getFuturMatches = function(){
    let matches = getAllMatches();
    let d = moment();
    let futur = [];
    matches.forEach(function(m){
        if(moment(m.date, "DD MM YYYY").isSameOrAfter(d, 'hour')){
            futur.push(m);
        }    
    });
    return futur; 
}

var customIndexOf = function(array, searchElement, fromIndex) {
    return array.map(function(value) {
      return value.toLowerCase();
    }).indexOf(searchElement.toLowerCase(), fromIndex);
  };

exports.getFuturMatches = getFuturMatches;

/**
 * Find next match. 
 * If country not set, return the next match.
 * @param {country} country 
 */
exports.nextMatch = function nextMatch(country){
    let matches = getFuturMatches();
    let match = {
        match : 1000
    };
    matches.forEach(function(m){
        if(m.match < match.match){
            if(!country){
                match = m;
            } else {
                if(customIndexOf(m.teams, country) != -1){
                    match = m;
                }
            }
        }
    });
    if(match.match == 1000) {
        match = null;
    }
    return match; 
};
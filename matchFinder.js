const moment = require('moment')
const groups = require('./data/groups.json') 

var checkTeamName = function(country, match){
    if(country) {
        if(customIndexOf(match.teams, country) != -1){
            return match;
        }
    } else {
        return match;
    }
}

var getAllMatches = function(){
    let matches = []
    Object.keys(groups).forEach(function(key) {
        matches = matches.concat(groups[key].matches);
    });
    return matches;
};

var getFuturMatches = function(country){
    let matches = getAllMatches();
    let d = moment();
    let futur = [];
    matches.forEach(function(m){
        if(moment(m.date, "DD MM YYYY").isSameOrAfter(d, 'hour')){
            let found = checkTeamName(country, m)
            if(found){
                futur.push(found);
            }
        }    
    });
    return futur; 
}

var getPassedMatches = function(country){
    let matches = getAllMatches();
    let d = moment();
    let passed = [];
    matches.forEach(function(m){
        if(moment(m.date, "DD MM YYYY").isBefore(d, 'hour')){
            let found = checkTeamName(country, m)
            if(found){
                passed.push(found);
            }        
        }    
    });
    return passed; 
}

var customIndexOf = function(array, searchElement, fromIndex) {
    return array.map(function(value) {
      return value.toLowerCase();
    }).indexOf(searchElement.toLowerCase(), fromIndex);
  };

exports.getFuturMatches = getFuturMatches;
exports.getPassedMatches = getPassedMatches;

/**
 * Find next match. 
 * If country not set, return the next match.
 * @param {country} country 
 */
exports.nextMatch = function nextMatch(country){
    let matches = getFuturMatches(country);
    let match = {
        match : 1000
    };
    matches.forEach(function(m){
        if(m.match < match.match){
            match = m;
        }
    });
    if(match.match == 1000) {
        match = null;
    }
    return match; 
};
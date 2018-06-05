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

var getScore = function(country, country1){
   let matches = getPassedMatches(country);
   if(matches.length == 0){
       return null;
   }
   if(country1){
        // je parcours les matchs
        for(match in matches){
            if(checkTeamName(country1, match))
                // match trouvé     
                return match;            
        }
        return null;
   } else {
        var m = matches[0]
        for (match in matches){
            if(moment(match.date, "DD MM YYYY")
                .isAfter(moment(m.date, "DD MM YYYY"))){
                    m = match
                }
        }
        return m;        
   }
}

var customIndexOf = function(array, searchElement, fromIndex) {
    return array.map(function(value) {
      return value.toLowerCase();
    }).indexOf(searchElement.toLowerCase(), fromIndex);
  };

exports.getFuturMatches = getFuturMatches;
exports.getPassedMatches = getPassedMatches;
exports.getScore = getScore;
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
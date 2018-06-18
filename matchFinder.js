const moment = require('moment')
const groups = require('./data/groups.json') 

var checkTeamName = function(country, match){
    if(country) {
        if(match.teams[0].toLowerCase() == country.toLowerCase() ||
            match.teams[1].toLowerCase() == country.toLowerCase()){
            return match;
        }
    } else {
        return match;
    }
    return undefined;
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
        if(checkTeamName(country, m)){
            if(moment(m.date, "DD MM YYYY").isSameOrAfter(d, 'hour')){
                console.log("found futur match for " + country + " -- " + JSON.stringify(m));
                futur.push(m);                
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
        if(checkTeamName(country, m)){
            if(moment(m.date, "DD MM YYYY").isBefore(d, 'hour')){
                passed.push(m);
            }
        }           
    });
    console.log("getPassedMatches " + passed.length);
    return passed; 
}

var getScore = function(country, country1){
    if(!country){
        country = country1;
    }
   let matches = getPassedMatches(country);
   if(matches.length == 0){
       return null;
   }
   if(country1){
        // je parcours les matchs
        for(var match in matches){
            if(checkTeamName(country1, match))
                // match trouvé     
                return match;            
        }
        return null;
   } else {
        var m = matches[0]
        for (var match in matches){
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
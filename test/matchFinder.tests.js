var expect = require( 'chai' ).expect;
var matchFinder = require('../matchFinder');
/*
var matchFinder = require('../matchFinder');

let m = matchFinder.nextMatch();
console.log(m)

m = matchFinder.nextMatch('France');
console.log(m)

m = matchFinder.nextMatch('france');
console.log(m)
*/

describe( 'nextMatch', function() {
    it( `nextMatch ok`, function() {
        let m = matchFinder.nextMatch();
        expect(m).to.not.be.null;
    });

    it( `nextMatch ok country`, function() {
        let m = matchFinder.nextMatch('France');
        expect(m).to.not.be.null;
        expect(m.teams.indexOf('France')>-1).to.be.true;

        m = matchFinder.nextMatch('sénégale');
        expect(m).to.not.be.null;
    });


    it( `nextMatch not found country`, function() {
        let m = matchFinder.nextMatch('dummy');
        expect(m).to.be.null;
    });
});

describe( 'getFuturMatches', function() {
    it( `getFuturMatches ok`, function() {
        let m = matchFinder.getFuturMatches();
        expect(m).to.not.be.null;
    });

    it( `nextMatch ok country`, function() {
        let m = matchFinder.getFuturMatches('France');
        expect(m.length).to.equal(3);    
    });


    it( `nextMatch not found country`, function() {
        let m = matchFinder.getFuturMatches('dummy');
        expect(m.length).to.equal(0);    
    });
});


describe( 'getPassedMatches', function() {
    it( `getFuturMatches ok`, function() {
        let m = matchFinder.getPassedMatches();
        expect(m.length).to.equal(0);
    });
});
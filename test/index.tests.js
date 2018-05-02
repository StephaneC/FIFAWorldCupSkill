const myLambda = require('../index.js');
const nextMatchMock = require('./mock/nextmatch');

var expect = require( 'chai' ).expect;
var LambdaTester = require( 'lambda-tester').noVersionCheck();


describe( 'nextMatch', function() {
    it( `nextMatch Error`, function() {    
      
        return LambdaTester( myLambda.handler )
            .event(nextMatchMock)
            .expectResult( ( result ) => {
                console.log(result);
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Le prochain match a lieu le 21 juin à 20h00 heure locale (17H à Paris). Il s'agit de France contre Pérou</speak>"
                );
            });
    });
});
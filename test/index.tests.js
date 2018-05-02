var expect = require( 'chai' ).expect;
var LambdaTester = require( 'lambda-tester').noVersionCheck();

const myLambda = require('../index.js');

const nextMatchCountryMock = require('./mock/nextmatch');
const nextMatchMock = require('./mock/nextmatch.1');
const nextMatchDummyMock = require('./mock/nextmatch.2');

const hhStillowManyMatchCountryMock = require('./mock/howmanymatchstill');
const hhStillowManyMatchMock = require('./mock/howmanymatchstill.1');




describe( 'nextMatch', function() {
    it( `nextMatch country ok`, function() {    
      
        return LambdaTester( myLambda.handler )
            .event(nextMatchCountryMock)
            .expectResult( ( result ) => {
                console.log(result);
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Le prochain match a lieu le 21 juin à 20h00 heure locale (17H à Paris). Il s'agit de France contre Pérou</speak>"
                );
            });
    });

    it( `nextMatch unexist country ok`, function() {    
      
        return LambdaTester( myLambda.handler )
            .event(nextMatchCountryMock)
            .expectResult( ( result ) => {
                console.log(result);
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Le prochain match a lieu le 21 juin à 20h00 heure locale (17H à Paris). Il s'agit de France contre Pérou</speak>"
                );
            });
    });

    it( `nextMatch no country ok`, function() {    
      
        return LambdaTester( myLambda.handler )
            .event(nextMatchDummyMock)
            .expectResult( ( result ) => {
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Aucun match n'a été trouvé.</speak>"
                );
            });
    });
});


describe( 'HowManyMatchesStill', function() {
    it( `HowManyMatchesStill country ok`, function() {   
        return LambdaTester( myLambda.handler )
            .event(hhStillowManyMatchCountryMock)
            .expectResult( ( result ) => {
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Il reste au moins 3 matches à jouer pour l'équipe de france. Bonne chance à eux.</speak>"
                );
            }); 
    });

    it( `HowManyMatchesStill no country ok`, function() {   
        return LambdaTester( myLambda.handler )
            .event(hhStillowManyMatchMock)
            .expectResult( ( result ) => {
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Il reste 64 à jouer.</speak>"
                );
            }); 
    });
});
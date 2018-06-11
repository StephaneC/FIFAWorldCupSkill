var expect = require( 'chai' ).expect;
var LambdaTester = require( 'lambda-tester').noVersionCheck();

const myLambda = require('../index.js');

const nextMatchCountryMock = require('./mock/nextmatch');
const nextMatchMock = require('./mock/nextmatch.1');
const nextMatchDummyMock = require('./mock/nextmatch.2');

const hhStillowManyMatchCountryMock = require('./mock/howmanymatchstill');
const hhStillowManyMatchMock = require('./mock/howmanymatchstill.1');

const score = require('./mock/score.1');
const score_one_country = require('./mock/score.1');
const score_one_country_2 = require('./mock/score.2');


describe( 'nextMatch', function() {
    it( `nextMatch country ok`, function() {    
      
        return LambdaTester( myLambda.handler )
            .event(nextMatchCountryMock)
            .expectResult( ( result ) => {
                console.log(result);
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Le prochain match a lieu le 21 juin à 20h00 heure locale (17H à Paris). Il s'agit de France contre Pérou. Vous souhaitez connaitre autre chose sur cette coupe du monde 2018?</speak>"
                );
            });
    });

    it( `nextMatch unexist country ok`, function() {    
      
        return LambdaTester( myLambda.handler )
            .event(nextMatchCountryMock)
            .expectResult( ( result ) => {
                console.log(result);
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Le prochain match a lieu le 21 juin à 20h00 heure locale (17H à Paris). Il s'agit de France contre Pérou. Vous souhaitez connaitre autre chose sur cette coupe du monde 2018?</speak>"
                );
            });
    });

    it( `nextMatch no country ok`, function() {    
      
        return LambdaTester( myLambda.handler )
            .event(nextMatchDummyMock)
            .expectResult( ( result ) => {
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Aucun match n'a été trouvé.. Vous souhaitez connaitre autre chose sur cette coupe du monde 2018?</speak>"
                );
            });
    });
});


describe( 'HomManyMatchesLeft', function() {
    it( `HomManyMatchesLeft country ok`, function() {   
        return LambdaTester( myLambda.handler )
            .event(hhStillowManyMatchCountryMock)
            .expectResult( ( result ) => {
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Il reste au moins 3 matches à jouer pour l'équipe de france. Bonne chance à eux.. Vous souhaitez connaitre autre chose sur cette coupe du monde 2018?</speak>"
                );
            }); 
    });

    it( `HomManyMatchesLeft no country ok`, function() {   
        return LambdaTester( myLambda.handler )
            .event(hhStillowManyMatchMock)
            .expectResult( ( result ) => {
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Il reste 64 à jouer.. Vous souhaitez connaitre autre chose sur cette coupe du monde 2018?</speak>"
                );
            }); 
    });
});


describe( 'Score', function() {
    it( `Score two countries`, function() {   
        return LambdaTester( myLambda.handler )
            .event(score)
            .expectResult( ( result ) => {
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Je n\'ai pas trouvé le match recherché.. Vous souhaitez connaitre autre chose sur cette coupe du monde 2018?</speak>"
                );
            }); 
    });

    it( `score one country`, function() {   
        return LambdaTester( myLambda.handler )
            .event(score_one_country)
            .expectResult( ( result ) => {
                expect( result.response.outputSpeech.ssml).to.equal(
                    "<speak>Je n\'ai pas trouvé le match recherché.. Vous souhaitez connaitre autre chose sur cette coupe du monde 2018?</speak>"
                );
            }); 
    });

    it( `score one country 2`, function() {   
        return LambdaTester( myLambda.handler )
            .event(score_one_country_2)
            .expectResult( ( result ) => {
                expect(result.response.outputSpeech.ssml).to.equal(
                    "<speak>Je n\'ai pas trouvé le match recherché.. Vous souhaitez connaitre autre chose sur cette coupe du monde 2018?</speak>"
                );
            }); 
    });
});
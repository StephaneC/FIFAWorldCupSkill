const messages = require('../messages.js')
var expect = require( 'chai' ).expect;



describe( 'nextMatchMessage', function() {
    it( `nextMatchMessage ok`, function() {
        let msg = messages.nextMatchMessage({
            "date" : "16 06 2018",
            "hour" : "13h00 heure locale (12H à Paris)",
            "location" : "Kazan Arena, Kazan",
            "teams":["France","Australie"],
            "tv":["TF1", "beIN Sports 1"],
            "match" : "5"
        });
        expect(msg).to.equal("Le prochain match a lieu le 16 juin à 13h00 heure locale (12H à Paris). Il s'agit de France contre Australie");
    });

    it( `nextMatchMessage nok`, function() {
        let msg = messages.nextMatchMessage();
        expect(msg).to.equal("Aucun match n'a été trouvé.");
    });
});
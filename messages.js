const nextMatch = require("./matchFinder");
const moment = require("moment")
/** consts */
exports.NbTeams = 32;
exports.NbStades = 12;
exports.NbMatches = 64;

/**
 * Messages
 */
exports.WhereWFC = "La coupe du monde 2018 aura lieu en Russie";
exports.WhenWFC = "La coupe du monde débute le 14 juin 2018 par le match du groupe A Russie, Arabie Saoudite.";
exports.HowManyMatches = "Il y aura 64 pour cette coupe du monde dont 24 durand les matches de groupes";

exports.WhenFinale = "La finale aura lieu le 15 Juillet à Moscou.";

exports.ContinueMessage = "Vous souhaitez connaitre autre chose sur cette cope du monde 2018?"
exports.HelpMessage = "Envie de connaitre le prochain match d'une équipe vous pouvez demande Quand est le prochain match de l'équipe de France? Demandez!"
exports.ExitSkillMessage = "A bientôt"
exports.WelcomeMessage = "Bienvenue dans votre assistant de coupe du monde. Vous pouvez demande quand aura lieu le prochain match d'une équipe."

moment.locale('fr');

exports.nextMatchMessage = function nextMatchMessage(match){
    if(match){
        let date = moment(match.date, "DD MM YYYY").format('DD MMMM');
        return "Le prochain match a lieu le " + date + " à " + match.hour + ". Il s'agit de "+ match.teams[0] + " contre "+ match.teams[1];    
    } else {
        return "Aucun match n'a été trouvé."
    }
};

exports.nbMatchForCountryMessage = function(country, nbMatchs){
    let msg = "Il reste au moins " + nbMatchs + " matches à jouer pour l'équipe de " + country;
    if(nbMatchs > 0)
    msg = msg+ ". Bonne chance à eux.";
    return msg
}

exports.nbMatchLeftMessage = function(nbMatchs){
    return "Il reste " + nbMatchs + " à jouer.";
}
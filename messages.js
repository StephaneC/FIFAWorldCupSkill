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

exports.ContinueMessage = "Vous souhaitez connaitre autre chose sur cette coupe du monde 2018?"
exports.HelpMessage = "Envie de connaitre le prochain match d'une équipe? Vous pouvez par exemple demander quand est le prochain match de l'équipe de France? Demandez!"
exports.ExitSkillMessage = "A bientôt"
exports.WelcomeMessage = "Bienvenue dans votre assistant de coupe du monde. Vous pouvez demander quand aura lieu le prochain match d'une équipe"

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

exports.getScore = function(match){
    console.log("message.getScore");
    console.log(match)
    if(!match){
        return "Je n'ai pas trouvé le match recherché."
    }
    if (match.score.length == 0){
        return "Je ne connais pas encore le résultat de ce match. Je suis à la bourre ?"
    }
    if(match.score[0] > match.score[1]){
        // gagnant equipe 0
        return match.teams[0] + " a gagné face à " + match.teams[1] 
            + ", " +  match.score[0] +" buts à " + match.score[1];
    } else if(match.score[0] < match.score[1]){
        return match.teams[1] + " a gagné face à " + match.teams[0] 
            + ", " +  match.score[1] +" buts à " + match.score[0];
    } else {
        // egalité
        return "le score " + match.teams[0] + " " + match.teams[1] +
            "est de " + match.score[0] + " à " + match.score[1];  
    }
}
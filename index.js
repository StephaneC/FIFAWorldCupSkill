const Alexa = require('ask-sdk-core');
const messages = require('./messages');
const matchFinder = require('./matchFinder.js');
const skillBuilder = Alexa.SkillBuilders.custom();
const countries = require('./data/countries.json');
const skillId = "amzn1.ask.skill.dddd0e2b-82de-4973-aa67-b4b9a12d3344";
/**
 * 
 * @param {string} country 
 */
var getCountryFromIntent = function(country){
  for(var i in countries){
      if(country.toLowerCase().indexOf(countries[i].toLowerCase())!=-1){
          // pays trouvé
          console.log("trouvé country " + countries[i])
          return countries[i];
      }
  };
  return null;
} 

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.WelcomeMessage)
      .reprompt(messages.HelpMessage)
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    console.log("Inside ErrorHandler");
    return true;
  },
  handle(handlerInput, error) {
    console.log("Inside ErrorHandler - handle");
    console.log(`Error handled: ${JSON.stringify(error)}`);
    console.log(`Handler Input: ${JSON.stringify(handlerInput)}`);

    return handlerInput.responseBuilder
      .speak(messages.HelpMessage)
      .reprompt(messages.HelpMessage)
      .getResponse();
  },
};


const HelpHandler = {
  canHandle(handlerInput) {
    console.log("Inside HelpHandler");
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
           request.intent.name === 'AMAZON.HelpHandler';
  },
  handle(handlerInput) {
    console.log("Inside HelpHandler - handle");
    return handlerInput.responseBuilder
      .speak(messages.HelpMessage)
      .reprompt(messages.HelpMessage)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log("Inside SessionEndedRequestHandler");
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    console.log("Inside ExitHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && (
              request.intent.name === 'AMAZON.StopIntent' ||
              request.intent.name === 'AMAZON.PauseIntent' ||
              request.intent.name === 'AMAZON.CancelIntent'
           );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.ExitSkillMessage)
      .getResponse();
  },
};

const WhereWFC = {
  canHandle(handlerInput) {
    console.log("Inside ExitHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && 
              request.intent.name === 'WhereWFC';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.WhereWFC+ ". " + messages.ContinueMessage)
      .reprompt(messages.ContinueMessage)
      .getResponse();
  },
};

const WhenWFC = {
  canHandle(handlerInput) {
    console.log("Inside ExitHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && 
              request.intent.name === 'WhenWFC';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.WhenWFC + ". " + messages.ContinueMessage)
      .reprompt(messages.ContinueMessage)
      .getResponse();
  },
};

const HowManyMatches = {
  canHandle(handlerInput) {
    console.log("Inside ExitHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && 
              request.intent.name === 'HowManyMatches';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.HowManyMatches + ". " + messages.ContinueMessage)
      .reprompt(messages.ContinueMessage)
      .getResponse();
  },
};

const HomManyMatchesLeft = {
  canHandle(handlerInput) {
    console.log("Inside HomManyMatchesLeft");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && 
              request.intent.name === 'HomManyMatchesLeft';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    let country = null;

    if(request.intent.slots && request.intent.slots.country && 
        request.intent.slots.country.value){
        country = getCountryFromIntent(request.intent.slots.country.value);
        console.log("found country " + country);
    }
    let msg;
    if(!country){
      msg = messages.nbMatchLeftMessage(messages.NbMatches - matchFinder.getPassedMatches().length);
    } else {
      let matches = matchFinder.getFuturMatches(country);
      console.log(JSON.stringify(matches));
      msg = messages.nbMatchForCountryMessage(country, matches.length);
    }
  
    return handlerInput.responseBuilder
      .speak(msg + ". " + messages.ContinueMessage)
      .reprompt(messages.ContinueMessage)
      .getResponse();
  },
};

const WhenFinale = {
  canHandle(handlerInput) {
    console.log("Inside ExitHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && 
              request.intent.name === 'WhenFinale';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.WhenFinale + ". " + messages.ContinueMessage)
      .reprompt(messages.ContinueMessage)
      .getResponse();
  },
};

const NextMatch = {
  canHandle(handlerInput) {
    console.log("Inside NextMatch");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && 
              request.intent.name === 'NextMatch';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    let country = null;
    if(request.intent.slots && request.intent.slots.country && 
      request.intent.slots.country.value){
        country = getCountryFromIntent(request.intent.slots.country.value);
    }
    let match = matchFinder.nextMatch(country);
    let msg = messages.nextMatchMessage(match);
    return handlerInput.responseBuilder
      .speak(msg + ". " + messages.ContinueMessage)
      .reprompt(messages.ContinueMessage)
      .getResponse();
  },
};

const Score = {
  canHandle(handlerInput) {
    console.log("Inside Score");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && 
              request.intent.name === 'Score';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    let country = null;
    let country2 = null;
    console.log("Hande score");
    if(request.intent.slots && request.intent.slots.country && 
      request.intent.slots.country.value){
        country = getCountryFromIntent(request.intent.slots.country.value);
    }
    if(request.intent.slots && request.intent.slots.country_a && 
      request.intent.slots.country_a.value){
        country2 = getCountryFromIntent(request.intent.slots.country_a.value);
    }
    console.log("Score: country: " + country + country2);

    let match = matchFinder.getScore(country, country2);
    let msg = messages.getScore(match);
    console.log("Score:" + msg);
    return handlerInput.responseBuilder
      .speak(msg + ". " + messages.ContinueMessage)
      .reprompt(messages.ContinueMessage)
      .getResponse();
  },
};


/* LAMBDA SETUP */
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    WhereWFC,
    WhenWFC,
    WhenFinale,
    HowManyMatches,
    NextMatch,
    HomManyMatchesLeft,
    Score,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
.lambda();


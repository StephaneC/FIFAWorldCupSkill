const Alexa = require('ask-sdk-core');
const messages = require('./messages');
const matchFinder = require('./matchFinder.js');
const skillBuilder = Alexa.SkillBuilders.custom();

const skillId = "amzn1.ask.skill.dddd0e2b-82de-4973-aa67-b4b9a12d3344";
const welcomeMessage = "Bienvenue dans votre assistant de coupe du monde."
const helpMessage = "Envie de connaitre le prochain match? Demandez!"
const exitSkillMessage = "A bientôt"


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(welcomeMessage)
      .reprompt(helpMessage)
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
      .speak('Error ' + helpMessage)
      .getResponse();
  },
};

const WhatTimeHandler = {
  canHandle(handlerInput) {
    console.log("Inside HelpHandler");
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
           request.intent.name === 'whattimeatxxx';
  },
  handle(handlerInput) {
    console.log("Inside HelpHandler - handle");
    var d = new Date();
    return handlerInput.responseBuilder
      .speak("Il est " + d.getHours() + " heures et " + d.getMinutes() + " minutes")
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
      .speak(helpMessage)
      .reprompt(helpMessage)
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
      .speak(exitSkillMessage)
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
      .speak(messages.WhereWFC)
      .reprompt(messages.WhereWFC)
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
      .speak(messages.WhenWFC)
      .reprompt(messages.WhenWFC)
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
      .speak(messages.HowManyMatches)
      .reprompt(messages.HowManyMatches)
      .getResponse();
  },
};

const HowManyMatchesStill = {
  canHandle(handlerInput) {
    console.log("Inside HowManyMatchesStill");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && 
              request.intent.name === 'HowManyMatchesStill';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    let country = null;

    if(request.intent.slots && request.intent.slots.country && 
        request.intent.slots.country.value){
        country = request.intent.slots.country.value;
    }
    let msg;
    if(!country){
      msg = messages.nbMatchLeftMessage(messages.NbMatches - matchFinder.getPassedMatches());
    } else {
      let matches = matchFinder.getFuturMatches(country);
      msg = messages.nbMatchForCountryMessage(country, matches.length);
    }
  
    return handlerInput.responseBuilder
      .speak(msg)
      .reprompt(msg)
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
      .speak(messages.WhenFinale)
      .reprompt(messages.WhenFinale)
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
        country = request.intent.slots.country.value;
    }
    let match = matchFinder.nextMatch(country);
    let msg = messages.nextMatchMessage(match);
    return handlerInput.responseBuilder
      .speak(msg)
      .reprompt(msg)
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
    HowManyMatchesStill,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
.lambda();


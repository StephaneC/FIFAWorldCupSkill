# Foot World Cup Alexa Skill

With this skill, you can ask informations abot FIFA Worldcup 2018.

##

## Functionnalities
* Où se déroule la coupe du monde ? 
* Quand début la coupe du monde ?
* Combien de matches se dérouleront à la coupe du monde ? 
* Combien de match restent ils ? (TODO)
* Quand se joue le prochain match de l'équipe de France ? 
* Quand se joue la finale?

## Testing
### AWS Testing
In the AWS Lambda page you will find *events tests*. Every function in your lambda HAVE TO be tested this way. It enables developers to :
* Understand your lambda
* Know the input/output
* Be sure that your lambda works 
* Have a set of test data

### Local testing
#### Unit Testing
##### Libraries
To unit test, there is some libraries:
* [mocha](https://mochajs.org/): Mocha is a feature-rich JavaScript test framework.
* [chai](http://www.chaijs.com/): Assertion library for NodeJS.
* [LambdaTester](https://github.com/vandium-io/lambda-tester): A simple lib to tests Lambda. 


##### How to use it
Run the command `mocha` in your terminal. It will run every test available in the `/test` directory.

1. Simple unit tests sample
In this sample, we test the dataExtractor functions. 
First, we have a test description. For this description, we add multiple tests in the `it` section. Then, we assert in the callback with [chai](http://www.chaijs.com/).
```javascript
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
```



## TODO
1. Add more skills
2. Add english version
3. Suivi des scores



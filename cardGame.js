var ClozeCard = require('./ClozeCard.js');
var BasicCard = require('./BasicCard.js');
var basicData = require('./flashcards.json');
var clozeData = require('./clozecard.json');
var inquirer = require('inquirer');

var currentCard;
var cardArray = [];
var initialScore = 0;
var initialIndex = 0;

gameChoice();

function gameChoice(){

	inquirer.prompt([
	{
		type: 'list',
		message: 'BASIC or ADVANCED?',
		name: 'choice',
		choices: ['BASIC', 'ADVANCED']
		
	}
	]).then(function(response){
		if (response.choice === 'BASIC') {
			generateBasicGame();
		}
		else {
			generateClozeGame();
		}


	})

}

function generateBasicGame(){

	for (var i = 0; i < basicData.length; i++) {
		currentCard = new BasicCard(basicData[i].front, basicData[i].back);
		cardArray.push(currentCard);
	}

	askQuestion(initialScore, cardArray, initialIndex);
	
}

function generateClozeGame(){

	for (var i = 0; i < clozeData.length; i++) {
		currentCard = new ClozeCard(clozeData[i].text, clozeData[i].cloze);
		cardArray.push(currentCard);
	}

	clozeQuestion(initialScore, cardArray, initialIndex);

}


	var askQuestion = function(score, arr, index){

		if (index < 10) {

			inquirer.prompt([
			{
				type: 'input',
				name: 'question',
				message: arr[index].front
			}

		]).then(function(response){

			if(response.question === arr[index].back){
				console.log('correct');
				index++;
				score++;
			}	else {
				console.log('wrong!')
				index++;
			}

			askQuestion(score, arr, index);

			});
		}
		else {
			console.log('Nice job! You finished! Your score is: ' + score + '/10');
		}	
	}

	var clozeQuestion = function(score, arr, index){

		if (index < 10) {

			inquirer.prompt([
			{
				type: 'input',
				name: 'question',
				message: arr[index].partial
			}

		]).then(function(response){

			if(response.question === arr[index].cloze){
				console.log('correct');
				console.log(arr[index].text);
				index++;
				score++;
			}	else {
				console.log('wrong!');
				console.log(arr[index].text);
				index++;
			}

			clozeQuestion(score, arr, index);

			});
		}
		else {
			console.log('Nice job! You finished! Your score is: ' + score + '/10');
		}	

	}













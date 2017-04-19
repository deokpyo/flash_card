// require and file reference
var fs = require("fs");
var inquirer = require("inquirer");
var main = require("./app.js");
var data = require("./flashcard.json");
var file = "flashcard.json";

// global variable init
var count = data.length;
var score = 0;
var num = 0;

// Basic Constructor
var Basic = function () {
    this.createCard = createCard;
    this.deleteCard = deleteCard;
    this.playCard = playCard;

    // function to create a new card with user input
    function createCard() {
        inquirer.prompt([
            {
                type: "input",
                message: "Type in the question for front-side. \n(ex. Who was the first president of the United States?)\nquestion: ",
                name: "front"
            },
            {
                type: "input",
                message: "Type in the answer for back-side. \n(ex. George Washington)\nanswer: ",
                name: "back"
            }
        ]).then(function (user) {
            var card = new BasicCard(user.front, user.back);
            card.addCard();
        });
    }

    // function to delete a card with user selection   
    function deleteCard() {
        if (data.length === 0) {
            console.log('No more card to delete');
        }
        else {
            // populate a new array with card questions
            var cards = [];
            for (i = 0; i < data.length; i++) {
                cards.push(data[i].question);
            }
            inquirer.prompt([
                {
                    type: "list",
                    message: "Select a question to delete",
                    choices: cards,
                    name: "card"
                }
            ]).then(function (user) {
                // depending on user selection, remove the card from the data array then write to JSON
                for (j = 0; j < data.length; j++) {
                    if (data[j].question === user.card) {
                        data.splice(j, 1);
                        writeJSON();
                        console.log(user.card + ": has been deleted.")
                    }
                }
                inquirer.prompt([
                    {
                        type: "list",
                        message: "Select an Option Below:",
                        choices: ["Delete More", "Main Menu"],
                        name: "command"
                    }]).then(function (user) {
                        inquireOptions(user.command);
                    });
            });
        }
    }

    // recursive function to play the flashcards
    function playCard() {
        var data = require("./flashcard.json");
        if (count > 0) {
            inquirer.prompt([
                {
                    type: "input",
                    name: "user",
                    message: data[num].question + "\n"
                }
            ]).then(function (answer) {
                if (answer.user === data[num].answer) {
                    console.log(answer.user + " is the Correct Answer!");
                    score++;
                } else {
                    console.log("Sorry, correct answer is " + data[num].answer);
                }
                count--;
                num++;
                playCard();
            });
        } else {
            console.log('--- No more flashcards ---\nYour Score: ' + score + '/' + data.length);
            inquirer.prompt([
                {
                    type: "list",
                    message: "Select an Option Below:",
                    choices: ["Play Again", "Main Menu"],
                    name: "command"
                }]).then(function (user) {
                    count = data.length;
                    num = 0;
                    score = 0;
                    inquireOptions(user.command);
                });
        }
    }

    // Card Constructor 
    function BasicCard(front, back) {
        this.card = {
            question: front,
            answer: back
        }
        this.addCard = addCard;
    }

    // function to push the new card into array then write to JSON
    function addCard() {
        var text = this.card;
        data.push(text);
        writeJSON();
        console.log("New flashcard has been added");
        inquirer.prompt([
            {
                type: "list",
                message: "Select an Option Below:",
                choices: ["Add More", "Main Menu"],
                name: "command"
            }]).then(function (user) {
                inquireOptions(user.command);
            });
    }

    // function to write to JSON file
    function writeJSON() {
        fs.writeFile(file, JSON.stringify(data, null, 2), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    // function for command navigation
    function inquireOptions(command) {
        switch (command) {
            case "Add More":
                createCard();
                break;
            case "Delete More":
                deleteCard();
                break;
            case "Play Again":
                playCard();
                break;
            case "Main Menu":
                main.inquireMain();
                break;
        }
    }
}

// export Basic Constructor
module.exports = Basic;


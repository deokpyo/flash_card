// require and file reference
var fs = require("fs");
var inquirer = require("inquirer");
var main = require("./app.js");
var cloze_data = require("./clozecard.json");
var cloze_file = "clozecard.json";
var count = cloze_data.length;
var score = 0;
var num = 0;

// ClozeCard Constructor
var Cloze = function () {
    this.createCard = createCard;
    this.deleteCard = deleteCard;
    this.playCard = playCard;

    // function to create a new card with user input
    function createCard() {
        inquirer.prompt([
            {
                type: "input",
                message: "Type in the question for cloze card. \n(ex. George Washington was the first president of the United States?)\nquestion: ",
                name: "text"
            },
            {
                type: "input",
                message: "Type in the cloze answer. \n(ex. George Washington)\ncloze: ",
                name: "cloze"
            }
        ]).then(function (user) {
            var card = new ClozeCard(user.text, user.cloze);
            card.addCard();
        });
    }
    // function to delete a card with user selection

    function deleteCard() {
        // populate a new array with card questions
        var cards = [];
        for (i = 0; i < cloze_data.length; i++) {
            cards.push(cloze_data[i].full);
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
            for (j = 0; j < cloze_data.length; j++) {
                if (cloze_data[j].full === user.card) {
                    cloze_data.splice(j, 1);
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

    // recursive function to play the clozecards
    function playCard() {
        if (count > 0) {
            inquirer.prompt([
                {
                    type: "input",
                    name: "user",
                    message: cloze_data[num].part + "\n"
                }
            ]).then(function (answer) {
                if (answer.user === cloze_data[num].answer) {
                    console.log(answer.user + " is the Correct Answer!");
                    score++;
                } else {
                    console.log("Wrong. Below is the full text for the clozecard.\n" + cloze_data[num].full);
                }
                count--;
                num++;
                playCard();
            });
        } else {
            console.log('--- No more clozecards ---\nYour Score: ' + score + '/' + cloze_data.length);
            inquirer.prompt([
                {
                    type: "list",
                    message: "Select an Option Below:",
                    choices: ["Play Again", "Main Menu"],
                    name: "command"
                }]).then(function (user) {
                    count = cloze_data.length;
                    num = 0;
                    inquireOptions(user.command);
                });
        }
    }

    // Card Constructor 
    function ClozeCard(text, cloze) {
        var partial = text.replace(cloze, "...");
        this.card = {
            full: text,
            part: partial,
            answer: cloze,
        }
        this.addCard = addCard;
    }

    // function to push the new card into array then write to JSON
    function addCard() {
        var text = this.card;
        cloze_data.push(text);
        writeJSON();
        console.log("New clozecard has been added");
        cloze_data = require("./clozecard.json");
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
        fs.writeFile(cloze_file, JSON.stringify(cloze_data, null, 2), function (err) {
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

// export ClozeCard Constructor
module.exports = Cloze;
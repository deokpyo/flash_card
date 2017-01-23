// require and file reference
var fs = require("fs");
var inquirer = require("inquirer");
var cloze = require("./cloze.js");
var data = require("./flashcard.json");
var file = "flashcard.json";
var cloze_card = new cloze;

// Basic Constructor
var Basic = function () {
    // function to create a new card with user input
    this.createCard = function () {
        inquirer.prompt([
            {
                type: "input",
                message: "Type in the question. (ex. Who was the first president of the United States? )",
                name: "front"
            },
            {
                type: "input",
                message: "Type in the answer. (ex. George Washington)",
                name: "back"
            }
        ]).then(function (user) {
            var card = new BasicCard(user.front, user.back);
            card.addCard();
            // update cloze_card 
            cloze_card.createCloze();
        });
    }
    // function to delete a card with user selection
    this.deleteCard = function () {
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
        });
        // update cloze_card 
        cloze_card.createCloze();
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
    }

    // function to write to JSON file
    function writeJSON() {
        fs.writeFile(file, JSON.stringify(data, null, 2), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

// export Basic Constructor
module.exports = Basic;


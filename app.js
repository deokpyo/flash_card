// user input reference
var input = process.argv;
var inquirer = require("inquirer");
var basic = require("./basic.js");
var cloze = require("./cloze.js");
var file = "flashcard.json";
var basic_card = new basic;
var cloze_card = new cloze;
var CLOZE = false;

// inquire user input for card type
function inquireMain() {
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome to Flashcard App, Select an Option Below:",
            choices: ["Basic Card", "Cloze Card", "Quit"],
            name: "command"
        }
    ]).then(function (user) {
        switch (user.command) {
            case "Basic Card":
                console.log('Play Basic');
                CLOZE = false;
                inquireCommand();
                break;
            case "Cloze Card":
                console.log('Play Clozecard');
                CLOZE = true;
                inquireCommand();
                break;
            case "Quit":
                console.log("Goodbye!");
                process.exit(0);
        }
    });
}

// inquire user input for command type
function inquireCommand() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select an Option Below:",
            choices: ["Add", "Delete", "Play", "Main Menu"],
            name: "command"
        }
    ]).then(function (user) {
        switch (user.command) {
            case "Add":
                //console.log('Add a Flashcard');
                if (CLOZE) {
                    console.log('add cloze');       
                    cloze_card.createCard();
                } else {
                    console.log('add basic'); 
                    basic_card.createCard();
                }
                break;
            case "Delete":
                //console.log('Delete a Flashcard');
                if (CLOZE) {
                    console.log('delete cloze'); 
                    cloze_card.deleteCard();
                } else {
                    console.log('delete basic'); 
                    basic_card.deleteCard();
                }
                break;
            case "Play":
                //console.log('Play');
                if (CLOZE) {
                    console.log('play cloze');
                    cloze_card.playCard();
                } else {
                    console.log('play basic');
                    basic_card.playCard();
                }
                break;
            case "Main Menu":
                inquireMain();
                break;
        }
    });
}

// start the inquireMain
inquireMain();
// export inquireMain for navigation purpose
module.exports.inquireMain = inquireMain;
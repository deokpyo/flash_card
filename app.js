// user input reference
var input = process.argv;
var inquirer = require("inquirer");
var basic = require("./basic.js");
var cloze = require("./cloze.js");
var file = "flashcard.json";
var basic_card = new basic;
var cloze_card = new cloze;

// inquire user input
function inquireCommand(){
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome to Flashcard App, Select an Option Below:",
            choices: ["Add","Delete","Play(basic)","Play(cloze)"],
            name: "command"
        }
    ]).then(function(user){
        switch (user.command) {
            case "Add":
            console.log('Add a Flashcard');
            basic_card.createCard();
            break;
            case "Delete":
            console.log('Delete a Flashcard');
            basic_card.deleteCard();
            break;
            case "Play(basic)":
            console.log('Play Basic');
            case "Play(cloze)":
            console.log('Play Clozecard');
            break;
        }
    });
}

inquireCommand();
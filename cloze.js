// require and file reference
var fs = require("fs");
var inquirer = require("inquirer");
var basic_data = require("./flashcard.json");
var basic_file = "flashcard.json";
var cloze_data = [];
var cloze_file = "clozecard.json";


// ClozeCard Constructor
var Cloze = function () {
    this.createCloze = function(){
        for(i = 0; i < basic_data.length; i++){
            var data = basic_data[i].question;
            var data_lower = basic_data[i].question.toLowerCase();
            console.log(data_lower.includes("who"));
            if(data_lower.includes("who")){
                var cloze_data = data.replace(/who/i,"...");
                console.log(cloze_data);
            }
            else if(data_lower.includes("what")){
                var cloze_data = data.replace(/what/i,"...");
                console.log(cloze_data);
            }
            var card = new ClozeCard(cloze_data, basic_data[i].answer);
            card.addCard();
        }

    }
    // this.playCloze = function(){

    // }

    // Card Constructor 
    function ClozeCard(text, cloze) {
        this.card = {
            question: text,
            answer: cloze
        }
        this.addCard = addCard;
    }

    // function to push the new card into array then write to JSON
    function addCard() {
        var text = this.card;
        cloze_data.push(text);
        writeJSON();
        console.log("New clozecard has been added");
    }

    // function to write to JSON file
    function writeJSON() {
        fs.writeFile(cloze_file, JSON.stringify(cloze_data, null, 2), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }


}

// export ClozeCard Constructor
module.exports = Cloze;
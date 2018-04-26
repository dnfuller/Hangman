// Global Variables
//------------------------------------------------------------
// Arrays and Variables for holding data
var wordOptions = ["genesis", "duran duran", "bon jovi", "van halen", "poison", "motley crue", "journey", "the police"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSucesses = []; // g _ _ _ _ _ _
var wrongLetters = [];
var letterGuessed;
//var alphabet = ["a", "b", "c", "d","e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 15;

// Functions (Reusable blocks of code that will be called upon when needed)
//------------------------------------------------------------

function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    // Reset
    guessesLeft = 15;
    wrongLetters = [];
    blanksAndSucesses = [];

    // Populate blanks and successes with right number of blanks.
    for (var i=0; i<numBlanks; i++){
        blanksAndSucesses.push("_");
    }

    // Change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSucesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;


    // Testing / Debugging
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSucesses);
}

function checkLetters(letter) {
    // Check if letter exists in code at all
    alert(letter);

    var isLetterInWord = false;

    for (var i=0; i<numBlanks; i++){
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    // Check where in the word the letter exists, then populate our blanksAndSuccesses array.
    if(isLetterInWord) {
        for (var i=0; i<numBlanks; i++) {
            if(selectedWord[i] == letter) {
                blanksAndSucesses[i] = letter;
            }
        }
    }

    // letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    // Testing / Debugging
    console.log(blanksAndSucesses);
    
}

function roundComplete(){
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left" + numGuesses);

    // Update the HTML to reflect the most recent count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSucesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    // Check if user won
    if (lettersinWord.toString() == blanksAndSucesses.toString()) {
        winCount++;
        alert("You Won!");

        // Update the win counter in the HTML
        document.getElementById("winCounter").innerHTML = winCount;
        
        startGame();
    }
    // Check if user lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You Lost!");

        // Update the loss counter in the HTML
        document.getElementById("lossCounter").innerHTML = lossCount;
        
        startGame();
    }


}

// Main Process
//------------------------------------------------------------

// Initiates code for the first time
startGame();

//Register keyclicks

document.onkeyup = function(event) {
    //letterGuessed = String.fromCharCode(event.keycode).toLowerCase();
    letterGuessed = event.key;
    checkLetters(letterGuessed);
    roundComplete();

    // Testing / Debugging
    //console.log(letterGuessed);
}

